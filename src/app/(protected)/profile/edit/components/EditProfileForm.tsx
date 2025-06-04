"use client";

import { LuLoader } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { PersonalInfoFields } from "@@/profile/edit/components/PersonalInfoFields";
import { ProfileLoading } from "@@/profile/edit/components/ProfileLoadingState";
import { ProfilePicture } from "@@/profile/edit/components/ProfilePicture";
import { SocialLinksFields } from "@@/profile/edit/components/SocialLinksFields";
import { useProfileForm } from "@@/profile/edit/hooks/useProfileForm";
import { ProfileFormProps } from "@@/profile/edit/types/types";

const EditProfileForm = ({ session }: ProfileFormProps) => {
  const { form, isPending, onSubmit, user } = useProfileForm(session);

  if (!session || !user) {
    return <ProfileLoading />;
  }

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
            <ProfilePicture image={user.image} name={user.name} />
            <PersonalInfoFields
              form={form}
              isPending={isPending}
              email={user.email}
            />
            <SocialLinksFields form={form} isPending={isPending} />
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
