"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { createGithubRepository } from "@/app/api/github/repos/create/route";
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

  try {
    const { githubRepoCreatedViaApp, ...restOfData } = validatedFields.data;
    let githubConnectionData = {};

    if (githubRepoCreatedViaApp) {
      const { projectName, description, visibility } = restOfData;

      try {
        const repoData = await createGithubRepository({
          projectName,
          description,
          visibility: visibility as "PUBLIC" | "PRIVATE",
          session,
        });

        githubConnectionData = {
          githubRepoName: repoData.githubRepoName,
          githubRepoOwner: repoData.githubRepoOwner,
          githubRepoUrl: repoData.githubRepoUrl,
          githubConnectedAt: new Date(),
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

    await db.project.create({
      data: {
        ...restOfData,
        visibility: restOfData.visibility as "PUBLIC" | "PRIVATE" | "UNIVERSITY",
        ownerId: session.user.id,
        ...githubConnectionData,
        githubRepoCreatedViaApp,
      },
    });
  } catch (error) {
    console.error("Failed to create project:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }

  revalidatePath("/dashboard");
}
