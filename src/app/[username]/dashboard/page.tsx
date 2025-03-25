import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserDashboardPage({
  params
}: {
  params: { username: string }
}) {
  // Get user session
  const session = await auth();
  
  // Redirect to sign in page if user is not authenticated
  if (!session?.user) {
    redirect("/accounts/signin");
  }
  
  // Check if the username in the URL matches the logged-in user
  // This is a basic check - you may want to add more sophisticated validation
  const isCorrectUser = session.user.name?.toLowerCase() === params.username.toLowerCase();
  
  // Redirect to the homepage if it's not the correct user
  if (!isCorrectUser) {
    redirect("/");
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard for {params.username}</h1>
      {/* Dashboard content will be added later */}
    </div>
  );
} 