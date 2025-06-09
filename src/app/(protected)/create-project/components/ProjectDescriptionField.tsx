import React from "react";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormData } from "@/schema/projectFormSchema";

/**
 * Component for the project description field with character count
 */
export function ProjectDescriptionField() {
  const { control, watch } = useFormContext<ProjectFormData>();
  const description = watch("description") || "";
  const charCount = description.length;

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Project Description <span className="text-red-500">*</span>
          </FormLabel>
          <FormDescription>
            Briefly describe your project and what you hope to achieve.
          </FormDescription>
          <FormControl>
            <Textarea
              placeholder="Describe your project..."
              className="resize-none"
              {...field}
            />
          </FormControl>
          <div className="flex justify-between items-center">
            <FormMessage />
            <p className="text-sm text-muted-foreground">
              {charCount}/500 characters
            </p>
          </div>
        </FormItem>
      )}
    />
  );
}
