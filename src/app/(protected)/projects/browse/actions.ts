"use server";

import { applyForProject } from "@/actions/applyForProject";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NotificationType } from "@prisma/client";

export async function handleProjectApplication(projectId: string) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
    
    // Apply for the project
    const result = await applyForProject(projectId);
    
    // Get project details to include in notification
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { projectName: true, ownerId: true }
    });
    
    if (!project) {
      throw new Error("Project not found");
    }
    
    // Create notification for the project owner
    await db.notification.create({
      data: {
        userId: project.ownerId, // Send to project owner
        type: NotificationType.APPLICATION_SENT,
        title: "New application for your project",
        content: `${session.user.username || "A user"} applied to join "${project.projectName}"`,
        projectId,
        senderId: session.user.id,
      }
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to apply for project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to apply for project" 
    };
  }
} 