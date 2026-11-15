import { ShieldCheck, Star, Truck } from "lucide-react";
import { RegisterForm } from "@/src/components/RegisterForm/RegisterForm";

const signupBenefits = [
  {
    title: "Premium Quality",
    detail: "Premium quality products sourced from trusted suppliers.",
    icon: Star,
  },
  {
    title: "Fast Delivery",
    detail: "Same-day delivery available in most areas.",
    icon: Truck,
  },
  {
    title: "Secure Shopping",
    detail: "Your data and payments are completely secure.",
    icon: ShieldCheck,
  },
];

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <section className="px-1 sm:px-4">
          <h1 className="font-heading text-3xl leading-tight font-bold text-[#172820] sm:text-4xl">
            Welcome to <span className="text-[#16a34a]">FreshCart</span>
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#68756d]">
            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
          </p>

          <ul className="mt-7 space-y-5">
            {signupBenefits.map(({ title, detail, icon: Icon }) => (
              <li className="flex items-center gap-4" key={title}>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#dff9e9] text-[#159451]">
                  <Icon aria-hidden="true" className="size-5 fill-current" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#27352c]">{title}</span>
                  <span className="mt-0.5 block text-sm leading-5 text-[#68756d]">{detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <blockquote className="mt-8 max-w-xl rounded-xl border border-[#e8eee9] bg-white p-5 shadow-[0_8px_24px_-22px_rgba(20,40,28,0.35)]">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-[#dcf7e7] text-sm font-bold text-[#148c50]">
                SJ
              </span>
              <span>
                <span className="block text-sm font-semibold text-[#27352c]">Sarah Johnson</span>
                <span aria-label="5 out of 5 stars" className="mt-0.5 flex gap-0.5 text-[#f4b740]">
                  {Array.from({ length: 5 }, (_, index) => <Star aria-hidden="true" className="size-3.5 fill-current" key={index} />)}
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm italic leading-6 text-[#657169]">
              “FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!”
            </p>
          </blockquote>
        </section>

        <RegisterForm />
      </div>
    </main>
  );
}
