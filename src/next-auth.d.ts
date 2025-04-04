import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    bio: string
    location: string
    pronouns: string
    preferredLanguage: string
    github: string
    linkedin: string
    website: string
    otherSocial: string
}

declare module "next-auth" {
    interface Session {
      user: ExtendedUser
    }
  }