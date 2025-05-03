import { useEffect, useState } from "react";

/**
 * Hook to manage display count based on screen size
 * @param defaultLargeCount Number of items to display on large screens (>1536px)
 * @param defaultSmallCount Number of items to display on smaller screens
 * @returns The current display count based on screen size
 */
export function useDisplayCount(
  defaultLargeCount = 3,
  defaultSmallCount = 2,
): number {
  const [displayCount, setDisplayCount] = useState(defaultSmallCount);

  useEffect(() => {
    // Check if screen is larger than 1536px (2xl breakpoint)
    const handleResize = () => {
      setDisplayCount(
        window.innerWidth > 1536 ? defaultLargeCount : defaultSmallCount,
      );
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, [defaultLargeCount, defaultSmallCount]);

  return displayCount;
}
