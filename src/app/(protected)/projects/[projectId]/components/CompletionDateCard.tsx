"use client";

import { Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CompletionDateCardProps } from "@@/projects/types/types";

/* Completion Date Card - Displays the project's target completion date */
export function CompletionDateCard({
  completionDate,
}: CompletionDateCardProps) {
  if (!completionDate) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
          Target Completion Date
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>
            {new Date(completionDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
