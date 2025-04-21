"use client";

import { useState } from "react";
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
import { useLoading } from "@/components/ui/loading-context";
import { deleteProject } from "../actions";
import { ProjectWithDetails } from "../../ProjectTypes";

interface DeleteProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  project: ProjectWithDetails;
  onSuccess?: () => void;
}

/* Delete Project Dialog - Confirmation dialog for deleting projects */
export function DeleteProjectDialog({
  isOpen,
  setIsOpen,
  project,
  onSuccess
}: DeleteProjectDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showLoading } = useLoading();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      showLoading("Deleting project...");
      const result = await deleteProject(project.id);
      
      if (result.success) {
        toast.success("Project deleted successfully");
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.reload();
        }
      } else {
        setIsDeleting(false);
        setIsOpen(false);
        toast.error(result.error || "Failed to delete project");
      }
    } catch (error) {
      setIsDeleting(false);
      setIsOpen(false);
      toast.error("An error occurred while deleting the project");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{project.projectName}&quot;? This action cannot be undone and will permanently remove the project, all applications, and collaborator associations.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 