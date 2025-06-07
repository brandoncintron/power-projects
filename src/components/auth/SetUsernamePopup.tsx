"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuLoader } from "react-icons/lu";
import { toast } from "sonner";

import { updateProfile } from "@/actions/update";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UsernameFormType, usernameSchema } from "./types/types";

export function SetUsernamePopup() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const form = useForm<UsernameFormType>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = async (values: UsernameFormType) => {
    setError("");

    startTransition(async () => {
      try {
        const result = await updateProfile(values);

        if (result?.error) {
          setError(result.error);
          toast.error("Could not update your profile. Please try again.", {
            duration: 3000,
            position: "bottom-right",
          });
        } else if (result?.success) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Username update failed:", error);
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.", {
          duration: 3000,
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Power Projects!
          </h1>
          <p className="text-muted-foreground">
            Just one more step to get started
          </p>
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Set Your Username</CardTitle>
            <CardDescription>
              Choose a username that others will see on your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
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
                          placeholder="Enter your username"
                          disabled={isPending}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full h-12 text-base"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending && (
                    <LuLoader className="mr-2 size-4 animate-spin" />
                  )}
                  {isPending ? "Setting username..." : "Continue to Dashboard"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
