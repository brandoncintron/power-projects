"use client";

import React from "react";

import { FormProvider } from "react-hook-form";

import { HideLoading } from "@/components/HideLoading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ApplicationTypeDropdown } from "./components/ApplicationTypeDropdown";
import { CompletionDateField } from "./components/CompletionDateField";
import { GitHubRepositoryField } from "./components/GitHubRepositoryField";
import { ProjectDescriptionField } from "./components/ProjectDescriptionField";
import { ProjectNameField } from "./components/ProjectNameField";
import { TeamNameField } from "./components/TeamNameField";
import { TechnologySelectionSection } from "./components/TechnologySelectionSection";
import { VisibilitySelection } from "./components/VisibilitySelection";
import { useCreateProjectForm } from "./hooks/useCreateProjectForm";

export default function ProjectSubmissionPage() {
  const { form, onSubmit } = useCreateProjectForm();

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

          <FormProvider {...form}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <GitHubRepositoryField />
                <ProjectNameField />
                <ProjectDescriptionField />
                <TeamNameField />
                <VisibilitySelection />
                <CompletionDateField />
                <ApplicationTypeDropdown />
                <TechnologySelectionSection />

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t">
                  <Button
                    type="submit"
                    className="px-8"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Creating Project..."
                      : "Create Project"}
                  </Button>
                </div>
              </form>
            </Form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
