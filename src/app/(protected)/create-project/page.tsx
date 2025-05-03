"use client";

import React from "react";

import { HideLoading } from "@/components/HideLoading";
import { Form } from "@/components/ui/form";

import { ApplicationTypeDropdown } from "./components/ApplicationTypeDropdown";
import { CompletionDateField } from "./components/CompletionDateField";
import { ProjectDescriptionField } from "./components/ProjectDescriptionField";
import { ProjectNameField } from "./components/ProjectNameField";
import { TeamNameField } from "./components/TeamNameField";
import { TechnologySelectionSection } from "./components/TechnologySelectionSection";
import { VisibilitySelection } from "./components/VisibilitySelection";
import { ProjectFormProvider } from "./context/ProjectFormContext";
import { useProjectForm } from "./hooks/useProjectForm";

/**
 * Project Submission Page:
 * Uses ProjectFormProvider to manage all form state and logic
 * Components access the form context directly instead of through props
 */
export default function ProjectSubmissionPage() {
  return (
    <ProjectFormProvider>
      <ProjectSubmissionForm />
    </ProjectFormProvider>
  );
}

// Separated form component to allow ProjectFormProvider to wrap it
function ProjectSubmissionForm() {
  const { form, onSubmit } = useProjectForm();

  return (
    <main>
      <HideLoading />
      <div className="container px-4 sm:px-6 mx-auto py-10 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create Project</h1>
          <p className="text-muted-foreground mb-8">
            Fields marked with <span className="text-red-500">*</span> are
            required.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ProjectNameField />
              <ProjectDescriptionField />
              <TeamNameField />
              <VisibilitySelection />
              <CompletionDateField />
              <ApplicationTypeDropdown />
              <TechnologySelectionSection />
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
