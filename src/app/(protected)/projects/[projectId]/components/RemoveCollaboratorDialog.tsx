"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Collaborator } from "../../ProjectTypes";
import { removeCollaborator } from "../actions";

interface RemoveCollaboratorDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedCollaborator: Collaborator | null;
  projectId: string;
  onSuccess?: () => void;
}

/* Remove Collaborator Dialog - Confirmation dialog for removing project collaborators */
export function RemoveCollaboratorDialog({
  isOpen,
  setIsOpen,
  selectedCollaborator,
  projectId,
  onSuccess
}: RemoveCollaboratorDialogProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();

  const handleRemoveCollaborator = async () => {
    if (!selectedCollaborator || !projectId) return;

    try {
      setIsRemoving(true);
      const result = await removeCollaborator(projectId, selectedCollaborator.userId);
      
      if (result.success) {
        toast.success("Collaborator removed successfully");
        if (onSuccess) {
          onSuccess();
        }
        router.refresh();
      } else {
        toast.error(result.error || "Failed to remove collaborator");
      }
    } catch (error) {
      console.error("Failed to remove collaborator:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsRemoving(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Collaborator</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {selectedCollaborator?.user?.username} from your project? They will no longer have access to the project&apos;s features.
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
            onClick={handleRemoveCollaborator}
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove Collaborator"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 