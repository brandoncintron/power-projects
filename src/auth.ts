import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import db from '@/lib/db'
import { signInSchema } from '@/lib/zod'

// Define a custom type that includes the password field.
type UserWithPassword = {
  id: string
  name: string | null
  email: string
  image: string | null
  password: string
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials)

        // Explicitly select the password field and cast the result.
        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true, // This field is not included by default.
          },
        }) as UserWithPassword | null;

        if (!user) {
          throw new Error('No user found');
        }

        // Compare provided password with the hashed password.
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        // Return the user data without exposing the password.
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    GitHub,
    Google,
  ],
  callbacks: {
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
