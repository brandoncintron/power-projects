"use client"

import { useCallback } from 'react';

export function useScrollTo() {
  const scrollToSection = useCallback((sectionId: string, additionalOffset = 0) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const scrollOffset = 64 + additionalOffset; // Base navbar height + optional offset

      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - scrollOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
} 