import React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { SelectableCardProps } from "@@/create-project/types/types";

/**
 * Component used to display framework or database details
 */
export function SelectableCard({
  title,
  description,
  isSelected,
  isCustom = false,
  onClick,
  className,
  children,
}: SelectableCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground border-primary",
        isCustom && "border-primary",
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="text-lg flex items-center">{title}</CardTitle>
        {description && (
          <CardDescription className="mt-2">{description}</CardDescription>
        )}
        {children}
      </CardHeader>
    </Card>
  );
}
