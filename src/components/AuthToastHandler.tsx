"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthDialog } from "@/hooks/useAuthDialog";

/**
 * Component that checks for auth-required header and shows a toast notification
 * when a user attempts to access a protected route without being authenticated.
 * Provides a "Sign In" button that opens the AuthDialog.
 */

const AuthToastHandler = () => {
  const router = useRouter();
  const { open, isOpen } = useAuthDialog();
  // Track if we've already shown a toast to prevent multiple toasts
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    // Function to check response headers
    const checkResponseHeaders = () => {
      // Create a new XMLHttpRequest to check headers
      const xhr = new XMLHttpRequest();
      
      // Configure to check headers only using HEAD request
      xhr.open("HEAD", window.location.href, true);
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          // Check if the auth-required header is present
          const authRequired = xhr.getResponseHeader("x-auth-required");
          
          // Only show toast if:
          // 1. The auth-required header is present
          // 2. We haven't shown a toast yet
          // 3. The auth dialog isn't already open
          if (authRequired === "true" && !hasShownToast && !isOpen) {
            setHasShownToast(true);
            toast.error("You need to be signed in to access this page.", {
              duration: 5000,
              position: "bottom-right",
              action: {
                label: "Sign In",
                // Open the auth dialog instead of redirecting to signin page
                onClick: () => open("signin")
              }
            });
          }
        }
      };
      
      xhr.send();
    };

    checkResponseHeaders();
    // Include all dependencies to ensure the effect runs when they change
  }, [router, open, isOpen, hasShownToast]);

  return null;
};

export default AuthToastHandler; 