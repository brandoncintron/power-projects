"use client";

import { useCallback, useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { NavigationProps } from "@/components/nav/types/types";

/**
 * Manages the mechanics of scrolling, including calculating offsets and handling
 * scroll triggers upon page load or navigation.
 */
export function useScrollTo() {
  // Get the current URL pathname (e.g., '/', '/about')
  const pathname = usePathname();
  // Get the current URL search parameters (e.g., '?section=features')
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Scrolls the window smoothly to a specific section identified by its ID.
   * Accounts for a base offset (e.g., navbar height) and an optional additional offset.
   */
  const scrollToSection = useCallback(
    ({ sectionId, additionalOffset = 0 }: NavigationProps) => {
      // Find the target element in the DOM
      const section = document.getElementById(sectionId);
      if (section) {
        // Define the base offset (height of the navbar)
        const baseOffset = 64;
        // Add up the total offset
        const scrollOffset = baseOffset + additionalOffset;

        // Calculate the target scroll position
        const elementPosition =
          section.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - scrollOffset;

        // Perform the smooth scroll animation to the calculated position
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    [],
  );

  /**
   * Effect hook to handle scroll behavior when the page loads and user comes from a different page.
   */
  useEffect(() => {
    // Only apply this automatic scroll behavior on home page for now
    // If I need to add scrolling from another page functionality, add the pathname below
    if (pathname === "/") {
      const fromNavigation = searchParams.get("fromNavigation"); // Flag indicating cross-page nav
      const targetSection = searchParams.get("section"); // The ID of the target section

      if (fromNavigation === "true" && targetSection) {
        // If a user comes in from another page and needs to scroll to something, do this:

        // Instantly scroll to the top on page load for better UX
        window.scrollTo(0, 0);

        // Short delay before scrolling to the target section for better UX
        const scrollDelay = 300;
        setTimeout(() => {
          // Get the section to scroll to if it exists
          const section = document.getElementById(targetSection);
          if (section) {
            // Calculate the scroll offset (only base navbar height needed here)
            const scrollOffset = 64;
            const elementPosition =
              section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - scrollOffset;

            // Perform the smooth scroll to the target section
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, scrollDelay);

        router.replace("/");
      } else {
        // If the user is on the current page, just scroll to that section instead
        const hash = window.location.hash.replace("#", ""); // Get the hash(section id) value without the '#'
        if (hash) {
          scrollToSection({ sectionId: hash });
        }
      }
    }
  }, [pathname, searchParams, scrollToSection, router]);

  return { scrollToSection };
}
