"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { TeamMembersCard } from "./TeamMembersCard";
import { Owner, Applicants, Collaborator } from "../../ProjectTypes";
import { ProjectApplicantsList } from "./ProjectApplicantsList";
import { acceptProjectApplication, denyProjectApplication } from "../actions";

interface ProjectApplicationSectionProps {
  owner: Owner;
  applicants: Applicants[];
  collaborators?: Collaborator[];
  projectId: string;
}

/* Project Applications Section - Organizes team members and project applicants */
export function ProjectApplicationsSection({ 
  owner, 
  applicants, 
  collaborators = [],
  projectId 
}: ProjectApplicationSectionProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onAccept = async (userId: string) => {
    try {
      setIsPending(true);
      const result = await acceptProjectApplication(projectId, userId);
      
      if (result.success) {
        toast.success("Application accepted successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to accept application");
        console.error("Error accepting application:", result.error);
      }
    } catch (error) {
      console.error("Failed to accept application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const onDeny = async (userId: string) => {
    try {
      setIsPending(true);
      const result = await denyProjectApplication(projectId, userId);
      
      if (result.success) {
        toast.success("Application rejected");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to reject application");
        console.error("Error rejecting application:", result.error);
      }
    } catch (error) {
      console.error("Failed to reject application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="">
      {/* Team members section */}
      <div className="grid gap-6 md:grid-cols-2">
        <TeamMembersCard 
          owner={owner} 
          collaborators={collaborators}
          isOwner={true}
          projectId={projectId}
        />
        <ProjectApplicantsList
          applicants={applicants}
          onAccept={onAccept}
          onDeny={onDeny}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
