import { query as q } from "faunadb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

interface SessionWithSubscription
  extends Omit<NextAuthOptions["session"], "user"> {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    activeSubscription?: {
      ref: {
        id: string;
      };
      ts: number;
      data: {
        status: string;
        userId: string;
      };
    };
  };
}

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
  callbacks: {
    async session({ session }) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user?.email as string)
                    )
                  )
                )
              ),
              q.Match(q.Index("subscription_by_status"), "active"),
            ])
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch (err) {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(user.email as string)
                )
              )
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email as string)
              )
            )
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
