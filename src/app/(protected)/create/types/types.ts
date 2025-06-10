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
