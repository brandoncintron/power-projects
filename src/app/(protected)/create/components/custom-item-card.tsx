"use client";

import React from "react";

import { FileCode2, X } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { technologyIconMap } from "@/lib/technology-icons";
import { cn } from "@/lib/utils";

export interface CustomItemCardProps {
  name: string;
  onRemove: (name: string) => void;
}

export function CustomItemCard({ name, onRemove }: CustomItemCardProps) {
  const icon = technologyIconMap[name.toLowerCase()] || <FileCode2 size={24} />;

  return (
    <Card
      className={cn(
        "transition-all duration-200 border-primary ring-2 ring-primary ring-inset",
      )}
    >
      <CardHeader className="flex h-full flex-col justify-between p-4">
        <div className="flex w-full items-center">
          <div className="flex min-w-0 items-center space-x-2">
            {icon && <div className="shrink-0">{icon}</div>}
            <div className="flex min-w-0 items-center space-x-2">
              <CardTitle className="truncate text-md leading-tight">
                {name}
              </CardTitle>
            </div>
          </div>
          <div className="ml-auto pl-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(name);
              }}
              className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <CardDescription className="mt-2">Custom item</CardDescription>
      </CardHeader>
    </Card>
  );
}
