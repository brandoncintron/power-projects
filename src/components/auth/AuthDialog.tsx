"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { DialogError } from "@/components/auth/DialogError";
import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleAuthErrors } from "./utils/handleAuthErrors";

export function AuthDialog() {
  const { isOpen, close, view, setView, error, open } = useAuthDialog();
  const searchParams = useSearchParams();
  const errorCheckedRef = useRef(false);
  const router = useRouter();

  // Check for auth errors in URL params once on component mount (for duplicate OAuth email addresses)
  useEffect(() => {
    const authError = searchParams.get("error");
    handleAuthErrors(authError, open, router, errorCheckedRef);
  }, [searchParams, open, router]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-6 pb-2 shadow-xl border bg-white dark:bg-zinc-900">
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-semibold">
            Power Projects
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Sign in or create your account
          </p>
        </DialogHeader>

        {error && <DialogError message={error} />}

        <Tabs
          value={view}
          onValueChange={(val) => setView(val as "signin" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/80">
            <TabsTrigger value="signin" className="cursor-pointer">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin">
            <Card className="border-none shadow-none">
              <CardContent className="space-y-4 p-0">
                <SignInForm />

                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">or login with:</span>
                  <Separator className="flex-1" />
                </div>

                <OAuthButtons />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card className="border-none shadow-none">
              <CardContent className="space-y-4 p-0">
                <SignUpForm />

                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">or login with:</span>
                  <Separator className="flex-1" />
                </div>

                <OAuthButtons />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
