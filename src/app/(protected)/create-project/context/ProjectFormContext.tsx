import React, { ReactNode } from "react";
import { FormCoreProvider, useFormCore } from "./FormCoreContext";
import { TechnologySelectionProvider, useTechnologySelection } from "./TechnologySelectionContext";
import { CustomItemsProvider, useCustomItems } from "./CustomItemsContext";

// Provider props
interface ProjectFormProviderProps {
  children: ReactNode;
}

// Provider component
export function ProjectFormProvider({ children }: ProjectFormProviderProps) {
  return (
    <FormCoreProvider>
      <TechnologySelectionProvider>
        <CustomItemsProvider>
          {children}
        </CustomItemsProvider>
      </TechnologySelectionProvider>
    </FormCoreProvider>
  );
}

// Custom hook to use all project form contexts
export function useProjectForm() {
  const formCore = useFormCore();
  const technologySelection = useTechnologySelection();
  const customItems = useCustomItems();
  
  // Return combined context
  return {
    // Form Core
    form: formCore.form,
    charCount: formCore.charCount,
    handleDescriptionChange: formCore.handleDescriptionChange,
    onSubmit: formCore.onSubmit,
    
    // Technology Selection
    state: technologySelection.state,
    setApplicationType: technologySelection.setApplicationType,
    goToFrameworkStep: technologySelection.goToFrameworkStep,
    goToDatabaseStep: technologySelection.goToDatabaseStep,
    toggleFramework: technologySelection.toggleFramework,
    isFrameworkSelected: technologySelection.isFrameworkSelected,
    toggleDatabase: technologySelection.toggleDatabase,
    isDatabaseSelected: technologySelection.isDatabaseSelected,
    getDatabaseOptions: technologySelection.getDatabaseOptions,
    
    // Custom Items
    customFramework: customItems.customFramework,
    setCustomFramework: customItems.setCustomFramework,
    addCustomFramework: customItems.addCustomFramework,
    removeCustomFramework: customItems.removeCustomFramework,
    customDatabase: customItems.customDatabase,
    setCustomDatabase: customItems.setCustomDatabase,
    addCustomDatabase: customItems.addCustomDatabase,
    removeCustomDatabase: customItems.removeCustomDatabase,
    customDatabases: customItems.customDatabases,
  };
} 