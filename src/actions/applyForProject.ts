import { auth } from "@/auth";

import { db } from "@/lib/db";

export async function applyForProject(projectId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated.");
  }

  const applicantId = session.user.id;
  console.log(`applyForProject current session id: ${applicantId}`);

  // Check if user already applied
  const alreadyApplied = await db.projectApplication.findUnique({
    where: {
      userId_projectId: {
        userId: applicantId,
        projectId: projectId,
      },
    },
  });

  if (alreadyApplied) {
    console.error("User already applied to this project.");
    throw new Error("You have already applied to this project.");
  }

  try {
    const newProjectApplication = await db.projectApplication.create({
      data: {
        userId: applicantId,
        projectId: projectId,
      },
    });

    return newProjectApplication;
  } catch (error) {
    console.error("Failed to apply for project:", error);
    throw new Error("Failed to apply for project. Please try again later.");
  }
}
