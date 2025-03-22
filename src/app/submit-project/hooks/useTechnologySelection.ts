import { useReducer, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { databaseOptions } from "../form-data";
import { useCustomItems } from "./useCustomItems";
import { ProjectFormData } from "./useProjectForm";

// Custom framework type
interface CustomFramework {
  name: string;
  language?: string;
}

// Custom database type
interface CustomDatabase {
  name: string;
  description: string;
}

// Framework and database option types
interface FrameworkOption {
  name: string;
  languages: string[];
}

interface DatabaseOption {
  name: string;
  description: string;
}

// State type definition
interface TechnologySelectionState {
  applicationType: string;
  selectionStep: "framework" | "database";
  selectedFrameworks: FrameworkOption[];
  selectedDatabases: DatabaseOption[];
}

// Action types
type TechnologySelectionAction =
  | { type: "SET_APP_TYPE"; payload: string }
  | { type: "SET_SELECTION_STEP"; payload: "framework" | "database" }
  | { type: "SET_FRAMEWORKS"; payload: FrameworkOption[] }
  | { type: "SET_DATABASES"; payload: DatabaseOption[] };

// Reducer function
function technologySelectionReducer(
  state: TechnologySelectionState,
  action: TechnologySelectionAction
): TechnologySelectionState {
  switch (action.type) {
    case "SET_APP_TYPE":
      return { ...state, applicationType: action.payload };
    case "SET_SELECTION_STEP":
      return { ...state, selectionStep: action.payload };
    case "SET_FRAMEWORKS":
      return { ...state, selectedFrameworks: action.payload };
    case "SET_DATABASES":
      return { ...state, selectedDatabases: action.payload };
    default:
      return state;
  }
}

/**
 * Hook for managing technology selection
 * Handles application type, frameworks, and databases
 */
export function useTechnologySelection({ form }: { form: UseFormReturn<ProjectFormData> }) {
  // Initialization of state with useReducer
  const [state, dispatch] = useReducer(technologySelectionReducer, {
    applicationType: "",
    selectionStep: "framework",
    selectedFrameworks: [],
    selectedDatabases: []
  });

  // Custom frameworks management
  const {
    items: customFrameworks,
    itemName: frameworkName,
    secondaryValue: frameworkLanguages,
    setItemName: setFrameworkName,
    setSecondaryValue: setFrameworkLanguages,
    addItem: addCustomFramework,
    removeItem: removeCustomFramework,
    resetItems: resetCustomFrameworks
  } = useCustomItems<CustomFramework>({
    form,
    fieldName: "frameworks",
    itemFactory: (name, language) => ({
      name,
      language: language || undefined,
    }),
    getItemName: (item) => item.name,
  });

  // Custom databases management
  const {
    items: customDatabases,
    itemName: databaseName,
    secondaryValue: databaseDescription,
    setItemName: setDatabaseName,
    setSecondaryValue: setDatabaseDescription,
    addItem: addCustomDatabase,
    removeItem: removeCustomDatabase,
    resetItems: resetCustomDatabases
  } = useCustomItems<CustomDatabase>({
    form,
    fieldName: "databases",
    itemFactory: (name, description) => ({
      name,
      description: description || `Custom database: ${name}`,
    }),
    getItemName: (item) => item.name,
  });

  // Action handlers
  const setApplicationType = useCallback((value: string) => {
    dispatch({ type: "SET_APP_TYPE", payload: value });
    
    // If we're on the database step, return to framework step and reset both selections
    if (state.selectionStep === "database") {
      dispatch({ type: "SET_SELECTION_STEP", payload: "framework" });
      form.setValue("frameworks", []);
      form.setValue("databases", []);
      dispatch({ type: "SET_FRAMEWORKS", payload: [] });
      dispatch({ type: "SET_DATABASES", payload: [] });
      resetCustomFrameworks();
      resetCustomDatabases();
    } else {
      // Otherwise just reset frameworks when app type changes
      form.setValue("frameworks", []);
      dispatch({ type: "SET_FRAMEWORKS", payload: [] });
      resetCustomFrameworks();
    }
    
    // Clear any previous errors
    form.clearErrors("frameworks");
    form.clearErrors("databases");
  }, [form, state.selectionStep, resetCustomFrameworks, resetCustomDatabases]);

  const setSelectionStep = useCallback((step: "framework" | "database") => {
    dispatch({ type: "SET_SELECTION_STEP", payload: step });
  }, []);

  // Navigation between steps
  const goToFrameworkStep = useCallback(() => {
    setSelectionStep("framework");
  }, [setSelectionStep]);

  const goToDatabaseStep = useCallback(() => {
    if ((form.watch("frameworks") || []).length === 0) {
      form.setError("frameworks", {
        type: "manual",
        message: "Please select at least one framework"
      });
      return;
    }
    setSelectionStep("database");
  }, [form, setSelectionStep]);

  // Framework selection
  const toggleFramework = useCallback((framework: FrameworkOption) => {
    // Handle special case for "Custom" framework in Custom category
    if (framework.name === "Custom" && state.applicationType === "Other") {
      return; // Don't toggle - this will be handled by the custom input
    }

    const currentFrameworks = form.watch("frameworks") || [];
    if (currentFrameworks.includes(framework.name)) {
      form.setValue(
        "frameworks",
        currentFrameworks.filter((fw) => fw !== framework.name)
      );
      dispatch({
        type: "SET_FRAMEWORKS",
        payload: state.selectedFrameworks.filter(f => f.name !== framework.name)
      });
    } else {
      form.setValue("frameworks", [...currentFrameworks, framework.name]);
      dispatch({
        type: "SET_FRAMEWORKS",
        payload: [...state.selectedFrameworks, framework]
      });
    }
  }, [form, state.applicationType, state.selectedFrameworks]);

  // Database selection
  const toggleDatabase = useCallback((database: DatabaseOption) => {
    // If "None" is selected, clear all other selections
    if (database.name === "None") {
      form.setValue("databases", []);
      dispatch({ type: "SET_DATABASES", payload: [] });
      return;
    }

    const currentDatabases = form.watch("databases") || [];
    if (currentDatabases.includes(database.name)) {
      form.setValue(
        "databases",
        currentDatabases.filter((db) => db !== database.name)
      );
      dispatch({
        type: "SET_DATABASES",
        payload: state.selectedDatabases.filter(d => d.name !== database.name)
      });
    } else {
      form.setValue("databases", [...currentDatabases, database.name]);
      dispatch({
        type: "SET_DATABASES",
        payload: [...state.selectedDatabases, database]
      });
    }
  }, [form, state.selectedDatabases]);

  // Helper functions
  const isFrameworkSelected = useCallback((framework: FrameworkOption) => {
    return state.selectedFrameworks.some(f => f.name === framework.name);
  }, [state.selectedFrameworks]);

  const isDatabaseSelected = useCallback((database: DatabaseOption) => {
    return state.selectedDatabases.some(d => d.name === database.name);
  }, [state.selectedDatabases]);

  const getSelectedFrameworkLanguages = useCallback(() => {
    const languages: string[] = [];
    
    // Get languages from built-in frameworks
    state.selectedFrameworks.forEach(framework => {
      framework.languages?.forEach(lang => {
        if (!languages.includes(lang)) {
          languages.push(lang);
        }
      });
    });
    
    // Get languages from custom frameworks
    customFrameworks.forEach(framework => {
      if (framework.language && !languages.includes(framework.language)) {
        languages.push(framework.language);
      }
    });
    
    return languages;
  }, [state.selectedFrameworks, customFrameworks]);

  const getCustomFrameworksData = useCallback(() => {
    return {
      customFrameworks,
      frameworkName,
      frameworkLanguages,
      addCustomFramework,
      removeCustomFramework,
      handleFrameworkNameChange: setFrameworkName,
      handleFrameworkLanguagesChange: setFrameworkLanguages,
      resetCustomFrameworks
    };
  }, [
    customFrameworks, 
    frameworkName, 
    frameworkLanguages, 
    addCustomFramework, 
    removeCustomFramework, 
    setFrameworkName, 
    setFrameworkLanguages,
    resetCustomFrameworks
  ]);

  const getCustomDatabasesData = useCallback(() => {
    return {
      customDatabases,
      databaseName,
      databaseDescription,
      addCustomDatabase,
      removeCustomDatabase,
      handleDatabaseNameChange: setDatabaseName,
      handleDatabaseDescriptionChange: setDatabaseDescription,
      resetCustomDatabases
    };
  }, [
    customDatabases,
    databaseName,
    databaseDescription,
    addCustomDatabase,
    removeCustomDatabase,
    setDatabaseName,
    setDatabaseDescription,
    resetCustomDatabases
  ]);

  const getDatabaseOptions = useCallback(() => {
    const frameworks = form.watch("frameworks") || [];
    
    // Create a central array for all database options
    const allDatabases: { name: string; description: string }[] = [];
    
    // Add the 'None' option always
    allDatabases.push({
      name: "None",
      description: "No database required for this project"
    });
    
    // Add options for each selected framework
    frameworks.forEach(framework => {
      // Check if the framework exists in databaseOptions with proper type safety
      if (Object.prototype.hasOwnProperty.call(databaseOptions, framework)) {
        (databaseOptions as Record<string, { name: string; description: string }[]>)[framework].forEach(db => {
          // Check if this database is already in our list
          if (!allDatabases.some(existingDb => existingDb.name === db.name)) {
            allDatabases.push(db);
          }
        });
      }
    });
    
    // Add default options if no databases found for selected frameworks
    if (allDatabases.length === 1 && databaseOptions.default) {
      // Only "None" is in the list, add defaults
      databaseOptions.default.forEach(db => {
        allDatabases.push(db);
      });
    }
    
    // Add custom databases
    customDatabases.forEach(customDb => {
      if (!allDatabases.some(db => db.name === customDb.name)) {
        allDatabases.push(customDb);
      }
    });
    
    return [{ category: "Databases", databases: allDatabases }];
  }, [form, customDatabases]);

  // Combined function to reset all technology selections
  const resetTechnologySelections = useCallback(() => {
    form.setValue("frameworks", []);
    form.setValue("databases", []);
    dispatch({ type: "SET_FRAMEWORKS", payload: [] });
    dispatch({ type: "SET_DATABASES", payload: [] });
    resetCustomFrameworks();
    resetCustomDatabases();
    form.clearErrors("frameworks");
    form.clearErrors("databases");
  }, [form, resetCustomFrameworks, resetCustomDatabases]);

  return {
    state,
    customFramework: frameworkName,
    customLanguage: frameworkLanguages,
    customFrameworks,
    customDatabase: databaseName,
    customDbDescription: databaseDescription,
    customDatabases,
    setApplicationType,
    toggleFramework,
    toggleDatabase,
    goToFrameworkStep,
    goToDatabaseStep,
    getCustomFrameworksData,
    getCustomDatabasesData,
    getDatabaseOptions,
    resetTechnologySelections,
    isFrameworkSelected,
    isDatabaseSelected,
    getSelectedFrameworkLanguages
  };
} 