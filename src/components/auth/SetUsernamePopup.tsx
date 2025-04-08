"use client";

import { updateProfile } from "@/actions/update";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLoader } from "react-icons/lu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be at least 1 character.")
    .max(20, "Username must be less than 20 characters."),
});

type UsernameFormType = z.infer<typeof usernameSchema>;

export function SetUsernamePopup() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<UsernameFormType>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: UsernameFormType) => {
    setError("");

    startTransition(() => {
      updateProfile(values).then((data) => {
        if (data?.error) {
          setError(data.error);

          toast.error("Could not update your profile. Please try again.", {
            duration: 3000,
            position: "bottom-right",
          });
        } else {
          toast.success("Your profile information has been saved.", {
            duration: 3000,
            position: "bottom-right",
          });
          // Reload window to get the user back to where they were
          window.location.reload();
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Wait! Your username is not set.</CardTitle>
          <CardDescription>Please set a username to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        id="username-input"
                        placeholder="Enter a desired username"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending && <LuLoader className="mr-2 size-4 animate-spin" />}
                {isPending ? "Setting username..." : "Continue"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
