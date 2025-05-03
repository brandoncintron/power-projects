"use client";

import { useEffect } from "react";

import { useLoading } from "@/components/ui/loading-context";

/**
 * Allows Server Components to hide the global
 * loading indicator on page load.
 * It renders nothing itself.
 */

export function HideLoading() {
  const { hideLoading } = useLoading();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    hideLoading();
  }, []);

  return null;
}
