/**
 * Types for navigation components
 */

export type NavLinkType = 
  | { type: 'scroll'; id: string; label: string; }
  | { type: 'link'; href: string; label: string; }
  | { type: 'link-authOnly'; label: string; message: string; }
  | { type: 'toast'; label: string; message: string; };