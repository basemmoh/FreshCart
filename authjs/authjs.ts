import type { LoginResponse } from "@/src/app/login/login.interface";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authconfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credential",
      credentials: {
        email: {type :"email", label: "Email", placeholder: "Enter your email"},
        password: {type: "password", label: "Password", placeholder: "Enter your password"},
      },
      authorize: async function (credentials) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) return null;

        try {
          const response = await fetch(
            `${baseUrl.replace(/\/$/, "")}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(credentials),
            },
          );
          const responseData = (await response
            .json()
            .catch(() => ({}))) as LoginResponse;

          if (!response.ok || !responseData.user) return null;
          const { role: _role, ...userData } = responseData.user;
          return {
            ...userData,
            id: responseData.user.email,
            backendToken: responseData.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user && "backendToken" in user && typeof user.backendToken === "string") {
        (token as typeof token & { backendToken?: string }).backendToken = user.backendToken;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
