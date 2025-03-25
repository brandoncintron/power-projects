"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth";
/**
 * GithubSigninButton - Sign in with Github button
 */

export default function GithubSigninButton() {
    return (
        <Button className="cursor-pointer" onClick={() => login()}>Sign In with Github</Button>
    );
}