import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { DialogCloser } from "@/components/auth/DialogCloser";
import { HideLoading } from "@/components/HideLoading";
import { LoadingSpinner } from "@/components/ui/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "./components/UserProfile";
import { ProjectList } from "./components/ProjectList";
import { AppliedToProjectList } from "./components/AppliedToProjectList";
import { CollaborationsSection } from "./components/CollaborationsSection";
import { NotificationsSection } from "./components/NotificationsSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { DashboardData } from "./DashboardTypes";

const fetchDashboardData = async (userId: string): Promise<DashboardData> => {
  const userData = await db.user.findUnique({
    where: { id: userId },
    include: {
      // Fetch projects user has applied to
      applications: {
        include: {
          project: {
            include: {
              owner: {
                select: { id: true, username: true, image: true },
              },
              _count: {
                select: { collaborators: true, applicants: true },
              },
            },
          },
        },
      },
      // Fetch projects user owns
      ownedProjects: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: {
            select: { collaborators: true, applicants: true },
          },
        },
      },
      // Fetch projects user is collaborating on
      collaborations: {
        include: {
          project: {
            include: {
              owner: {
                select: { id: true, username: true, image: true },
              },
              _count: {
                select: { collaborators: true, applicants: true },
              },
            },
          },
        },
      },
    },
  });

  // Transform collaboration data
  const collaborations = userData?.collaborations.map(collab => ({
    ...collab.project,
    owner: collab.project.owner,
  })) || [];

  // Transform application data
  const applications = userData?.applications.map(app => ({
    ...app.project,
    applicationStatus: app.status,
  })) || [];

  return {
    ownedProjects: userData?.ownedProjects || [],
    collaborations,
    applications,
  };
};

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

  let dashboardData: DashboardData = {
    ownedProjects: [],
    collaborations: [],
    applications: [],
  };
  let fetchError: string | null = null;

  try {
    if (!user.id) {
      throw new Error("User ID not found in session.");
    }

    dashboardData = await fetchDashboardData(user.id);
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    fetchError = "Could not load dashboard data. Please try again later.";
  }

  return (
    <main className="container mx-auto py-6 px-4 md:px-6 min-h-screen">
      <DialogCloser />
      <HideLoading />

      <div className="flex flex-col gap-4">
        <UserProfile user={user} />
        
        {fetchError ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{fetchError}</AlertDescription>
          </Alert>
        ) : (
          <>
            {/* Projects Section */}
            <ProjectList projects={dashboardData.ownedProjects} />
            <Separator className="my-1" />

            {/* Collaborations Section */}
            <CollaborationsSection collaborations={dashboardData.collaborations} />
            <Separator className="my-1" />

            {/* Applications Section */}
            <AppliedToProjectList projects={dashboardData.applications} />
            <Separator className="my-1" />

            {/* Notifications Section */}
            <NotificationsSection />
          </>
        )}
      </div>
    </main>
  );
}
