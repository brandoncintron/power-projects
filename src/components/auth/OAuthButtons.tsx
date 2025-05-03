"use client";

import { useState } from "react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";

/**
 * OAuthButtons - Sign in with Github and Google button
 */

export default function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<"google" | "github" | null>(null);

  const onClick = (provider: "google" | "github") => {
    setIsLoading(provider);
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <Button
        onClick={() => onClick("github")}
        variant="outline"
        className="w-full"
        disabled={isLoading !== null}
      >
        {isLoading === "github" ? (
          <LoadingSpinner className="h-5" text="Github" />
        ) : (
          <>
            <FaGithub className="mr-2 size-5" />
            GitHub
          </>
        )}
      </Button>
      <Button
        onClick={() => onClick("google")}
        variant="outline"
        className="w-full"
        disabled={isLoading !== null}
      >
        {isLoading === "google" ? (
          <LoadingSpinner className="h-5" text="Google" />
        ) : (
          <>
            <FcGoogle className="mr-2 size-5" />
            Google
          </>
        )}
      </Button>
    </div>
  );
}
