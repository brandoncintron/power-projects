"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

// GitHub OAuth functions
export const login = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

// Email auth functions
export async function handleCredentialsSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type){
        case 'CredentialsSignin':
          return {
            message: "Invalid username or password."
          }
        default:
          return{
            message: "Something went wrong."
          }
      }
    }
    throw error;
  }
}