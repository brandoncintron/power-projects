"use client";

import React from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useEditProjectForm } from "@@/projects/[projectId]/edit/hooks/useEditProjectForm";

export function EditCompletionDateField() {
  const { form } = useEditProjectForm();

  return (
    <FormField
      control={form.control}
      name="completionDate"
      render={({ field }) => (
        <FormItem>
          <p className="text-sm uppercase text-muted-foreground mb-2">
            <FaCalendarAlt className="inline mr-1 mb-1" /> Target Completion
            Date
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "pl-3 text-left font-normal w-full",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
