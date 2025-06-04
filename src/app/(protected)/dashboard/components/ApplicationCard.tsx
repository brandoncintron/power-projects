"use client";

import { Clock, Loader } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/ui/loading-context";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

import { useWithdrawApplication } from "@@/dashboard/hooks/useWithdrawApplication";
import { ApplicationCardProps } from "@@/dashboard/types/types";

export function ApplicationCard({ project }: ApplicationCardProps) {
  const { isWithdrawing, hasWithdrawn, withdrawApplication } =
    useWithdrawApplication();
  const { showLoading } = useLoading();

  const applicationStatus = project.applicationStatus || "pending";

  const handleWithdraw = () => withdrawApplication(project.id);

  return (
    <div className="flex items-center justify-between h-[42px] py-1 px-3 hover:bg-muted/10 transition-colors">
      {/* Left section: Project name and application type */}
      <div className="flex items-center min-w-0 gap-3 flex-1 overflow-hidden">
        {/* Status Badge */}
        <Badge
          variant="outline"
          className={`shrink-0 h-5 ${
            !hasWithdrawn
              ? applicationStatus.toLowerCase() === "pending"
                ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                : applicationStatus.toLowerCase() === "accepted"
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-red-100 text-red-800 border-red-300"
              : "text-slate-500 border-slate-300"
          }`}
        >
          {!hasWithdrawn ? <Clock /> : "Withdrawn"}
        </Badge>

        {/* Project Name (as link) */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <Link
            href={`/projects/${project.id}`}
            onClick={() => showLoading("Loading project details...")}
            className="text-sm font-medium hover:underline line-clamp-1"
          >
            {project.projectName}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="truncate w-fit">{project.applicationType}</span>
            <span className="hidden xs:flex items-center whitespace-nowrap">
              <Clock size={10} className="mr-1 shrink-0" />
              {formatRelativeTime(project.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Right section: Withdraw button */}
      {!hasWithdrawn && (
        <Button
          size="sm"
          variant="ghost"
          className="text-xs h-6 px-2 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 ml-1.5 shrink-0"
          onClick={handleWithdraw}
          disabled={isWithdrawing}
        >
          {isWithdrawing ? (
            <Loader className="h-3 w-3 animate-spin" />
          ) : (
            "Withdraw"
          )}
        </Button>
      )}
    </div>
  );
}
