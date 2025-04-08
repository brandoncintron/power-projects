import React from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileCode2,
  Users,
  Clock,
  GitBranch,
  Settings,
  Calendar,
} from "lucide-react";
import { getDatabaseIcon, getLanguageIcon } from "@/lib/language-icons";
import { auth } from "@/auth";

async function ProjectDetailPage(props: {
  params: Promise<{ projectId: string }>;
}) {
  const params = await props.params;
  const projectId = params.projectId;
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!projectId) {
    console.error("Project ID not found in params.");
    notFound();
  }

  let project;
  try {
    project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            collaborators: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
  }

  if (!project) {
    notFound();
  }

  const isOwner = currentUserId === project.owner.id;

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{project.projectName}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users size={16} />
              {project._count.collaborators + 1} members
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              Created {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <GitBranch className="mr-2 h-4 w-4" />
              Connect GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6">
            {/* Row 1: Application Type, Frameworks, and Databases */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
                    Application Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FileCode2 size={16} />
                    <span>{project.applicationType}</span>
                  </div>
                </CardContent>
              </Card>

              {project.frameworks && project.frameworks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Frameworks & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.frameworks.map((fw) => (
                        <div
                          key={fw}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                        >
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                            {getLanguageIcon(fw.toLowerCase())}
                          </div>
                          <span className="font-medium">{fw}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {project.databases && project.databases.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Databases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.databases.map((db) => (
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
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Row 2: Project Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>

            {/* Row 3: Target Completion and Team Members */}
            <div className="grid gap-6 md:grid-cols-2">
              {project.completionDate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">
                      Target Completion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {new Date(project.completionDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {project.owner?.username?.[0] || "U"}
                      </div>
                      <div>
                        <p className="font-medium">{project.owner?.username}</p>
                        <p className="text-sm text-muted-foreground">Owner</p>
                      </div>
                    </div>
                    {/* TODO: Add collaborators list */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scrum Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Scrum board coming soon</p>
                <p className="text-sm text-muted-foreground">
                  Track tasks and progress here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Chat functionality coming soon
                </p>
                <p className="text-sm text-muted-foreground">
                  Communicate with your team here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProjectDetailPage;
