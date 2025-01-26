import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "/lib/prisma"
 
export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ...profile }
      }
    })
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    }
  }
})