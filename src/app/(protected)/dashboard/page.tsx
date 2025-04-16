import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { DialogCloser } from "@/components/auth/DialogCloser";
import { HideLoading } from "@/components/HideLoading";
import { LoadingSpinner } from "@/components/ui/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "./components/UserProfile";
import { DashboardTabs } from "./components/DashboardTabs";
import { Project } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const fetchProjectData = async (userId: string) => {
  return db.user.findUnique({
    where: { id: userId },
    include: {
      applications: {
        include: {
          project: {
            include: {
              owner: {
                select: { id: true, username: true, image: true },
              },
            },
          },
        },
      },
      ownedProjects: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
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

  let userProjects: Project[] = [];
  let appliedProjects: Project[] = [];
  let fetchError: string | null = null;

  try {
    if (!user.id) {
      throw new Error("User ID not found in session.");
    }

    const userData = await fetchProjectData(user.id);

    // Extract owned and applied projects safely using optional chaining and nullish coalescing
    userProjects = userData?.ownedProjects ?? [];
    
    // Include application status in applied projects
    appliedProjects =
      userData?.applications?.map((app) => ({
        ...app.project,
        applicationStatus: app.status
      })) ?? [];
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    fetchError = "Could not load dashboard data. Please try again later.";
    userProjects = [];
    appliedProjects = [];
  }

  const applicationCount = appliedProjects.length;

  return (
    <main className="container mx-auto py-10 px-4 md:px-6 min-h-screen">
      <DialogCloser />
      <HideLoading />

      <div className="flex flex-col gap-8">
        <UserProfile user={user} />
        <Separator />

        {fetchError ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{fetchError}</AlertDescription>
          </Alert>
        ) : (
          <DashboardTabs
            projects={userProjects}
            appliedProjects={appliedProjects}
            applicationCount={applicationCount}
          />
        )}
      </div>
    </main>
  );
}
