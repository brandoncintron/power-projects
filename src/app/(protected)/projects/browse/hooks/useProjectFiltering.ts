import { useMemo, useState } from "react";

import { ProjectWithDetails } from "../../types/types";

/**
 * Hook to manage project filtering and search functionality
 * @param initialProjects Array of projects to filter
 * @returns Object containing filtering state and handlers
 */
export function useProjectFiltering(initialProjects: ProjectWithDetails[]) {
  const [activeFilterType, setActiveFilterType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [animationKey, setAnimationKey] = useState(0);

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Increment animation key to trigger new animations
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // Memoized filtered projects based on search query and active filter
  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    // First apply search filtering
    const searchFilteredProjects = initialProjects.filter(
      (project: ProjectWithDetails) => {
        if (!normalizedQuery) return true;

        return (
          project.projectName.toLowerCase().includes(normalizedQuery) ||
          (project.description &&
            project.description.toLowerCase().includes(normalizedQuery))
        );
      },
    );

    // Then apply type filtering
    if (activeFilterType === "All") {
      return searchFilteredProjects;
    }

    return searchFilteredProjects.filter(
      (project: ProjectWithDetails) =>
        project.applicationType === activeFilterType,
    );
  }, [initialProjects, activeFilterType, searchQuery]);

  // Handle filter type selection
  const handleFilterTypeChange = (filterType: string) => {
    if (filterType !== activeFilterType) {
      setActiveFilterType(filterType);
      // Increment animation key to trigger new animations
      setAnimationKey((prevKey) => prevKey + 1);
    }
  };

  return {
    searchQuery,
    activeFilterType,
    animationKey,
    filteredProjects,
    handleSearchChange,
    handleFilterTypeChange,
  };
}
