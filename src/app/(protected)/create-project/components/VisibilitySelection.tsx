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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProjectFormData } from "@/schema/projectFormSchema";

/**
 * Component for project visibility selection
 */
export function VisibilitySelection() {
  const { control } = useFormContext<ProjectFormData>();

  return (
    <FormField
      control={control}
      name="visibility"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>
            Project Visibility <span className="text-red-500">*</span>
          </FormLabel>
          <FormDescription>
            Choose who can see and apply to your project.
          </FormDescription>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <label
                  htmlFor="public"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Public - Anyone can see and apply
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <label
                  htmlFor="private"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Private - Only you can see this project
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
