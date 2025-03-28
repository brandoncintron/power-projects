"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signInWithGithub, signInWithGoogle } from "@/actions/auth";

/**
 * OAuthButtons - Sign in with Github and Google button
 */

export default function OAuthButtons() {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <form action={signInWithGithub}>
        <Button type="submit" variant="outline" className="w-full">
          <FaGithub className="mr-2 size-5" />
          GitHub
        </Button>
      </form>
      <form action={signInWithGoogle}>
        <Button type="submit" variant="outline" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Google
        </Button>
      </form>
    </div>
  );
}
