"use client";

import { useEffect } from "react";
import { useAuthDialog } from "@/hooks/useAuthDialog";

/**
 * Component that automatically closes the authentication dialog
 * when the dashboard page loads. This ensures the dialog is closed
 * after successful sign-in when redirected to the dashboard.
 */
export default function DashboardAuthDialogCloser() {
  const { close } = useAuthDialog();
  
  useEffect(() => {
    // Close the auth dialog when this component mounts
    close();
  }, [close]);
  
  // This component doesn't render anything visible
  return null;
} 