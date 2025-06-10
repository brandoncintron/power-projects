import { z } from "zod";

export const projectSchema = z
  .object({
    projectName: z
      .string()
      .min(3, "Project name must be at least 3 characters long."),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long.")
      .max(500, "Description cannot exceed 500 characters."),
    teamName: z.string().optional(),
    visibility: z.enum(["PUBLIC", "PRIVATE", "UNIVERSITY"]),
    completionDate: z.date().optional(),
    frameworks: z.string().array(),
    databases: z.string().array(),
    applicationType: z.string().min(1, "Please select an application type."),
    githubRepoCreatedViaApp: z.boolean().default(false),
  })
  .refine((data) => data.frameworks.length > 0, {
    message: "You must select at least one framework.",
    path: ["frameworks"],
  });

export type ProjectFormData = z.infer<typeof projectSchema>;
