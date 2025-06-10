// import { auth } from "@/auth";
import { HideLoading } from "@/components/HideLoading";

import { CreateProjectForm } from "./components/CreateProjectForm";

export default async function CreateProjectPage() {
  // const session = await auth();
  // Leaving this here in case we need to pass session prop to form later

  return (
    <main>
      <HideLoading />
      <div className="container mx-auto p-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Create a New Project</h1>
          <p className="text-muted-foreground mb-8">
            Fill out the details below to get your new project up and running.
          </p>
          <CreateProjectForm />
        </div>
      </div>
    </main>
  );
}
