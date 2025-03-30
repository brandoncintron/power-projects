"use client";

import React, { useMemo, Suspense } from "react";
import { Form } from "@/components/ui/form";
import { ProjectInfoSection } from "./components/ProjectInfoSection";
import { ProjectSettingsSection } from "./components/ProjectSettingsSection";
import { ApplicationTypeSection } from "./components/ApplicationTypeSection";
import { TechnologySelectionSection } from "./components/TechStackSelection";
import { useProjectForm } from "./hooks/useProjectForm";

/**
 * Project Submission Page
 * Allows users to submit new projects with frameworks and databases
 * Form content gets sent to the useProjectForm hook
 */

export default function ProjectSubmissionPage() {
  // Use the useProjectForm hook to manage all form state and logic
  const {
    form,
    charCount,
    handleDescriptionChange,
    onSubmit,
    state,
    customFramework,
    customDatabase,
    customDatabases,
    setApplicationType,
    toggleFramework: rawToggleFramework,
    toggleDatabase: rawToggleDatabase,
    goToDatabaseStep,
    goToFrameworkStep,
    getCustomFrameworksData,
    getCustomDatabasesData,
    getDatabaseOptions: rawGetDbOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFrameworkSelected,
  } = useProjectForm();

  // Extract properties from technology selection state
  const { applicationType: selectedAppType, selectionStep } = state;

  // Get custom framework handlers
  const {
    setFrameworkName: setCustomFramework,
    addCustomFramework,
    removeCustomFramework,
  } = getCustomFrameworksData();

  // Get custom database handlers
  const {
    setDatabaseName: setCustomDatabase,
    addCustomDatabase,
    removeCustomDatabase,
  } = getCustomDatabasesData();

  // Memoize wrapper functions to prevent unnecessary re-renders
  const wrapperFunctions = useMemo(() => {
    // Wrapper functions for framework operations
    const toggleFramework = (framework: string) => {
      const frameworkObj = { name: framework, languages: [] };
      rawToggleFramework(frameworkObj);
    };

    // Wrapper for database operations
    const toggleDatabase = (database: string) => {
      const databaseObj = { name: database, description: "" };
      rawToggleDatabase(databaseObj);
    };

    // Wrapper for database options
    const getDbOptions = () => {
      const options = rawGetDbOptions();
      return options.flatMap((category) => category.databases);
    };

    return {
      toggleFramework,
      toggleDatabase,
      getDbOptions,
    };
  }, [rawToggleFramework, rawToggleDatabase, rawGetDbOptions]);

  return (
    <>
      <main>
        <div className="container px-4 sm:px-6 mx-auto py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Submit Your Project</h1>
            <p className="text-muted-foreground mb-8">
              Fields marked with <span className="text-red-500">*</span> are
              required.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Project Info (Name, Description, Team) */}
                <ProjectInfoSection
                  form={form}
                  charCount={charCount}
                  onDescriptionChange={handleDescriptionChange}
                />

                {/* Project Settings (Visibility, Completion Date) */}
                <ProjectSettingsSection form={form} />

                {/* Application Type Selection */}
                <ApplicationTypeSection
                  form={form}
                  onApplicationTypeChange={setApplicationType}
                />

                {/* Framework and Database Selection */}
                <Suspense
                  fallback={
                    <div className="p-4 border rounded-md mt-8">
                      <div className="h-40 flex items-center justify-center">
                        <p>Loading technology selection...</p>
                      </div>
                    </div>
                  }
                >
                  <TechnologySelectionSection
                    form={form}
                    selectedAppType={selectedAppType}
                    selectionStep={selectionStep}
                    customFramework={customFramework}
                    customDatabase={customDatabase}
                    customDatabases={customDatabases}
                    onCustomFrameworkChange={setCustomFramework}
                    onAddCustomFramework={addCustomFramework}
                    onRemoveCustomFramework={removeCustomFramework}
                    onToggleFramework={wrapperFunctions.toggleFramework}
                    onProceedToDatabase={goToDatabaseStep}
                    onCustomDatabaseChange={setCustomDatabase}
                    onAddCustomDatabase={addCustomDatabase}
                    onRemoveCustomDatabase={removeCustomDatabase}
                    onToggleDatabase={wrapperFunctions.toggleDatabase}
                    onBackToFrameworks={goToFrameworkStep}
                    getDbOptions={wrapperFunctions.getDbOptions}
                    onSubmit={onSubmit}
                  />
                </Suspense>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
