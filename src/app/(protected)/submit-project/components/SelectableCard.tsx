import React, { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SelectableCardProps {
  title: ReactNode;
  description?: ReactNode;
  isSelected: boolean;
  isCustom?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

/**
 * A card component that can be selected (highlighted when clicked)
 * Used for framework and database selection
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
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="text-lg flex items-center">
          {title}
        </CardTitle>
        {description && <CardDescription className="mt-2">{description}</CardDescription>}
        {children}
      </CardHeader>
    </Card>
  );
} 