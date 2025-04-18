import React from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { BiSolidCustomize } from "react-icons/bi";
import { SelectableCard } from "./SelectableCard";
import { CustomItemInput } from "./CustomItemInput";
import { CustomItemsList } from "./CustomItemsList";

interface CustomItemCardProps {
  title: string;
  itemName: string;
  items: string[];
  placeholder: string;
  isSelected: boolean;
  isLimitReached: boolean;
  onNameChange: (value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (name: string) => void;
  itemType: 'framework' | 'database';
}

/**
 * Generic component for adding custom items (frameworks or databases)
 */
export function CustomItemCard({
  title,
  itemName,
  items,
  placeholder,
  isSelected,
  isLimitReached,
  onNameChange,
  onAddItem,
  onRemoveItem,
  itemType
}: CustomItemCardProps) {
  // Handle adding item with limit check
  const handleAddItem = () => {
    if (isLimitReached) return;
    onAddItem();
  };

  return (
    <div className="mt-4 sm:mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <SelectableCard
          title={
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                <MdOutlineAddBox />
              </div>
              <span>{title}</span>
            </div>
          }
          isSelected={isSelected}
        >
          <div className="mt-3">
            <CustomItemInput
              itemName={itemName}
              itemNamePlaceholder={placeholder}
              onNameChange={onNameChange}
              onAddItem={handleAddItem}
              isAddDisabled={isLimitReached}
            />

            {/* Limit warning message */}
            {isLimitReached && (
              <p className="text-destructive text-sm mt-2 font-medium">
                Maximum of 3 custom {itemType}s allowed.
              </p>
            )}

            {/* Custom items list */}
            {items.length > 0 && (
              <div className="pt-2">
                <CustomItemsList
                  items={items}
                  renderItemContent={(item) => (
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <BiSolidCustomize />
                      </div>
                      <span>{item}</span>
                    </div>
                  )}
                  onRemove={onRemoveItem}
                />
              </div>
            )}
          </div>
        </SelectableCard>
      </div>
    </div>
  );
} 