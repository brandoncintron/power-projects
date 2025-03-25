import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
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
        //let user = null;

        const email = "test@test.com";
        const password = "testingout";

        if (credentials.email === email && credentials.password === password) {
          return { email, password };
        } else {
          throw new Error("Invalid credentials");
        }

        {
          /* 
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error(
            "Invalid credentials: ",
            parsedCredentials.error.errors
          );
          return null;
        }

        if (!user) {
          console.log("Invalid creds");
          return null;
        }

        return user;
        */
        }
      },
    }),
  ],
  pages: {},
});
