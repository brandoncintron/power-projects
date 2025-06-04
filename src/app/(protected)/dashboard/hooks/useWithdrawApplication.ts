import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { handleWithdrawApplication } from "@@/dashboard/actions";

/**
 * Hook to manage the withdrawal of a project application
 * @returns Object containing withdrawal states and handler function
 */
export function useWithdrawApplication() {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [hasWithdrawn, setHasWithdrawn] = useState(false);
  const router = useRouter();

  const withdrawApplication = async (projectId: string) => {
    // Prevent multiple submissions
    if (isWithdrawing) return;

    // Set withdrawing state to show loading indicator right away
    setIsWithdrawing(true);

    try {
      const result = await handleWithdrawApplication(projectId);

      if (result.success) {
        // Add a 1000ms delay before showing success state and toast
        setTimeout(() => {
          toast.success("Application withdrawn successfully");
          setHasWithdrawn(true);
          setIsWithdrawing(false);
          router.refresh();
        }, 1000);
      } else {
        // Show error toast immediately
        toast.error(result.error || "Failed to withdraw application");
        setIsWithdrawing(false);
      }
    } catch (error) {
      console.error("Failed to withdraw application:", error);
      toast.error("An unexpected error occurred");
      setIsWithdrawing(false);
    }
  };

  return {
    isWithdrawing,
    hasWithdrawn,
    withdrawApplication,
  };
}
