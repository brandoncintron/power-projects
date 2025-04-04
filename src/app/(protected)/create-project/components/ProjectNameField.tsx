import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProjectForm } from "../context/ProjectFormContext";

/**
 * Component for the project name field
 */
export function ProjectNameField() {
  const { form } = useProjectForm();
  
  return (
    <FormField
      control={form.control}
      name="projectName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Project Name <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input placeholder="Enter project name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 