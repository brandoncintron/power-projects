import React from "react";

import { CustomItemsProvider } from "@@/create-project/context/CustomItemsContext";
import { FormCoreProvider } from "@@/create-project/context/FormCoreContext";
import { TechnologySelectionProvider } from "@@/create-project/context/TechnologySelectionContext";
import { ProjectFormProviderProps } from "@@/create-project/types/types";

// Provider component
export function ProjectFormProvider({ children }: ProjectFormProviderProps) {
  return (
    <FormCoreProvider>
      <TechnologySelectionProvider>
        <CustomItemsProvider>{children}</CustomItemsProvider>
      </TechnologySelectionProvider>
    </FormCoreProvider>
  );
}
