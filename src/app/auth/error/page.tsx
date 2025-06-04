"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Simply redirect to home page - the AuthDialog component will handle displaying errors
    router.replace("/");
  }, [router]);

  // This page renders nothing as it just handles redirects
  return null;
}
