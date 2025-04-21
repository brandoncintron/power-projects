"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCode2, Users, Clock, CheckCircle2, ClockIcon, XCircle } from "lucide-react";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleWithdrawApplication } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProjectCardProps } from "../DashboardTypes";

/* Project Card - Displays individual project summary with metadata */
export function ProjectCard({ project, applicationStatus, isApplication = false }: ProjectCardProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const router = useRouter();

  // Define a function to render status badge based on application status
  const renderApplicationStatus = () => {
    if (!isApplication || !applicationStatus) return null;
    
    const statusMap: Record<string, { color: string, icon: JSX.Element }> = {
      pending: { 
        color: "bg-yellow-100 text-yellow-800 border-yellow-300", 
        icon: <ClockIcon size={12} className="text-yellow-600" />
      },
      accepted: { 
        color: "bg-green-100 text-green-800 border-green-300", 
        icon: <CheckCircle2 size={12} className="text-green-600" />
      },
      rejected: { 
        color: "bg-red-100 text-red-800 border-red-300", 
        icon: <XCircle size={12} className="text-red-600" />
      }
    };
    
    const status = statusMap[applicationStatus.toLowerCase()] || statusMap.pending;
    
    return (
      <Badge 
        variant="outline" 
        className={`whitespace-nowrap flex items-center gap-1 ${status.color}`}
      >
        {status.icon} {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1).toLowerCase()}
      </Badge>
    );
  };

  const handleWithdraw = async () => {
    try {
      setIsWithdrawing(true);
      const result = await handleWithdrawApplication(project.id);
      
      if (result.success) {
        router.refresh();
        setIsWithdrawing(false);
        toast.success("Application withdrawn successfully");
      } else {
        console.error("Error withdrawing application:", result.error);
        toast.error("Failed to withdraw application");
      }
    } catch (error) {
      console.error("Failed to withdraw application:", error);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <Card key={project.id} className="relative p-2">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <Badge
            variant="secondary"
            className="whitespace-nowrap flex items-center gap-1"
          >
            <FileCode2 size={12} /> {project.applicationType}
          </Badge>
          <Badge
            variant="outline"
            className="whitespace-nowrap flex items-center gap-1"
          >
            <Users size={12} />{" "}
            {project.visibility.charAt(0).toUpperCase() +
              project.visibility.slice(1).toLowerCase()}
          </Badge>
          {renderApplicationStatus()}
        </div>
        <h3 className="text-lg font-semibold mb-1">{project.projectName}</h3>
        <p className="text-sm line-clamp-2 mb-2">{project.description}</p>
        <div className="flex items-center text-xs gap-1 text-muted-foreground">
          <Clock size={12} />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>

        <Link href={`/projects/${project.id}`} passHref legacyBehavior>
          <Button asChild size="sm" variant="default" className="mt-3">
            <a>View Details</a>
          </Button>
        </Link>
        {isApplication && (
          <Button 
            size="sm" 
            variant="destructive" 
            className="mt-3 ml-2"
            onClick={handleWithdraw}
            disabled={isWithdrawing}
          >
            {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
