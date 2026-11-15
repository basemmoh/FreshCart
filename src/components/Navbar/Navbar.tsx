"use client";
import Link from "next/link";
import {
  ChevronDown,
  Gift,
  Grid2X2,
  Headset,
  Heart,
  House,
  Mail,
  Mic,
  Phone,
  QrCode,
  Search,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  UserRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Category, CategoriesResponse } from "@/src/app/(home)/home.interface";
import { useWishlist } from "@/src/components/WishlistProvider/WishlistProvider";
import { useCart } from "@/src/components/CartProvider/CartProvider";

const desktopLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Shop", href: "/shop" },
];

const mobileLinks = [
  { label: "Home", href: "/", icon: House, active: true },
  { label: "Categories", href: "/categories", icon: Grid2X2 },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/login", icon: UserRound },
];

function SearchForm({ mobile = false }: { mobile?: boolean }) {
  return (
    <form
      action="/"
      className={
        mobile
          ? "flex w-full items-center gap-2 md:hidden"
          : "hidden w-full max-w-2xl flex-1 items-center md:flex"
      }
      role="search"
    >
      <div className="relative flex min-w-0 flex-1 items-center">
        <Search
          aria-hidden="true"
          className={
            mobile
              ? "absolute left-3 size-5 text-[#6d7a72]"
              : "sr-only"
          }
        />
        <label
          className="sr-only"
          htmlFor={mobile ? "navbar-mobile-search" : "navbar-desktop-search"}
        >
          Search products
        </label>
        <input
          className={
            mobile
              ? "h-11 w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2 pl-10 pr-10 text-sm text-[#141b2b] placeholder:text-[#6d7a72] focus:border-[#006948] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#006948]"
              : "h-11 w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-5 pr-12 text-sm text-gray-800 placeholder:text-gray-500 transition focus:border-[#006948] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006948]/20"
          }
          id={mobile ? "navbar-mobile-search" : "navbar-desktop-search"}
          name="q"
          placeholder={
            mobile
              ? "Search groceries, fashion, tech..."
              : "Search for products, brands and more..."
          }
          type="search"
        />
        {mobile ? (
          <button
            aria-label="Voice search"
            className="absolute right-2.5 rounded p-1 text-[#6d7a72] transition hover:text-[#006948] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948]"
            type="button"
          >
            <Mic aria-hidden="true" className="size-5" />
          </button>
        ) : (
          <button
            aria-label="Submit search"
            className="absolute right-1.5 flex size-8 items-center justify-center rounded-full bg-[#006948] text-white transition hover:bg-[#047857] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948]"
            type="submit"
          >
            <Search aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
      {mobile && (
        <button
          aria-label="Barcode scanner"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-[#3d4a42] transition hover:text-[#006948] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948]"
          type="button"
        >
          <QrCode aria-hidden="true" className="size-5" />
        </button>
      )}
    </form>
  );
}

function CountBadge({ children }: { children: string }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#006948] text-[9px] leading-none font-bold text-white">
      {children}
    </span>
  );
}

export function Navbar() {
  const {data } = useSession();
  const myRouter = useRouter();
  const { items: wishlistItems } = useWishlist();
  const { itemCount: cartCount } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) return;

    const controller = new AbortController();
    fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/categories`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) return null;
        return await response.json() as CategoriesResponse;
      })
      .then((result) => {
        if (result && Array.isArray(result.data)) setCategories(result.data);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="border-b border-gray-100 bg-white px-4 py-1 text-[10px] text-gray-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-5">
            <span className="flex min-w-0 items-center gap-1.5 font-medium">
              <Truck aria-hidden="true" className="size-3 shrink-0 text-[#059669]" />
              <span className="truncate">Free Shipping on Orders over 500 EGP</span>
            </span>
            <span className="hidden items-center gap-1.5 font-medium text-gray-500 sm:flex">
              <Gift aria-hidden="true" className="size-3 text-[#059669]" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-gray-500 sm:gap-5">
            <a className="flex items-center gap-1 transition hover:text-[#059669]" href="tel:+18001234567">
              <Phone aria-hidden="true" className="size-3" />
              +1 (800) 123-4567
            </a>
            <a className="hidden items-center gap-1 transition hover:text-[#059669] sm:flex" href="mailto:support@freshcart.com">
              <Mail aria-hidden="true" className="size-3" />
              support@freshcart.com
            </a>
            <span aria-hidden="true" className="text-gray-300">|</span>
            {data ?  <div className="flex items-center gap-2 font-medium">
              <div>{data.user?.name}</div>
              <div className="cursor-pointer text-red-500 font-bold" onClick={_ => signOut({redirect: false, redirectTo:'/login'}).then(res => myRouter.push(res.url))}> Logut</div>
                 </div>: <div className="flex items-center gap-2 font-medium">
              <Link className="inline-flex items-center gap-1 transition hover:text-[#059669]" href="/login"><UserRound aria-hidden="true" className="size-3" />Sign In</Link>
              <span aria-hidden="true">/</span>
              <Link className="inline-flex items-center gap-1 transition hover:text-[#059669]" href="/register"><UserRound aria-hidden="true" className="size-3" />Sign Up</Link>
            </div>}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 md:gap-5">
            <Link
              aria-label="FreshCart home"
              className="group flex shrink-0 items-center gap-1.5 text-base font-extrabold tracking-tight text-[#172820] md:gap-2 md:text-lg"
              href="/"
            >
              <img
                alt=""
                aria-hidden="true"
                className="size-6 rounded-full object-cover transition-transform group-hover:scale-105"
                height={24}
                src="/favicon.ico"
                width={24}
              />
              <span><span className="text-[#0eaa68]">Fresh</span>Cart</span>
            </Link>

            <SearchForm />

            <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm font-semibold text-gray-700 lg:flex">
              {desktopLinks.map(({ label, href, active }) => (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1 whitespace-nowrap transition hover:text-[#006948] ${active ? "text-[#006948]" : ""}`}
                  href={href}
                  key={label}
                >
                  {label}
                </Link>
              ))}
              <div className="group relative">
                <Link className="flex items-center gap-1 whitespace-nowrap text-[#006948] transition hover:text-[#047857]" href="/categories">
                  Categories
                  <ChevronDown aria-hidden="true" className="size-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-0 z-50 w-64 pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-[#e8eee9] bg-white py-2 shadow-[0_16px_36px_-18px_rgba(20,40,28,0.35)]">
                    <Link className="block px-5 py-3 text-sm font-semibold text-[#35463b] transition hover:bg-[#f0faf4] hover:text-[#07884d]" href="/categories">
                      All Categories
                    </Link>
                    <div className="mx-4 border-t border-[#edf1ee]" />
                    <div className="max-h-72 overflow-y-auto py-1">
                      {categories.slice(0, 4).map((category) => (
                        <Link className="block px-5 py-3 text-sm text-[#56635b] transition hover:bg-[#f0faf4] hover:text-[#07884d]" href={`/categories/${encodeURIComponent(category._id)}`} key={category._id}>
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Link className="flex items-center gap-1 whitespace-nowrap transition hover:text-[#006948]" href="/brands">Brands</Link>
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 text-gray-700 sm:gap-2.5">
              <Link
                aria-label="24/7 support"
                className="hidden items-center gap-2 rounded-full px-1 text-xs xl:flex"
                href="/support"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-[#006948]">
                  <Headset aria-hidden="true" className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-medium text-gray-400">Support</span>
                  <span className="font-bold text-gray-800">24/7 Help</span>
                </span>
              </Link>
              <Link
                aria-label="Support help"
                className="rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-[#006948] md:hidden"
                href="/support"
              >
                <Headset aria-hidden="true" className="size-5" />
              </Link>
              <Link
                aria-label={wishlistItems.length > 0 ? `Wishlist, ${wishlistItems.length} items` : "Wishlist"}
                className="relative rounded-full p-2 transition hover:bg-gray-100 hover:text-[#006948]"
                href="/wishlist"
              >
                <Heart aria-hidden="true" className="size-5" />
                {wishlistItems.length > 0 && <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[9px] leading-none font-bold text-white">{wishlistItems.length > 99 ? "99+" : wishlistItems.length}</span>}
              </Link>
              <Link
                aria-label={cartCount > 0 ? `Shopping cart, ${cartCount} items` : "Shopping cart"}
                className="relative rounded-full bg-[#006948]/10 p-2 text-[#006948] transition hover:bg-[#006948]/15"
                href="/cart"
              >
                <ShoppingCart aria-hidden="true" className="size-5" />
                {cartCount > 0 && <CountBadge>{cartCount > 99 ? "99+" : String(cartCount)}</CountBadge>}
              </Link>
              {!data && <Link
                className="hidden items-center gap-2 rounded-full bg-[#16a34a] py-1.5 pr-4 pl-3 text-xs font-semibold text-white transition hover:bg-[#128340] sm:flex"
                href="/login"
              >
                <UserRound aria-hidden="true" className="size-4 text-white" />
                Sign In
              </Link>}
            </div>
          </div>

          <div className="mt-2.5 md:hidden">
            <SearchForm mobile />
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-[#e5e7eb] bg-white/95 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-12px_rgba(20,27,43,0.35)] backdrop-blur-md md:hidden"
      >
        {mobileLinks.map(({ label, href, icon: Icon, active }) => (
          <Link
            aria-current={active ? "page" : undefined}
            aria-label={label === "Wishlist" && wishlistItems.length > 0 ? `Wishlist, ${wishlistItems.length} items` : label === "Cart" && cartCount > 0 ? `Cart, ${cartCount} items` : label}
            className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[11px] leading-tight transition-colors ${active ? "font-bold text-[#006948]" : "text-[#3d4a42] hover:text-[#006948]"}`}
            href={href}
            key={label}
          >
            <Icon aria-hidden="true" className="size-6" />
            {label === "Wishlist" && wishlistItems.length > 0 && <span aria-hidden="true" className="absolute top-0 right-[calc(50%-18px)] flex size-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">{wishlistItems.length > 99 ? "99+" : wishlistItems.length}</span>}
            {label === "Cart" && cartCount > 0 && <span aria-hidden="true" className="absolute top-0 right-[calc(50%-18px)] flex size-4 items-center justify-center rounded-full bg-[#006948] text-[9px] font-bold text-white">{cartCount > 99 ? "99+" : cartCount}</span>}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
