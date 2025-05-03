"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { LuLoader } from "react-icons/lu";

import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  /**
   * Show or hide the loading screen
   */
  isLoading?: boolean;
  /**
   * Text to display while loading
   */
  text?: string;
  /**
   * Z-index to control stacking context (default: 50)
   */
  zIndex?: number;
}

/**
 * Universal loading screen component with animation
 */
export function LoadingScreen({
  isLoading = true,
  text = "Loading...",
  zIndex = 50,
}: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "lg:ml-[250px] fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 backdrop-blur-sm",
          )}
          style={{ zIndex }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  className="h-4 w-4 rounded-full bg-primary"
                />
              ))}
            </div>

            {text && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <p className="text-xl font-medium text-foreground">{text}</p>
                <motion.div
                  className="h-0.5 bg-primary mt-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A simpler loading spinner component for in-page loading states
 */
export function LoadingSpinner({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <LuLoader className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Loading {text}...</span>
    </div>
  );
}
