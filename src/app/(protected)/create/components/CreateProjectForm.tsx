"use client";

import React from "react";

import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useCreateProjectForm } from "../hooks/useCreateProjectForm";
import { DatabaseSelection } from "./DatabaseSelection";
import { ProjectDetailsSection } from "./ProjectDetailsSection";
import { ProjectSettingsSection } from "./ProjectSettingsSection";
import { TechnologySelection } from "./TechnologySelection";

export function CreateProjectForm() {
  const {
    form,
    addDatabase,
    setAddDatabase,
    frameworks,
    databases,
    onSubmit,
    handleTabChange,
    onToggle,
    handleAddCustom,
    onRemove,
  } = useCreateProjectForm();

  return (
    <FormProvider {...form}>
      <TooltipProvider>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ProjectDetailsSection />
            <ProjectSettingsSection />
            <TechnologySelection
              form={form}
              frameworks={frameworks}
              handleTabChange={handleTabChange}
              onToggle={onToggle}
              handleAddCustom={handleAddCustom}
              onRemove={onRemove}
            />

            {frameworks.length > 0 && (
              <DatabaseSelection
                form={form}
                addDatabase={addDatabase}
                setAddDatabase={setAddDatabase}
                databases={databases}
                onToggle={onToggle}
                handleAddCustom={handleAddCustom}
                onRemove={onRemove}
              />
            )}

            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting ||
                frameworks.length === 0 ||
                (addDatabase && databases.length === 0)
              }
              className="w-full"
            >
              {form.formState.isSubmitting
                ? "Creating Project..."
                : "Create Project"}
            </Button>
          </form>
        </Form>
      </TooltipProvider>
    </FormProvider>
  );
}
