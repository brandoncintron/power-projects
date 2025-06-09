import React from "react";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProjectFormData } from "@/schema/projectFormSchema";

/**
 * Component for the project name field
 */
export function ProjectNameField() {
  const { control } = useFormContext<ProjectFormData>();

  return (
    <FormField
      control={control}
      name="projectName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Project Name <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input placeholder="Enter project name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
