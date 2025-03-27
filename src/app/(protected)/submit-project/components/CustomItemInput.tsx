import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomItemInputProps {
  itemName: string;
  itemNamePlaceholder: string;
  maxNameLength?: number;
  onNameChange: (value: string) => void;
  onAddItem: () => void;
  isAddDisabled?: boolean;
  // Optional secondary field props
  secondaryValue?: string;
  secondaryValuePlaceholder?: string;
  secondaryLabel?: string;
  maxSecondaryLength?: number;
  onSecondaryChange?: (value: string) => void;
  showSecondaryField?: boolean;
}

/**
 * A component for adding custom items like frameworks or databases
 * Optionally includes a secondary field (e.g., for language input with frameworks)
 */
export function CustomItemInput({
  itemName,
  itemNamePlaceholder,
  maxNameLength = 20,
  onNameChange,
  onAddItem,
  isAddDisabled = false,
  // Optional secondary field props with defaults
  secondaryValue = "",
  secondaryValuePlaceholder = "",
  secondaryLabel = "",
  maxSecondaryLength = 100,
  onSecondaryChange = () => {},
  showSecondaryField = false,
}: CustomItemInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-muted-foreground">{itemNamePlaceholder} (max {maxNameLength} chars)</label>
        <div className="flex space-x-2">
          <Input
            value={itemName}
            onChange={(e) => onNameChange(e.target.value.slice(0, maxNameLength))}
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

      {showSecondaryField && (
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-muted-foreground">{secondaryLabel} (optional)</label>
          <Input
            value={secondaryValue}
            onChange={(e) => onSecondaryChange(e.target.value.slice(0, maxSecondaryLength))}
            placeholder={secondaryValuePlaceholder}
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
} 