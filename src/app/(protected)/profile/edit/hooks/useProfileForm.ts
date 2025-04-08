"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateProfile } from "@/actions/update";
import {
  editProfileSchema,
  EditProfileSchemaType,
} from "@/schema/profileSchema";
import type { Session } from "next-auth";

export function useProfileForm(session: Session | null) {
  const [isPending, startTransition] = useTransition();
  const user = session?.user;
  const router = useRouter();

  const form = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || "",
      bio: user?.bio || "",
      location: user?.location || "",
      pronouns: user?.pronouns || "",
      preferredLanguage: user?.preferredLanguage || "",
      github: user?.github || "",
      linkedin: user?.linkedin || "",
      website: user?.website || "",
      otherSocial: user?.otherSocial || "",
    },
  });

  // Reset form when user data changes (if it changes anywhere else)
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
        pronouns: user.pronouns || "",
        preferredLanguage: user.preferredLanguage || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        website: user.website || "",
        otherSocial: user.otherSocial || "",
      });
    }
  }, [user, form.reset, form]);

  const onSubmit = async (values: EditProfileSchemaType) => {
    startTransition(async () => {
      try {
        await updateProfile(values);

        toast.success("Your profile information has been saved.", {
          duration: 3000,
          position: "bottom-right",
        });

        router.refresh();
        router.push("/dashboard");
      } catch (error) {
        console.error("Profile update failed:", error);

        toast.error("Could not update your profile. Please try again.", {
          duration: 3000,
          position: "bottom-right",
        });
      }
    });
  };

  return {
    form,
    isPending,
    onSubmit,
    user,
  };
}
