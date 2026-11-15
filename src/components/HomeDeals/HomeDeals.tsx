import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

const promotions = [
  {
    id: "deal-of-the-day",
    label: "Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Save on hand-picked seasonal favorites.",
    discount: "40% OFF",
    code: "ORGANIC40",
    action: "Shop Now",
    icon: Leaf,
    className: "from-[#08b879] via-[#079868] to-[#087953]",
    decoration: "bg-[#8df0bd]/20",
  },
  {
    id: "new-arrivals",
    label: "New Arrivals",
    title: "Exotic Vegetables",
    description: "Explore our latest premium collection.",
    discount: "25% OFF",
    code: "FRESH25",
    action: "Explore Now",
    icon: Sparkles,
    className: "from-[#ff942e] via-[#ff6d42] to-[#f52d62]",
    decoration: "bg-[#ffc585]/25",
  },
];

export function HomeDeals() {
  return (
    <section id="home-deals" aria-label="Current promotions" className="bg-white px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
        {promotions.map(({ id, label, title, description, discount, code, action, icon: Icon, className, decoration }) => (
          <article className={`relative isolate overflow-hidden rounded-2xl bg-linear-to-br ${className} px-5 py-6 text-white shadow-sm sm:min-h-[205px] sm:px-7 sm:py-7`} id={id} key={id}>
            <span aria-hidden="true" className={`absolute -right-10 -top-14 -z-10 size-44 rounded-full ${decoration}`} />
            <span aria-hidden="true" className={`absolute -bottom-16 left-1/3 -z-10 size-40 rounded-full ${decoration}`} />
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
              <Icon aria-hidden="true" className="size-3.5" /> {label}
            </p>
            <h2 className="mt-3 font-heading text-xl font-bold sm:text-2xl">{title}</h2>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">{description}</p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xl font-extrabold tracking-tight sm:text-2xl">{discount}</span>
              <span className="text-[10px] text-white/90">Use code: <strong className="text-white">{code}</strong></span>
            </div>
            <Link className="mt-4 inline-flex h-9 items-center rounded-full bg-white px-4 text-xs font-bold text-[#13794e] transition hover:bg-white/90" href="/shop">
              {action} <ArrowRight aria-hidden="true" className="ml-2 size-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
