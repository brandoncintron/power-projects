/**
 * @file This API route handles the one-time action of connecting or disconnecting a GitHub repository
 * to a project within the application.
 *
 * It:
 * 1.  Updates the project's details in the database with the repository's information.
 * 2.  Uses the GitHub service to create a webhook for the connected repository. This webhook
 *     sends real-time events to our `/api/github/webhook` endpoint.
 * 3.  Triggers the backfill of historical data by calling `fetchAndStoreRecentActivity`
 *     to populate the activity feed with past events.
 * 
 */
import { auth } from "@/auth";
import { getOctokitInstance } from "@/lib/github/services";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import {
  createWebhook,
  fetchAndStoreRecentActivity,
} from "@/lib/github/services";

const connectRepoSchema = z.object({
  projectId: z.string(),
  repository: z
    .object({
      id: z.number(),
      name: z.string(),
      full_name: z.string(),
      html_url: z.string(),
      owner: z.object({
        login: z.string(),
      }),
    })
    .optional(), // Make repository optional to allow disconnection
});

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const { projectId, repository } = connectRepoSchema.parse(body);

    // Check if project exists and user is the owner
    const project = await db.project.findFirst({
      where: {
        id: projectId, 
        ownerId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found or you don't have permission to modify it",
        },
        { status: 404 },
      );
    }

    // If no repository provided, disconnect the current one
    if (!repository) {
      const updatedProject = await db.project.update({
        where: {
          id: projectId, // PowerProjects ID
        },
        data: {
          githubRepoId: null, // GitHub Repo ID
          githubRepoUrl: null,
          githubRepoName: null,
          githubRepoOwner: null,
          githubConnectedAt: null,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Repository disconnected successfully",
        project: {
          id: updatedProject.id,
          githubRepoId: updatedProject.githubRepoId,
          githubRepoUrl: updatedProject.githubRepoUrl,
          githubRepoName: updatedProject.githubRepoName,
          githubRepoOwner: updatedProject.githubRepoOwner,
          githubConnectedAt: updatedProject.githubConnectedAt,
        },
      });
    }

    // Connect the repository
    const updatedProject = await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        githubRepoId: repository.id.toString(),
        githubRepoUrl: repository.html_url,
        githubRepoName: repository.name,
        githubRepoOwner: repository.owner.login,
        githubConnectedAt: new Date(),
      },
    });

    // --- Create the webhook and backfill data ---
    try {
      const session = await auth(); // Re-auth to get a fresh session for Octokit
      const octokit = await getOctokitInstance(session);

      await createWebhook(octokit, repository.owner.login, repository.name);
      
      console.log(`Webhook created successfully for ${repository.full_name}.`);

      // backfill the recent activity. Awaiting this to prevent race condition.
      await fetchAndStoreRecentActivity(updatedProject, octokit);

    } catch (error) {
      console.error(
        `Failed to create webhook or backfill activity for ${repository.full_name}. Project ID: ${projectId}`,
        error,
      ); 
    }

    return NextResponse.json({
      success: true,
      message: "Repository connected successfully",
      project: {
        id: updatedProject.id,
        githubRepoId: updatedProject.githubRepoId,
        githubRepoUrl: updatedProject.githubRepoUrl,
        githubRepoName: updatedProject.githubRepoName,
        githubRepoOwner: updatedProject.githubRepoOwner,
        githubConnectedAt: updatedProject.githubConnectedAt,
      },
    });
  } catch (error) {
    console.error("GitHub connect/disconnect error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Operation failed: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to connect/disconnect repository" },
      { status: 500 },
    );
  }
}
