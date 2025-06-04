"use server";

import { auth } from "@/auth";

import { db } from "@/lib/db";

export async function deleteProject(projectId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "User not authenticated.",
      };
    }

    const userId = session.user.id;

    // Check if user is the owner of the project
    const project = await db.project.findUnique({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found or you don't have permission to delete it.",
      };
    }

    // Delete the project record (cascade will handle related records)
    const deletedProject = await db.project.delete({
      where: {
        id: projectId,
      },
    });

    return { success: true, data: deletedProject };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
}

export async function closeProject(projectId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "User not authenticated.",
      };
    }

    const userId = session.user.id;

    // Check if user is the owner of the project
    const project = await db.project.findUnique({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found or you don't have permission to close it.",
      };
    }

    // Update the project status to CLOSED
    const updatedProject = await db.project.update({
      where: {
        id: projectId,
      },
      data: {
        status: "CLOSED",
      },
    });

    return { success: true, data: updatedProject };
  } catch (error) {
    console.error("Failed to close project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to close project",
    };
  }
}
