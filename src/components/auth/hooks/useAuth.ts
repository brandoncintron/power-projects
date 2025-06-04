"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { FormState } from "@/components/auth/types/types";

/**
 * Custom hook for managing authentication forms
 * Handles form state, validation, and submissions
 */
export function useAuth<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues: DefaultValues<T>,
  submitHandler: (values: T) => Promise<{ error?: string } | undefined>,
) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (values: T) => {
    setError("");

    startTransition(() => {
      submitHandler(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };

  const formState: FormState = {
    isPending,
    error,
  };

  return {
    form,
    formState,
    onSubmit,
  };
}
