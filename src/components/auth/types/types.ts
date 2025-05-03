import { useRouter } from "next/navigation";

export type AuthView = "signin" | "signup";

export interface AuthDialogContextType {
  isOpen: boolean;
  view: AuthView;
  error: string | null;
  open: (view?: AuthView, error?: string | null) => void;
  close: () => void;
  setView: (view: AuthView) => void;
  setError: (error: string | null) => void;
}

// Auth error handling types
export interface AuthErrorHandlerParams {
  errorParam: string | null;
  open: (view: AuthView, error?: string) => void;
  router: ReturnType<typeof useRouter>;
  errorCheckedRef: React.MutableRefObject<boolean>;
}

// Form types
export interface FormState {
  isPending: boolean;
  error: string | undefined;
}

// Username form type (from SetUsernamePopup)
export interface UsernameFormType {
  username: string;
}
