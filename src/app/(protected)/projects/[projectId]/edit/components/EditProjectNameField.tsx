"use client";

import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useEditProjectForm } from "../hooks/useEditProjectForm";

export function EditProjectNameField() {
  const { form } = useEditProjectForm();

  return (
    <FormField
      control={form.control}
      name="projectName"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              className="text-2xl md:text-3xl font-bold border-none focus-visible:ring-0 w-fit"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
