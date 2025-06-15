"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import {
  createGithubRepository,
  createWebhook,
  getOctokitInstance,
} from "@/lib/github/services";

import { ProjectFormData, projectSchema } from "./schemas/project-schema";

export async function createProject(data: ProjectFormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to create a project.",
    };
  }

  const validatedFields = projectSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields. Please check your input.",
    };
  }

  let newProject;

  try {
    const { githubRepoCreatedViaApp, ...restOfData } = validatedFields.data;
    let githubConnectionData = {};
    let repoDataForWebhook:
      | { githubRepoOwner: string; githubRepoName: string }
      | undefined;

    if (githubRepoCreatedViaApp) {
      const { projectName, description, visibility } = restOfData;

      try {
        const repoData = await createGithubRepository(session, {
          projectName,
          description,
          visibility: visibility as "PUBLIC" | "PRIVATE",
        });

        githubConnectionData = {
          githubRepoName: repoData.githubRepoName,
          githubRepoOwner: repoData.githubRepoOwner,
          githubRepoUrl: repoData.githubRepoUrl,
          githubConnectedAt: new Date(),
        };

        // Save for webhook creation after project is created
        repoDataForWebhook = {
          githubRepoOwner: repoData.githubRepoOwner,
          githubRepoName: repoData.githubRepoName,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        return {
          error: `Failed to create GitHub repository: ${errorMessage}`,
        };
      }
    }

    newProject = await db.project.create({
      data: {
        ...restOfData,
        visibility: restOfData.visibility as
          | "PUBLIC"
          | "PRIVATE"
          | "UNIVERSITY",
        ownerId: session.user.id,
        ...githubConnectionData,
        githubRepoCreatedViaApp,
      },
    });

    // If a repo was created, now create the webhook for it.
    if (githubRepoCreatedViaApp && repoDataForWebhook) {
      try {
        const octokit = await getOctokitInstance(session);
        await createWebhook(
          octokit,
          repoDataForWebhook.githubRepoOwner,
          repoDataForWebhook.githubRepoName,
        );
      } catch (webhookError) {
        // Log the error but don't fail the entire operation since the
        // project and repo are already created. This can be alerted
        // on and fixed manually if needed.
        console.error(
          `Project and repo created successfully for project ID ${newProject.id}, but failed to create webhook:`,
          webhookError,
        );
      }
    }
  } catch (error) {
    console.error("Failed to create project:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }

  revalidatePath("/projects/my-projects"); // Revalidate the projects list
  return { success: true, project: newProject };
}
