"use client";

import { createContext, useContext, useState } from "react";

type View = "signin" | "signup";

type AuthDialogContextType = {
  isOpen: boolean;
  view: View;
  open: (view?: View) => void;
  close: () => void;
  setView: (view: View) => void;
};

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

export function AuthDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("signin");

  const open = (view: View = "signin") => {
    setView(view);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <AuthDialogContext.Provider value={{ isOpen, view, open, close, setView }}>
      {children}
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) throw new Error("useAuthDialog must be used within AuthDialogProvider");
  return context;
}
