"use server";

import * as z from "zod";

// import { db } from "@/lib/db";
import { projectFormSchema, ProjectFormData } from "../utils/projectFormSchema";
import { db } from "@/lib/db";
import { ProjectVisibility } from "@prisma/client";
import { auth } from "@/auth";

export async function createProject(values: ProjectFormData) {
  const validatedFields = projectFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  console.log(validatedFields);
  const data = validatedFields.data;

  // Get the users session to attach the userId to project
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated.");
  }
  const ownerId = session.user.id;
  console.log(`owner id: ${ownerId}`);

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
        `Unexpected visibility value on server: ${data.visibility}`
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
    console.log("Project created successfully:", newProject);
    return { success: true, project: newProject };
  } catch (error) {
    console.error("Failed to create project in database:", error);
    // Handle database errors
    throw new Error("Database error: Could not create project.");
    // Or return a specific error object
  }

  return { success: "Project created successfully." };
}
