"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";

/**
 * GithubSigninButton - Sign in with Github button
 * 
 * This component is used to sign in with Github.
 */

export default function GithubSigninButton() {
    return (
        <Button onClick={() => login()} className="cursor-pointer">Sign In with Github</Button>
    );
}