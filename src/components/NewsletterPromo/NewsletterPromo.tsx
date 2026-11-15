import {
  Headphones,
  Mail,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Truck,
} from "lucide-react";

export function NewsletterPromo() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="mx-auto grid max-w-7xl gap-6 rounded-2xl border border-[#e6f4ec] bg-linear-to-br from-[#f0fcf6] via-white to-[#effbf7] p-5 shadow-[0_12px_35px_-28px_rgba(17,95,58,0.3)] sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-wide text-[#16815c] uppercase">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#0eaa68] text-white">
              <Mail aria-hidden="true" className="size-3.5" />
            </span>
            Newsletter | 50,000+ subscribers
          </p>
          <h2
            className="max-w-lg font-heading text-xl leading-tight font-bold text-[#172820] sm:text-2xl"
            id="newsletter-title"
          >
            Get the Freshest Updates{" "}
            <span className="text-[#0eaa68]">Delivered Free</span>
          </h2>
          <p className="mt-2 text-xs text-[#718078] sm:text-sm">
            Weekly recipes, seasonal offers &amp; exclusive member perks.
          </p>

          <ul className="mt-4 flex flex-wrap gap-2 text-[9px] font-medium text-[#52665a] sm:text-[10px]">
            {[
              "Fresh Picks Weekly",
              "Free Delivery Codes",
              "Members-Only Deals",
            ].map((perk) => (
              <li
                className="rounded-full border border-[#dcece2] bg-white/80 px-2.5 py-1.5"
                key={perk}
              >
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex max-w-lg gap-2">
            <label className="sr-only" htmlFor="newsletter-email">
              Your email address
            </label>
            <input
              autoComplete="email"
              className="h-10 min-w-0 flex-1 rounded-lg border border-[#dce7df] bg-white px-3 text-xs text-[#24372c] outline-none placeholder:text-[#99a79e] focus:border-[#0eaa68] focus:ring-2 focus:ring-[#0eaa68]/15"
              id="newsletter-email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
            <button
              className="h-10 shrink-0 rounded-lg bg-[#0eaa68] px-4 text-xs font-bold text-white transition hover:bg-[#078654] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0eaa68]"
              type="button"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-2 text-[9px] text-[#8c9b91]">
            By subscribing, you agree to receive occasional emails from
            FreshCart.
          </p>
        </div>

        <aside
          aria-label="FreshCart mobile app"
          className="rounded-2xl bg-[#142438] p-5 text-white shadow-lg sm:p-6 lg:w-full lg:max-w-sm lg:justify-self-end"
        >
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#0eaa68]/15 px-2.5 py-1 text-[9px] font-bold tracking-wide text-[#5ce2a1] uppercase">
            <Smartphone aria-hidden="true" className="size-3" />
            Mobile App
          </p>
          <h3 className="font-heading text-lg font-bold">
            Shop Faster on Our App
          </h3>
          <p className="mt-1 text-[10px] leading-5 text-slate-300">
            Get app-exclusive deals &amp; 15% off your first order.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { eyebrow: "Download on the", name: "App Store" },
              { eyebrow: "Get it on", name: "Google Play" },
            ].map((store) => (
              <div
                className="rounded-lg border border-white/10 bg-white/8 px-3 py-2"
                key={store.name}
              >
                <span className="block text-[8px] text-slate-300">
                  {store.eyebrow}
                </span>
                <span className="block text-[11px] font-semibold">
                  {store.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9px] text-slate-400">
            Rated 4.9/5 | 100K+ downloads
          </p>
        </aside>
      </div>
    </section>
  );
}
