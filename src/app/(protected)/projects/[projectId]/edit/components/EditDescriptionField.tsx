"use client";

import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useEditProjectForm } from "@@/projects/[projectId]/edit/hooks/useEditProjectForm";

export function EditDescriptionField() {
  const { form, charCount, handleDescriptionChange } = useEditProjectForm();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <div className="text-xs text-muted-foreground">{charCount}/500</div>
          </div>
          <FormControl>
            <Textarea
              placeholder="Describe your project"
              className="min-h-32 resize-none"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleDescriptionChange(e);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
