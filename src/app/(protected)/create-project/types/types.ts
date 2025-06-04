import { ReactNode } from "react";

import { useForm } from "react-hook-form";

import { ProjectFormData } from "@/schema/projectFormSchema";

// Component types

export interface CustomFrameworkCardProps {
  isPredefinedFramework: (frameworkName: string) => boolean;
}

export interface CustomItemCardProps {
  title: string;
  itemName: string;
  items: string[];
  placeholder: string;
  isSelected: boolean;
  isLimitReached: boolean;
  onNameChange: (value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (name: string) => void;
  itemType: "framework" | "database";
}

export interface CustomItemInputProps {
  itemName: string;
  itemNamePlaceholder: string;
  maxNameLength?: number;
  onNameChange: (value: string) => void;
  onAddItem: () => void;
  isAddDisabled?: boolean;
}

export interface CustomItemsListProps {
  items: string[];
  renderItemContent: (item: string) => ReactNode;
  onRemove: (item: string) => void;
  emptyMessage?: string;
}

export interface FrameworkOption {
  name: string;
  description: string;
  primaryLanguage?: string;
  primaryLanguages?: string[];
}

export interface DatabaseOption {
  name: string;
  description: string;
}

export interface SelectableCardProps {
  title: ReactNode;
  description?: ReactNode;
  isSelected: boolean;
  isCustom?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

// Context types

export interface CustomItemsContextType {
  // Custom frameworks
  customFramework: string;
  setCustomFramework: (value: string) => void;
  addCustomFramework: () => void;
  removeCustomFramework: (name: string) => void;

  // Custom databases
  customDatabase: string;
  setCustomDatabase: (value: string) => void;
  addCustomDatabase: () => void;
  removeCustomDatabase: (name: string) => void;
  customDatabases: string[];

  // Reset
  resetCustomItems: () => void;
}

export interface FormCoreContextType {
  // Form
  form: ReturnType<typeof useForm<ProjectFormData>>;

  // Form helpers
  charCount: number;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (values: ProjectFormData) => void;
  resetForm: () => void;
}

export interface ProjectFormProviderProps {
  children: ReactNode;
}

export interface TechnologyState {
  applicationType: string;
  selectionStep: "framework" | "database";
  selectedFrameworks: FrameworkOption[];
  selectedDatabases: DatabaseOption[];
}

// Technology selection actions
export type TechnologyAction =
  | { type: "SET_APP_TYPE"; payload: string }
  | { type: "SET_SELECTION_STEP"; payload: "framework" | "database" }
  | { type: "SET_FRAMEWORKS"; payload: FrameworkOption[] }
  | { type: "SET_DATABASES"; payload: DatabaseOption[] }
  | { type: "RESET" };
