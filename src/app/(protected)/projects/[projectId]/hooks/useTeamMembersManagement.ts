import { useState } from "react";

import { Collaborator } from "@@/projects/types/types";

/**
 * Hook to manage team members, specifically for removing collaborators
 * @returns Object containing state and handlers for team member management
 */
export function useTeamMembersManagement() {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Collaborator | null>(null);
  const [removedCollaboratorIds, setRemovedCollaboratorIds] = useState<
    string[]
  >([]);
  const [pendingRemovalIds, setPendingRemovalIds] = useState<string[]>([]);

  const handleRemoveClick = (
    collaborator: Collaborator,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCollaborator(collaborator);
    setShowRemoveDialog(true);
  };

  const handleRemoveSuccess = (userId: string) => {
    setRemovedCollaboratorIds((prev) => [...prev, userId]);
  };

  const handleRemovePending = (userId: string, isPending: boolean) => {
    setPendingRemovalIds((prev) =>
      isPending ? [...prev, userId] : prev.filter((id) => id !== userId),
    );
  };

  // Filter out collaborators that have been removed
  const filterCollaborators = (collaborators: Collaborator[]) => {
    return collaborators.filter(
      (collaborator) => !removedCollaboratorIds.includes(collaborator.userId),
    );
  };

  return {
    showRemoveDialog,
    setShowRemoveDialog,
    selectedCollaborator,
    setSelectedCollaborator,
    removedCollaboratorIds,
    pendingRemovalIds,
    handleRemoveClick,
    handleRemoveSuccess,
    handleRemovePending,
    filterCollaborators,
  };
}
