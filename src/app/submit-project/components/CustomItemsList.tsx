import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface CustomItemsListProps {
  items: string[];
  renderItemContent: (item: string) => ReactNode;
  onRemoveItem: (item: string) => void;
  emptyMessage?: string;
}

/**
 * Displays a list of custom items with ability to remove them
 * Used for both custom frameworks and databases
 */
export function CustomItemsList({
  items,
  renderItemContent,
  onRemoveItem,
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
          <div key={item} className="bg-muted py-1 px-2 rounded-md text-xs flex items-center gap-1">
            {renderItemContent(item)}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => onRemoveItem(item)}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground hover:text-destructive"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 