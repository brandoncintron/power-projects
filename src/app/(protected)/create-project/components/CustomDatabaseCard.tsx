import React from "react";

import { CustomItemCard } from "@@/create-project/components/CustomItemCard";
import { useProjectForm } from "@@/create-project/hooks/useProjectForm";

/**
 * Component for adding custom databases that aren't in the predefined list
 */
export function CustomDatabaseCard() {
  const {
    customDatabase,
    customDatabases,
    setCustomDatabase,
    addCustomDatabase,
    removeCustomDatabase,
  } = useProjectForm();

  // Check if custom databases limit reached
  const isLimitReached = customDatabases.length >= 3;

  return (
    <CustomItemCard
      title="Custom Database"
      itemName={customDatabase}
      items={customDatabases}
      placeholder="Enter database name..."
      isSelected={customDatabases.length > 0}
      isLimitReached={isLimitReached}
      onNameChange={setCustomDatabase}
      onAddItem={addCustomDatabase}
      onRemoveItem={removeCustomDatabase}
      itemType="database"
    />
  );
}
