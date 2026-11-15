import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Headphones,
  House,
  Music2,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { getCategories } from "@/src/app/(home)/home.services";
import type { Category } from "@/src/app/(home)/home.interface";

const fallbackCategories = [
  "Music", "Men's Fashion", "Women's Fashion", "Supermarket", "Baby & Toys",
  "Home", "Books", "Beauty & Health", "Mobiles", "Electronics",
].map((name, index) => ({ _id: `category-${index}`, name, slug: name.toLowerCase().replaceAll(" ", "-"), image: "" }));

function getCategoryIcon(name: string) {
  const value = name.toLowerCase();
  if (value.includes("music")) return Music2;
  if (value.includes("men") || value.includes("fashion")) return Shirt;
  if (value.includes("baby") || value.includes("toy")) return Baby;
  if (value.includes("book")) return BookOpen;
  if (value.includes("beauty") || value.includes("health")) return Sparkles;
  if (value.includes("mobile")) return Smartphone;
  if (value.includes("electronic")) return Headphones;
  if (value.includes("home")) return House;
  return ShoppingBasket;
}

export async function ShopByCategory() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {
    // Keep the home page useful when the categories endpoint is unavailable.
  }
  const items = categories.length > 0 ? categories.slice(0, 10) : fallbackCategories;

  return (
    <section aria-labelledby="shop-category-title" className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#059669] uppercase">Find your favorites</p>
            <h2 id="shop-category-title" className="mt-1 border-l-[3px] border-[#059669] pl-2 font-heading text-xl leading-tight font-bold tracking-tight text-[#20362a] sm:text-2xl">
              Shop By <span className="text-[#059669]">Category</span>
            </h2>
          </div>
          <Link className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#059669] transition hover:text-[#006948]" href="/categories">
            View All Categories <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10">
          {items.map((category) => {
            const Icon = getCategoryIcon(category.name);
            return (
              <Link
                className="group flex min-h-28 flex-col items-center justify-center rounded-xl border border-[#edf0ed] bg-white p-3 text-center shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)] transition hover:-translate-y-0.5 hover:border-[#b9e5cb] hover:shadow-md"
                href={`/categories?category=${encodeURIComponent(category.slug)}`}
                key={category._id}
              >
                <span className="relative mb-2 flex size-14 items-center justify-center overflow-hidden rounded-full bg-[#f0faf4] text-[#159451] ring-1 ring-[#e3f4e9] transition group-hover:bg-[#e4f8eb]">
                  {category.image ? (
                    <Image alt="" className="object-cover" fill sizes="56px" src={category.image} unoptimized />
                  ) : (
                    <Icon aria-hidden="true" className="size-7" />
                  )}
                </span>
                <span className="line-clamp-2 text-xs font-semibold leading-tight text-[#34453a] transition group-hover:text-[#087a49]">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
