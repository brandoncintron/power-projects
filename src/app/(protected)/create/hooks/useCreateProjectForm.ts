"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { setToast } from "@/components/ShowToast";
import { useLoading } from "@/components/ui/loading-context";

import { createProject } from "../actions";
import { ProjectFormData, projectSchema } from "../schemas/project-schema";
import { UseCreateProjectFormReturn } from "../types/types";

export function useCreateProjectForm(): UseCreateProjectFormReturn {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [addDatabase, setAddDatabase] = React.useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      teamName: "",
      visibility: "PUBLIC",
      frameworks: [],
      databases: [],
      applicationType: "",
      githubRepoCreatedViaApp: false,
    },
  });

  const frameworks = form.watch("frameworks");
  const databases = form.watch("databases");

  async function onSubmit(data: ProjectFormData) {
    showLoading("Creating your project...");

    const response = await createProject(data);

    if (response?.error || !response?.project?.id) {
      hideLoading();
      toast.error(
        response?.error || "Failed to create project. Please try again.",
      );
    } else {
      setToast(
        "Project created successfully!",
        "success",
        `project-toast-${response.project.id}`,
      );
      router.push(`/projects/${response.project.id}`);
    }
  }

  const handleTabChange = (category: string) => {
    form.setValue("applicationType", category);
    form.setValue("frameworks", []);
    form.setValue("databases", []);
  };

  const onToggle = (name: string, field: "frameworks" | "databases") => {
    const currentValues = form.getValues(field) || [];
    const newValues = currentValues.includes(name)
      ? currentValues.filter((val) => val !== name)
      : [...currentValues, name];
    form.setValue(field, newValues, { shouldValidate: true });
  };

  const handleAddCustom = (
    field: "frameworks" | "databases",
    value: string,
  ) => {
    if (value.trim() === "") return;
    const currentValues = form.getValues(field) || [];
    if (!currentValues.includes(value.trim())) {
      const newValues = [...currentValues, value.trim()];
      form.setValue(field, newValues, { shouldValidate: true });
      form.trigger(field);
    } else {
      toast.error("This item has already been added.");
    }
  };

  const onRemove = (name: string, field: "frameworks" | "databases") => {
    const currentValues = form.getValues(field) || [];
    const newValues = currentValues.filter((val) => val !== name);
    form.setValue(field, newValues, { shouldValidate: true });

    form.trigger();
  };

  return {
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
  };
}
