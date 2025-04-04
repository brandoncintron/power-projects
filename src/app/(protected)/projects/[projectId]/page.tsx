import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

async function ProjectDetailPage(props: { params: Promise<{ projectId: string }> }) {
  const params = await props.params;

  const projectId = params.projectId;

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
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
  }

  if (!project) {
    notFound(); // Triggers the default Next.js 404 page
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Project Name */}
      <h1 className="text-3xl font-bold mb-4">{project.projectName}</h1>

      {/* Description */}
      <p className="text-lg text-gray-700 mb-6">{project.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Visibility */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-1 uppercase">Visibility</h2>
          <p className="text-md capitalize">{project.visibility.toLowerCase()}</p>
          {/* saving for later */}
          {/* {project.visibility === ProjectVisibility.PRIVATE && <span> (Private Project)</span>} */}
        </div>

        {/* Application Type */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-1 uppercase">Application Type</h2>
          <p className="text-md">{project.applicationType}</p>
        </div>

        {/* Completion Date */}
        {project.completionDate && (
           <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
             <h2 className="text-sm font-semibold text-gray-500 mb-1 uppercase">Target Completion</h2>
             <p className="text-md">
               {new Date(project.completionDate).toLocaleDateString('en-US', {
                 year: 'numeric', month: 'long', day: 'numeric'
               })}
             </p>
           </div>
        )}

         {/* Team Name */}
         {project.teamName && (
           <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
             <h2 className="text-sm font-semibold text-gray-500 mb-1 uppercase">Team Name</h2>
             <p className="text-md">{project.teamName}</p>
           </div>
         )}
      </div>


      {/* Frameworks List */}
      {project.frameworks && project.frameworks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Frameworks / Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.frameworks.map((fw) => (
              <span key={fw} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {fw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Databases List */}
      {project.databases && project.databases.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Databases</h2>
          <div className="flex flex-wrap gap-2">
            {project.databases.map((db) => (
              <span key={db} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {db}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* TODO: Add sections for collaborators, applicants etc */}

    </div>
  );
}
export default ProjectDetailPage;

