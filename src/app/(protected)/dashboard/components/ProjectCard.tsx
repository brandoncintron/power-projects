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
import { useLoading } from "@/components/ui/loading-context";

/* Project Card - Displays individual project summary with metadata */
export function ProjectCard({ project, applicationStatus, isApplication = false }: ProjectCardProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const router = useRouter();
  const { showLoading } = useLoading();

  // Define a function to render status badge based on application status
  const renderApplicationStatus = () => {
    if (!isApplication || !applicationStatus) return null;
    
    const statusMap: Record<string, { color: string, icon: JSX.Element }> = {
      pending: { 
        color: "bg-yellow-100 text-yellow-800 border-yellow-300", 
        icon: <ClockIcon size={10} className="text-yellow-600" />
      },
      accepted: { 
        color: "bg-green-100 text-green-800 border-green-300", 
        icon: <CheckCircle2 size={10} className="text-green-600" />
      },
      rejected: { 
        color: "bg-red-100 text-red-800 border-red-300", 
        icon: <XCircle size={10} className="text-red-600" />
      }
    };
    
    const status = statusMap[applicationStatus.toLowerCase()] || statusMap.pending;
    
    return (
      <Badge 
        variant="outline" 
        className={`whitespace-nowrap flex items-center gap-1 text-xs py-0.5 px-1.5 ${status.color}`}
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
    <Card key={project.id} className="relative p-1 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex flex-wrap items-center gap-1.5 mb-2 text-xs">
          <Badge
            variant="secondary"
            className="whitespace-nowrap flex items-center gap-1 text-xs py-0.5 px-1.5"
          >
            <FileCode2 size={10} /> {project.applicationType}
          </Badge>
          <Badge
            variant="outline"
            className="whitespace-nowrap flex items-center gap-1 text-xs py-0.5 px-1.5"
          >
            <Users size={10} />{" "}
            {project.visibility.charAt(0).toUpperCase() +
              project.visibility.slice(1).toLowerCase()}
          </Badge>
          {renderApplicationStatus()}
        </div>
        <h3 className="text-base font-semibold mb-0.5 line-clamp-1">{project.projectName}</h3>
        <p className="text-xs line-clamp-2 mb-1.5">{project.description}</p>
        <div className="flex items-center text-xs gap-1 text-muted-foreground mb-2">
          <Clock size={10} />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Link href={`/projects/${project.id}`} passHref legacyBehavior>
            <Button 
              asChild 
              size="sm" 
              variant="default" 
              className="h-7 text-xs px-2"
              onClick={() => showLoading("Loading project details...")}
            >
              <a>View Details</a>
            </Button>
          </Link>
          {isApplication && (
            <Button 
              size="sm" 
              variant="destructive" 
              className="h-7 text-xs px-2"
              onClick={handleWithdraw}
              disabled={isWithdrawing}
            >
              {isWithdrawing ? "Withdrawing..." : "Withdraw"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
