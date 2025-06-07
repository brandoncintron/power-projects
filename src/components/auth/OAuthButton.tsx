"use client";

import { useState } from "react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";

/**
 * Sign in with Github button
 */

export default function OAuthButton({ callbackUrl }: { callbackUrl: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = () => {
    setIsLoading(true);
    signIn("github", {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="w-full">
      <Button
        onClick={onClick}
        className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium text-base border-0 transition-colors duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingSpinner className="h-5" text="Connecting..." />
        ) : (
          <>
            <FaGithub className="mr-3 size-5" />
            Continue with GitHub
          </>
        )}
      </Button>
    </div>
  );
}
