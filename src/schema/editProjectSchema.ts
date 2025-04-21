import * as z from "zod";

export const editProjectSchema = z.object({
    projectName: z.string().min(1, {
      message: "Project name is required",
    }),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(500, { message: "Description cannot exceed 500 characters" }),
    completionDate: z.date().optional(),
  });

export type EditProjectSchema = z.infer<typeof editProjectSchema>;