import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomItemInputProps {
  itemName: string;
  itemNamePlaceholder: string;
  secondaryValue: string;
  secondaryValuePlaceholder: string;
  secondaryLabel: string;
  maxNameLength?: number;
  maxSecondaryLength?: number;
  onNameChange: (value: string) => void;
  onSecondaryChange: (value: string) => void;
  onAddItem: () => void;
  isAddDisabled?: boolean;
}

/**
 * A component for adding custom items like frameworks or databases
 * Includes input fields for name and a secondary value (like language or description)
 */
export function CustomItemInput({
  itemName,
  itemNamePlaceholder,
  secondaryValue,
  secondaryValuePlaceholder,
  secondaryLabel,
  maxNameLength = 20,
  maxSecondaryLength = 100,
  onNameChange,
  onSecondaryChange,
  onAddItem,
  isAddDisabled = false,
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

      <div className="flex flex-col space-y-1">
        <label className="text-xs text-muted-foreground">{secondaryLabel} (optional)</label>
        <Input
          value={secondaryValue}
          onChange={(e) => onSecondaryChange(e.target.value.slice(0, maxSecondaryLength))}
          placeholder={secondaryValuePlaceholder}
          className="text-sm"
        />
      </div>
    </div>
  );
} 