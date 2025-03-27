"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthDialog } from "@/hooks/useAuthDialog";

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open } = useAuthDialog();
  
  useEffect(() => {
    const error = searchParams.get("error");
    
    // Handle different error types
    if (error === "OAuthAccountNotLinked") {
      open("signin", "Email has already been used with a different provider. Please sign in using the original provider.");
      router.replace("/");
    } else if (error) {
      // Handle other auth errors
      open("signin", "An authentication error occurred. Please try again.");
      router.replace("/");
    } else {
      // No error, redirect to home
      router.replace("/");
    }
  }, [searchParams, open, router]);
  
  // This page renders nothing as it just handles redirects
  return null;
} 