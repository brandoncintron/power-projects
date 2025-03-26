"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { signUpSchema } from "../zod";
import db from "../db";

// GitHub OAuth functions
export const login = async () => {
  await signIn("github", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const handleCredentialsSignup = async (values: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  console.log("SignUp form values received in server action:", values);
  const validatedData = signUpSchema.parse({});
  console.log(`validated data ${validatedData}`);

  return { success: true };
};

export async function handleCredentialsSignupTest({
  username,
  email,
  password,
  confirmPassword,
}: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  // Validate that password and confirmPassword match
  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    };
  }

  const parsed = signUpSchema.parse({
    username,
    email,
    password,
    confirmPassword,
  });

  // Validate the input data using the schema
  try {
    parsed;
  } catch (error) {
    return {
      success: false,
      message: "Invalid input data.",
    };
  }

  await db.user.create({
    data: {
      name: parsed.username,
      email: parsed.email.toLocaleLowerCase(),
      password: parsed.password,
    },
  });
  
  // successMessage: "Signed up successfully.";
  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
}

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
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid username or password.",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}
