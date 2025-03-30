import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applicationTypes } from "../form-data";
import { ProjectFormData } from "../hooks/useProjectForm";

interface ApplicationTypeSectionProps {
  form: UseFormReturn<ProjectFormData>;
  onApplicationTypeChange: (value: string) => void;
}

/**
 * Application type selection section
 * Allows selecting from predefined application types
 */
export function ApplicationTypeSection({ form, onApplicationTypeChange }: ApplicationTypeSectionProps) {
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
              onApplicationTypeChange(value);
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