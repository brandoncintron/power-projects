"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Applicants } from "../../ProjectTypes";


interface ProjectApplicantsListProps {
  applicants: Applicants[];
  // Placeholder functions for actions - implement logic in parent or here later
  //onAccept: (userId: string) => void;
  //onDeny: (userId: string) => void;
}

export function ProjectApplicantsList({
  applicants,
  //onAccept,
  //onDeny,
}: ProjectApplicantsListProps) {

  if (!applicants || applicants.length === 0) {
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
        <CardTitle>Applicants ({applicants.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant.userId}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-md bg-card"
          >
            {/* Applicant Info */}
            <div className="mb-2 sm:mb-0">
              <p className="text-sm font-medium text-foreground">
                {applicant.user.username} is requesting to collaborate on your project.
              </p>
              <p className="text-xs text-muted-foreground">
                Applied: {applicant.appliedAt.toLocaleDateString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Status: <span className="capitalize">{applicant.status || "Pending"}</span>
              </p>
            </div>

            {/* Action Buttons */}
            {/* TODO: Conditionally render buttons based on status */}
            {applicant.status?.toLowerCase() === 'pending' && ( // Example: Only show for pending
                <div className="flex space-x-2 mt-2 sm:mt-0 self-end sm:self-center">
                <Button
                    variant="outline"
                    size="sm"
                    //onClick={() => onAccept(applicant.userId)}
                    aria-label={`Accept application from ${applicant.userId}`}
                >
                    Accept
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    //onClick={() => onDeny(applicant.userId)}
                    aria-label={`Deny application from ${applicant.userId}`}
                >
                    Deny
                </Button>
                </div>
             )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}