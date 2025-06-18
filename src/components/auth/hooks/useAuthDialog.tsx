"use client";

import { createContext, useContext, useState } from "react";

interface AuthDialogContextType {
  isOpen: boolean;
  error: string | null;
  open: (error?: string | null) => void;
  close: () => void;
  setError: (error: string | null) => void;
}

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(
  undefined,
);

export function AuthDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = (error: string | null = null) => {
    setError(error);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <AuthDialogContext.Provider
      value={{ isOpen, error, open, close, setError }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context)
    throw new Error("useAuthDialog must be used within AuthDialogProvider");
  return context;
}
