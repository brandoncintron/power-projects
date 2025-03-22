"use client"

import { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * useScrollTo - Custom hook for smooth scrolling to page sections
 * 
 * This hook provides functionality to smoothly scroll to specific sections of a page
 * either directly or after navigation from another page. It handles:
 * 
 * 1. Direct in-page scrolling to elements by ID
 * 2. Scrolling with URL parameters (for cross-page navigation)
 * 3. Hash-based navigation (#section)
 * 
 * @returns {Object} An object containing the scrollToSection function
 */
export function useScrollTo() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  /**
   * Scrolls the window to a specific section identified by its ID
   * 
   * @param {string} sectionId - The ID of the element to scroll to
   * @param {number} additionalOffset - Optional extra offset (in pixels) to add to the base navbar height
   */
  const scrollToSection = useCallback((sectionId: string, additionalOffset = 0) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const scrollOffset = 64 + additionalOffset; // Base navbar height + optional offset for other components

      // Calculate the position accounting for scroll and offset
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - scrollOffset;

      // Perform the smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  /**
   * Effect to handle scroll behavior when the page loads
   * This is particularly important for cross-page navigation
   */
  useEffect(() => {
    // Only apply scroll behavior on home pages
    if (pathname === '/' || pathname === '/home') {
      // Check if this is a navigation from another page with section target
      const fromNavigation = searchParams.get('fromNavigation');
      const targetSection = searchParams.get('section');
      
      if (fromNavigation === 'true' && targetSection) {
        // First scroll to top instantly to provide better UX
        window.scrollTo(0, 0);
        
        // Then scroll to the target section after a short delay
        // The delay ensures the page has time to fully render
        setTimeout(() => {
          const section = document.getElementById(targetSection);
          if (section) {
            const scrollOffset = 64; // Base navbar height
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - scrollOffset;
            
            // Perform smooth scroll to the target section
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 300); // Slight delay for better visual transition
      } else {
        // Handle regular hash-based navigation (#section)
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          scrollToSection(hash);
        }
      }
    }
  }, [pathname, searchParams, scrollToSection]);

  return { scrollToSection };
} 