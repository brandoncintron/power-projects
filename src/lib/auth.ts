import GitHub from "next-auth/providers/github"
import NextAuth from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({ providers: [GitHub] });