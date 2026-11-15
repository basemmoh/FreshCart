"use server";
import type { RegisterFormType, RegisterResponse, RegisterResult } from "./register.interface";

export async function signUpUser(data: RegisterFormType): Promise<RegisterResult> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return { success: false, message: "Registration is temporarily unavailable." };
    }

    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = (await response.json().catch(() => ({}))) as RegisterResponse;
    const success = response.ok && responseData.message === "success";

    return {
      success,
      message: success
        ? "Your account was created successfully. Redirecting to sign in..."
        : responseData.message ?? "Unable to create your account. Please try again.",
    };
  } catch {
    return { success: false, message: "Unable to reach the registration service. Please try again." };
  }
}
