'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LuLoader } from 'react-icons/lu'

interface LoadingScreenProps {
  /**
   * Show or hide the loading screen
   */
  isLoading?: boolean
  /**
   * Text to display while loading
   */
  text?: string
  /**
   * Z-index to control stacking context (default: 50)
   */
  zIndex?: number
}

/**
 * Universal loading screen component with animation
 */
export function LoadingScreen({
  isLoading = true,
  text = 'Loading...',
  zIndex = 50,
}: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm'
          )}
          style={{ zIndex }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-16 h-16"
            >
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
              <div className="absolute inset-3 rounded-full border-t-2 border-primary/70 animate-spin-slow" />
            </motion.div>
            
            {text && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium text-foreground/80"
              >
                {text}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * A simpler loading spinner component for in-page loading states
 */
export function LoadingSpinner({ className, text }: { className?: string, text?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <LuLoader className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Loading {text}...</span>
    </div>
  )
} 