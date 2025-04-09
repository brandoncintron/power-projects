import * as z from "zod";

/**
 * Project form validation schema
 * Centralized source of truth for form validation across the app
 */
export const projectFormSchema = z.object({
  projectName: z.string().min(1, {
    message: "Project name is required",
  }),

  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description cannot exceed 500 characters" }),

  visibility: z.enum(["public", "private", "university"], {
    required_error: "Please select project visibility",
  }),

  completionDate: z.date().optional(),

  teamName: z.string().optional(),

  applicationType: z.string().min(1, {
    message: "Application type is required",
  }),

  frameworks: z.array(z.string()).min(1, {
    message: "Please select at least one framework",
  }),

  databases: z.array(z.string()).optional(),
});

// Type for form data
export type ProjectFormData = z.infer<typeof projectFormSchema>;
