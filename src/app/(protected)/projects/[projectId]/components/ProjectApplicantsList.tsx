"use client";

import React from "react";

import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ProjectApplicantsListProps } from "@@/projects/types/types";

export function ProjectApplicantsList({
  applicants,
  onAccept,
  onDeny,
  pendingActions = {},
}: ProjectApplicantsListProps) {
  // Filter to only show pending applications
  const pendingApplicants = applicants.filter(
    (applicant) => applicant.status?.toLowerCase() === "pending",
  );

  if (!pendingApplicants || pendingApplicants.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            There are currently no pending applications for this project.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicants ({pendingApplicants.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingApplicants.map((applicant) => (
          <div
            key={applicant.userId}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-md bg-card"
          >
            {/* Applicant Info */}
            <div className="mb-2 sm:mb-0">
              <p className="text-sm font-medium text-foreground">
                {applicant.user.username} is requesting to join your project.
              </p>
              <p className="text-xs text-muted-foreground">
                Applied: {applicant.appliedAt.toLocaleDateString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Status:{" "}
                <span className="capitalize">
                  {applicant.status || "Pending"}
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-2 sm:mt-0 self-end sm:self-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAccept(applicant.userId)}
                disabled={
                  !!pendingActions[applicant.userId]?.accept ||
                  !!pendingActions[applicant.userId]?.deny
                }
                aria-label={`Accept application from ${applicant.user.username || applicant.userId}`}
              >
                {pendingActions[applicant.userId]?.accept && (
                  <Loader className="mr-2 h-3 w-3 animate-spin" />
                )}
                Accept
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeny(applicant.userId)}
                disabled={
                  !!pendingActions[applicant.userId]?.accept ||
                  !!pendingActions[applicant.userId]?.deny
                }
                aria-label={`Deny application from ${applicant.user.username || applicant.userId}`}
              >
                {pendingActions[applicant.userId]?.deny && (
                  <Loader className="mr-2 h-3 w-3 animate-spin" />
                )}
                Deny
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
