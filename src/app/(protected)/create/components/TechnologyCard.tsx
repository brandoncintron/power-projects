"use client";

import React from "react";

import { CheckCircle } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { technologyIconMap } from "@/lib/technology-icons";
import { cn } from "@/lib/utils";

import { SelectableCardProps } from "../types/types";

export function SelectableCard({
  item,
  isSelected,
  onToggle,
}: SelectableCardProps) {
  const icon = technologyIconMap[item.name.toLowerCase()];

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full",
        isSelected && "border-primary ring-2 ring-primary ring-inset",
      )}
      onClick={() => onToggle(item.name)}
    >
      <CardHeader className="flex h-full flex-col justify-between p-4">
        {/* Top row */}
        <div className="flex w-full items-center">
          <div className="flex min-w-0 items-center space-x-2">
            {icon && <div className="shrink-0">{icon}</div>}
            <div className="flex min-w-0 items-center space-x-2">
              <CardTitle className="truncate text-md leading-tight">
                {item.name}
              </CardTitle>
              <div className="flex shrink-0 items-center space-x-1.5">
                {item.primaryLanguages?.map((lang) => {
                  const langIcon = technologyIconMap[lang.toLowerCase()];

                  if (
                    icon &&
                    langIcon &&
                    React.isValidElement(icon) &&
                    React.isValidElement(langIcon) &&
                    icon.type === langIcon.type
                  ) {
                    return null;
                  }

                  return langIcon ? (
                    <Tooltip key={lang} delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div>{langIcon}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Primary Language:{" "}
                          <span className="font-semibold">{lang}</span>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ) : null;
                })}
              </div>
            </div>
          </div>
          <div className="ml-auto pl-2">
            <div className="h-6 w-6 shrink-0">
              {isSelected && (
                <CheckCircle className="h-full w-full text-primary" />
              )}
            </div>
          </div>
        </div>
        {/* Bottom row */}
        <CardDescription className="mt-2 text-muted-foreground/80">
          {item.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
