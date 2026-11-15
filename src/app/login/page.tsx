import Image from "next/image";
import {
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";
import loginIllustration from "@/src/assests/login-illustration.png";
import { LoginForm } from "@/src/components/LoginForm/LoginForm";

const loginBenefits = [
  { label: "Free Delivery", icon: Truck },
  { label: "Secure Payment", icon: ShieldCheck },
  { label: "24/7 Support", icon: Headphones },
];

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <section className="text-center lg:px-4">
          <div className="mx-auto max-w-xl overflow-hidden rounded-2xl">
            <Image
              alt="A FreshCart shopping cart filled with fresh produce"
              className="h-auto w-full object-cover"
              height={520}
              priority
              src={loginIllustration}
              width={760}
            />
          </div>
          <h1 className="mx-auto mt-5 max-w-xl font-heading text-2xl leading-tight font-bold text-[#172820] sm:text-3xl">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#68756d]">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs.
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {loginBenefits.map(({ label, icon: Icon }) => (
              <li className="inline-flex items-center gap-2 text-xs text-[#5e6c63]" key={label}>
                <Icon aria-hidden="true" className="size-4 text-[#159451]" />
                {label}
              </li>
            ))}
          </ul>
        </section>

        <LoginForm />
      </div>
    </main>
  );
}
