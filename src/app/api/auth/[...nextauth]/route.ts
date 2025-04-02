import { BASE_URL } from "@/shared/constants/env";
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_KAKAO_SECRET!,
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async signIn({ user, account }) {
      let isSuccess: boolean | string = false;

      if (account?.provider && user?.email) {
        const requestBody = {
          email: user?.email ?? "",
          provider: account?.provider ?? "",
        };

        try {
          const res = await fetch(`${BASE_URL}/auth/oauth`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(`${BASE_URL}/api/auth/oauth`, res);

          if (res.ok) {
            const data = await res.json();

            if (!data.isUser) {
              isSuccess = "/profile";
            }
          }

          isSuccess = true;
        } catch (error) {
          console.log(error);
        }
      }
      return isSuccess;
    },
    async jwt({ token, account }) {
      if (account?.provider && account?.access_token) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken && session.user) {
        session = {
          ...session,
          accessToken: token.accessToken,
          provider: token.provider,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
