import { UseFormReturn } from "react-hook-form";

import { ProjectFormData } from "../schemas/project-schema";

// Data & Prop Types
export interface SelectableCardData {
  name: string;
  description: string;
  primaryLanguages?: string[];
}

export interface SelectableCardProps {
  item: SelectableCardData;
  isSelected: boolean;
  onToggle: (name: string) => void;
}

export interface FrameworkCategory {
  name: string;
  description: string;
  options: SelectableCardData[];
}

export interface ApplicationTypeData {
  name: string;
  categories: FrameworkCategory[];
}

export interface AccordionData {
  value: string;
  trigger: string;
  content: SelectableCardData[];
}

export type UseCreateProjectFormReturn = {
  form: UseFormReturn<ProjectFormData>;
  addDatabase: boolean;
  setAddDatabase: (value: boolean) => void;
  frameworks: string[];
  databases: string[];
  onSubmit: (data: ProjectFormData) => Promise<void>;
  handleTabChange: (category: string) => void;
  onToggle: (name: string, field: "frameworks" | "databases") => void;
  handleAddCustom: (field: "frameworks" | "databases", value: string) => void;
  onRemove: (name: string, field: "frameworks" | "databases") => void;
};

export interface TechnologySelectionProps {
  form: UseFormReturn<ProjectFormData>;
  frameworks: string[];
  handleTabChange: (category: string) => void;
  onToggle: (name: string, field: "frameworks" | "databases") => void;
  handleAddCustom: (field: "frameworks" | "databases", value: string) => void;
  onRemove: (name: string, field: "frameworks" | "databases") => void;
}

export interface DatabaseSelectionProps {
  form: UseFormReturn<ProjectFormData>;
  addDatabase: boolean;
  setAddDatabase: (value: boolean) => void;
  databases: string[];
  onToggle: (name: string, field: "frameworks" | "databases") => void;
  handleAddCustom: (field: "frameworks" | "databases", value: string) => void;
  onRemove: (name: string, field: "frameworks" | "databases") => void;
}
