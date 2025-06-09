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
 * Component for the optional team name field
 */
export function TeamNameField() {
  const { control } = useFormContext<ProjectFormData>();

  return (
    <FormField
      control={control}
      name="teamName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Team Name (Optional)</FormLabel>
          <FormControl>
            <Input placeholder="Enter team name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
