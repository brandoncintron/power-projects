"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthDialog } from "@/hooks/useAuthDialog";

/**
 * OAuthButtons - Sign in with Github and Google button
 */

export default function OAuthButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setError } = useAuthDialog();
  
  // Check for errors in the URL
  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "OAuthAccountNotLinked") {
      setError("Email already used with a different provider. Please sign in using the original provider.");
      router.replace("/");
    }
  }, [searchParams, setError, router]);

  const onClick = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("OAuth sign in error:", error);
    }
  };
  
  return (
    <div className="flex flex-col space-y-2 w-full">
      <Button variant="outline" className="w-full cursor-pointer" onClick={() => onClick("github")}>
        <FaGithub className="mr-2" />
        Sign In with Github
      </Button>
      <Button variant="outline" className="w-full cursor-pointer" onClick={() => onClick("google")}>
        <FcGoogle className="mr-2" />
        Sign In with Google
      </Button>
    </div>
  );
}
