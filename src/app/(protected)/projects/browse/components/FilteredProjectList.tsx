"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProjectListItem, { ProjectWithDetails } from "./ProjectListItem";

interface FilteredProjectListProps {
  projects: ProjectWithDetails[];
  filterTags: string[];
}

export default function FilteredProjectList({
  projects,
  filterTags,
}: FilteredProjectListProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All"); // Active filter
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Memoize the filtered list to avoid re-calculating on every render
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const searchedProjects = projects.filter((p) => {
      if (!query) return true; // If query is empty, don't filter by search yet
      return (
        p.projectName.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        p.applicationType.toLowerCase().startsWith(query) // Optionally search type
      );
    });

    if (activeFilter === "All") {
      return searchedProjects; // Show all projects if 'All' is selected
    }
    // Filter projects based on the active applicationType
    return searchedProjects.filter((p) => p.applicationType === activeFilter);
  }, [projects, activeFilter, searchQuery]); // Dependencies: re-filter when projects or activeFilter change

  const handleFilterClick = (tag: string) => {
    setActiveFilter(tag);
  };

  return (
    <>
      {/* Search Input */}
      <div className="relative w-full md:w-1/2 lg:w-1/3 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search projects by name, description, owner..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter Tags Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b">
        <span className="text-sm font-medium text-gray-600 mr-2">
          Filter by:
        </span>
        {filterTags.map((tag) => (
          <Button
            key={tag}
            // Change variant based on active filter
            variant={activeFilter === tag ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterClick(tag)} // Set active filter on click
            className="transition-colors duration-150" // Add transition
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Project List or Messages */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-md">
          <p>No public projects found matching your criteria.</p>
        </div>
      )}

      {/* Render the filtered list */}
      {filteredProjects.length > 0 && (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="relative">
              <ProjectListItem project={project} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
