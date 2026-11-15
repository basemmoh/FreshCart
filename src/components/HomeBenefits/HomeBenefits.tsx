import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  { title: "Free Shipping", detail: "On orders over 500 EGP", icon: Truck, tone: "bg-blue-50 text-blue-600" },
  { title: "Secure Payment", detail: "100% secure transactions", icon: ShieldCheck, tone: "bg-emerald-50 text-emerald-600" },
  { title: "Easy Returns", detail: "14-day return policy", icon: RotateCcw, tone: "bg-orange-50 text-orange-600" },
  { title: "24/7 Support", detail: "Dedicated support team", icon: Headphones, tone: "bg-violet-50 text-violet-600" },
];

export function HomeBenefits() {
  return (
    <section aria-label="Shopping benefits" className="border-b border-[#edf1ee] bg-[#f8faf9] px-4 py-5 sm:px-6 lg:px-8">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-3 lg:grid-cols-4">
        {benefits.map(({ title, detail, icon: Icon, tone }) => (
          <li className="flex items-center gap-3 rounded-xl border border-[#edf1ee] bg-white px-3 py-3 shadow-[0_5px_20px_-18px_rgba(20,40,28,0.3)] sm:px-4" key={title}>
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold text-[#26372d] sm:text-sm">{title}</span>
              <span className="mt-0.5 block truncate text-[10px] text-[#7b8880] sm:text-xs">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
