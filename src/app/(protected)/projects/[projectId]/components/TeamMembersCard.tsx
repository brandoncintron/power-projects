"use client";

import { Loader, MinusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { RemoveCollaboratorDialog } from "@@/projects/[projectId]/components/RemoveCollaboratorDialog";
import { useTeamMembersManagement } from "@@/projects/[projectId]/hooks/useTeamMembersManagement";
import { TeamMembersCardProps } from "@@/projects/types/types";

/* Team Members Card - Displays project team members starting with the owner */
export function TeamMembersCard({
  owner,
  collaborators = [],
  isOwner = false,
  projectId = "",
}: TeamMembersCardProps) {
  const {
    showRemoveDialog,
    setShowRemoveDialog,
    selectedCollaborator,
    pendingRemovalIds,
    handleRemoveClick,
    handleRemoveSuccess,
    handleRemovePending,
    filterCollaborators,
  } = useTeamMembersManagement();

  // Filter out collaborators that have been removed
  const filteredCollaborators = filterCollaborators(collaborators);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Owner Section */}
            <div>
              <p className="text-sm font-medium mb-3">Owner</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {owner?.image ? (
                      <Image
                        src={owner.image}
                        alt={owner.username || ""}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      owner?.username?.[0] || "U"
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{owner?.username}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <Separator />

            {/* Collaborators Section */}
            <div>
              <p className="text-sm font-medium mb-3">
                Collaborators ({filteredCollaborators.length})
              </p>
              {filteredCollaborators.length > 0 ? (
                <div className="space-y-3">
                  {filteredCollaborators.map((collaborator) => (
                    <div
                      key={collaborator.userId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {collaborator.user?.image ? (
                            <Image
                              src={collaborator.user.image}
                              alt={collaborator.user.username || ""}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <span className="text-sm">
                              {collaborator.user?.username?.[0] || "U"}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {collaborator.user?.username}
                          </p>
                        </div>
                      </div>

                      {isOwner && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                          onClick={(e) => handleRemoveClick(collaborator, e)}
                          disabled={pendingRemovalIds.includes(
                            collaborator.userId,
                          )}
                          title="Remove collaborator"
                        >
                          {pendingRemovalIds.includes(collaborator.userId) ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            <MinusCircle className="h-5 w-5" />
                          )}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No collaborators yet
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use the RemoveCollaboratorDialog component */}
      <RemoveCollaboratorDialog
        isOpen={showRemoveDialog}
        setIsOpen={setShowRemoveDialog}
        selectedCollaborator={selectedCollaborator}
        projectId={projectId}
        onSuccess={() =>
          selectedCollaborator &&
          handleRemoveSuccess(selectedCollaborator.userId)
        }
        onPendingChange={(isPending: boolean) =>
          selectedCollaborator &&
          handleRemovePending(selectedCollaborator.userId, isPending)
        }
      />
    </>
  );
}
