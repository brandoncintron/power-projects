import * as React from "react"

// Mobile breakpoint in pixels - screen widths below this are considered mobile
const MOBILE_BREAKPOINT = 1024

/**
 * useIsMobile - Custom hook to detect if the current viewport is mobile
 * 
 * This hook uses the MediaQueryList API to detect if the current viewport width
 * is below the defined mobile breakpoint (1024px). It also listens for window resize
 * events to update the state when the viewport changes between mobile and desktop.
 * 
 * The hook returns undefined initially (during SSR) and then updates with the
 * correct value once mounted in the browser.
 * 
 * @returns {boolean} true if the viewport is mobile width, false otherwise
 */
export function useIsMobile() {
  // Initialize state as undefined to prevent hydration issues with SSR
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create a media query list for the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    /**
     * Handler for media query changes
     * Updates the isMobile state based on current viewport width
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for responsive layout changes
    mql.addEventListener("change", onChange)
    
    // Set initial value based on current viewport
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Clean up event listener when component unmounts
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return the mobile state, coerced to boolean (false instead of undefined)
  return !!isMobile
}
