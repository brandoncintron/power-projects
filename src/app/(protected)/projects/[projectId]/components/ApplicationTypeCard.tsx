"use client";

import { FileCode2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ApplicationTypeCardProps } from "@@/projects/types/types";

/* Application Type Card - Displays the project's application type */
export function ApplicationTypeCard({
  applicationType,
}: ApplicationTypeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
          Application Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <FileCode2 size={16} />
          <span>{applicationType}</span>
        </div>
      </CardContent>
    </Card>
  );
}
