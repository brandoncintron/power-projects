import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CustomItemInputProps } from "@@/create-project/types/types";

/**
 * A component for inputting custom frameworks or databases
 */
export function CustomItemInput({
  itemName,
  itemNamePlaceholder,
  maxNameLength = 20,
  onNameChange,
  onAddItem,
  isAddDisabled = false,
}: CustomItemInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-muted-foreground"></label>
        <div className="flex space-x-2">
          <Input
            value={itemName}
            onChange={(e) =>
              onNameChange(e.target.value.slice(0, maxNameLength))
            }
            placeholder={itemNamePlaceholder}
            className="text-sm"
          />
          <Button
            type="button"
            onClick={onAddItem}
            disabled={isAddDisabled || !itemName.trim()}
            className="whitespace-nowrap"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
