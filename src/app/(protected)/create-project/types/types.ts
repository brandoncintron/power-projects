import { ReactNode } from "react";

// Data types
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

// Component types
export interface SelectableCardProps {
  title: ReactNode;
  description?: ReactNode;
  isSelected: boolean;
  isCustom?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}
