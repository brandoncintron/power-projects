"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { editProfileSchema } from "@/schema/profileSchema";
import { auth } from "@/auth";

export const updateProfile = async (
  values: z.infer<typeof editProfileSchema>
) => {
  const validatedFields = editProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized user." };
  }

  const {
    username,
    bio,
    location,
    pronouns,
    preferredLanguage,
    github,
    linkedin,
    website,
    otherSocial,
  } = validatedFields.data;

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        bio,
        location,
        pronouns,
        preferredLanguage,
        github,
        linkedin,
        website,
        otherSocial,
      },
    });

    console.log("Server Action: Profile update successful for user:", {
      username,
      bio,
    });
    return { success: "Profile updated successfully!" };
  } catch (error) {
    console.error("Profile update failed:", error);
    return { error: "Could not update your profile. Please try again." };
  }
};
