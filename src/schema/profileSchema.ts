import * as z from "zod";

export const editProfileSchema = z.object({
    name: z.string({ required_error: "Username is required."})
        .min(1, "Username is required.")
        .max(20, "Username must be less than 20 characters."),
    email: z.string().email("Invalid email address.").optional(),
    bio: z.string().max(500, "Bio must be less than 500 characters.").optional(),
    location: z.string().max(100, "Location must be less than 100 characters.").optional(),
    pronouns: z.string().optional(),
    preferredLanguage: z.string().optional(),
    profilePicture: z.string().optional(),
    github: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    otherSocial: z.string().url("Please enter a valid URL").optional().or(z.literal(""))
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>; 