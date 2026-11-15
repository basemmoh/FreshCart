"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { RegisterFormType } from "@/src/app/register/register.interface";
import { registerSchema } from "@/src/app/register/register.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUser } from "@/src/app/register/register.services";


export function RegisterForm() {
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; success: boolean } | null>(null);
  useEffect(() => {
    if (!toast || toast.success) return;
    const timeout = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  async function handleUserRegister(data: RegisterFormType) {
    setToast(null);
    const result = await signUpUser(data);
    setToast({ message: result.message, success: result.success });

    if (result.success) {
      await new Promise((resolve) => window.setTimeout(resolve, 1500));
      setToast(null);
      router.push("/login");
    }
  }
  return (
    <>
    {toast && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 px-4"
        role={toast.success ? "status" : "alert"}
      >
        <div className={`flex max-w-sm items-center gap-3 rounded-xl border px-5 py-4 text-sm font-medium shadow-lg ${toast.success ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
        <span aria-hidden="true" className={`flex size-6 shrink-0 items-center justify-center rounded-full font-bold ${toast.success ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.success ? "✓" : "!"}
        </span>
        {toast.message}
        </div>
      </div>
    )}
    <section
      aria-labelledby="signup-title"
      className="mx-auto w-full max-w-xl rounded-2xl border border-[#edf1ee] bg-white px-5 py-7 shadow-[0_16px_45px_-30px_rgba(20,40,28,0.3)] sm:px-8 sm:py-8"
    >
      <div className="text-center">
        <h2
          className="font-heading text-2xl font-bold text-[#172820]"
          id="signup-title"
        >
          Create Your Account
        </h2>
        <p className="mt-1 text-sm text-[#6c7870]">
          Start your fresh journey with us today
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe5e1] text-sm font-semibold text-[#46534b] transition hover:bg-[#f8faf9]"
          type="button"
        >
          <span aria-hidden="true" className="font-bold text-[#e34336]">
            G
          </span>{" "}
          Google
        </button>
        <button
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe5e1] text-sm font-semibold text-[#46534b] transition hover:bg-[#f8faf9]"
          type="button"
        >
          <span
            aria-hidden="true"
            className="flex size-4 items-center justify-center rounded-full bg-[#1877f2] text-[11px] font-bold text-white"
          >
            f
          </span>{" "}
          Facebook
        </button>
      </div>

      <div className="my-4 flex items-center gap-3 text-xs text-[#89958d]">
        <span className="h-px flex-1 bg-[#e7ece8]" />
        or
        <span className="h-px flex-1 bg-[#e7ece8]" />
      </div>

      <form className="space-y-3.5" noValidate onSubmit={handleSubmit(handleUserRegister)}>
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-[#445148]"
            htmlFor="signup-name"
          >
            Name*
          </label>
          <input
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-[#9ca8a0] focus:ring-2 focus:ring-[#16a34a]/15 ${errors.name ? "border-red-500 focus:border-red-500" : "border-[#dfe5e1] focus:border-[#16a34a]"}`}
            id="signup-name"
            {...register("name")}
            placeholder="Your name"
            required
          />
          {errors.name?.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-[#445148]"
            htmlFor="signup-email"
          >
            Email*
          </label>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#89958d]"
            />
            <input
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={`h-10 w-full rounded-lg border py-2 pr-3 pl-9 text-sm outline-none placeholder:text-[#9ca8a0] focus:ring-2 focus:ring-[#16a34a]/15 ${errors.email ? "border-red-500 focus:border-red-500" : "border-[#dfe5e1] focus:border-[#16a34a]"}`}
              id="signup-email"
              {...register("email")}
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>
          {errors.email?.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-[#445148]"
            htmlFor="signup-password"
          >
            Password*
          </label>
          <div className="relative">
            <LockKeyhole
              aria-hidden="true"
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#89958d]"
            />
            <input
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              className={`h-10 w-full rounded-lg border py-2 pr-3 pl-9 text-sm outline-none placeholder:text-[#9ca8a0] focus:ring-2 focus:ring-[#16a34a]/15 ${errors.password ? "border-red-500 focus:border-red-500" : "border-[#dfe5e1] focus:border-[#16a34a]"}`}
              id="signup-password"
              {...register("password")}
              placeholder="Create a strong password"
              required
              type="password"
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-1.5 flex-1 rounded-full bg-[#e6e9e7]">
              <span className="block h-full w-1/4 rounded-full bg-[#e6a43a]" />
            </span>
            <span className="text-[10px] text-[#7d8981]">Weak</span>
          </div>
          <p className="mt-1 text-[10px] text-[#89958d]">
            Must be at least 8 characters with numbers and symbols.
          </p>
          {errors.password?.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.password.message}</p>}
        </div>
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-[#445148]"
            htmlFor="signup-confirm-password"
          >
            Confirm Password*
          </label>
          <input
            autoComplete="new-password"
            aria-invalid={Boolean(errors.rePassword)}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-[#9ca8a0] focus:ring-2 focus:ring-[#16a34a]/15 ${errors.rePassword ? "border-red-500 focus:border-red-500" : "border-[#dfe5e1] focus:border-[#16a34a]"}`}
            id="signup-confirm-password"
            {...register("rePassword")}
            placeholder="Confirm your password"
            required
            type="password"
          />
          {errors.rePassword?.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.rePassword.message}</p>}
        </div>
        <div>
          <label
            className="mb-1.5 block text-xs font-semibold text-[#445148]"
            htmlFor="signup-phone"
          >
            Phone Number*
          </label>
          <input
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={`h-10 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-[#9ca8a0] focus:ring-2 focus:ring-[#16a34a]/15 ${errors.phone ? "border-red-500 focus:border-red-500" : "border-[#dfe5e1] focus:border-[#16a34a]"}`}
            id="signup-phone"
            {...register("phone")}
            placeholder="+1 234 567 8900"
            required
            type="tel"
          />
          {errors.phone?.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.phone.message}</p>}
        </div>

        <label className="flex items-start gap-2 text-xs leading-5 text-[#5e6b63]">
          <input
            className="mt-0.5 size-4 shrink-0 accent-[#16a34a]"
            aria-invalid={Boolean(errors.terms)}
            {...register("terms")}
            type="checkbox"
          />
          <span>
            I agree to the{" "}
            <span className="font-semibold text-[#159451]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-semibold text-[#159451]">Privacy Policy</span>
            *
          </span>
        </label>
        {errors.terms?.message && <p className="text-xs text-red-600" role="alert">{errors.terms.message}</p>}

        <button
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-sm font-bold text-white transition hover:bg-[#128340]"
          disabled={isSubmitting}
          type="submit"
        >
          <UserRound aria-hidden="true" className="size-4" />
          {isSubmitting ? "Creating Account..." : "Create My Account"}
        </button>
      </form>

      <p className="mt-5 border-t border-[#edf1ee] pt-5 text-center text-sm text-[#68756d]">
        Already have an account?{" "}
        <Link
          className="font-semibold text-[#159451] hover:text-[#117a43]"
          href="/login"
        >
          Sign In
        </Link>
      </p>
    </section>
    </>
  );
}
