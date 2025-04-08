import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        if (token && session.user) {
          // Step 2: Pass custom token fields to the session
          session.user.username = token.username as string;
          session.user.bio = token.bio as string;
          session.user.location = token.location as string;
          session.user.pronouns = token.pronouns as string;
          session.user.preferredLanguage = token.preferredLanguage as string;
          session.user.github = token.github as string;
          session.user.linkedin = token.linkedin as string;
          session.user.website = token.website as string;
          session.user.otherSocial = token.otherSocial as string;
          // Step 3: Extend the user object with types in next-auth.d.ts
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      
      // Steps to extend data from the database to the session:
      // Step 1: Create custom token fields ^
      token.username = existingUser.username;
      token.bio = existingUser.bio;
      token.location = existingUser.location;
      token.pronouns = existingUser.pronouns;
      token.preferredLanguage = existingUser.preferredLanguage;
      token.github = existingUser.github;
      token.linkedin = existingUser.linkedin;
      token.website = existingUser.website;
      token.otherSocial = existingUser.otherSocial;

      return token;
    },
  },
  ...authConfig,
});
