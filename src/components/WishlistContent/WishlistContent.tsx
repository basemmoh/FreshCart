"use client";

import Link from "next/link";
import { ArrowRight, Heart, House, Trash2 } from "lucide-react";
import { ProductCard } from "@/src/components/ProductCard/ProductCard";
import { useWishlist } from "@/src/components/WishlistProvider/WishlistProvider";

export function WishlistContent() {
  const { items, clearItems } = useWishlist();

  return (
    <main className="flex-1 bg-[#f8fafb]">
      <section aria-labelledby="wishlist-title" className="relative isolate overflow-hidden bg-linear-to-r from-[#0ebc60] via-[#08aa58] to-[#36d86e] text-white">
        <span aria-hidden="true" className="absolute -right-20 -top-28 -z-10 size-80 rounded-full border-[48px] border-white/5" />
        <div className="relative mx-auto flex min-h-32 max-w-7xl items-center gap-4 px-4 py-6 sm:min-h-36 sm:px-6 lg:px-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner ring-1 ring-white/20 sm:size-14">
            <Heart aria-hidden="true" className="size-6 fill-current sm:size-7" />
          </span>
          <div>
            <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/80 sm:text-xs">
              <Link className="inline-flex items-center gap-1 transition hover:text-white" href="/"><House aria-hidden="true" className="size-3" /> Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Wishlist</span>
            </nav>
            <h1 className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl" id="wishlist-title">My Wishlist</h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">Your saved favorites, all in one place.</p>
          </div>
        </div>
      </section>

      <section aria-label="Saved products" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-xs text-[#718078]">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
            {items.length > 0 && (
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 transition hover:text-rose-700" onClick={clearItems} type="button">
                <Trash2 aria-hidden="true" className="size-3.5" /> Clear wishlist
              </button>
            )}
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
              {items.map((item) => <ProductCard key={item.productId} {...item} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#e5ece7] bg-white px-5 py-14 text-center shadow-[0_8px_28px_-24px_rgba(20,40,28,0.3)]">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#effbf4] text-[#129252]">
                <Heart aria-hidden="true" className="size-6" />
              </span>
              <h2 className="mt-4 font-heading text-lg font-bold text-[#26372d]">Your wishlist is empty</h2>
              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#718078]">Tap the heart on a product to save it here. Your favorites will be waiting when you come back.</p>
              <Link className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#16a34a] px-5 text-xs font-bold text-white transition hover:bg-[#128340]" href="/shop">
                Explore Products <ArrowRight aria-hidden="true" className="ml-2 size-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
