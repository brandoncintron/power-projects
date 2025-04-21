"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProjectListItem from "./ProjectListItem";
import { FilteredProjectListProps, ProjectWithDetails } from "../../ProjectTypes";

export default function FilteredProjectList({
  projects,
  filterTags,
  userApplications = [],
  userCollaborations = [],
  userId,
}: FilteredProjectListProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Memoized filtered projects based on search query and active filter
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const searchedProjects = projects.filter((p: ProjectWithDetails) => {
      if (!query) return true;
      return (
        p.projectName.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    });

    if (activeFilter === "All") {
      return searchedProjects;
    }
    return searchedProjects.filter((p: ProjectWithDetails) => p.applicationType === activeFilter);
  }, [projects, activeFilter, searchQuery]);

  const handleFilterClick = (tag: string) => {
    setActiveFilter(tag);
  };

  return (
    <>
      {/* Search Input */}
      <div className="relative w-full md:w-1/2 lg:w-1/3 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search projects by name or description..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter Tags Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b">
        <span className="text-sm font-medium mr-2">
          Filter by application type:
        </span>
        {filterTags.map((tag: string) => (
          <Button
            key={tag}
            variant={activeFilter === tag ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterClick(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Project List or Messages */}
      {/* If there are no projects to show */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-10 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <p>No projects found.</p>
        </div>
      )}

      {/* Render the filtered list */}
      {filteredProjects.length > 0 && (
        <div className="space-y-6">
          {filteredProjects.map((project: ProjectWithDetails) => (
            <div key={project.id} className="relative">
              <ProjectListItem 
                project={project} 
                hasApplied={userApplications.includes(project.id)}
                isCollaborator={userCollaborations.includes(project.id)} 
                userId={userId}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
