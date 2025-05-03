"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DescriptionCardProps } from "@@/projects/types/types";

/* Description Card - Displays the project description */
export function DescriptionCard({ description }: DescriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
