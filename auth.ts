import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      // Save user data to the database
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              role : "user"
            },
          });
        }
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false; // Prevent sign-in if there's an error
      }

      return true; // Allow sign-in
    },
  },
});