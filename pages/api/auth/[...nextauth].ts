import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // 在 providers 中配置更多授权服务
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 50000,
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
