"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import GithubSigninButton from "@/components/authStuff/githubSigninButton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SignInForm from "@/components/authStuff/SignInForm";
import SignUpForm from "@/components/authStuff/SignUpForm";

export function AuthDialog() {
  const { isOpen, close, view, setView } = useAuthDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-6 shadow-xl border bg-white dark:bg-zinc-900">
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

        <Tabs
          value={view}
          onValueChange={(val) => setView(val as "signin" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="cursor-pointer">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* --- Sign In Tab --- */}
          <TabsContent value="signin">
            <Card className="border-none shadow-none">
              <CardContent className="space-y-2 p-0">
                <SignInForm />

                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <Separator className="flex-1" />
                </div>

                <div className="flex justify-center">
                  <GithubSigninButton />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- Sign Up Tab --- */}
          <TabsContent value="signup">
            <Card className="border-none shadow-none">
              <CardContent className="space-y-5 p-0">
                <SignUpForm />

                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <Separator className="flex-1" />
                </div>

                <div className="flex justify-center cursor-pointer">
                  <GithubSigninButton />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
