import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useProjectForm } from "../context/ProjectFormContext";

/**
 * Component for the project description
 */
export function ProjectDescriptionField() {
  const { form, charCount, handleDescriptionChange } = useProjectForm();
  
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Project Description <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <div className="relative">
              <Textarea
                placeholder="Describe your project"
                className="min-h-32"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleDescriptionChange(e);
                }}
              />
              <div className="absolute right-2 bottom-2 text-xs text-muted-foreground">
                {charCount}/500
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 