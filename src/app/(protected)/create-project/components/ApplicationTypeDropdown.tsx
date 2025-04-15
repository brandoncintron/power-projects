import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applicationTypes } from "../utils/project-technology-data";
import { useProjectForm } from "../context/ProjectFormContext";

/**
 * Component for the application type dropdown
 */
export function ApplicationTypeDropdown() {
  // Get values from context
  const { form, setApplicationType } = useProjectForm();
  
  return (
    <FormField
      control={form.control}
      name="applicationType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Application Type <span className="text-red-500">*</span></FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              setApplicationType(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select application type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {applicationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 