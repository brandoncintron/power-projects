"use client"

import { useCallback } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { useScrollTo } from "./useScrollTo";

/**
 * useNavigation - Custom hook for navigation between sections
 * 
 * This hook provides functionality to handle navigation between sections,
 * either by scrolling to a section while on the home page or navigating from another
 * page with a section reference, and then scrolling to that section.
 * 
 * @returns {Object} An object containing the handleNavigation function
 */
export function useNavigation() {
  const { scrollToSection } = useScrollTo(); // Scroll to a part on the page
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Router for navigation

  /**
   * Handles navigation for section links
   * If on the home page, scrolls to the section
   * If on another page, navigates to home with the section reference
   * 
   * @param {string} sectionId - The ID of the section to navigate to
   */
  const handleNavigation = useCallback((sectionId: string) => {
    if (pathname === "/") {
      // If on home page, just scroll
      scrollToSection(sectionId);
    } else {
      // If on another page, navigate to home with hash and fromNavigation flag
      router.push(`/?fromNavigation=true&section=${sectionId}`);
    }
  }, [pathname, router, scrollToSection]);

  return { handleNavigation };
} 