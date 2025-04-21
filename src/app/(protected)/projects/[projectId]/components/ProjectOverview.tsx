"use client";

import { getTechnologyIcon, getDatabaseIcon } from "@/lib/language-icons";
import { TeamMembersCard } from "./TeamMembersCard";
import { ProjectOverviewProps } from "../../ProjectTypes";
import {
  FaCalendarAlt,
  FaCode,
  FaDatabase,
  FaCube,
} from "react-icons/fa";

export function ProjectOverview({
  applicationType,
  frameworks,
  databases,
  description,
  completionDate,
  owner,
  collaborators = [],
  isOwner = false,
  projectId = "",
}: ProjectOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-card border p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold">Project Overview</h1>

        {/* Main Content: Two-column layout */}
        <div className="grid gap-8 md:grid-cols-3 mt-8">
          {/* Left Column: Description and Applications */}
          <div className="md:col-span-2 space-y-6">
            {/* Description Card */}
            <div className="p-6 bg-card shadow-sm border rounded-md">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{description}</p>
            </div>           
          </div>

          {/* Right Column: Project Details + Team */}
          <div className="space-y-6">
            <div className="p-6 bg-card shadow-sm border rounded-md">
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              <div className="space-y-4">
                {/* Application Type */}
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                  <FaCube className="inline mr-2 mb-1" /> Application Type
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span>{applicationType}</span>
                  </div>
                </div>

                {/* Frameworks & Technologies */}
                {frameworks && frameworks.length > 0 && (
                  <div>
                    <p className="text-sm uppercase text-muted-foreground">
                    <FaCode className="inline mr-2 mb-1" /> Frameworks &amp; Technologies
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {frameworks.map((fw) => (
                        <div
                          key={fw}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                        >
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                            {getTechnologyIcon(fw.toLowerCase())}
                          </div>
                          <span className="font-medium">{fw.charAt(0).toUpperCase() + fw.slice(1).toLowerCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Databases */}
                {databases && databases.length > 0 && (
                  <div>
                    <p className="text-sm uppercase text-muted-foreground">
                    <FaDatabase className="inline mr-2 mb-1" /> Databases
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {databases.map((db) => (
                        <div
                          key={db}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                        >
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                            {getDatabaseIcon(db)}
                          </div>
                          <span className="font-medium">{db}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completion Date */}
                {completionDate && (
                  <div>
                    <p className="text-sm uppercase text-muted-foreground">
                    <FaCalendarAlt className="inline mr-1 mb-1" /> Target Completion Date
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      
                      <span>
                        {new Date(completionDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Team Members Card */}
            <TeamMembersCard 
              owner={owner} 
              collaborators={collaborators} 
              isOwner={isOwner}
              projectId={projectId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
