"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning";

type ToastStorage = {
  type: ToastType;
  message: string;
};

interface ShowToastProps {
  /**
   * Storage key to check for toast data
   * @default 'toastStatus'
   */
  storageKey?: string;
}

export function ShowToast({ storageKey = 'toastStatus' }: ShowToastProps) {
  useEffect(() => {
    // Check sessionStorage when the component mounts
    const storedToast = sessionStorage.getItem(storageKey);
    
    if (storedToast) {
      try {
        // Try to parse the stored data as JSON
        const toastData = JSON.parse(storedToast) as ToastStorage;
        
        // Show the appropriate toast based on type
        switch (toastData.type) {
          case 'success':
            toast.success(toastData.message);
            break;
          case 'error':
            toast.error(toastData.message);
            break;
          case 'warning':
            toast.warning(toastData.message);
            break;
          case 'info':
          default:
            toast.info(toastData.message);
            break;
        }
      } catch (e) {
        console.error("Error parsing toast data:", e);
        // Fallback for when the stored value is just a string (for backward compatibility)
        if (storedToast === 'success') {
          toast.success('Operation completed successfully!');
        }
      }
      
      // Remove the toast data from storage
      sessionStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  return null;
}

/**
 * Helper function to set toast data in sessionStorage
 */
export function setToast(message: string, type: ToastType = 'success', key: string = 'toastStatus') {
  const toastData: ToastStorage = { type, message };
  sessionStorage.setItem(key, JSON.stringify(toastData));
}