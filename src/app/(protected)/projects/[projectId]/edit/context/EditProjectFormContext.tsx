"use client";

import React, { createContext, ReactNode, useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProject } from "@/actions/updateProject";
import { setToast } from "@/components/ShowToast";
import { useLoading } from "@/components/ui/loading-context";
import {
  editProjectSchema,
  EditProjectSchema,
} from "@/schema/editProjectSchema";

// Context interface
interface EditProjectFormContextType {
  form: ReturnType<typeof useForm<EditProjectSchema>>;
  charCount: number;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (values: EditProjectSchema) => void;
  isSubmitting: boolean;
}

export const EditProjectFormContext = createContext<
  EditProjectFormContextType | undefined
>(undefined);

interface EditProjectFormProviderProps {
  children: ReactNode;
  projectId: string;
  initialProjectName: string;
  initialDescription: string | null;
  initialCompletionDate: Date | null;
}

// Provider component
export function EditProjectFormProvider({
  children,
  projectId,
  initialProjectName,
  initialDescription,
  initialCompletionDate,
}: EditProjectFormProviderProps) {
  const router = useRouter();
  const [charCount, setCharCount] = useState(initialDescription?.length || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showLoading } = useLoading();

  // Initialize form with project data
  const form = useForm<EditProjectSchema>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      projectName: initialProjectName,
      description: initialDescription || "",
      completionDate: initialCompletionDate || undefined,
    },
  });

  // Description character count handler
  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
    },
    [],
  );

  // Form submission handler
  const onSubmit = useCallback(
    async (values: EditProjectSchema) => {
      setIsSubmitting(true);
      showLoading("Updating project...");

      try {
        const result = await updateProject(projectId, values);

        if (result.success) {
          setToast("Project updated successfully!", "success", "projectToast");
          router.push(`/projects/${projectId}`);
        } else {
          toast.error("Update failed", {
            description: result.error,
          });
        }
      } catch (error) {
        console.error("Project update failed:", error);
        toast.error("Update failed", {
          description:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [projectId, router, showLoading],
  );

  // Context value
  const value = {
    form,
    charCount,
    handleDescriptionChange,
    onSubmit,
    isSubmitting,
  };

  return (
    <EditProjectFormContext.Provider value={value}>
      {children}
    </EditProjectFormContext.Provider>
  );
}
