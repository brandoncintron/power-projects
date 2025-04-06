/**
 * Shared type definitions for the project creation form
 */

// Framework option type
export interface FrameworkOption {
  name: string;
  description: string;
  primaryLanguage?: string;
  primaryLanguages?: string[];
}

// Database option type
export interface DatabaseOption {
  name: string;
  description: string;
}

// Category option type for grouped framework options
export interface CategoryOption {
  category: string;
  description: string;
  options: FrameworkOption[];
}

// Custom framework type
export interface CustomFramework {
  name: string;
  language?: string;
}

// Technology selection state
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