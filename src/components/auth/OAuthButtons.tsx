"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

/**
 * OAuthButtons - Sign in with Github and Google button
 */

export default function OAuthButtons() {
const onClick = (provider: "google" | "github") => {
    signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
}
    
  return (
    <div className="flex flex-col space-y-2 w-full">
        <Button onClick={() => onClick("github")} variant="outline" className="w-full">
          <FaGithub className="mr-2 size-5" />
          GitHub
        </Button>
        <Button onClick={() => onClick("google")} variant="outline" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Google
        </Button>
    </div>
  );
}