"use server";

import { auth } from "@/auth";
import { NotificationType } from "@prisma/client";

import { db } from "@/lib/db";

export async function acceptProjectApplication(
  projectId: string,
  applicantId: string,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "User not authenticated.",
      };
    }

    // Verify the current user is the project owner
    const project = await db.project.findUnique({
      where: {
        id: projectId,
        ownerId: session.user.id, // Only the owner can accept applications
      },
      select: {
        id: true,
        projectName: true,
        ownerId: true,
      },
    });

    if (!project) {
      return {
        success: false,
        error:
          "Project not found or you don't have permission to manage this project.",
      };
    }

    // Check if application exists and is pending
    const application = await db.projectApplication.findUnique({
      where: {
        userId_projectId: {
          userId: applicantId,
          projectId: projectId,
        },
      },
    });

    if (!application) {
      return {
        success: false,
        error: "Application not found.",
      };
    }

    // Update application status to 'accepted'
    const updatedApplication = await db.projectApplication.update({
      where: {
        userId_projectId: {
          userId: applicantId,
          projectId: projectId,
        },
      },
      data: {
        status: "accepted",
      },
    });

    // Add user as a collaborator to the project
    const collaborator = await db.projectCollaborator.create({
      data: {
        userId: applicantId,
        projectId: projectId,
      },
    });

    // Delete the original application notification from project owner's notifications
    await db.notification.deleteMany({
      where: {
        projectId: projectId,
        userId: project.ownerId, // The project owner received the original notification
        senderId: applicantId, // From the applicant
        type: NotificationType.APPLICATION_SENT,
      },
    });

    // Create notification for the applicant
    await db.notification.create({
      data: {
        userId: applicantId, // Send to the applicant
        type: NotificationType.APPLICATION_ACCEPTED,
        title: "Your application was accepted",
        content: `Congratulations! ${session.user.username} has accepted your application to join "${project.projectName}."`,
        projectId: project.id,
        senderId: session.user.id, // Project owner is the sender
      },
    });

    return {
      success: true,
      data: { application: updatedApplication, collaborator },
    };
  } catch (error) {
    console.error("Failed to accept application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to accept application",
    };
  }
}

export async function denyProjectApplication(
  projectId: string,
  applicantId: string,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "User not authenticated.",
      };
    }

    // Verify the current user is the project owner
    const project = await db.project.findUnique({
      where: {
        id: projectId,
        ownerId: session.user.id, // Only the owner can reject applications
      },
      select: {
        id: true,
        projectName: true,
        ownerId: true,
      },
    });

    if (!project) {
      return {
        success: false,
        error:
          "Project not found or you don't have permission to manage this project.",
      };
    }

    // Check if application exists
    const application = await db.projectApplication.findUnique({
      where: {
        userId_projectId: {
          userId: applicantId,
          projectId: projectId,
        },
      },
    });

    if (!application) {
      return {
        success: false,
        error: "Application not found.",
      };
    }

    // Update application status to 'rejected'
    const updatedApplication = await db.projectApplication.update({
      where: {
        userId_projectId: {
          userId: applicantId,
          projectId: projectId,
        },
      },
      data: {
        status: "rejected",
      },
    });

    // Delete the original application notification from project owner's notifications
    await db.notification.deleteMany({
      where: {
        projectId: projectId,
        userId: project.ownerId, // The project owner received the original notification
        senderId: applicantId, // From the applicant
        type: NotificationType.APPLICATION_SENT,
      },
    });

    // Create notification for the applicant
    await db.notification.create({
      data: {
        userId: applicantId, // Send to the applicant
        type: NotificationType.APPLICATION_REJECTED,
        title: "Your application was not accepted",
        content: `Unfortunately, your application to join "${project.projectName}" was not accepted.`,
        projectId: project.id,
        senderId: session.user.id, // Project owner is the sender
      },
    });

    return { success: true, data: updatedApplication };
  } catch (error) {
    console.error("Failed to deny application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to deny application",
    };
  }
}

export async function removeCollaborator(
  projectId: string,
  collaboratorId: string,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "User not authenticated.",
      };
    }

    // Verify the current user is the project owner
    const project = await db.project.findUnique({
      where: {
        id: projectId,
        ownerId: session.user.id, // Only the owner can remove collaborators
      },
    });

    if (!project) {
      return {
        success: false,
        error:
          "Project not found or you don't have permission to manage this project.",
      };
    }

    // Check if user is a collaborator on this project
    const collaborator = await db.projectCollaborator.findUnique({
      where: {
        userId_projectId: {
          userId: collaboratorId,
          projectId: projectId,
        },
      },
    });

    if (!collaborator) {
      return {
        success: false,
        error: "Collaborator not found for this project.",
      };
    }

    // Remove the collaborator
    const removedCollaborator = await db.projectCollaborator.delete({
      where: {
        userId_projectId: {
          userId: collaboratorId,
          projectId: projectId,
        },
      },
    });

    return { success: true, data: removedCollaborator };
  } catch (error) {
    console.error("Failed to remove collaborator:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to remove collaborator",
    };
  }
}
