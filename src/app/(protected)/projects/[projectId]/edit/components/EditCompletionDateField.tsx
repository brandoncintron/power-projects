"use client";

import React from "react";
import { format } from "date-fns";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FaCalendarAlt } from "react-icons/fa";
import { useEditProjectForm } from "../context/EditProjectFormContext";

export function EditCompletionDateField() {
  const { form } = useEditProjectForm();
  
  return (
    <FormField
      control={form.control}
      name="completionDate"
      render={({ field }) => (
        <FormItem>
          <p className="text-sm uppercase text-muted-foreground mb-2">
            <FaCalendarAlt className="inline mr-1 mb-1" /> Target Completion Date
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "pl-3 text-left font-normal w-full",
                    !field.value && "text-muted-foreground"
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