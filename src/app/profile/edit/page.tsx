"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { LuLoader, LuPencil } from "react-icons/lu";
import { FaGithub, FaLinkedin, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  editProfileSchema,
  EditProfileSchemaType,
} from "@/schema/profileSchema";
import { DialogError } from "@/components/auth/DialogError";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileEditPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  // Mock data - in a real app this would come from a database
  const mockUser = {
    name: "User123",
    email: "user@example.com",
    bio: "",
    location: "",
    pronouns: "",
    preferredLanguage: "",
    profilePicture: "",
    github: "",
    linkedin: "",
    website: "",
    otherSocial: "",
  };

  const form = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: mockUser,
  });

  const onSubmit = async (values: EditProfileSchemaType) => {
    setError("");

    startTransition(() => {
      // This would be replaced with an actual API call
      console.log(values);
      // Mock success message
      setTimeout(() => {
        alert("Profile updated successfully!");
      }, 1000);
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogError message={error} />

            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={form.getValues("profilePicture") || ""} />
                <AvatarFallback>
                  {form.getValues("name").substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {isEditingUsername ? (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex space-x-2">
                              <Input
                                {...field}
                                type="text"
                                disabled={isPending}
                                placeholder="Username"
                                className="h-8 w-full"
                                onBlur={() => setIsEditingUsername(false)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold">
                        {form.getValues("name")}
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setIsEditingUsername(true)}
                      >
                        <LuPencil className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={true}
                      placeholder="name@example.com"
                      className="bg-gray-100 h-8"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Email cannot be changed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Tell others about yourself"
                      className="resize-none text-sm"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-lg" /> Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="City, Country"
                      className="h-8 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Don't specify" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="they/them">They/Them</SelectItem>
                      <SelectItem value="she/her">She/Her</SelectItem>
                      <SelectItem value="he/him">He/Him</SelectItem>
                      <SelectItem value="she/they">She/They</SelectItem>
                      <SelectItem value="he/they">He/They</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="text-sm font-medium">
                Connect to your university
              </div>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  className="cursor-pointer h-8 text-sm"
                >
                  Connect University
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="preferredLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Language</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Select preferred language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className="text-lg font-medium mb-2">Social Accounts</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FaGithub className="text-lg" /> GitHub
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          disabled={isPending}
                          placeholder="Link to your GitHub profile"
                          className="h-8 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FaLinkedin className="text-lg" /> LinkedIn
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          disabled={isPending}
                          placeholder="Link to your LinkedIn profile"
                          className="h-8 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FaGlobe className="text-lg" />Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          disabled={isPending}
                          placeholder="Link to your website"
                          className="h-8 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherSocial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          disabled={isPending}
                          placeholder="Link to any other social profile"
                          className="h-8 text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full h-9">
              {isPending && <LuLoader className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
