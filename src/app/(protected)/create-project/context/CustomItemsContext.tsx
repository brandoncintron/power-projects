import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useFormCore } from "./FormCoreContext";
import { toast } from "sonner";

// Context interface
interface CustomItemsContextType {
  // Custom frameworks
  customFramework: string;
  setCustomFramework: (value: string) => void;
  addCustomFramework: () => void;
  removeCustomFramework: (name: string) => void;
  
  // Custom databases
  customDatabase: string;
  setCustomDatabase: (value: string) => void;
  addCustomDatabase: () => void;
  removeCustomDatabase: (name: string) => void;
  customDatabases: string[];
  
  // Reset
  resetCustomItems: () => void;
}

// Create context with default values
const CustomItemsContext = createContext<CustomItemsContextType | undefined>(undefined);

// Provider props
interface CustomItemsProviderProps {
  children: ReactNode;
}

// Maximum allowed custom items
const MAX_CUSTOM_ITEMS = 3;

// Provider component
export function CustomItemsProvider({ children }: CustomItemsProviderProps) {
  const { form } = useFormCore();
  
  // Custom items state
  const [customFramework, setCustomFramework] = useState("");
  const [customDatabase, setCustomDatabase] = useState("");
  const [customDatabases, setCustomDatabases] = useState<string[]>([]);
  
  // Custom framework handling
  const addCustomFramework = useCallback(() => {
    if (!customFramework.trim()) return;
    
    const newFramework = customFramework.trim();
    const currentFrameworks = form.watch("frameworks") || [];
    
    // Note: We're not enforcing the limit here since the UI component will handle it
    // This is because we can't reliably determine custom vs predefined frameworks here
    
    // Avoid duplicates
    if (currentFrameworks.includes(newFramework)) {
      toast.error("This framework is already added.");
      return;
    }
    
    form.setValue("frameworks", [...currentFrameworks, newFramework]);
    setCustomFramework("");
    
    // Clear errors when a framework is added
    form.clearErrors("frameworks");
  }, [customFramework, form]);
  
  const removeCustomFramework = useCallback((name: string) => {
    const currentFrameworks = form.watch("frameworks") || [];
    form.setValue(
      "frameworks",
      currentFrameworks.filter((fw) => fw !== name)
    );
  }, [form]);
  
  // Custom database handling
  const addCustomDatabase = useCallback(() => {
    if (!customDatabase.trim()) return;
    
    const newDatabase = customDatabase.trim();
    const currentDatabases = form.watch("databases") || [];
    
    // Check if limit reached
    if (customDatabases.length >= MAX_CUSTOM_ITEMS) {
      toast.error(`Maximum of ${MAX_CUSTOM_ITEMS} custom databases allowed.`);
      return;
    }
    
    // Avoid duplicates
    if (currentDatabases.includes(newDatabase)) {
      toast.error("This database is already added.");
      return;
    }
    
    form.setValue("databases", [...currentDatabases, newDatabase]);
    setCustomDatabase("");
    setCustomDatabases([...customDatabases, newDatabase]);
    
    // Clear errors when a database is added
    form.clearErrors("databases");
  }, [customDatabase, form, customDatabases]);
  
  const removeCustomDatabase = useCallback((name: string) => {
    const currentDatabases = form.watch("databases") || [];
    form.setValue(
      "databases",
      currentDatabases.filter((db) => db !== name)
    );
    setCustomDatabases(customDatabases.filter(db => db !== name));
  }, [form, customDatabases]);
  
  // Reset custom items
  const resetCustomItems = useCallback(() => {
    setCustomFramework("");
    setCustomDatabase("");
    setCustomDatabases([]);
  }, []);
  
  // Context value
  const value = {
    customFramework,
    setCustomFramework,
    addCustomFramework,
    removeCustomFramework,
    customDatabase,
    setCustomDatabase,
    addCustomDatabase,
    removeCustomDatabase,
    customDatabases,
    resetCustomItems,
  };
  
  return (
    <CustomItemsContext.Provider value={value}>
      {children}
    </CustomItemsContext.Provider>
  );
}

// Custom hook to use the custom items context
export function useCustomItems() {
  const context = useContext(CustomItemsContext);
  
  if (!context) {
    throw new Error("useCustomItems must be used within a CustomItemsProvider");
  }
  
  return context;
} 