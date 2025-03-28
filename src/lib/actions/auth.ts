"use server";

import * as z from "zod";
import { signUpSchema, signInSchema } from "../zod";
import db from "../db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export async function registerUser({
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
  const validatedFields = signUpSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return {
      error: "Email already taken!",
    };
  }

  await db.user.create({
    data: {
      name: username,
      email: email,
      password: hashedPassword,
    },
  });

  return {
    success: "User successfully created!",
    email,
    password,
  };
}



export const login = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
};

