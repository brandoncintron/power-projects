"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, FilterIcon, Clock } from "lucide-react";
import { ProjectWithDetails } from "../../ProjectTypes";
import CompactProjectCard from "./CompactProjectCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProjectGridProps {
  projects: ProjectWithDetails[];
  filterTags?: string[];
}

export default function ProjectGrid({
  projects,
  filterTags = ["All"]
}: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("newest");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // Filter by search query
    let result = projects.filter((p) => {
      if (!query) return true;
      return (
        p.projectName.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    });

    // Filter by application type
    if (activeFilter !== "All") {
      result = result.filter((p) => p.applicationType === activeFilter);
    }
    
    // Filter by status
    if (statusFilter !== "All") {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Sort by selected option
    return result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name_asc":
          return a.projectName.localeCompare(b.projectName);
        case "name_desc":
          return b.projectName.localeCompare(a.projectName);
        case "applicants":
          return (b._count.applicants || 0) - (a._count.applicants || 0);
        default:
          return 0;
      }
    });
  }, [projects, activeFilter, statusFilter, searchQuery, sortOption]);

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="mb-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-10 pr-4 h-9 bg-card"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <FilterIcon className="mr-2 h-4 w-4" />
                <span>Status: {statusFilter === "OPEN" ? "Open" : statusFilter === "CLOSED" ? "Closed" : "All"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Project Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="OPEN">Open</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="CLOSED">Closed</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        
          {/* Application Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <FilterIcon className="mr-2 h-4 w-4" />
                <span>Type: {activeFilter}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Application Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={activeFilter} onValueChange={setActiveFilter}>
                {filterTags.map((tag) => (
                  <DropdownMenuRadioItem key={tag} value={tag}>
                    {tag}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sort Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Clock className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name_asc">Name (A-Z)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name_desc">Name (Z-A)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="applicants">Most Applicants</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-md">
          <p className="text-gray-500">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <CompactProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
} 