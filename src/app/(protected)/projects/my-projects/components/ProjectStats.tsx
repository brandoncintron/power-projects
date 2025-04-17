import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectWithDetails } from "../../ProjectTypes";
import { Users, FileCode2, MessageCircle } from "lucide-react";

interface ProjectStatsProps {
  projects: ProjectWithDetails[];
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  // Calculate statistics
  const totalProjects = projects.length;
  const openProjects = projects.filter(p => p.status === "OPEN").length;
  const totalApplicants = projects.reduce((sum, project) => sum + (project._count?.applicants || 0), 0);
  
  // Count unique technologies used across all projects
  const uniqueTechnologies = new Set<string>();
  projects.forEach(project => {
    project.frameworks?.forEach(fw => uniqueTechnologies.add(fw.toLowerCase()));
    project.databases?.forEach(db => uniqueTechnologies.add(db.toLowerCase()));
  });
  
  // Group projects by type
  const projectsByType = projects.reduce((acc, project) => {
    const type = project.applicationType || "Other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{totalProjects}</div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <FileCode2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {openProjects} open, {totalProjects - openProjects} closed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{totalApplicants}</div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <MessageCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Across all your projects
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Technologies Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{uniqueTechnologies.size}</div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <FileCode2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Unique frameworks and databases
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Most Common Project Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold truncate" title={mostCommonType}>
              {mostCommonType === "None" ? "N/A" : mostCommonType}
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {maxCount} project{maxCount !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 