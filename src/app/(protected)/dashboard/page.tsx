import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DialogCloser } from "@/components/auth/DialogCloser";
import { HideLoading } from "./components/HideLoading";
import { LoadingSpinner } from "@/components/ui/loading";
import { Badge } from "@/components/ui/badge";
import { FileCode2, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@prisma/client';

interface ProjectWithDetails extends Project {
  _count: {
    collaborators: number;
  };
}

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <LoadingSpinner text="dashboard" />
        </CardContent>
      </Card>
    );
  }

  // Fetch user's projects
  let userProjects: ProjectWithDetails[] = [];
  try {
    userProjects = await db.project.findMany({
      where: {
        ownerId: user.id,
      },
      include: {
        _count: { select: { collaborators: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch user projects:", error);
  }

  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      {/* This component will close the auth dialog when dashboard loads */}
      <DialogCloser />

      {/* This component will disable the loading page when dashboard loads */}
      <HideLoading />
      
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={user?.image || ""}
              alt={user?.username || "User"}
            />
            <AvatarFallback>
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">
              {user?.username || "Username not set"}
            </h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Your project overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Active Projects</span>
                      <span className="text-xl font-semibold">{userProjects.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Collaborating On</span>
                      <span className="text-xl font-semibold">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pending Invites</span>
                      <span className="text-xl font-semibold">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                      <div>
                        <p className="text-sm font-medium">No recent activity</p>
                        <p className="text-xs text-muted-foreground">Check back later for updates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Access your tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/create-project">
                      <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
                        <p className="text-sm font-medium">Create Project</p>
                        <p className="text-xs text-muted-foreground">Start a new project</p>
                      </div>
                    </Link>
                    <Link href="/projects/browse">
                      <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
                        <p className="text-sm font-medium">Browse Projects</p>
                        <p className="text-xs text-muted-foreground">Find projects to join</p>
                      </div>
                    </Link>
                    <button>
                      <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
                        <p className="text-sm font-medium">Inbox</p>
                        <p className="text-xs text-muted-foreground">Check messages</p>
                      </div>
                    </button>
                    <button>
                      <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
                        <p className="text-sm font-medium">Scrum Board</p>
                        <p className="text-xs text-muted-foreground">Manage tasks</p>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">My Projects</h2>
              <Link href="/create-project">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Create New Project
                </button>
              </Link>
            </div>
            
            {userProjects.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">You haven&apos;t created any projects yet.</p>
                  <Link href="/create-project" className="text-blue-600 hover:underline mt-2 inline-block">
                    Create your first project
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userProjects.map((project) => (
                  <Card key={project.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                        <Badge variant="secondary" className="whitespace-nowrap flex items-center gap-1">
                          <FileCode2 size={12} /> {project.applicationType}
                        </Badge>
                        <Badge variant="outline" className="whitespace-nowrap flex items-center gap-1">
                          <Users size={12} /> {(project._count?.collaborators ?? 0) + 1} Members
                        </Badge>
                        <Badge variant="outline" className="whitespace-nowrap flex items-center gap-1">
                          <Users size={12} /> {project.visibility.charAt(0).toUpperCase() + project.visibility.slice(1).toLowerCase()}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{project.projectName}</h3>
                      <p className="text-sm line-clamp-2 mb-2">{project.description}</p>
                      <div className="flex items-center text-xs gap-1 text-muted-foreground">
                        <Clock size={12} />
                        <span>{formatRelativeTime(project.createdAt)}</span>
                      </div>
                      <Link href={`/projects/${project.id}`} className="absolute inset-0 rounded-lg" aria-label={`View details for ${project.projectName}`}></Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

// Utility function for formatting relative time
function formatRelativeTime(date: Date | null | undefined): string {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 30) {
    return `>30d ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays}d ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`;
  } else {
    return `Just now`;
  }
}
