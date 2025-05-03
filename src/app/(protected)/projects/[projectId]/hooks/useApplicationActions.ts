import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  acceptProjectApplication,
  denyProjectApplication,
} from "@@/projects/[projectId]/actions";

type ActionState = {
  [key: string]: { accept?: boolean; deny?: boolean };
};

type CompletedActions = {
  [key: string]: "accepted" | "rejected";
};

/**
 * Hook to manage project application actions (accept/deny)
 * @param projectId The ID of the project
 * @returns Object containing application action state and handlers
 */
export function useApplicationActions(projectId: string) {
  const [pendingActions, setPendingActions] = useState<ActionState>({});
  const [completedActions, setCompletedActions] = useState<CompletedActions>(
    {},
  );
  const router = useRouter();

  const onAccept = async (userId: string) => {
    try {
      setPendingActions((prev) => ({
        ...prev,
        [userId]: { ...prev[userId], accept: true },
      }));

      const result = await acceptProjectApplication(projectId, userId);

      if (result.success) {
        setCompletedActions((prev) => ({ ...prev, [userId]: "accepted" }));
        toast.success("Application accepted successfully");

        // Allow UI to update before refreshing
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        toast.error(result.error || "Failed to accept application");
        console.error("Error accepting application:", result.error);
      }
    } catch (error) {
      console.error("Failed to accept application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setPendingActions((prev) => ({
        ...prev,
        [userId]: { ...prev[userId], accept: false },
      }));
    }
  };

  const onDeny = async (userId: string) => {
    try {
      setPendingActions((prev) => ({
        ...prev,
        [userId]: { ...prev[userId], deny: true },
      }));

      const result = await denyProjectApplication(projectId, userId);

      if (result.success) {
        setCompletedActions((prev) => ({ ...prev, [userId]: "rejected" }));
        toast.success("Application rejected");

        // Allow UI to update before refreshing
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        toast.error(result.error || "Failed to reject application");
        console.error("Error rejecting application:", result.error);
      }
    } catch (error) {
      console.error("Failed to reject application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setPendingActions((prev) => ({
        ...prev,
        [userId]: { ...prev[userId], deny: false },
      }));
    }
  };

  // Filter applicants that have been acted upon
  const filterPendingApplicants = <T extends { userId: string }>(
    applicants: T[],
  ) => {
    return applicants.filter(
      (applicant) => !completedActions[applicant.userId],
    );
  };

  return {
    pendingActions,
    completedActions,
    onAccept,
    onDeny,
    filterPendingApplicants,
  };
}
