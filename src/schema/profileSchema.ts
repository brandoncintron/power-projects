import * as z from "zod";

export const editProfileSchema = z.object({
    username: z.string()
        .min(1, "Username must be at least 1 character.")
        .max(20, "Username must be less than 20 characters.")
        .optional(),
    bio: z.string().max(160, "Bio must be less than 160 characters.").optional(),
    location: z.string().max(50, "Location must be less than 50 characters.").optional(),
    pronouns: z.string().optional(),
    preferredLanguage: z.string().optional(),
    github: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    otherSocial: z.string().url("Please enter a valid URL").optional().or(z.literal(""))
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;