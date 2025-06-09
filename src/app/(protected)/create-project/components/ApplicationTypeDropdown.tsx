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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectFormData } from "@/schema/projectFormSchema";

import { applicationTypes } from "@@/create-project/data/project-technology-data";

/**
 * Component for selecting application type
 */
export function ApplicationTypeDropdown() {
  const { control, setValue } = useFormContext<ProjectFormData>();

  const handleApplicationTypeChange = (value: string) => {
    setValue("applicationType", value);
    // Reset framework and database selections when app type changes
    setValue("frameworks", []);
    setValue("databases", []);
  };

  return (
    <FormField
      control={control}
      name="applicationType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Application Type <span className="text-red-500">*</span>
          </FormLabel>
          <FormDescription>
            What type of application are you planning to build?
          </FormDescription>
          <Select
            onValueChange={handleApplicationTypeChange}
            value={field.value}
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
