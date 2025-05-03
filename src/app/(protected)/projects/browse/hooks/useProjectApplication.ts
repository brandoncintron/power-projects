import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { handleProjectApplication } from "../actions";

/**
 * Hook to manage project application submission process
 * @param initialApplicationStatus Whether the user has already applied
 * @returns Object containing application state and submission handler
 */
export function useProjectApplication(
  initialApplicationStatus: boolean = false,
) {
  const [isPendingTransition, startTransition] = useTransition();
  const [hasApplied, setHasApplied] = useState(initialApplicationStatus);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const router = useRouter();

  /**
   * Submit an application to a project
   * @param projectId The ID of the project to apply to
   */
  const submitApplication = async (projectId: string) => {
    // Prevent multiple submissions
    if (isSubmittingApplication) return;

    // Set loading state
    setIsSubmittingApplication(true);

    startTransition(() => {
      handleProjectApplication(projectId)
        .then((response) => {
          if (response?.error) {
            // Show error toast immediately on error
            toast.error(response.error);
            setIsSubmittingApplication(false);
          } else {
            // Add deliberate delay for better UX
            setTimeout(() => {
              toast.success("Application submitted successfully.");
              setHasApplied(true);
              setIsSubmittingApplication(false);
              router.refresh();
            }, 1000);
          }
        })
        .catch((error) => {
          // Handle unexpected errors
          console.error("Application submission failed:", error);
          setIsSubmittingApplication(false);
          toast.error("Failed to submit application. Please try again.");
        });
    });
  };

  // Combined loading state for UI
  const isLoading = isPendingTransition || isSubmittingApplication;

  return {
    hasApplied,
    isLoading,
    submitApplication,
  };
}
