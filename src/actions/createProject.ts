"use server";

import { auth } from "@/auth";
import { ProjectVisibility } from "@prisma/client";

import { db } from "@/lib/db";
import { ProjectFormData, projectFormSchema } from "@/schema/projectFormSchema";

export async function createProject(values: ProjectFormData) {
  const validatedFields = projectFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const data = validatedFields.data;

  // Get the users session to attach the userId to project
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated.");
  }
  const ownerId = session.user.id;

  let prismaVisibility: ProjectVisibility;
  switch (data.visibility) {
    case "public":
      prismaVisibility = ProjectVisibility.PUBLIC;
      break;
    case "private":
      prismaVisibility = ProjectVisibility.PRIVATE;
      break;
    case "university":
      prismaVisibility = ProjectVisibility.UNIVERSITY;
      break;
    default:
      // This case should ideally not be reachable if Zod validation passed
      console.error(
        `Unexpected visibility value on server: ${data.visibility}`,
      );
      throw new Error("Invalid visibility value.");
  }

  const dataForPrisma = {
    ...data, // Spread validated & typed data
    visibility: prismaVisibility,
    ownerId: ownerId,
  };

  try {
    const newProject = await db.project.create({
      data: dataForPrisma,
    });
    return { success: true, project: newProject };
  } catch (error) {
    return { error: true, message: error };
  }
}
