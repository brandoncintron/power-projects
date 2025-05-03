import React from "react";

import {
  BarChart3,
  CheckCircle,
  FileCode2,
  MessageCircle,
  Users,
  XCircle,
} from "lucide-react";

import { getDatabaseIcon, getTechnologyIcon } from "@/lib/language-icons";

import { ProjectStatsProps } from "@@/projects/types/types";

export default function ProjectStats({ projects }: ProjectStatsProps) {
  // Calculate statistics
  const totalProjects = projects.length;
  const openProjects = projects.filter((p) => p.status === "OPEN").length;
  const closedProjects = totalProjects - openProjects;
  const totalApplicants = projects.reduce(
    (sum, project) => sum + (project._count?.applicants || 0),
    0,
  );

  // Count technologies used across all projects
  const frameworkCounts: Record<string, number> = {};
  const databaseCounts: Record<string, number> = {};

  projects.forEach((project) => {
    project.frameworks?.forEach((fw) => {
      const framework = fw.toLowerCase();
      frameworkCounts[framework] = (frameworkCounts[framework] || 0) + 1;
    });

    project.databases?.forEach((db) => {
      const database = db.toLowerCase();
      databaseCounts[database] = (databaseCounts[database] || 0) + 1;
    });
  });

  // Find most common framework and database
  let mostCommonFramework = { name: "None", count: 0 };
  let mostCommonDatabase = { name: "None", count: 0 };

  for (const [framework, count] of Object.entries(frameworkCounts)) {
    if (count > mostCommonFramework.count) {
      mostCommonFramework = { name: framework, count };
    }
  }

  for (const [database, count] of Object.entries(databaseCounts)) {
    if (count > mostCommonDatabase.count) {
      mostCommonDatabase = { name: database, count };
    }
  }

  // Format framework and database names for display
  const formatTechName = (name: string) => {
    if (name === "None") return name;
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Group projects by type
  const projectsByType = projects.reduce(
    (acc, project) => {
      const type = project.applicationType || "Other";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Find most common project type
  let mostCommonType = "None";
  let maxCount = 0;

  for (const [type, count] of Object.entries(projectsByType)) {
    if (count > maxCount) {
      mostCommonType = type;
      maxCount = count;
    }
  }

  return (
    <div className="bg-card rounded-xl p-6 mb-8 shadow-sm">
      <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
        <BarChart3 className="h-4 w-4" />
        Project Portfolio Stats
      </h3>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Projects Container */}
        <div className="w-full md:w-[40%] p-5 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-4">Project Overview</h4>

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Open Projects
                </span>
              </div>
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {openProjects}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/20">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  Closed Projects
                </span>
              </div>
              <span className="text-lg font-bold text-red-700 dark:text-red-300">
                {closedProjects}
              </span>
            </div>
          </div>
        </div>

        {/* Analytics Grid Container */}
        <div className="w-full md:w-[56%] p-5 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium mb-4">Portfolio Analytics</h4>

          <div className="grid grid-cols-2 gap-4">
            {/* Applicants Block */}
            <div className="col-span-1">
              <div className="flex items-center mb-2">
                <div className="mr-3 bg-violet-100 dark:bg-violet-900/30 p-2 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">Applicants</div>
                  <div className="text-xl font-bold">{totalApplicants}</div>
                </div>
              </div>
            </div>

            {/* Tech Stack Block */}
            <div className="col-span-1">
              <div className="flex items-center">
                <div className="mr-3 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                  <FileCode2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Top Frameworks & Databases
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {mostCommonFramework.name !== "None" && (
                  <div className="flex items-center text-sm">
                    <div className="mr-2 flex items-center justify-center w-5 h-5">
                      {getTechnologyIcon(mostCommonFramework.name)}
                    </div>
                    <div>
                      <span className="font-medium">
                        {formatTechName(mostCommonFramework.name)}
                      </span>
                    </div>
                  </div>
                )}

                {mostCommonDatabase.name !== "None" && (
                  <div className="flex items-center text-sm">
                    <div className="mr-2 flex items-center justify-center w-5 h-5">
                      {getDatabaseIcon(mostCommonDatabase.name)}
                    </div>
                    <div>
                      <span className="font-medium">
                        {formatTechName(mostCommonDatabase.name)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Type Block - Spans Full Width */}
            <div className="col-span-2 pt-4 mt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                    <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Most Common Type
                    </div>
                    <div className="text-lg font-bold break-words mt-1">
                      {mostCommonType === "None" ? "N/A" : mostCommonType}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded text-sm font-medium">
                    {maxCount} of {totalProjects}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {totalProjects > 0
                      ? `${Math.round((maxCount / totalProjects) * 100)}%`
                      : "0%"}{" "}
                    of projects
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
