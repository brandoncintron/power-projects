import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/db";

// Request body validation schema - repository is now optional for disconnect
const connectRepoSchema = z.object({
  projectId: z.string(),
  repository: z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
    html_url: z.string(),
    owner: z.object({
      login: z.string(),
    }),
  }).optional(), // Make repository optional to allow disconnection
});

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
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
        { error: "Project not found or you don't have permission to modify it" },
        { status: 404 }
      );
    }

    // If no repository provided, disconnect the current one
    if (!repository) {
      const updatedProject = await db.project.update({
        where: {
          id: projectId,
        },
        data: {
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
        githubRepoUrl: repository.html_url,
        githubRepoName: repository.name,
        githubRepoOwner: repository.owner.login,
        githubConnectedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Repository connected successfully",
      project: {
        id: updatedProject.id,
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
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Operation failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to connect/disconnect repository" },
      { status: 500 }
    );
  }
} 