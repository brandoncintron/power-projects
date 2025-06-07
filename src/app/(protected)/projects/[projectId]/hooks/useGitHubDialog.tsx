"use client";

import { createContext, useContext, useState } from "react";

interface GitHubDialogContextType {
  isOpen: boolean;
  error: string | null;
  open: (error?: string | null) => void;
  close: () => void;
  setError: (error: string | null) => void;
}

const GitHubDialogContext = createContext<GitHubDialogContextType | undefined>(
  undefined,
);

export function GitHubDialogProvider({
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
    <GitHubDialogContext.Provider
      value={{ isOpen, error, open, close, setError }}
    >
      {children}
    </GitHubDialogContext.Provider>
  );
}

export function useGitHubDialog() {
  const context = useContext(GitHubDialogContext);
  if (!context)
    throw new Error("useGitHubDialog must be used within GitHubDialogProvider");
  return context;
} 