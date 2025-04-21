"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { editProjectSchema, EditProjectSchema } from "@/schema/editProjectSchema";

export async function updateProject(projectId: string, values: EditProjectSchema) {
  const validatedFields = editProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields" };
  }

  const data = validatedFields.data;

  // Get the users session to check ownership
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "User not authenticated" };
  }
  const userId = session.user.id;

  try {
    // First check if the user is the owner of the project
    const project = await db.project.findUnique({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      return { 
        success: false, 
        error: "Project not found or you don't have permission to update it." 
      };
    }

    // Update the project
    const updatedProject = await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        projectName: data.projectName,
        description: data.description,
        completionDate: data.completionDate,
      },
    });

    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update project" 
    };
  }
} 