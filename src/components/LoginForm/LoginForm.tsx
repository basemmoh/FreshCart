"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, LockKeyhole, Mail, UserRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginFormType } from "@/src/app/login/login.interface";
import { loginSchema } from "@/src/app/login/login.zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
  
export function LoginForm() {
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; success: boolean } | null>(null);
  useEffect(() => {
    if (!toast || toast.success) return;
    const timeout = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  async function handleUserLogin(data: LoginFormType) {
    setToast(null);
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
        redirectTo: "/",
      });

      if (result.error) {
        setToast({ message: "Invalid email or password. Please try again.", success: false });
        return;
      }

      setToast({ message: "Signed in successfully.", success: true });
      await new Promise((resolve) => window.setTimeout(resolve, 1200));
      setToast(null);
      router.push("/");
    } catch {
      setToast({ message: "Unable to sign in right now. Please try again.", success: false });
    }
  }

  return (
    <>
    {toast && (
      <div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 px-4"
        role={toast.success ? "status" : "alert"}
      >
        <div className={`flex max-w-sm items-center gap-3 rounded-xl border px-5 py-4 text-sm font-medium shadow-lg ${toast.success ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
        <span aria-hidden="true" className={`flex size-6 shrink-0 items-center justify-center rounded-full font-bold ${toast.success ? "bg-emerald-600 text-white" : "bg-red-600 text-red-800"}`}>
          {toast.success ? "✓" : "!"}
        </span>
        {toast.message}
        </div>
      </div>
    )}
    <section
      aria-labelledby="login-title"
      className="mx-auto w-full max-w-xl rounded-2xl border border-[#edf1ee] bg-white px-5 py-7 shadow-[0_16px_45px_-30px_rgba(20,40,28,0.3)] sm:px-9 sm:py-9"
    >
      <div className="text-center">
        <p className="font-heading text-2xl font-extrabold tracking-tight text-[#172820]">
          <span className="text-[#16a34a]">Fresh</span>Cart
        </p>
        <h2 className="mt-3 font-heading text-2xl font-bold text-[#172820]" id="login-title">
          Welcome Back!
        </h2>
        <p className="mt-1 text-sm text-[#6c7870]">
          Sign in to continue your fresh shopping experience
        </p>
      </div>

      <div className="mt-6 grid gap-2.5">
        <button className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe5e1] text-sm font-medium text-[#46534b] transition hover:bg-[#f8faf9]" type="button">
          <span aria-hidden="true" className="font-bold text-[#e34336]">G</span>
          Continue with Google
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe5e1] text-sm font-medium text-[#46534b] transition hover:bg-[#f8faf9]" type="button">
          <span aria-hidden="true" className="flex size-4 items-center justify-center rounded-full bg-[#1877f2] text-[11px] font-bold text-white">f</span>
          Continue with Facebook
        </button>
      </div>

      <div className="my-5 flex items-center gap-3 text-[10px] font-semibold text-[#8a968e]">
        <span className="h-px flex-1 bg-[#e7ece8]" />
        OR CONTINUE WITH EMAIL
        <span className="h-px flex-1 bg-[#e7ece8]" />
      </div>

      <form className="space-y-4" noValidate onSubmit={handleSubmit(handleUserLogin)}>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#445148]" htmlFor="login-email">
            Email Address
          </label>
          <div className="relative">
            <Mail aria-hidden="true" className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#89958d]" />
            <input
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={`h-11 w-full rounded-lg border bg-white pr-3 pl-10 text-sm text-[#26352b] outline-none placeholder:text-[#9ca8a0] focus:ring-2 focus:ring-[#16a34a]/15 ${errors.email ? "border-red-500 focus:border-red-500" : "border-[#dfe5e1] focus:border-[#16a34a]"}`}
              id="login-email"
              {...register("email")}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          {errors.email?.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label className="text-xs font-semibold text-[#445148]" htmlFor="login-password">
              Password
            </label>
            <button className="text-xs font-semibold text-[#159451] hover:text-[#117a43]" type="button">
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <LockKeyhole aria-hidden="true" className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#89958d]" />
            <input
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              className={`h-11 w-full rounded-lg border bg-white px-10 text-sm text-[#26352b] outline-none placeholder:text-[#9ca8a0] focus:ring-2 focus:ring-[#16a34a]/15 ${errors.password ? "border-red-500 focus:border-red-500" : "border-[#dfe5e1] focus:border-[#16a34a]"}`}
              id="login-password"
              {...register("password")}
              placeholder="Enter your password"
              type="password"
            />
            <Eye aria-hidden="true" className="absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#89958d]" />
          </div>
          {errors.password?.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.password.message}</p>}
        </div>

        <label className="flex items-center gap-2 text-xs text-[#56635b]">
          <input className="size-4 accent-[#16a34a]" name="remember" type="checkbox" />
          Keep me signed in
        </label>

        <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-sm font-bold text-white shadow-sm transition hover:bg-[#128340] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
          <UserRound aria-hidden="true" className="size-4" />
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-5 border-t border-[#edf1ee] pt-5 text-center text-sm text-[#68756d]">
        New to FreshCart?{" "}
        <Link className="font-semibold text-[#159451] hover:text-[#117a43]" href="/register">
          Create an account
        </Link>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-[#7e8b82]">
        <span className="inline-flex items-center gap-1.5"><LockKeyhole aria-hidden="true" className="size-3.5" /> SSL Secured</span>
        <span className="inline-flex items-center gap-1.5"><UserRound aria-hidden="true" className="size-3.5" /> 50K+ Users</span>
        <span className="inline-flex items-center gap-1.5 text-[#bd8612]">â˜… <span className="text-[#7e8b82]">4.9 Rating</span></span>
      </div>
    </section>
    </>
  );
}
