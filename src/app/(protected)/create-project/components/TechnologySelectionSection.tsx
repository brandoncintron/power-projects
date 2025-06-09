import React, { useState } from "react";

import { useFormContext } from "react-hook-form";

import { useScrollTo } from "@/components/nav/hooks/useScrollTo";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ProjectFormData } from "@/schema/projectFormSchema";

import { DatabaseSelection } from "@@/create-project/components/DatabaseSelection";
import { FrameworkSelection } from "@@/create-project/components/FrameworkSelection";

/**
 * Two-step technology selection:
 * Step 1: Framework selection with Next button
 * Step 2: Database selection with Back button and Submit
 */
export function TechnologySelectionSection() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProjectFormData>();
  const { scrollToSection } = useScrollTo();
  const [currentStep, setCurrentStep] = useState<"frameworks" | "databases">(
    "frameworks",
  );

  const applicationType = watch("applicationType");
  const frameworks = watch("frameworks") || [];
  const canProceedToDatabase = frameworks.length > 0;

  if (!applicationType) return null;

  const handleNext = () => {
    if (canProceedToDatabase) {
      setCurrentStep("databases");
      // Scroll to the top of this component
      scrollToSection({ sectionId: "tech-stack-selection" });
    }
  };

  const handleBack = () => {
    setCurrentStep("frameworks");
    // Scroll to the top of this component
    scrollToSection({ sectionId: "tech-stack-selection" });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6 space-x-4">
      <div className="flex items-center space-x-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "frameworks"
              ? "bg-primary text-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          1
        </div>
        <span
          className={`text-sm ${currentStep === "frameworks" ? "font-medium" : "text-muted-foreground"}`}
        >
          Frameworks
        </span>
      </div>

      <div
        className={`w-8 h-0.5 ${frameworks.length > 0 ? "bg-primary" : "bg-muted"}`}
      />

      <div className="flex items-center space-x-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === "databases"
              ? "bg-primary text-primary-foreground"
              : frameworks.length > 0
                ? "bg-muted-foreground text-background"
                : "bg-muted text-muted-foreground"
          }`}
        >
          2
        </div>
        <span
          className={`text-sm ${currentStep === "databases" ? "font-medium" : "text-muted-foreground"}`}
        >
          Databases
        </span>
      </div>
    </div>
  );

  const renderFrameworkStep = () => (
    <>
      <FrameworkSelection />

      {/* Navigation Buttons */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          type="button"
          onClick={handleNext}
          disabled={!canProceedToDatabase}
          className="px-8"
        >
          Next: Select Databases
        </Button>
      </div>
    </>
  );

  const renderDatabaseStep = () => (
    <>
      <DatabaseSelection />

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="px-8"
        >
          Back to Frameworks
        </Button>
        <Button type="submit" className="px-8">
          Create Project
        </Button>
      </div>
    </>
  );

  return (
    <FormField
      control={control}
      name="frameworks"
      render={() => (
        <FormItem className="space-y-3" id="tech-stack-selection">
          <FormLabel>
            Technology Stack Selection <span className="text-red-500">*</span>
          </FormLabel>
          <FormDescription>
            {currentStep === "frameworks"
              ? "Select the framework(s) or technology you plan to use."
              : "Choose the database(s) for your selected frameworks."}
          </FormDescription>
          <FormControl>
            <div className="border rounded-lg p-3 sm:p-4 md:p-6 bg-card space-y-6">
              {renderStepIndicator()}

              {currentStep === "frameworks"
                ? renderFrameworkStep()
                : renderDatabaseStep()}
            </div>
          </FormControl>

          {/* Validation error messages */}
          {(errors.frameworks || errors.databases) && (
            <p className="text-sm font-medium text-destructive mt-2">
              {String(errors.frameworks?.message) ||
                String(errors.databases?.message) ||
                "Please select at least one framework"}
            </p>
          )}
        </FormItem>
      )}
    />
  );
}
