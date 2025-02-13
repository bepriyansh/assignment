import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { login, signup } from "./api/auth";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        let user = null;

        try {
          if (!credentials.name) {
            const res = await login(
              credentials.email as string,
              credentials.password as string,
            );

            if (res.data) {
              user = res.data;
            } else {
              throw new Error(res.message);
            }
          } else {
            const res = await signup(
              credentials.name as string,
              credentials.email as string,
              credentials.password as string,
            );

            if (res.data) {
              user = res.data;
            } else {
              throw new Error(res.message);
            }
          }
        } catch (error) {
          throw new Error(
            error instanceof Error
              ? error.message
              : "An error occurred while trying to authenticate",
          );
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
  trustHost: true,
} as NextAuthConfig;
