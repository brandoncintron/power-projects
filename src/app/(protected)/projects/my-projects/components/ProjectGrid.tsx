"use client";

import React from "react";

import { ArrowUpDown, FilterIcon, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import CompactProjectCard from "@@/projects/my-projects/components/CompactProjectCard";
import { useProjectFiltersAndSort } from "@@/projects/my-projects/hooks/useProjectFiltersAndSort";
import { ProjectGridProps } from "@@/projects/types/types";

export default function ProjectGrid({
  projects,
  filterTags = ["All"],
}: ProjectGridProps) {
  const router = useRouter();
  const {
    searchQuery,
    projectTypeFilter,
    projectStatusFilter,
    sortOption,
    filteredAndSortedProjects,
    hasActiveFilters,
    handleSearchChange,
    setProjectTypeFilter,
    setProjectStatusFilter,
    setSortOption,
  } = useProjectFiltersAndSort(projects);

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="bg-card/60 rounded-xl p-4 mb-6 border shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search project names or descriptions..."
              className="pl-10 pr-4 h-10 bg-background"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 bg-background"
                >
                  <FilterIcon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Status:</span>{" "}
                  {projectStatusFilter === "OPEN"
                    ? "Open"
                    : projectStatusFilter === "CLOSED"
                      ? "Closed"
                      : "All"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={projectStatusFilter}
                  onValueChange={setProjectStatusFilter}
                >
                  <DropdownMenuRadioItem value="All">
                    All Projects
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="OPEN">
                    Open Projects
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="CLOSED">
                    Closed Projects
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Application Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 bg-background"
                >
                  <FilterIcon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Type:</span>{" "}
                  {projectTypeFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={projectTypeFilter}
                  onValueChange={setProjectTypeFilter}
                >
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
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 bg-background"
                >
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort Projects</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={sortOption}
                  onValueChange={setSortOption}
                >
                  <DropdownMenuRadioItem value="newest">
                    Newest First
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">
                    Oldest First
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name_asc">
                    Name (A-Z)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name_desc">
                    Name (Z-A)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="applicants">
                    Most Applicants
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
            <div className="text-xs text-muted-foreground mr-1 flex items-center">
              Active filters:
            </div>

            {searchQuery && (
              <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center">
                Search: &quot;{searchQuery}&quot;
                <button
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  onClick={() =>
                    handleSearchChange({
                      target: { value: "" },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </button>
              </div>
            )}

            {projectTypeFilter !== "All" && (
              <div className="text-xs bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full flex items-center">
                Type: {projectTypeFilter}
                <button
                  className="ml-1 hover:bg-indigo-200 dark:hover:bg-indigo-800/30 rounded-full p-0.5"
                  onClick={() => setProjectTypeFilter("All")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </button>
              </div>
            )}

            {projectStatusFilter !== "All" && (
              <div className="text-xs bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full flex items-center">
                Status: {projectStatusFilter === "OPEN" ? "Open" : "Closed"}
                <button
                  className="ml-1 hover:bg-emerald-200 dark:hover:bg-emerald-800/30 rounded-full p-0.5"
                  onClick={() => setProjectStatusFilter("All")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Project Cards */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="col-span-full text-center py-12 border rounded-xl bg-muted/30">
            <p className="text-muted-foreground">
              {hasActiveFilters
                ? "No projects match your filters."
                : "You haven't created any projects yet."}
            </p>
            <Button
              variant="default"
              size="sm"
              className="mt-4"
              onClick={() => router.push("/create-project")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
        )}

        {filteredAndSortedProjects.map((project) => (
          <CompactProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
