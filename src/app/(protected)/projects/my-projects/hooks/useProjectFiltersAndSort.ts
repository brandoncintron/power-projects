import { useMemo, useState } from "react";

import { ProjectWithDetails } from "@@/projects/types/types";

export type SortOption =
  | "newest"
  | "oldest"
  | "name_asc"
  | "name_desc"
  | "applicants";

/**
 * Hook to manage project filtering, sorting, and search
 * @param initialProjects Array of projects to filter and sort
 * @returns Object containing filtering/sorting state and handlers
 */
export function useProjectFiltersAndSort(
  initialProjects: ProjectWithDetails[],
) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("All");
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Memoized filtered and sorted projects
  const filteredAndSortedProjects = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    // Filter by search query
    let filteredProjects = initialProjects.filter((project) => {
      if (!normalizedQuery) return true;

      return (
        project.projectName.toLowerCase().includes(normalizedQuery) ||
        (project.description &&
          project.description.toLowerCase().includes(normalizedQuery))
      );
    });

    // Filter by application type
    if (projectTypeFilter !== "All") {
      filteredProjects = filteredProjects.filter(
        (project) => project.applicationType === projectTypeFilter,
      );
    }

    // Filter by project status
    if (projectStatusFilter !== "All") {
      filteredProjects = filteredProjects.filter(
        (project) => project.status === projectStatusFilter,
      );
    }

    // Sort projects based on selected sort option
    return filteredProjects.sort((projectA, projectB) => {
      switch (sortOption) {
        case "newest":
          return (
            new Date(projectB.createdAt).getTime() -
            new Date(projectA.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(projectA.createdAt).getTime() -
            new Date(projectB.createdAt).getTime()
          );
        case "name_asc":
          return projectA.projectName.localeCompare(projectB.projectName);
        case "name_desc":
          return projectB.projectName.localeCompare(projectA.projectName);
        case "applicants":
          return (
            (projectB._count.applicants || 0) -
            (projectA._count.applicants || 0)
          );
        default:
          return 0;
      }
    });
  }, [
    initialProjects,
    projectTypeFilter,
    projectStatusFilter,
    searchQuery,
    sortOption,
  ]);

  // Check if there are any active filters
  const hasActiveFilters =
    searchQuery || projectTypeFilter !== "All" || projectStatusFilter !== "All";

  // Reset filters to default values
  const resetFilters = () => {
    setSearchQuery("");
    setProjectTypeFilter("All");
    setProjectStatusFilter("All");
    setSortOption("newest");
  };

  // Type-safe sort option setter
  const handleSortOptionChange = (value: string) => {
    setSortOption(value as SortOption);
  };

  return {
    searchQuery,
    projectTypeFilter,
    projectStatusFilter,
    sortOption,
    filteredAndSortedProjects,
    hasActiveFilters,
    handleSearchChange,
    setProjectTypeFilter,
    setProjectStatusFilter,
    setSortOption: handleSortOptionChange,
    resetFilters,
  };
}
