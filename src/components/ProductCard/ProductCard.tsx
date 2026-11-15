import Image from "next/image";
import Link from "next/link";
import { Eye, Star } from "lucide-react";
import { WishlistToggleButton } from "@/src/components/WishlistToggleButton/WishlistToggleButton";
import { CartAddButton } from "@/src/components/CartAddButton/CartAddButton";

export type ProductCardProps = {
  productId: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  loading?: "eager" | "lazy";
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  href: string;
  detailsHref?: string;
  badge?: string;
};

export function ProductCard({
  productId,
  name,
  category,
  image,
  imageAlt,
  loading = "lazy",
  price,
  compareAtPrice,
  rating,
  reviewCount,
  href,
  detailsHref,
  badge,
}: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-[#edf0ed] bg-white p-1.5 transition hover:border-[#cfe3d5] sm:p-2">
      <div className="relative mb-2 aspect-square overflow-hidden bg-white">
        <Link aria-label={`View ${name}`} className="absolute inset-0" href={href}>
          <Image
            alt={imageAlt}
            className="object-contain p-1 transition duration-300 group-hover:scale-105"
            fill
            loading={loading}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            src={image}
            unoptimized
          />
        </Link>
        {badge && (
          <span className="absolute top-1 left-1 rounded-sm bg-red-500 px-1 py-0.5 text-[8px] font-bold tracking-wide text-white sm:text-[9px]">
            {badge}
          </span>
        )}
        <WishlistToggleButton
          item={{
            productId,
            name,
            category,
            image,
            imageAlt,
            loading,
            price,
            ...(compareAtPrice !== undefined ? { compareAtPrice } : {}),
            rating,
            reviewCount,
            href,
            ...(detailsHref ? { detailsHref } : {}),
            ...(badge ? { badge } : {}),
          }}
        />
        <Link aria-label={`View details for ${name}`} className="absolute top-7 right-1 flex size-5 items-center justify-center rounded-full bg-white/90 text-[#829087] shadow-sm hover:text-[#059669]" href={detailsHref ?? href}>
          <Eye aria-hidden="true" className="size-3" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-0.5">
        <p className="mb-0.5 truncate text-[8px] font-medium text-[#89948d] sm:text-[9px]">
          {category}
        </p>
        <Link
          className="line-clamp-2 min-h-7 text-[9px] leading-tight font-semibold text-[#35463b] transition hover:text-[#006948] sm:min-h-8 sm:text-[10px]"
          href={href}
        >
          {name}
        </Link>

        <div className="mt-1 flex items-center gap-0.5 text-[8px]">
          <Star aria-hidden="true" className="size-2.5 fill-[#f4b740] text-[#f4b740]" />
          <span className="font-semibold text-[#35463b]">{rating.toFixed(1)}</span>
          <span className="truncate text-[#98a39b]">({reviewCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-1 pt-2">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1">
            <span className="text-[9px] font-bold text-[#20362a] sm:text-[10px]">
              {price.toFixed(0)} <span className="text-[8px] font-semibold">EGP</span>
            </span>
            {compareAtPrice !== undefined && (
              <span className="text-[8px] text-[#98a39b] line-through">
                {compareAtPrice.toFixed(0)} EGP
              </span>
            )}
          </div>
          <CartAddButton
            item={{
              productId,
              name,
              category,
              image,
              imageAlt,
              loading,
              price,
              ...(compareAtPrice !== undefined ? { compareAtPrice } : {}),
              rating,
              reviewCount,
              href,
              ...(detailsHref ? { detailsHref } : {}),
              ...(badge ? { badge } : {}),
            }}
          />
        </div>
      </div>
    </article>
  );
}
