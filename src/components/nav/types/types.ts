/**
 * Navigation component types
 */

export interface NavigationProps {
  sectionId: string;
  additionalOffset?: number;
}

export interface MobileNavLinksProps {
  setIsOpen: (isOpen: boolean) => void;
}

export interface ScrollDetectionProps {
  threshold?: number;
}

export interface ScrollDetectionResult {
  scrolled: boolean;
}
