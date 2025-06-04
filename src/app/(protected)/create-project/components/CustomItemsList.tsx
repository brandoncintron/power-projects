import React from "react";

import { MdOutlineCancel } from "react-icons/md";

import { Button } from "@/components/ui/button";

import { CustomItemsListProps } from "@@/create-project/types/types";

/**
 * Displays a list of custom items with ability to remove them.
 * Used for both custom frameworks and databases.
 */
export function CustomItemsList({
  items,
  renderItemContent,
  onRemove,
  emptyMessage = "No items added yet",
}: CustomItemsListProps) {
  if (items.length === 0) {
    return <p className="text-xs text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="pt-2">
      <p className="text-xs font-medium mb-1">Your custom items:</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="bg-muted py-1 px-2 rounded-md text-xs flex items-center gap-1 cursor-default"
          >
            {renderItemContent(item)}
            {/* Button to remove custom item */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1 cursor-pointer"
              onClick={() => onRemove(item)}
            >
              <MdOutlineCancel />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
