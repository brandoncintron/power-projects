"use client";

import { useCallback } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useScrollTo } from "@/components/nav/hooks/useScrollTo";

/**
 * Decides whether to scroll directly to a section or
 * navigate to another page before scrolling.
 */
export function useNavigation() {
  const { scrollToSection } = useScrollTo(); // Scroll to a part on the page
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Router for navigation

  const handleNavigation = useCallback(
    (sectionId: string) => {
      if (pathname === "/") {
        // If on home page, just scroll
        scrollToSection({ sectionId });
      } else {
        // If on another page, navigate to home first and add the URL params
        router.push(`/?fromNavigation=true&section=${sectionId}`);
      }
    },
    [pathname, router, scrollToSection],
  );

  return { handleNavigation };
}
