import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, House, Layers3, SlidersHorizontal, X } from "lucide-react";
import { getCategoryById, getProductsByCategory } from "@/src/app/(home)/home.services";
import { ProductCard, type ProductCardProps } from "@/src/components/ProductCard/ProductCard";

export default async function CategoryProductsPage({
  params,
}: PageProps<"/categories/[categoryId]">) {
  const { categoryId } = await params;
  const [category, products] = await Promise.all([
    getCategoryById(categoryId),
    getProductsByCategory(categoryId),
  ]);

  if (!category) notFound();

  const productCards: Array<{ id: string; card: ProductCardProps }> = products.map((product, index) => {
    const productCategory = typeof product.category === "string"
      ? product.category
      : product.category?.name ?? category.name;
    const discounted = product.priceAfterDiscount != null && product.priceAfterDiscount < product.price;
    const discountPercent = discounted
      ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
      : 0;

    return {
      id: product.id,
      card: {
        productId: product.id,
        name: product.title,
        category: productCategory,
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

  return (
    <main className="flex-1 bg-[#f8fafb]">
      <section aria-labelledby="category-title" className="relative overflow-hidden bg-linear-to-r from-[#0ebc60] via-[#08aa58] to-[#36d86e] text-white">
        <span aria-hidden="true" className="absolute -right-20 -top-28 size-80 rounded-full border-[48px] border-white/5" />
        <span aria-hidden="true" className="absolute -bottom-32 left-[42%] size-72 rounded-full bg-white/5" />
        <div className="relative mx-auto flex min-h-32 max-w-[1560px] items-center gap-4 px-4 py-6 sm:min-h-36 sm:px-6 lg:px-8">
          <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/20 p-2 shadow-inner ring-1 ring-white/20 sm:size-14">
            {category.image ? (
              <Image alt={`${category.name} category`} className="rounded-lg bg-white object-cover" fill sizes="56px" src={category.image} unoptimized />
            ) : (
              <Layers3 aria-hidden="true" className="size-6 sm:size-7" />
            )}
          </span>
          <div>
            <nav aria-label="Breadcrumb" className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px] font-medium text-white/80 sm:text-xs">
              <Link className="inline-flex items-center gap-1 transition hover:text-white" href="/"><House aria-hidden="true" className="size-3" /> Home</Link>
              <span aria-hidden="true">/</span>
              <Link className="transition hover:text-white" href="/categories">Categories</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">{category.name}</span>
            </nav>
            <h1 id="category-title" className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{category.name}</h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">Browse products in {category.name}</p>
          </div>
        </div>
      </section>

      <section aria-label={`${category.name} products`} className="px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="mx-auto max-w-[1560px]">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#68756d]">
            <SlidersHorizontal aria-hidden="true" className="size-3.5" />
            <span className="font-medium">Active Filters:</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f8ed] px-2.5 py-1 font-semibold text-[#13804a]">
              <Layers3 aria-hidden="true" className="size-3" /> {category.name}
              <X aria-hidden="true" className="size-3" />
            </span>
            <Link className="ml-1 underline underline-offset-2 transition hover:text-[#07884d]" href="/categories">Clear all</Link>
          </div>

          <p className="mb-3 text-xs text-[#718078]">Showing <span className="font-semibold text-[#34453a]">{productCards.length}</span> products</p>

          {productCards.length > 0 ? (
            <div className="grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
              {productCards.map(({ id, card }) => <ProductCard key={id} {...card} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-[#e5ece7] bg-white px-5 py-12 text-center">
              <p className="text-sm text-[#708075]">No products are currently listed in {category.name}.</p>
              <Link className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0b9658] hover:text-[#087a49]" href="/categories">
                Browse all categories <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
