"use client";

import { useEffect, useState } from "react";

import {
  ScrollDetectionProps,
  ScrollDetectionResult,
} from "@/components/nav/types/types";

/**
 * useScrollDetection - Custom hook to detect when page has been scrolled
 *
 * This hook monitors the window's scroll position and provides a boolean state
 * that indicates whether the user has scrolled past a specified threshold.
 * Useful for implementing features like sticky headers, scroll-to-top buttons,
 * or any UI element that should appear or change based on scroll position.
 *
 * @param {number} threshold - The scroll position (in pixels) that triggers the scrolled state (default: 0)
 * @returns {Object} An object containing the scrolled state boolean
 */
export const useScrollDetection = ({
  threshold = 0,
}: ScrollDetectionProps = {}): ScrollDetectionResult => {
  // State to track whether the page has been scrolled beyond the threshold
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /**
     * Handler for the scroll event
     * Updates the scrolled state based on the current scroll position
     * compared to the specified threshold
     */
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { scrolled };
};
