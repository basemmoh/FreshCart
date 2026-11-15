import Link from "next/link";
import {
  Camera,
  CirclePlay,
  Headphones,
  RotateCcw,
  ShieldCheck,
  ShoppingBasket,
  Truck,
} from "lucide-react";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/categories" },
      { label: "Men's Fashion", href: "/categories" },
      { label: "Women's Fashion", href: "/categories" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/login" },
      { label: "Order History", href: "/login" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/support" },
      { label: "Help Center", href: "/support" },
      { label: "Shipping Info", href: "/shop" },
      { label: "Returns & Refunds", href: "/shop" },
      { label: "Track Order", href: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const serviceItems = [
  { title: "Free Shipping", detail: "On orders over 500 EGP", icon: Truck },
  { title: "Easy Returns", detail: "14-day return policy", icon: RotateCcw },
  { title: "Secure Payment", detail: "100% secure checkout", icon: ShieldCheck },
  { title: "24/7 Support", detail: "Contact us anytime", icon: Headphones },
];

const socialItems = [
  { label: "Facebook", text: "f" },
  { label: "X", text: "X" },
  { label: "Instagram", icon: Camera },
  { label: "YouTube", icon: CirclePlay },
];

export function Footer() {
  return (
    <>
      <section aria-label="Shopping benefits" className="bg-[#effbf4] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {serviceItems.map(({ title, detail, icon: Icon }) => (
            <div className="flex items-center gap-2.5" key={title}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#dcf7e7] text-[#0e9b5d]">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[10px] font-bold text-[#24372c] sm:text-[11px]">{title}</span>
                <span className="block truncate text-[9px] text-[#77877d]">{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#111c2e] px-4 pt-9 pb-8 text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-10">
          <div>
            <Link
              aria-label="FreshCart home"
              className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-lg font-extrabold tracking-tight text-[#172820]"
              href="/"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#e9f7ef] text-[#0e9b5d]">
                <ShoppingBasket aria-hidden="true" className="size-4" />
              </span>
              FreshCart
            </Link>
            <p className="mt-3 max-w-xs text-[10px] leading-5 text-slate-400">
              FreshCart is your one-stop destination for quality products, from
              fresh favorites to everyday essentials. We bring the best brands
              and a smoother shopping experience straight to your door.
            </p>
            <address className="mt-3 space-y-1 text-[9px] leading-4 text-slate-400 not-italic">
              <p>+1 (800) 123-4567</p>
              <p>support@freshcart.com</p>
              <p>123 Commerce Street, New York, NY 10001</p>
            </address>
            <div aria-label="Social media" className="mt-4 flex gap-2">
              {socialItems.map(({ label, text, icon: Icon }) => (
                <span
                  aria-hidden="true"
                  className="flex size-7 items-center justify-center rounded-full border border-white/10 text-slate-300"
                  key={label}
                >
                  {Icon ? <Icon className="size-3.5" /> : <span className="text-xs font-bold">{text}</span>}
                </span>
              ))}
            </div>
          </div>

          {footerGroups.map(({ title, links }) => (
            <nav aria-label={`${title} links`} key={title}>
              <h2 className="mb-3 text-[11px] font-bold text-white">{title}</h2>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={`${label}-${href}`}>
                    <Link
                      className="text-[10px] text-slate-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ce2a1]"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </footer>

      <section
        aria-label="Copyright and payment methods"
        className="border-t border-white/5 bg-[#0d1727] px-4 py-3 text-slate-500 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-[9px] sm:flex-row">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div
            aria-label="Accepted payment methods"
            className="flex items-center gap-3"
          >
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </section>
    </>
  );
}
