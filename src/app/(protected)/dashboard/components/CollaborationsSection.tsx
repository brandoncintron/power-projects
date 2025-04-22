"use client";

import { Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { DashboardProject } from "../DashboardTypes";
import Link from "next/link";
import { useLoading } from "@/components/ui/loading-context";

interface CollaborationsSectionProps {
  collaborations: DashboardProject[];
}

export function CollaborationsSection({ collaborations }: CollaborationsSectionProps) {
  const { showLoading } = useLoading();
  
  // Limit displayed collaborations to 3
  const displayedCollaborations = collaborations.slice(0, 3);
  const hasMoreCollaborations = collaborations.length > 3;
  
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          Projects You&apos;re Collaborating On
        </h2>
        <Link href="/projects/browse">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs px-3"
            onClick={() => showLoading("Loading project browser...")}
          >
            Browse More Projects
          </Button>
        </Link>
      </div>

      {collaborations.length === 0 ? (
        <Card>
          <CardContent className="p-4 text-center flex flex-col items-center">
            <p className="text-muted-foreground mb-2 text-sm">
              You&apos;re not collaborating on any projects yet.
            </p>
            <Link href="/projects/browse">
              <Button 
                variant="default" 
                size="sm" 
                className="h-7 text-xs px-3"
                onClick={() => showLoading("Loading project browser...")}
              >
                Find Projects to Collaborate On
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedCollaborations.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isApplication={false}
              />
            ))}
          </div>
          
          {hasMoreCollaborations && (
            <div className="flex justify-center mt-4">
              <Link href="/projects/my-projects">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-3 flex items-center gap-1"
                  onClick={() => showLoading("Loading all collaborations...")}
                >
                  View all collaborations
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
} 