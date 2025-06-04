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

import { useConfirmAction } from "@@/projects/my-projects/hooks/useConfirmAction";
import { ConfirmDialogProps } from "@@/projects/types/types";

/* Confirm Dialog - Reusable confirmation dialog for project actions */
export function ConfirmDialog({
  isOpen,
  setIsOpen,
  project,
  actionType,
  onSuccess,
}: ConfirmDialogProps) {
  const { isProcessingAction, actionConfig, handleConfirmAction } =
    useConfirmAction(project, actionType, onSuccess);

  const handleAction = async () => {
    await handleConfirmAction();
    if (!isProcessingAction) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{actionConfig.title}</DialogTitle>
          <DialogDescription>{actionConfig.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isProcessingAction}
          >
            Cancel
          </Button>
          <Button
            variant={actionType === "delete" ? "destructive" : "default"}
            onClick={handleAction}
            disabled={isProcessingAction}
          >
            {isProcessingAction
              ? actionConfig.processingText
              : actionConfig.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
