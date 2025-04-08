import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { DialogCloser } from "@/components/auth/DialogCloser";
import { HideLoading } from "./components/HideLoading";
import { LoadingSpinner } from "@/components/ui/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "./components/UserProfile";
import { DashboardTabs } from "./components/DashboardTabs";
import { Project } from "@prisma/client";

interface ProjectWithDetails extends Project {
  _count: {
    collaborators: number;
  };
}

/**
 * Dashboard Page - Main user dashboard displaying projects and activity
 * Serves as the central hub for user interaction with the application
 */
export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;

  // Show loading state if not authenticated
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

  // Fetch user's project data
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
      {/* Close auth dialog on dashboard load */}
      <DialogCloser />

      {/* Disable loading indicator when dashboard is ready */}
      <HideLoading />
      
      <div className="flex flex-col gap-8">
        <UserProfile user={user} />
        <Separator />
        <DashboardTabs projects={userProjects} />
      </div>
    </main>
  );
}
