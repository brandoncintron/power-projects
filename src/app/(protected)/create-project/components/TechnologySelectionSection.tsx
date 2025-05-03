import React from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { DatabaseSelection } from "@@/create-project/components/DatabaseSelection";
import { FrameworkSelection } from "@@/create-project/components/FrameworkSelection";
import { useProjectForm } from "@@/create-project/hooks/useProjectForm";

/**
 * The entire wrapper for framework and database selection
 */
export function TechnologySelectionSection() {
  // Get values from context
  const { form, state } = useProjectForm();
  const { applicationType, selectionStep } = state;

  if (!applicationType) return null;

  return (
    <FormField
      control={form.control}
      name="frameworks"
      render={() => (
        <FormItem className="space-y-3" id="tech-stack-selection">
          <FormLabel>
            Recommended Frameworks/Languages{" "}
            <span className="text-red-500">*</span>
          </FormLabel>
          <FormDescription>
            Select the framework(s) or technology you plan to use.
          </FormDescription>
          <FormControl>
            <div className="border rounded-lg p-3 sm:p-4 md:p-6 bg-card">
              {selectionStep === "framework" ? (
                <FrameworkSelection />
              ) : (
                <DatabaseSelection />
              )}
            </div>
          </FormControl>
          {/* VALIDATION ERROR MESSAGE - Shows error if no frameworks/databases selected */}
          {(form.formState.errors.frameworks ||
            form.formState.errors.databases) && (
            <p className="text-sm font-medium text-destructive mt-2">
              {String(form.formState.errors.frameworks?.message) ||
                "Please select at least one database"}
            </p>
          )}
        </FormItem>
      )}
    />
  );
}
