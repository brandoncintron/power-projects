"use client";

import React from "react";

import {
  Clock,
  ExternalLink,
  FileCode2,
  Globe,
  GraduationCap,
  Lock,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDatabaseIcon, getTechnologyIcon } from "@/lib/language-icons";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

import { ConfirmDialog } from "@@/projects/my-projects/components/ConfirmDialog";
import { useProjectActions } from "@@/projects/my-projects/hooks/useProjectActions";
import { ProjectWithDetails } from "@@/projects/types/types";

export default function CompactProjectCard({
  project,
}: {
  project: ProjectWithDetails;
}) {
  const {
    isProjectOpen,
    showConfirmDialog,
    setShowConfirmDialog,
    currentAction,
    memberCount,
    applicantCount,
    handleMenuClick,
    openConfirmDialog,
    navigateToProject,
    navigateToEditProject,
  } = useProjectActions(project);

  // Get visibility icon based on project visibility
  const getVisibilityIcon = () => {
    if (project.visibility === "PRIVATE")
      return <Lock className="h-3.5 w-3.5" />;
    if (project.visibility === "UNIVERSITY")
      return <GraduationCap className="h-3.5 w-3.5" />;
    return <Globe className="h-3.5 w-3.5" />;
  };

  // Get color styling based on project visibility
  const getVisibilityColor = () => {
    if (project.visibility === "PRIVATE")
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/40";
    if (project.visibility === "UNIVERSITY")
      return "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800/40";
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/40";
  };

  return (
    <>
      <div className="relative rounded-xl overflow-hidden transition-all duration-200 bg-card hover:shadow-lg h-auto min-h-[230px] flex flex-col">
        {/* Status Indicator (Top Border) */}
        <div
          className={`h-1.5 w-full ${isProjectOpen ? "bg-emerald-500/70 dark:bg-emerald-600/70" : "bg-red-500/70 dark:bg-red-600/70"}`}
        ></div>

        {/* Card Content */}
        <div className="p-5 flex-1">
          {/* Project Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1.5 flex items-center truncate">
                {project.projectName}
                {!isProjectOpen && (
                  <span className="ml-2 text-red-500 dark:text-red-400 text-xs font-medium flex items-center gap-0.5 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded-full">
                    <XCircle className="h-3 w-3" />
                    Closed
                  </span>
                )}
              </h3>
            </div>

            {/* Quick Actions */}
            <div onClick={handleMenuClick} className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted cursor-pointer"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={openConfirmDialog("delete")}
                    className="text-red-600 dark:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Type and Visibility Badge */}
          <div className="flex flex-wrap gap-1.5 mb-2 cursor-default">
            <Badge
              variant="outline"
              className={`text-xs py-0.5 px-2 flex items-center gap-1 ${getVisibilityColor()}`}
            >
              {getVisibilityIcon()}
              <span>
                {project.visibility.charAt(0) +
                  project.visibility.slice(1).toLowerCase()}
              </span>
            </Badge>

            <Badge
              variant="outline"
              className="text-xs py-0.5 px-2 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <FileCode2 className="h-3.5 w-3.5" />
              <span>{project.applicationType}</span>
            </Badge>
          </div>

          {/* Languages and Frameworks */}
          <div className="flex flex-wrap gap-1.5 mb-4 cursor-default">
            {project.frameworks?.map((framework, index) => (
              <Badge
                key={`framework-${index}`}
                variant="outline"
                className="text-xs py-0.5 px-2 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/40"
              >
                <span className="flex items-center gap-1">
                  {getTechnologyIcon(framework)}
                  {framework}
                </span>
              </Badge>
            ))}
            {project.databases?.map((database, index) => (
              <Badge
                key={`database-${index}`}
                variant="outline"
                className="text-xs py-0.5 px-2 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800/40"
              >
                <span className="flex items-center gap-1">
                  {getDatabaseIcon(database)}
                  {database}
                </span>
              </Badge>
            ))}
          </div>

          {/* Stats & Info */}
          <div className="grid grid-cols-3 gap-2 mt-auto text-xs border-t border-b py-3 cursor-default">
            <div className="flex flex-col items-center">
              <div className="text-muted-foreground mb-1">Members</div>
              <div className="flex items-center font-medium">
                <Users className="h-3.5 w-3.5 mr-1 text-indigo-500" />
                {memberCount}
              </div>
            </div>
            <div className="flex flex-col items-center border-l border-r px-2">
              <div className="text-muted-foreground mb-1">Applicants</div>
              <div className="flex items-center font-medium">
                <MessageCircle className="h-3.5 w-3.5 mr-1 text-violet-500" />
                {applicantCount}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-muted-foreground mb-1">Created</div>
              <div className="flex items-center font-medium">
                <Clock className="h-3.5 w-3.5 mr-1 text-amber-500" />
                {formatRelativeTime(project.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex border-t bg-muted/30 mt-auto">
          <Button
            variant="ghost"
            className="flex-1 rounded-none h-11 text-xs font-medium hover:bg-muted py-1 border-r cursor-pointer"
            onClick={navigateToProject}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            View
          </Button>

          <Button
            variant="ghost"
            className="flex-1 rounded-none h-11 text-xs font-medium hover:bg-muted py-1 border-r cursor-pointer"
            onClick={navigateToEditProject}
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>

          {isProjectOpen ? (
            <Button
              variant="ghost"
              className="flex-1 rounded-none h-11 text-xs font-medium hover:bg-amber-50 dark:hover:bg-amber-950/30 text-amber-700 dark:text-amber-400 py-1 cursor-pointer"
              onClick={openConfirmDialog("close")}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Close
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="flex-1 rounded-none h-11 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/30 text-red-700 dark:text-red-400 py-1 cursor-pointer"
              onClick={openConfirmDialog("delete")}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          setIsOpen={setShowConfirmDialog}
          project={project}
          actionType={currentAction}
        />
      )}
    </>
  );
}
