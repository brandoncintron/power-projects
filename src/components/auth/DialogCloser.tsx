"use client";

import { useEffect } from "react";

import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";

export function DialogCloser() {
  const { close } = useAuthDialog();

  useEffect(() => {
    close();
  }, [close]);

  return null;
}
