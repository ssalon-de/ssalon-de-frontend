import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    // 카카오 Provider
    KakaoProvider({
      clientId: process.env.NEXT_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // 리턴되는 값들은 token에 저장된다.
      console.log("token", token, "user", user, account);
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {},
});

export { handler as GET, handler as POST };
