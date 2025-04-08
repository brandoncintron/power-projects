import { auth } from "@/auth";

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
import { db } from "@/lib/db";
import { HideLoading } from "./components/HideLoading";
import { LoadingSpinner } from "@/components/ui/loading";

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

  let projectCount = 0; // Default count
  if (user.id) {
    // Ensure user ID exists
    try {
      projectCount = await db.project.count({
        where: {
          ownerId: user.id, // Filter projects owned by the current user
        },
      });
    } catch (error) {
      console.error("Failed to fetch project count:", error);
      // projectCount remains 0 in case of error
    }
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
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Username
                      </dt>
                      <dd>{user?.username || "Not set"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Email
                      </dt>
                      <dd>{user?.email}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        User ID
                      </dt>
                      <dd className="truncate max-w-[180px]">{user?.id}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Session</CardTitle>
                  <CardDescription>Your session details</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Status
                      </dt>
                      <dd className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        Active
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Auth Type
                      </dt>
                      <dd>NextAuth</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Your project stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Active projects
                      </span>
                      <span className="text-xl font-semibold">
                        {projectCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="text-xl font-semibold">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent actions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      No recent activity to show
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
