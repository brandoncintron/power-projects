import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

import { useFormCore } from "@@/create-project/context/FormCoreContext";
import { databaseOptions } from "@@/create-project/data/project-technology-data";
import {
  DatabaseOption,
  TechnologyAction,
  TechnologyState,
} from "@@/create-project/types/types";

// Technology selection reducer
function technologyReducer(
  state: TechnologyState,
  action: TechnologyAction,
): TechnologyState {
  switch (action.type) {
    case "SET_APP_TYPE":
      return { ...state, applicationType: action.payload };
    case "SET_SELECTION_STEP":
      return { ...state, selectionStep: action.payload };
    case "SET_FRAMEWORKS":
      return { ...state, selectedFrameworks: action.payload };
    case "SET_DATABASES":
      return { ...state, selectedDatabases: action.payload };
    case "RESET":
      return {
        applicationType: "",
        selectionStep: "framework",
        selectedFrameworks: [],
        selectedDatabases: [],
      };
    default:
      return state;
  }
}

// Context interface
interface TechnologySelectionContextType {
  // Technology selection
  state: TechnologyState;
  setApplicationType: (type: string) => void;
  goToFrameworkStep: () => void;
  goToDatabaseStep: () => void;

  // Framework selection
  toggleFramework: (framework: string) => void;
  isFrameworkSelected: (framework: string) => boolean;

  // Database selection
  toggleDatabase: (database: string) => void;
  isDatabaseSelected: (database: string) => boolean;
  getDatabaseOptions: () => Array<DatabaseOption>;

  // Reset state
  resetTechnologySelections: () => void;
}

// Create context with default values
const TechnologySelectionContext = createContext<
  TechnologySelectionContextType | undefined
>(undefined);

// Provider props
interface TechnologySelectionProviderProps {
  children: ReactNode;
}

// Provider component
export function TechnologySelectionProvider({
  children,
}: TechnologySelectionProviderProps) {
  const { form } = useFormCore();

  // Technology selection state management
  const [state, dispatch] = useReducer(technologyReducer, {
    applicationType: "",
    selectionStep: "framework",
    selectedFrameworks: [],
    selectedDatabases: [],
  });

  // Set application type
  const setApplicationType = useCallback(
    (type: string) => {
      dispatch({ type: "SET_APP_TYPE", payload: type });

      // Reset selections when app type changes
      if (state.selectionStep === "database") {
        dispatch({ type: "SET_SELECTION_STEP", payload: "framework" });
      }

      form.setValue("frameworks", []);
      form.setValue("databases", []);
      dispatch({ type: "SET_FRAMEWORKS", payload: [] });
      dispatch({ type: "SET_DATABASES", payload: [] });

      // Clear errors
      form.clearErrors("frameworks");
      form.clearErrors("databases");
    },
    [form, state.selectionStep],
  );

  // Navigation between steps
  const goToFrameworkStep = useCallback(() => {
    dispatch({ type: "SET_SELECTION_STEP", payload: "framework" });
  }, []);

  const goToDatabaseStep = useCallback(() => {
    if ((form.watch("frameworks") || []).length === 0) {
      form.setError("frameworks", {
        type: "manual",
        message: "Please select at least one framework",
      });
      return;
    }
    dispatch({ type: "SET_SELECTION_STEP", payload: "database" });
  }, [form]);

  // Framework selection
  const toggleFramework = useCallback(
    (framework: string) => {
      const currentFrameworks = form.watch("frameworks") || [];

      if (currentFrameworks.includes(framework)) {
        form.setValue(
          "frameworks",
          currentFrameworks.filter((fw) => fw !== framework),
        );
        dispatch({
          type: "SET_FRAMEWORKS",
          payload: state.selectedFrameworks.filter((f) => f.name !== framework),
        });
      } else {
        form.setValue("frameworks", [...currentFrameworks, framework]);
        dispatch({
          type: "SET_FRAMEWORKS",
          payload: [
            ...state.selectedFrameworks,
            { name: framework, description: "", primaryLanguages: [] },
          ],
        });
      }

      // Clear errors when a framework is selected
      form.clearErrors("frameworks");
    },
    [form, state.selectedFrameworks],
  );

  // Framework selection check
  const isFrameworkSelected = useCallback(
    (framework: string) => {
      const currentFrameworks = form.watch("frameworks") || [];
      return currentFrameworks.includes(framework);
    },
    [form],
  );

  // Database selection
  const toggleDatabase = useCallback(
    (database: string) => {
      const currentDatabases = form.watch("databases") || [];

      // Special handling for "None" option
      if (database === "None") {
        // If None is already selected, deselect it
        if (currentDatabases.includes("None")) {
          // Clear UI state
          dispatch({ type: "SET_DATABASES", payload: [] });
          // Clear form value
          form.setValue("databases", []);
        } else {
          // For UI display, show "None" as selected
          dispatch({
            type: "SET_DATABASES",
            payload: [
              {
                name: "None",
                description: "No database needed for this project",
              },
            ],
          });
          // For form submission, set an empty array
          form.setValue("databases", []);
        }
        return;
      }

      // If another database is clicked, ensure "None" is removed from UI state
      let uiDatabases = [...state.selectedDatabases];
      uiDatabases = uiDatabases.filter((db) => db.name !== "None");

      // Get current form databases (excluding None which shouldn't be there)
      let formDatabases = [...currentDatabases];

      // Toggle the selected database
      if (formDatabases.includes(database)) {
        formDatabases = formDatabases.filter((db) => db !== database);
        uiDatabases = uiDatabases.filter((db) => db.name !== database);
      } else {
        formDatabases.push(database);

        // Find database description if available
        let dbOption = { name: database, description: "" };
        Object.values(databaseOptions).forEach((options) => {
          const found = options.find((opt) => opt.name === database);
          if (found) dbOption = found;
        });

        uiDatabases.push(dbOption);
      }

      // Update form value
      form.setValue("databases", formDatabases);

      // Update UI state
      dispatch({ type: "SET_DATABASES", payload: uiDatabases });

      // Clear errors when a database is selected
      form.clearErrors("databases");
    },
    [form, state.selectedDatabases],
  );

  // Database selection check
  const isDatabaseSelected = useCallback(
    (database: string) => {
      if (database === "None") {
        // None is selected if it's in the UI state but no other databases are selected
        return state.selectedDatabases.some((db) => db.name === "None");
      }

      // For other databases, check if they're in the form value
      const currentDatabases = form.watch("databases") || [];
      return currentDatabases.includes(database);
    },
    [form, state.selectedDatabases],
  );

  // Get database options based on selected frameworks
  const getDatabaseOptions = useCallback(() => {
    const frameworks = form.watch("frameworks") || [];
    const options: DatabaseOption[] = [];

    // Add "None" option as the first option
    options.push({
      name: "None",
      description: "No database needed for this project",
    });

    // Get database options for all selected frameworks
    frameworks.forEach((framework) => {
      // Use type assertion to access databaseOptions with string key
      const dbOpts =
        (databaseOptions as Record<string, DatabaseOption[]>)[framework] || [];
      // Add non-duplicate database options
      dbOpts.forEach((db: DatabaseOption) => {
        if (!options.some((o) => o.name === db.name)) {
          options.push(db);
        }
      });
    });

    return options;
  }, [form]);

  // Reset technology selections
  const resetTechnologySelections = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  // Context value
  const value = {
    state,
    setApplicationType,
    goToFrameworkStep,
    goToDatabaseStep,
    toggleFramework,
    isFrameworkSelected,
    toggleDatabase,
    isDatabaseSelected,
    getDatabaseOptions,
    resetTechnologySelections,
  };

  return (
    <TechnologySelectionContext.Provider value={value}>
      {children}
    </TechnologySelectionContext.Provider>
  );
}

// Custom hook to use the technology selection context
export function useTechnologySelection() {
  const context = useContext(TechnologySelectionContext);

  if (!context) {
    throw new Error(
      "useTechnologySelection must be used within a TechnologySelectionProvider",
    );
  }

  return context;
}
