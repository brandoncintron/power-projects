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
  const [pendingActions, setPendingActions] = useState<{[key: string]: {accept?: boolean, deny?: boolean}}>({});
  const [completedActions, setCompletedActions] = useState<{[key: string]: 'accepted' | 'rejected'}>({});
  const router = useRouter();

  const onAccept = async (userId: string) => {
    try {
      setPendingActions(prev => ({...prev, [userId]: {...prev[userId], accept: true}}));
      const result = await acceptProjectApplication(projectId, userId);
      
      if (result.success) {
        setCompletedActions(prev => ({...prev, [userId]: 'accepted'}));
        toast.success("Application accepted successfully");
        
        // Allow UI to update before refreshing
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        toast.error(result.error || "Failed to accept application");
        console.error("Error accepting application:", result.error);
      }
    } catch (error) {
      console.error("Failed to accept application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setPendingActions(prev => ({...prev, [userId]: {...prev[userId], accept: false}}));
    }
  };

  const onDeny = async (userId: string) => {
    try {
      setPendingActions(prev => ({...prev, [userId]: {...prev[userId], deny: true}}));
      const result = await denyProjectApplication(projectId, userId);
      
      if (result.success) {
        setCompletedActions(prev => ({...prev, [userId]: 'rejected'}));
        toast.success("Application rejected");
        
        // Allow UI to update before refreshing
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        toast.error(result.error || "Failed to reject application");
        console.error("Error rejecting application:", result.error);
      }
    } catch (error) {
      console.error("Failed to reject application:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setPendingActions(prev => ({...prev, [userId]: {...prev[userId], deny: false}}));
    }
  };

  // Filter out applicants that have been accepted or rejected
  const filteredApplicants = applicants.filter(
    applicant => !completedActions[applicant.userId]
  );

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
          applicants={filteredApplicants}
          onAccept={onAccept}
          onDeny={onDeny}
          pendingActions={pendingActions}
        />
      </div>
    </div>
  );
}
