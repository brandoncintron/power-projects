"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { DialogError } from "@/components/auth/DialogError";
import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";
import OAuthButton from "@/components/auth/OAuthButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AuthDialog() {
  const { isOpen, close, error } = useAuthDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-8 shadow-xl border bg-white dark:bg-zinc-900">
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-semibold">
            Power Projects
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Sign in with GitHub to continue
          </p>
        </DialogHeader>

        {error && <DialogError message={error} />}

        <div className="flex flex-col items-center space-y-4">
          <OAuthButton />
        </div>
      </DialogContent>
    </Dialog>
  );
}
