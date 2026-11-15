"use client";

import { Check, Plus } from "lucide-react";
import type { ProductCardProps } from "@/src/components/ProductCard/ProductCard";
import { useCart } from "@/src/components/CartProvider/CartProvider";

export function CartAddButton({
  item,
  variant = "card",
}: {
  item: ProductCardProps;
  variant?: "card" | "detail";
}) {
  const { addItem, contains } = useCart();
  const isAdded = contains(item.productId);

  return (
    <button
      aria-label={isAdded ? `Add another ${item.name} to cart` : `Add ${item.name} to cart`}
      className={variant === "card"
        ? `flex size-5 shrink-0 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948] ${isAdded ? "bg-[#087a49] text-white" : "bg-[#15a85b] text-white hover:bg-[#006948]"}`
        : `inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948] ${isAdded ? "bg-[#087a49] hover:bg-[#066b40]" : "bg-[#16a34a] hover:bg-[#128340]"}`}
      onClick={() => addItem(item)}
      title={isAdded ? "Add another to cart" : "Add to cart"}
      type="button"
    >
      {isAdded ? <Check aria-hidden="true" className={variant === "card" ? "size-3.5" : "size-4"} /> : <Plus aria-hidden="true" className={variant === "card" ? "size-3" : "size-4"} />}
      {variant === "detail" && (isAdded ? "Added to Cart" : "Add to Cart")}
    </button>
  );
}
