"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NotificationType } from "@prisma/client";

export async function handleWithdrawApplication(projectId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { 
        success: false, 
        error: "User not authenticated." 
      };
    }

    const applicantId = session.user.id;
    
    // Check if user already applied
    const alreadyApplied = await db.projectApplication.findUnique({
      where: {
        userId_projectId: {
          userId: applicantId,
          projectId: projectId,
        },
      },
      include: {
        project: {
          select: {
            ownerId: true
          }
        }
      }
    });

    if (!alreadyApplied) {
      return { 
        success: false, 
        error: "No active application found for this project." 
      };
    }

    // Delete the application record
    const deletedApplication = await db.projectApplication.delete({
      where: {
        userId_projectId: {
          userId: applicantId,
          projectId: projectId,
        },
      },
    });

    // Delete any application notification that was sent to the project owner
    if (alreadyApplied.project?.ownerId) {
      await db.notification.deleteMany({
        where: {
          projectId: projectId,
          userId: alreadyApplied.project.ownerId, // The notification recipient (project owner)
          senderId: applicantId, // The user who sent the application
          type: NotificationType.APPLICATION_SENT, // The type used for application notifications
        }
      });
    }

    return { success: true, data: deletedApplication };
  } catch (error) {
    console.error("Failed to withdraw application:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to withdraw application" 
    };
  }
} 