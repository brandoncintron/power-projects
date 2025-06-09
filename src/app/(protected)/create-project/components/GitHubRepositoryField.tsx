import React from "react";

import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProjectFormData } from "@/schema/projectFormSchema";

/**
 * Component for GitHub repository creation selection
 */
export function GitHubRepositoryField() {
  const { control } = useFormContext<ProjectFormData>();

  return (
    <FormField
      control={control}
      name="createGitHubRepository"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value || false}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              id="createGitHubRepository"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel
              htmlFor="createGitHubRepository"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create GitHub Repository
            </FormLabel>
            <FormDescription>
              Automatically create a new GitHub repository for this project.
              You&apos;ll be able to fully manage your repository directly
              through Power Projects.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
