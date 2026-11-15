import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, type ProductCardProps } from "@/src/components/ProductCard/ProductCard";
import { getAllProducts } from "@/src/app/(home)/home.services";

export async function FeaturedProducts() {
  let products: Array<{ id: string; card: ProductCardProps }> = [];

  try {
    const result = await getAllProducts();
    products = result.slice(0, 40).map((product, index) => ({
      id: product.id,
      card: {
        productId: product.id,
        name: product.title,
        category:
          typeof product.category === "string"
            ? product.category
            : product.category?.name ?? "General",
        image: product.imageCover,
        imageAlt: product.title,
        loading: index < 5 ? "eager" as const : "lazy" as const,
        price: product.priceAfterDiscount ?? product.price,
        ...(product.priceAfterDiscount != null
          ? { compareAtPrice: product.price }
          : {}),
        rating: product.ratingsAverage,
        reviewCount: product.ratingsQuantity,
        href: `/productDetails/${product.id}`,
        detailsHref: `/productDetails/${product.id}`,
        ...(product.priceAfterDiscount != null ? { badge: "SALE" } : {}),
      },
    }));
  } catch (error) {
    console.error("Could not load featured products:", error);
  }

  return (
    <section aria-labelledby="featured-products-title" className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h1 id="featured-products-title" className="border-l-[3px] border-[#059669] pl-2 font-heading text-lg leading-tight font-bold tracking-tight text-[#20362a] sm:text-xl">
              Featured <span className="text-[#059669]">Products</span>
            </h1>
          </div>
          <Link
            className="inline-flex w-fit items-center gap-1 text-[10px] font-semibold text-[#059669] transition hover:text-[#006948] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006948] sm:text-xs"
            href="/shop"
          >
            View All Products
            <ArrowRight aria-hidden="true" className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {products.map(({ id, card }) => (
            <ProductCard key={id} {...card} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="rounded-xl border border-[#e8eee9] bg-white px-5 py-8 text-center text-sm text-[#708075]">
            Products are temporarily unavailable. Please try again shortly.
          </p>
        )}
      </div>
    </section>
  );
}
