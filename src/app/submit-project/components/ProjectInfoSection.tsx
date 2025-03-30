import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormData } from "../hooks/useProjectForm";

interface ProjectInfoSectionProps {
  form: UseFormReturn<ProjectFormData>;
  charCount: number;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * Project information section of the form
 * Includes project name, description, and team name fields
 */
export function ProjectInfoSection({ form, charCount, onDescriptionChange }: ProjectInfoSectionProps) {
  return (
    <>
      {/* PROJECT NAME FIELD */}
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
      {/* END OF PROJECT NAME FIELD */}

      {/* DESCRIPTION FIELD WITH CHARACTER COUNTER */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Description <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <div className="relative">
                <Textarea
                  placeholder="Describe your project"
                  className="min-h-32"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onDescriptionChange(e);
                  }}
                />
                <div className="absolute right-2 bottom-2 text-xs text-muted-foreground">
                  {charCount}/500
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* END OF DESCRIPTION FIELD */}

      {/* TEAM/GROUP NAME */}
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
      {/* END OF TEAM/GROUP NAME */}
    </>
  );
} 