"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileCode2, 
  Globe, 
  Lock, 
  GraduationCap, 
  Users, 
  Clock,
  ExternalLink,
  Pencil,
  MoreHorizontal,
  MessageCircle,
  Trash2
} from "lucide-react";
import { ProjectWithDetails } from "../../ProjectTypes";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useLoading } from "@/components/ui/loading-context";
import { deleteProject } from "../actions";
import { toast } from "sonner";

export default function CompactProjectCard({
  project,
}: {
  project: ProjectWithDetails;
}) {
  const router = useRouter();
  const { showLoading } = useLoading();
  const isOpen = project.status === "OPEN";
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Calculate member statistics for display
  const memberCount = (project._count?.collaborators ?? 0) + 1;
  const applicantCount = project._count?.applicants ?? 0;

  const getVisibilityIcon = () => {
    if (project.visibility === "PRIVATE") return <Lock className="h-3.5 w-3.5" />;
    if (project.visibility === "UNIVERSITY") return <GraduationCap className="h-3.5 w-3.5" />;
    return <Globe className="h-3.5 w-3.5" />;
  };

  const getStatusColor = () => {
    return isOpen 
      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
  };
  
  const getVisibilityColor = () => {
    if (project.visibility === "PRIVATE")
      return "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    if (project.visibility === "UNIVERSITY")
      return "bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
    return "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
  };
  
  const handleCardClick = () => {
    showLoading("Loading project details...");
    router.push(`/projects/${project.id}`);
  };
  
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking on the menu
  };

  const openDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      showLoading("Deleting project...");
      const result = await deleteProject(project.id);
      
      if (result.success) {
        toast.success("Project deleted successfully");
        window.location.reload();
      } else {
        setIsDeleting(false);
        setShowDeleteDialog(false);
        toast.error(result.error || "Failed to delete project");
      }
    } catch (error) {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      toast.error("An error occurred while deleting the project");
      console.error(error);
    }
  };

  return (
    <>
      <div 
        className="border rounded-lg p-3 hover:shadow-md transition-shadow duration-200 cursor-pointer relative bg-card"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-start mb-2">
          {/* Project name and badges */}
          <div className="flex-1 mr-2">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-medium text-base line-clamp-1">{project.projectName}</h3>
            </div>
            
            {/* Project type and application type */}
            <div className="flex flex-wrap gap-1 mb-1.5">
              <Badge
                variant="secondary"
                className={`text-xs py-0 px-2 h-5 ${getStatusColor()}`}
              >
                {isOpen ? "Open" : "Closed"}
              </Badge>
              
              <Badge
                variant="secondary"
                className={`text-xs py-0 px-2 h-5 flex items-center gap-1 ${getVisibilityColor()}`}
              >
                {getVisibilityIcon()}
                <span className="text-xs">{project.visibility.charAt(0) + project.visibility.slice(1).toLowerCase()}</span>
              </Badge>
              
              <Badge
                variant="outline"
                className="text-xs py-0 px-2 h-5 flex items-center gap-1"
              >
                <FileCode2 className="h-3 w-3" />
                <span>{project.applicationType}</span>
              </Badge>
            </div>
            
            {/* Truncated description */}
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.description || "No description provided."}
            </p>
          </div>
          
          {/* Actions dropdown */}
          <div onClick={handleMenuClick}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    showLoading("Loading edit page...");
                    router.push(`/projects/${project.id}/edit`);
                  }}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    showLoading("Loading project details...");
                    router.push(`/projects/${project.id}`);
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                {applicantCount > 0 && (
                  <DropdownMenuItem
                    onClick={() => {
                      showLoading("Loading applications...");
                      router.push(`/projects/${project.id}/applications`);
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manage {applicantCount} Applicant{applicantCount !== 1 ? 's' : ''}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={openDeleteDialog}
                  className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Stats footer */}
        <div className="flex justify-between items-center text-xs text-muted-foreground pt-1 border-t">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{memberCount} member{memberCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{applicantCount} applicant{applicantCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatRelativeTime(project.createdAt)}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => e.stopPropagation()}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit Project
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => e.stopPropagation()}
          >
            <Users className="h-4 w-4 mr-1" />
            Manage Applications
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{project.projectName}&quot;? This action cannot be undone and will permanently remove the project, all applications, and collaborator associations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 