import { useState } from "react";

import { useRouter } from "next/navigation";

import { useLoading } from "@/components/ui/loading-context";

import { ProjectWithDetails } from "@@/projects/types/types";

type ProjectAction = "close" | "delete";

/**
 * Hook to manage project card actions (edit, view, close, delete)
 * @param project The project to perform actions on
 * @returns Object containing action state and handlers
 */
export function useProjectActions(project: ProjectWithDetails) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState<ProjectAction>("delete");
  const router = useRouter();
  const { showLoading } = useLoading();

  // Project status
  const isProjectOpen = project.status === "OPEN";

  // Calculate member statistics for display
  const memberCount = (project._count?.collaborators ?? 0) + 1;
  const applicantCount = project._count?.applicants ?? 0;

  // Handle dropdown menu click to prevent default behavior
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Open confirmation dialog for various actions
  const openConfirmDialog = (actionType: ProjectAction) => () => {
    setCurrentAction(actionType);
    setShowConfirmDialog(true);
  };

  // Navigate to project detail page
  const navigateToProject = () => {
    showLoading("Loading project details...");
    router.push(`/projects/${project.id}`);
  };

  // Navigate to project edit page
  const navigateToEditProject = () => {
    showLoading("Loading edit page...");
    router.push(`/projects/${project.id}/edit`);
  };

  return {
    isProjectOpen,
    showConfirmDialog,
    setShowConfirmDialog,
    currentAction,
    memberCount,
    applicantCount,
    handleMenuClick,
    openConfirmDialog,
    navigateToProject,
    navigateToEditProject,
  };
}
