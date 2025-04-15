"use server";

import { applyForProject } from "@/actions/applyForProject";

export async function handleProjectApplication(projectId: string) {
  try {
    const result = await applyForProject(projectId);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to apply for project:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to apply for project" 
    };
  }
} 