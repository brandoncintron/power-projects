import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProjectForm } from "../context/ProjectFormContext";

/**
 * Component for the project visibility radio buttons
 */
export function VisibilitySelection() {
  const { form } = useProjectForm();
  
  return (
    <FormField
      control={form.control}
      name="visibility"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Who can see this project? <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="public" />
                </FormControl>
                <FormLabel className="font-normal">
                  Public (Anyone can see this project)
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="private" />
                </FormControl>
                <FormLabel className="font-normal">
                  Private (Only you and your team can see this project)
                </FormLabel>
              </FormItem>
              {/*
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="university" />
                </FormControl>
                 TODO: add a check to see if the user is a student at the university}
                <FormLabel className="font-normal">
                  My University (Only students at your university can see this project)
                </FormLabel>
              </FormItem>
              */}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 