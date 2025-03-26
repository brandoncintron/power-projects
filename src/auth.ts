import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { signInSchema } from "./lib/zod";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const validatedCredentials = signInSchema.parse(credentials);

        const user = await db.user.findFirst({
          where: {
            email: validatedCredentials.email,
            password: validatedCredentials.password,
          },
        });

        if (!user) {
          throw new Error("Invalid Credentials.");
        }
        return user;
      },
    }),
  ],
});
