import { useState } from "react";

import { toast } from "sonner";

import { useLoading } from "@/components/ui/loading-context";

import { closeProject, deleteProject } from "@@/projects/my-projects/actions";
import { ProjectWithDetails } from "@@/projects/types/types";

type ActionType = "close" | "delete";

interface ActionConfig {
  title: string;
  description: string;
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
  buttonText: string;
  processingText: string;
}

/**
 * Hook to manage project confirmation actions (close/delete)
 * @param project The project to perform actions on
 * @param actionType The type of action to perform
 * @param onSuccess Optional callback when action is successful
 * @returns Object containing confirmation state and handlers
 */
export function useConfirmAction(
  project: ProjectWithDetails,
  actionType: ActionType,
  onSuccess?: () => void,
) {
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const { showLoading } = useLoading();

  // Determine if action is delete or close
  const isDeleteAction = actionType === "delete";

  // Build UI configuration based on action type
  const actionConfig: ActionConfig = {
    title: isDeleteAction ? "Delete Project" : "Close Project",
    description: isDeleteAction
      ? `Are you sure you want to delete "${project.projectName}"? This action cannot be undone and will permanently remove the project, all applications, and collaborator associations.`
      : `Are you sure you want to close "${project.projectName}"? This will mark the project as closed and prevent any new applications.`,
    loadingMessage: isDeleteAction
      ? "Deleting project..."
      : "Closing project...",
    successMessage: isDeleteAction
      ? "Project deleted successfully"
      : "Project closed successfully",
    errorMessage: isDeleteAction
      ? "Failed to delete project"
      : "Failed to close project",
    buttonText: isDeleteAction ? "Delete Project" : "Close Project",
    processingText: isDeleteAction ? "Deleting..." : "Closing...",
  };

  /**
   * Handle the confirm action (close or delete)
   */
  const handleConfirmAction = async () => {
    try {
      setIsProcessingAction(true);
      showLoading(actionConfig.loadingMessage);

      const result = isDeleteAction
        ? await deleteProject(project.id)
        : await closeProject(project.id);

      if (result.success) {
        toast.success(actionConfig.successMessage);
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.reload();
        }
      } else {
        setIsProcessingAction(false);
        toast.error(result.error || actionConfig.errorMessage);
      }
    } catch (error) {
      setIsProcessingAction(false);
      toast.error(
        `An error occurred while ${isDeleteAction ? "deleting" : "closing"} the project`,
      );
      console.error(error);
    }
  };

  return {
    isProcessingAction,
    actionConfig,
    handleConfirmAction,
  };
}
