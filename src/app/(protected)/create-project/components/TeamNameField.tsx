import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProjectForm } from "../context/ProjectFormContext";

/**
 * Component for the team name field
 */
export function TeamNameField() {
  const { form } = useProjectForm();
  
  return (
    <FormField
      control={form.control}
      name="teamName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Team Name (Optional)</FormLabel>
          <FormControl>
            <Input placeholder="Enter team or group name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 