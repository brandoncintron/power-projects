"use server";

import { signUpSchema } from "../zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return {
      error: "Email already taken!",
    };
  }

  await prisma.user.create({
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
