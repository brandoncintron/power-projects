import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { removeCollaborator } from "@@/projects/[projectId]/actions";

/**
 * Hook to handle removing a collaborator from a project
 * @param projectId The ID of the project
 * @param onSuccess Optional callback when removal is successful
 * @param onPendingChange Optional callback for pending state changes
 * @returns Object containing remove collaborator state and handler
 */
export function useRemoveCollaborator(
  projectId: string,
  onSuccess?: () => void,
  onPendingChange?: (isPending: boolean) => void,
) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();

  const handleRemoveCollaborator = async (userId: string) => {
    if (!projectId || !userId) return;

    try {
      setIsRemoving(true);
      if (onPendingChange) onPendingChange(true);

      const result = await removeCollaborator(projectId, userId);

      if (result.success) {
        toast.success("Collaborator removed successfully");
        if (onSuccess) {
          onSuccess();
        }

        // Allow UI to update before refreshing
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        toast.error(result.error || "Failed to remove collaborator");
      }
    } catch (error) {
      console.error("Failed to remove collaborator:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsRemoving(false);
      if (onPendingChange) onPendingChange(false);
    }
  };

  return {
    isRemoving,
    handleRemoveCollaborator,
  };
}
