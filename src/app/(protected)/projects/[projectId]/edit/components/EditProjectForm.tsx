"use client";

import { FileCode2 } from "lucide-react";
import { FaCode, FaCube, FaDatabase } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoading } from "@/components/ui/loading-context";
import { technologyIconMap } from "@/lib/technology-icons";

import { TeamMembersCard } from "@@/projects/[projectId]/components/TeamMembersCard";
import { EditCompletionDateField } from "@@/projects/[projectId]/edit/components/EditCompletionDateField";
import { EditDescriptionField } from "@@/projects/[projectId]/edit/components/EditDescriptionField";
import { EditProjectHeader } from "@@/projects/[projectId]/edit/components/EditProjectHeader";
import { EditProjectFormProvider } from "@@/projects/[projectId]/edit/context/EditProjectFormContext";
import { useEditProjectForm } from "@@/projects/[projectId]/edit/hooks/useEditProjectForm";
import { EditProjectFormFullProps } from "@@/projects/types/types";

// Wrapper component that includes the provider
export function EditProjectForm({
  projectName,
  applicationType,
  frameworks,
  databases,
  description,
  completionDate,
  owner,
  projectId,
  memberCount,
  createdAt,
  isOwner,
}: EditProjectFormFullProps) {
  return (
    <EditProjectFormProvider
      projectId={projectId}
      initialProjectName={projectName}
      initialDescription={description}
      initialCompletionDate={completionDate}
    >
      <EditProjectFormContent
        applicationType={applicationType}
        frameworks={frameworks}
        databases={databases}
        owner={owner}
        memberCount={memberCount}
        projectId={projectId}
        createdAt={createdAt}
        isOwner={isOwner}
      />
    </EditProjectFormProvider>
  );
}

// Inner component that accesses the form context
function EditProjectFormContent({
  applicationType,
  frameworks,
  databases,
  owner,
  memberCount,
  projectId,
  createdAt,
  isOwner,
}: Omit<
  EditProjectFormFullProps,
  "projectName" | "description" | "completionDate"
>) {
  const { form, onSubmit, isSubmitting } = useEditProjectForm();
  const { showLoading } = useLoading();

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <EditProjectHeader
            memberCount={memberCount}
            projectId={projectId}
            createdAt={createdAt}
            isOwner={isOwner}
          />
          {/* Main Content */}
          <div className="bg-card border p-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold">Project Overview</h1>

            {/* Main Content: Two-column layout */}
            <div className="grid gap-8 md:grid-cols-3 mt-8">
              {/* Left Column: Description */}
              <div className="md:col-span-2 space-y-6">
                {/* Description Card */}
                <div className="p-6 bg-card shadow-sm border rounded-md">
                  <EditDescriptionField />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4"
                    onClick={() => {
                      showLoading("Saving changes...");
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>

              {/* Right Column: Project Details + Team */}
              <div className="space-y-6">
                <div className="p-6 bg-card shadow-sm border rounded-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Project Details
                  </h2>
                  <div className="space-y-4">
                    {/* Application Type - Read-only */}
                    <div>
                      <p className="text-sm uppercase text-muted-foreground">
                        <FaCube className="inline mr-2 mb-1" /> Application Type
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span>{applicationType}</span>
                      </div>
                    </div>

                    {/* Frameworks & Technologies - Read-only */}
                    {frameworks && frameworks.length > 0 && (
                      <div>
                        <p className="text-sm uppercase text-muted-foreground">
                          <FaCode className="inline mr-2 mb-1" /> Frameworks
                          &amp; Technologies
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {frameworks.map((fw) => (
                            <div
                              key={fw}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                            >
                              <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                                {technologyIconMap[fw.toLowerCase()] || (
                                  <FileCode2 size={16} />
                                )}
                              </div>
                              <span className="font-medium">
                                {fw.charAt(0).toUpperCase() +
                                  fw.slice(1).toLowerCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Databases - Read-only */}
                    {databases && databases.length > 0 && (
                      <div>
                        <p className="text-sm uppercase text-muted-foreground">
                          <FaDatabase className="inline mr-2 mb-1" /> Databases
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {databases.map((db) => (
                            <div
                              key={db}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
                            >
                              <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                                {technologyIconMap[db.toLowerCase()] || (
                                  <FileCode2 size={16} />
                                )}
                              </div>
                              <span className="font-medium">{db}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Completion Date - Editable */}
                    <EditCompletionDateField />
                  </div>
                </div>

                {/* Team Members Card */}
                <TeamMembersCard owner={owner} />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
