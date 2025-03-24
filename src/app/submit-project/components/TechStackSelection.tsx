import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/components/ui/form";
import { FrameworkSelectionStep } from "./FrameworkSelection";
import { DatabaseSelectionStep } from "./DatabaseSelection";
import { ProjectFormData } from "../hooks/useProjectForm";

interface TechnologySelectionSectionProps {
  form: UseFormReturn<ProjectFormData>;
  selectedAppType: string;
  selectionStep: "framework" | "database";
  customFramework: string;
  customDatabase: string;
  customDatabases: string[];
  onCustomFrameworkChange: (value: string) => void;
  onAddCustomFramework: () => void;
  onRemoveCustomFramework: (framework: string) => void;
  onToggleFramework: (framework: string) => void;
  onProceedToDatabase: () => void;
  onCustomDatabaseChange: (value: string) => void;
  onAddCustomDatabase: () => void;
  onRemoveCustomDatabase: (database: string) => void;
  onToggleDatabase: (database: string) => void;
  onBackToFrameworks: () => void;
  getDbOptions: () => Array<{ name: string; description: string }>;
  onSubmit: (values: ProjectFormData) => void;
}

/**
 * Combined technology selection section including frameworks and databases
 * Shows either framework selection step or database selection step based on current state
 */
export function TechnologySelectionSection({
  form,
  selectedAppType,
  selectionStep,
  customFramework,
  customDatabase,
  customDatabases,
  onCustomFrameworkChange,
  onAddCustomFramework,
  onRemoveCustomFramework,
  onToggleFramework,
  onProceedToDatabase,
  onCustomDatabaseChange,
  onAddCustomDatabase,
  onRemoveCustomDatabase,
  onToggleDatabase,
  onBackToFrameworks,
  getDbOptions,
  onSubmit,
}: TechnologySelectionSectionProps) {
  if (!selectedAppType) return null;
  
  return (
    <FormField
      control={form.control}
      name="frameworks"
      render={() => (
        <FormItem className="space-y-3" id="tech-stack-selection">
          <FormLabel>Recommended Frameworks/Languages <span className="text-red-500">*</span></FormLabel>
          <FormDescription>
            Select the framework(s) or technology you plan to use.
          </FormDescription>
          <FormControl>
            <div className="border rounded-lg p-3 sm:p-4 md:p-6 bg-card">
              {selectionStep === "framework" ? (
                <FrameworkSelectionStep 
                  form={form}
                  selectedAppType={selectedAppType}
                  customFramework={customFramework}
                  onCustomFrameworkChange={onCustomFrameworkChange}
                  onAddCustomFramework={onAddCustomFramework}
                  onRemoveCustomFramework={onRemoveCustomFramework}
                  onToggleFramework={onToggleFramework}
                  onProceedToDatabase={onProceedToDatabase}
                />
              ) : (
                <DatabaseSelectionStep 
                  form={form}
                  selectedAppType={selectedAppType}
                  customDatabase={customDatabase}
                  customDatabases={customDatabases}
                  onCustomDatabaseChange={onCustomDatabaseChange}
                  onAddCustomDatabase={onAddCustomDatabase}
                  onRemoveCustomDatabase={onRemoveCustomDatabase}
                  onToggleDatabase={onToggleDatabase}
                  onBackToFrameworks={onBackToFrameworks}
                  getDbOptions={getDbOptions}
                  onSubmit={onSubmit}
                />
              )}
            </div>
          </FormControl>
          {/* VALIDATION ERROR MESSAGE - Shows error if no frameworks/databases selected */}
          {(form.formState.errors.frameworks || form.formState.errors.databases) && (
            <p className="text-sm font-medium text-destructive mt-2">
              {String(form.formState.errors.frameworks?.message) || "Please select at least one database"}
            </p>
          )}
        </FormItem>
      )}
    />
  );
} 