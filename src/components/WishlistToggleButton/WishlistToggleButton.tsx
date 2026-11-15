"use client";

import { Heart } from "lucide-react";
import type { WishlistProduct } from "@/src/components/WishlistProvider/WishlistProvider";
import { useWishlist } from "@/src/components/WishlistProvider/WishlistProvider";

export function WishlistToggleButton({
  item,
  variant = "card",
}: {
  item: WishlistProduct;
  variant?: "card" | "detail";
}) {
  const { addItem, removeItem, contains } = useWishlist();
  const isSaved = contains(item.productId);
  const label = isSaved
    ? `Remove ${item.name} from wishlist`
    : `Add ${item.name} to wishlist`;

  return (
    <button
      aria-label={label}
      aria-pressed={isSaved}
      className={variant === "card"
        ? `absolute top-1 right-1 z-10 flex size-6 items-center justify-center rounded-full bg-white/95 shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948] ${isSaved ? "text-rose-500" : "text-[#829087] hover:text-rose-500"}`
        : `inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948] ${isSaved ? "border-rose-200 bg-rose-50 text-rose-600" : "border-[#dfe7e1] text-[#5c6961] hover:border-rose-200 hover:text-rose-500"}`}
      onClick={() => (isSaved ? removeItem(item.productId) : addItem(item))}
      type="button"
    >
      <Heart aria-hidden="true" className={`${variant === "card" ? "size-3.5" : "size-4"} ${isSaved ? "fill-current" : ""}`} />
      {variant === "detail" && (isSaved ? "Added to Wishlist" : "Add to Wishlist")}
    </button>
  );
}
