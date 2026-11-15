"use server";

import type { LoginFormType, LoginResponse, LoginResult } from "./login.interface";

export async function signInUser(data: LoginFormType): Promise<LoginResult> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return { success: false, message: "Sign in is temporarily unavailable." };
    }

    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/auth/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    const responseData = (await response.json().catch(() => ({}))) as LoginResponse;
    return {
      success: response.ok,
      message: responseData.message ?? (response.ok ? "Signed in successfully." : "Unable to sign in. Check your email and password."),
    };
  } catch {
    return { success: false, message: "Unable to reach the sign in service. Please try again." };
  }
}
