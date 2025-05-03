"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRemoveCollaborator } from "@@/projects/[projectId]/hooks/useRemoveCollaborator";
import { RemoveCollaboratorDialogProps } from "@@/projects/types/types";

/* Remove Collaborator Dialog - Confirmation dialog for removing project collaborators */
export function RemoveCollaboratorDialog({
  isOpen,
  setIsOpen,
  selectedCollaborator,
  projectId,
  onSuccess,
  onPendingChange,
}: RemoveCollaboratorDialogProps) {
  const { isRemoving, handleRemoveCollaborator } = useRemoveCollaborator(
    projectId,
    () => {
      if (onSuccess) {
        onSuccess();
      }
      setIsOpen(false);
    },
    onPendingChange,
  );

  const handleRemove = () => {
    if (!selectedCollaborator) return;
    handleRemoveCollaborator(selectedCollaborator.userId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Collaborator</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{" "}
            {selectedCollaborator?.user?.username} from your project? They will
            no longer have access to the project&apos;s features.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isRemoving}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove Collaborator"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
