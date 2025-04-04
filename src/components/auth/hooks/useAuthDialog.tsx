"use client";

import { createContext, useContext, useState } from "react";

type View = "signin" | "signup";

type AuthDialogContextType = {
  isOpen: boolean;
  view: View;
  error: string | null;
  open: (view?: View, error?: string | null) => void;
  close: () => void;
  setView: (view: View) => void;
  setError: (error: string | null) => void;
};

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

export function AuthDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("signin");
  const [error, setError] = useState<string | null>(null);

  const open = (view: View = "signin", error: string | null = null) => {
    setView(view);
    setError(error);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <AuthDialogContext.Provider value={{ isOpen, view, error, open, close, setView, setError }}>
      {children}
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) throw new Error("useAuthDialog must be used within AuthDialogProvider");
  return context;
}