import { query as q } from "faunadb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  jwt: {
    secret: process.env.SIGNING_KEY!,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const userEmail = user.email;

      try {
        await fauna.query(
          q.Create(q.Collection("users"), { data: { userEmail } })
        );

        return true;
      } catch {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
