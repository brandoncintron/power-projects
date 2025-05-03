import { useContext } from "react";

import { EditProjectFormContext } from "@@/projects/[projectId]/edit/context/EditProjectFormContext";

// Hook to use the context
export function useEditProjectForm() {
  const context = useContext(EditProjectFormContext);
  if (!context) {
    throw new Error(
      "useEditProjectForm must be used within EditProjectFormProvider",
    );
  }
  return context;
}
