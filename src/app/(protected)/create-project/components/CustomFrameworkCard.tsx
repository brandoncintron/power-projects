import React from "react";
import { useProjectForm } from "../context/ProjectFormContext";
import { CustomItemCard } from "./CustomItemCard";

interface CustomFrameworkCardProps {
  isPredefinedFramework: (frameworkName: string) => boolean;
}

/**
 * Component for adding custom frameworks that aren't in the predefined list
 */
export function CustomFrameworkCard({ isPredefinedFramework }: CustomFrameworkCardProps) {
  const {
    form,
    customFramework,
    setCustomFramework,
    addCustomFramework,
    removeCustomFramework,
  } = useProjectForm();
  
  // Get custom frameworks (those not in the predefined options)
  const getCustomFrameworks = () => {
    return form.watch("frameworks").filter((fw: string) => !isPredefinedFramework(fw));
  };

  // Check if custom frameworks limit reached
  const customFrameworksCount = getCustomFrameworks().length;
  const isLimitReached = customFrameworksCount >= 3;

  return (
    <CustomItemCard
      title="Custom Framework(s)"
      itemName={customFramework}
      items={getCustomFrameworks()}
      placeholder="Enter framework name..."
      isSelected={getCustomFrameworks().length > 0}
      isLimitReached={isLimitReached}
      onNameChange={setCustomFramework}
      onAddItem={addCustomFramework}
      onRemoveItem={removeCustomFramework}
      itemType="framework"
    />
  );
} 