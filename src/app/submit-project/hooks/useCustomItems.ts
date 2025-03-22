/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "./useProjectForm";

interface CustomItemsHookProps<T> {
  form: UseFormReturn<ProjectFormData>;
  fieldName: keyof ProjectFormData;
  itemFactory: (name: string, secondaryValue: string) => T;
  getItemName: (item: T) => string;
}

/**
 * Custom hook for managing any type of custom items (frameworks, databases, etc.)
 * Provides unified methods for adding, removing and updating custom items
 */
export function useCustomItems<T>({
  form,
  fieldName,
  itemFactory,
  getItemName,
}: CustomItemsHookProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [secondaryValue, setSecondaryValue] = useState<string>("");

  const addItem = useCallback(() => {
    if (!itemName.trim()) return;

    // Create new item
    const newItem = itemFactory(itemName, secondaryValue);
    
    // Add to our items array
    setItems(prevItems => [...prevItems, newItem]);

    // Add to react-hook-form value - filter out any placeholder like "Custom"
    const currentItems = form.watch(fieldName) || [];
    // Remove placeholders if they exist
    const filteredItems = Array.isArray(currentItems) 
      ? currentItems.filter((item: string) => item !== "Custom")
      : [];
    // Add the new item
    form.setValue(fieldName, [...filteredItems, getItemName(newItem)] as unknown as any);

    // Reset input fields
    setItemName("");
    setSecondaryValue("");
  }, [form, fieldName, itemName, secondaryValue, itemFactory, getItemName]);

  const removeItem = useCallback((itemToRemove: string) => {
    // Remove from items array
    setItems(prevItems => prevItems.filter(item => getItemName(item) !== itemToRemove));

    // Remove from react-hook-form value
    const currentItems = form.watch(fieldName) || [];
    if (Array.isArray(currentItems)) {
      form.setValue(
        fieldName,
        currentItems.filter((item: string) => item !== itemToRemove) as unknown as any
      );
    }
  }, [form, fieldName, getItemName]);

  // Reset all custom items
  const resetItems = useCallback(() => {
    setItems([]);
    setItemName("");
    setSecondaryValue("");
  }, []);

  return {
    items,
    setItems,
    itemName,
    setItemName,
    secondaryValue,
    setSecondaryValue,
    addItem,
    removeItem,
    resetItems
  };
} 