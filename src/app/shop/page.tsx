import Link from "next/link";
import { ArrowRight, House, PackageOpen } from "lucide-react";
import { getAllProducts } from "@/src/app/(home)/home.services";
import { ProductCard, type ProductCardProps } from "@/src/components/ProductCard/ProductCard";

export default async function ShopPage() {
  let products: Array<{ id: string; card: ProductCardProps }> = [];

  try {
    const result = await getAllProducts();
    products = result.slice(0, 40).map((product, index) => {
      const category = typeof product.category === "string"
        ? product.category
        : product.category?.name ?? "General";
      const discounted = product.priceAfterDiscount != null && product.priceAfterDiscount < product.price;
      const discountPercent = discounted
        ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
        : 0;

      return {
        id: product.id,
        card: {
          productId: product.id,
          name: product.title,
          category,
          image: product.imageCover,
          imageAlt: product.title,
          loading: index < 5 ? "eager" : "lazy",
          price: discounted ? product.priceAfterDiscount! : product.price,
          ...(discounted ? { compareAtPrice: product.price, badge: `-${discountPercent}%` } : {}),
          rating: product.ratingsAverage,
          reviewCount: product.ratingsQuantity,
          href: `/productDetails/${product.id}`,
          detailsHref: `/productDetails/${product.id}`,
        },
      };
    });
  } catch (error) {
    console.error("Could not load shop products:", error);
  }

  return (
    <main className="flex-1 bg-[#f8fafb]">
      <section aria-labelledby="shop-title" className="relative overflow-hidden bg-linear-to-r from-[#0ebc60] via-[#08aa58] to-[#36d86e] text-white">
        <div aria-hidden="true" className="absolute -right-20 -top-28 size-80 rounded-full border-[48px] border-white/5" />
        <div aria-hidden="true" className="absolute -bottom-32 left-[42%] size-72 rounded-full bg-white/5" />
        <div className="relative mx-auto flex min-h-32 max-w-7xl items-center gap-4 px-4 py-6 sm:min-h-36 sm:px-6 lg:px-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner ring-1 ring-white/20 sm:size-14">
            <PackageOpen aria-hidden="true" className="size-6 sm:size-7" />
          </span>
          <div>
            <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/80 sm:text-xs">
              <Link className="inline-flex items-center gap-1 transition hover:text-white" href="/">
                <House aria-hidden="true" className="size-3" /> Home
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">All Products</span>
            </nav>
            <h1 id="shop-title" className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">All Products</h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">Explore our complete product collection</p>
          </div>
        </div>
      </section>

      <section aria-label="Product collection" className="px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between text-xs text-[#718078]">
            <p>Showing <span className="font-semibold text-[#34453a]">{products.length}</span> products</p>
            <Link className="inline-flex items-center gap-1 font-semibold text-[#0b9658] transition hover:text-[#087a49]" href="/categories">
              Browse categories <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map(({ id, card }) => <ProductCard key={id} {...card} />)}
            </div>
          ) : (
            <p className="rounded-xl border border-[#e5ece7] bg-white px-5 py-12 text-center text-sm text-[#708075]">
              Products are temporarily unavailable. Please try again shortly.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
