"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useState } from "react";
import { handleWithdrawApplication } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProjectWithApplicationStatus } from "../DashboardTypes";
import { useLoading } from "@/components/ui/loading-context";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

interface ApplicationCardProps {
  project: ProjectWithApplicationStatus;
}

export function ApplicationCard({ project }: ApplicationCardProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [hasWithdrawn, setHasWithdrawn] = useState(false);
  const router = useRouter();
  const { showLoading } = useLoading();
  
  const applicationStatus = project.applicationStatus || "pending";

  const handleWithdraw = async () => {
    // Prevent multiple submissions
    if (isWithdrawing) return;
    
    // Set withdrawing state to show loading indicator right away
    setIsWithdrawing(true);
    
    try {
      const result = await handleWithdrawApplication(project.id);
      
      if (result.success) {
        // Add a 1000ms delay before showing success state and toast
        setTimeout(() => {
          toast.success("Application withdrawn successfully");
          setHasWithdrawn(true);
          setIsWithdrawing(false);
          router.refresh();
        }, 1000);
      } else {
        // Show error toast immediately
        toast.error(result.error || "Failed to withdraw application");
        setIsWithdrawing(false);
      }
    } catch (error) {
      console.error("Failed to withdraw application:", error);
      toast.error("An unexpected error occurred");
      setIsWithdrawing(false);
    }
  };

  return (
    <Card className="overflow-hidden h-full rounded-4xl">
      <CardContent className="px-3 sm:px-4 flex flex-col h-full">
        {/* Status Badge */}
        <div className="flex mb-2">
          {!hasWithdrawn ? (
            <Badge 
              variant="outline" 
              className={applicationStatus.toLowerCase() === "pending" 
                ? "bg-yellow-100 text-yellow-800 border-yellow-300" 
                : applicationStatus.toLowerCase() === "accepted"
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-red-100 text-red-800 border-red-300"
              }
            >
              {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1).toLowerCase()}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-slate-500 border-slate-300">
              Withdrawn
            </Badge>
          )}
        </div>
        
        {/* Project Name */}
        <h3 className="font-medium text-sm line-clamp-2 sm:text-base mb-1.5">{project.projectName}</h3>
        
        <div className="mb-1.5">
          <Badge variant="secondary" className="text-xs sm:text-sm px-2 whitespace-pre-wrap">
            {project.applicationType}
          </Badge>
        </div>
        
        {/* Timestamp - Full Width Row */}
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Clock size={12} className="mr-1" />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>
        
        {/* Buttons - Fixed width */}
        <div className="mt-auto">
          <div className="flex flex-col xl:flex-row xs:flex-col gap-2 lg:gap-3 justify-start w-fit">
            <Link href={`/projects/${project.id}`}>
              <Button 
                size="sm"
                variant="default"
                className="text-xs sm:text-sm py-1 h-auto sm:h-8 sm:w-fit w-[140px]"
                onClick={() => showLoading("Loading project details...")}
              >
                View Details
              </Button>
            </Link>
            
            {!hasWithdrawn && (
              <Button 
                size="sm"
                variant="destructive"
                className="text-xs sm:text-sm py-1 px-2 h-auto sm:h-8 sm:w-fit w-[140px]"
                onClick={handleWithdraw}
                disabled={isWithdrawing}
              >
                {isWithdrawing ? "Withdrawing..." : "Withdraw"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 