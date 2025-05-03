import { useRef } from "react";

import { useInView } from "framer-motion";

/**
 * Hook to handle animation of items when they come into view
 * @param animationThreshold Amount of item that needs to be in view to trigger animation (0-1)
 * @param triggerOnce Whether to only trigger the animation once
 * @returns Object containing the ref and whether the item is in view
 */
export function useAnimatedItemsInView(
  animationThreshold: number = 0.2,
  triggerOnce: boolean = true,
) {
  const elementRef = useRef(null);
  const isElementInView = useInView(elementRef, {
    once: triggerOnce,
    amount: animationThreshold,
  });

  return {
    elementRef,
    isElementInView,
  };
}
