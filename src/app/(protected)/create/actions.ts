"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

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
    const { visibility, ...rest } = validatedFields.data;
    await db.project.create({
      data: {
        ...rest,
        visibility: visibility as "PUBLIC" | "PRIVATE" | "UNIVERSITY",
        ownerId: session.user.id,
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
