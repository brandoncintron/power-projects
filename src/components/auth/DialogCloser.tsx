"use client";

import { useEffect } from "react";
import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";

export function DialogCloser() {
  const { close } = useAuthDialog();
  
  useEffect(() => {
    // Close the auth dialog when this component mounts
    close();
  }, [close]);
  
  // This component doesn't render anything
  return null;
}