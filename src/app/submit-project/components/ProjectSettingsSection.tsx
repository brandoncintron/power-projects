import React from "react";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ProjectFormData } from "../hooks/useProjectForm";

interface ProjectSettingsSectionProps {
  form: UseFormReturn<ProjectFormData>;
}

/**
 * Project settings section of the form
 * Includes visibility settings and completion date
 */
export function ProjectSettingsSection({ form }: ProjectSettingsSectionProps) {
  return (
    <>
      {/* VISIBILITY RADIO BUTTON */}
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
      {/* END OF VISIBILITY RADIO BUTTON */}

      {/* EXPECTED COMPLETION DATE */}
      <FormField
        control={form.control}
        name="completionDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Expected Completion Date (Optional)</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* END OF EXPECTED COMPLETION DATE */}
    </>
  );
} 