"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/update";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import {
  LuLoader,
  LuGithub,
  LuLinkedin,
  LuGlobe,
  LuLink,
} from "react-icons/lu";

import {
  editProfileSchema,
  EditProfileSchemaType,
} from "@/schema/profileSchema";

const EditProfileForm = () => {
  // --- Hooks ---
  const [isPending, startTransition] = useTransition();
  const { data: session, update: updateSession } = useSession();
  const user = session?.user;
  const router = useRouter();
  const form = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),

    defaultValues: {
      name: user?.name || "",
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

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
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
  }, [user, form.reset]);

  // --- Data ---
  const pronounOptions = [
    { value: "he/him", label: "He/Him" },
    { value: "she/her", label: "She/Her" },
    { value: "they/them", label: "They/Them" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "ja", label: "日本語" },
  ];

  // --- Event Handlers ---
  const onSubmit = async (values: EditProfileSchemaType) => {
    startTransition(async () => {
      try {
        // Call the server action with the validated form values
        await updateProfile(values);

        await updateSession(); // Fetch the latest session data

        toast.success("Your profile information has been saved.", {
          duration: 3000,
          position: "bottom-right",
        });

        router.refresh();
      } catch (error) {
        console.error("Profile update failed:", error);

        toast.error("Could not update your profile. Please try again.", {
          duration: 3000,
          position: "bottom-right",
        });
      }
    });
  };

  if (!session || !user) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <LuLoader className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading profile...</span>
        </CardContent>
      </Card>
    );
  }

  // --- Rendering ---
  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your profile information. Changes will be saved upon
          submission.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user?.image || ""}
                  alt="User Profile Picture"
                />
                <AvatarFallback>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Username Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your display name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage /> {/* Displays validation errors */}
                </FormItem>
              )}
            />

            {/* Registered Email (Read-only) */}
            <div className="space-y-2">
              <FormLabel className="text-sm font-medium">
                Registered Email
              </FormLabel>
              <Input
                type="email"
                value={user?.email || "No email associated"}
                disabled
                readOnly
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
              <FormDescription>
                Your registered email address cannot be changed here.
              </FormDescription>
            </div>

            {/* Bio Field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us a little about yourself"
                      disabled={isPending}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., San Francisco, CA"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pronouns Field (Select Dropdown) */}
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <Select
                    onValueChange={field.onChange} // Use field.onChange to update form state
                    defaultValue={field.value} // Control the selected value
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your pronouns" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pronounOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preferred Language Field (Select Dropdown) */}
            <FormField
              control={form.control}
              name="preferredLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Social Links</h3>
              {/* Github */}
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <LuGithub className="mr-2 h-4 w-4" /> Github
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://github.com/username"
                        disabled={isPending}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* LinkedIn */}
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <LuLinkedin className="mr-2 h-4 w-4" /> LinkedIn
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://linkedin.com/in/username"
                        disabled={isPending}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <LuGlobe className="mr-2 h-4 w-4" /> Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://yourwebsite.com"
                        disabled={isPending}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Other Social */}
              <FormField
                control={form.control}
                name="otherSocial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <LuLink className="mr-2 h-4 w-4" /> Other Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Link to another profile or social media"
                        disabled={isPending}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto"
          onClick={form.handleSubmit(onSubmit)}
        >
          {isPending && <LuLoader className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditProfileForm;
