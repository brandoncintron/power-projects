"use client";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAnimatedItemsInView } from "../hooks/useAnimatedItemsInView";
import { useProjectFiltering } from "../hooks/useProjectFiltering";
import {
  AnimatedProjectItemProps,
  FilteredProjectListProps,
  ProjectWithDetails,
} from "../types/types";
import ProjectListItem from "./ProjectListItem";

// Animated project item that fades in when in view
const AnimatedProjectItem = ({
  project,
  hasApplied,
  isCollaborator,
  userId,
  index,
  animationKey,
  session,
}: AnimatedProjectItemProps) => {
  const { elementRef, isElementInView } = useAnimatedItemsInView();

  return (
    <div ref={elementRef} className="relative mb-6 w-full">
      <motion.div
        key={`${project.id}-${animationKey}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isElementInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 * Math.min(index, 5) }}
      >
        <ProjectListItem
          project={project}
          hasApplied={hasApplied}
          isCollaborator={isCollaborator}
          userId={userId}
          session={session}
        />
      </motion.div>
    </div>
  );
};

export default function FilteredProjectList({
  projects,
  filterTags,
  userApplications = [],
  userCollaborations = [],
  userId,
  session,
}: FilteredProjectListProps) {
  const {
    searchQuery,
    activeFilterType,
    animationKey,
    filteredProjects,
    handleSearchChange,
    handleFilterTypeChange,
  } = useProjectFiltering(projects);

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
            variant={activeFilterType === tag ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterTypeChange(tag)}
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

      {/* Render the filtered list with animations */}
      {filteredProjects.length > 0 && (
        <div className="w-full">
          <AnimatePresence>
            {filteredProjects.map(
              (project: ProjectWithDetails, index: number) => (
                <AnimatedProjectItem
                  key={project.id}
                  project={project}
                  hasApplied={userApplications.includes(project.id)}
                  isCollaborator={userCollaborations.includes(project.id)}
                  userId={userId}
                  index={index}
                  animationKey={animationKey}
                  session={session}
                />
              ),
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
