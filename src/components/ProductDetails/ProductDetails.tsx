import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  House,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import type { ProductCardProps } from "@/src/components/ProductCard/ProductCard";
import { ProductCard } from "@/src/components/ProductCard/ProductCard";
import { WishlistToggleButton } from "@/src/components/WishlistToggleButton/WishlistToggleButton";
import { CartAddButton } from "@/src/components/CartAddButton/CartAddButton";
import type { ProductDetailsData } from "@/src/app/productDetails/productDetails.interface";

type RelatedProduct = {
  id: string;
  card: ProductCardProps;
};

type ProductDetailsProps = {
  product: ProductDetailsData;
  relatedProducts: RelatedProduct[];
};

const benefitItems = [
  { title: "Free Delivery", detail: "Orders over 500 EGP", icon: Truck },
  { title: "30 Days Return", detail: "Money back", icon: RotateCcw },
  { title: "Secure Payment", detail: "100% Protected", icon: ShieldCheck },
];

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const productImages = [...new Set([product.imageCover, ...product.images])]
    .filter(Boolean)
    .slice(0, 4);
  const price = product.priceAfterDiscount ?? product.price;
  const description = product.description.replace(/\s+/g, " ").trim();

  return (
    <main className="flex-1 bg-white px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="py-4 text-xs text-[#738078]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="inline-flex items-center gap-1 hover:text-[#07945d]" href="/">
                <House aria-hidden="true" className="size-3.5" />
                Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="size-3" /></li>
            <li><Link className="hover:text-[#07945d]" href="/categories">{product.category.name}</Link></li>
            {product.subcategory[0] && (
              <>
                <li aria-hidden="true"><ChevronRight className="size-3" /></li>
                <li>{product.subcategory[0].name}</li>
              </>
            )}
            <li aria-hidden="true"><ChevronRight className="size-3" /></li>
            <li aria-current="page" className="font-medium text-[#2b3830]">{product.title}</li>
          </ol>
        </nav>

        <section className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
          <div className="rounded-xl border border-[#e8eee9] bg-white p-3 shadow-[0_2px_12px_rgba(28,53,39,0.035)]">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <Image
                alt={product.title}
                className="object-contain p-3"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 90vw, 250px"
                src={product.imageCover}
                unoptimized
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div
                  className={`relative aspect-square overflow-hidden rounded border bg-white ${index === 0 ? "border-2 border-[#16815c]" : "border-[#e8eee9]"}`}
                  key={image}
                >
                  <Image
                    alt={`${product.title} view ${index + 1}`}
                    className="object-contain p-1"
                    fill
                    sizes="64px"
                    src={image}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#e8eee9] bg-white p-5 shadow-[0_2px_12px_rgba(28,53,39,0.035)] sm:p-6 lg:p-7">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#edf9f1] px-2.5 py-1 text-[10px] font-semibold text-[#16815c]">
                {product.category.name}
              </span>
              <span className="rounded-full bg-[#f1f3f2] px-2.5 py-1 text-[10px] font-medium text-[#65726a]">
                {product.brand.name}
              </span>
            </div>

            <h1 className="mt-3 font-heading text-2xl leading-tight font-bold text-[#18251e] sm:text-3xl">
              {product.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#67736b]">
              <span aria-label={`${product.ratingsAverage} out of 5 stars`} className="flex items-center gap-0.5 text-[#f4b740]">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    aria-hidden="true"
                    className={`size-4 ${index < Math.round(product.ratingsAverage) ? "fill-current" : ""}`}
                    key={index}
                  />
                ))}
              </span>
              <span className="font-medium text-[#35463b]">{product.ratingsAverage.toFixed(1)}</span>
              <a className="hover:text-[#07945d]" href="#reviews">
                ({product.ratingsQuantity} reviews)
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-bold text-[#18251e] sm:text-3xl">
                {price.toFixed(0)} <span className="text-base">EGP</span>
              </span>
              {product.priceAfterDiscount != null && (
                <span className="text-sm text-[#98a39b] line-through">{product.price.toFixed(0)} EGP</span>
              )}
            </div>

            <p className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${product.quantity > 0 ? "bg-[#edf9f1] text-[#16815c]" : "bg-red-50 text-red-600"}`}>
              <span className={`size-1.5 rounded-full ${product.quantity > 0 ? "bg-[#18b56a]" : "bg-red-500"}`} />
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <p className="mt-4 border-b border-[#edf1ee] pb-5 text-sm leading-6 text-[#526057]">
              {description}
            </p>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-[#59665e]">Quantity</p>
              <div className="flex flex-wrap items-center gap-3">
                <div aria-label="Quantity" className="inline-flex h-10 items-center overflow-hidden rounded-lg border border-[#dfe7e1] text-sm">
                  <span aria-hidden="true" className="px-3 text-[#6c7870]">−</span>
                  <span className="min-w-8 text-center font-semibold text-[#29372e]">1</span>
                  <span aria-hidden="true" className="px-3 text-[#6c7870]">+</span>
                </div>
                <span className="text-xs text-[#87938b]">{product.quantity} available</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-[#f6f9f7] px-4 py-3 text-sm text-[#637067]">
              <span>Total Price:</span>
              <span className="text-lg font-bold text-[#16a05c]">{price.toFixed(2)} EGP</span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <CartAddButton
                item={{
                  productId: product.id,
                  name: product.title,
                  category: product.category.name,
                  image: product.imageCover,
                  imageAlt: product.title,
                  price,
                  ...(product.priceAfterDiscount != null ? { compareAtPrice: product.price } : {}),
                  rating: product.ratingsAverage,
                  reviewCount: product.ratingsQuantity,
                  href: `/productDetails/${product.id}`,
                }}
                variant="detail"
              />
              <Link
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#111c2e] px-4 text-sm font-semibold text-white transition hover:bg-[#1c2b42]"
                href="/cart"
              >
                <Zap aria-hidden="true" className="size-4 fill-current" />
                Buy Now
              </Link>
            </div>

            <div className="mt-2 flex gap-2">
              <WishlistToggleButton
                item={{
                  productId: product.id,
                  name: product.title,
                  category: product.category.name,
                  image: product.imageCover,
                  imageAlt: product.title,
                  price,
                  ...(product.priceAfterDiscount != null ? { compareAtPrice: product.price } : {}),
                  rating: product.ratingsAverage,
                  reviewCount: product.ratingsQuantity,
                  href: `/productDetails/${product.id}`,
                }}
                variant="detail"
              />
              <button
                aria-label="Share product"
                className="flex size-10 items-center justify-center rounded-lg border border-[#dfe7e1] text-[#5c6961]"
                type="button"
              >
                <span aria-hidden="true">↗</span>
              </button>
            </div>

            <div className="mt-5 grid gap-3 border-t border-[#edf1ee] pt-4 sm:grid-cols-3">
              {benefitItems.map(({ title, detail, icon: Icon }) => (
                <div className="flex items-center gap-2" key={title}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e8f9ee] text-[#139c59]">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold text-[#303d34]">{title}</span>
                    <span className="block text-[9px] text-[#87938b]">{detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Product information" className="mt-8 overflow-hidden rounded-xl border border-[#e8eee9] bg-white shadow-[0_2px_12px_rgba(28,53,39,0.035)]">
          <nav aria-label="Product information sections" className="flex flex-wrap border-b border-[#e8eee9] text-xs font-semibold">
            <a className="inline-flex items-center gap-2 border-b-2 border-[#16a34a] bg-[#f1fbf5] px-4 py-3 text-[#159451]" href="#product-info">
              <Check aria-hidden="true" className="size-3.5" /> Product Details
            </a>
            <a className="inline-flex items-center gap-2 px-4 py-3 text-[#68756d] hover:text-[#159451]" href="#reviews">
              <Star aria-hidden="true" className="size-3.5" /> Reviews ({product.ratingsQuantity})
            </a>
            <a className="inline-flex items-center gap-2 px-4 py-3 text-[#68756d] hover:text-[#159451]" href="#shipping">
              <Truck aria-hidden="true" className="size-3.5" /> Shipping &amp; Returns
            </a>
          </nav>

          <div className="p-5 sm:p-6" id="product-info">
            <h2 className="text-sm font-bold text-[#27352c]">About this Product</h2>
            <p className="mt-2 text-xs leading-5 text-[#6c7870]">{description}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-[#f7f9f8] p-4">
                <h3 className="text-xs font-semibold text-[#344139]">Product Information</h3>
                <dl className="mt-3 space-y-2 text-[11px]">
                  <div className="flex justify-between gap-3"><dt className="text-[#7d8981]">Category</dt><dd className="text-right font-medium text-[#46534b]">{product.category.name}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#7d8981]">Subcategory</dt><dd className="text-right font-medium text-[#46534b]">{product.subcategory[0]?.name ?? "General"}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#7d8981]">Brand</dt><dd className="text-right font-medium text-[#46534b]">{product.brand.name}</dd></div>
                  <div className="flex justify-between gap-3"><dt className="text-[#7d8981]">Items Sold</dt><dd className="text-right font-medium text-[#46534b]">{product.sold.toLocaleString()}+ sold</dd></div>
                </dl>
              </div>
              <div className="rounded-lg bg-[#f7f9f8] p-4">
                <h3 className="text-xs font-semibold text-[#344139]">Key Features</h3>
                <ul className="mt-3 space-y-2 text-[11px] text-[#627067]">
                  {["Premium Quality Product", "100% Authentic Guarantee", "Fast & Secure Packaging", "Quality Tested"].map((feature) => (
                    <li className="flex items-center gap-2" key={feature}>
                      <Check aria-hidden="true" className="size-3.5 text-[#18a45c]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <section className="border-t border-[#edf1ee] p-5 sm:p-6" id="reviews">
            <h2 className="text-sm font-bold text-[#27352c]">Customer Reviews ({product.ratingsQuantity})</h2>
            {product.reviews.length ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {product.reviews.slice(0, 4).map((review) => (
                  <article className="rounded-lg bg-[#f7f9f8] p-4" key={review._id}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold text-[#344139]">{review.user.name}</p>
                      <span className="flex items-center gap-1 text-[10px] text-[#bd8612]">
                        <Star aria-hidden="true" className="size-3 fill-current" /> {review.rating}/5
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#68756d]">{review.review}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-[#7d8981]">No written reviews yet.</p>
            )}
          </section>

          <section className="border-t border-[#edf1ee] p-5 sm:p-6" id="shipping">
            <h2 className="text-sm font-bold text-[#27352c]">Shipping &amp; Returns</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {benefitItems.map(({ title, detail, icon: Icon }) => (
                <div className="flex items-center gap-3 rounded-lg bg-[#f7f9f8] p-3" key={title}>
                  <Icon aria-hidden="true" className="size-4 text-[#149958]" />
                  <span><span className="block text-xs font-semibold text-[#344139]">{title}</span><span className="text-[10px] text-[#7d8981]">{detail}</span></span>
                </div>
              ))}
            </div>
          </section>
        </section>

        {relatedProducts.length > 0 && (
          <section aria-labelledby="related-products-title" className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="border-l-4 border-[#16a34a] pl-3 font-heading text-lg font-bold text-[#1d2b23]" id="related-products-title">
                You May Also <span className="text-[#159451]">Like</span>
              </h2>
              <div aria-hidden="true" className="flex gap-2 text-[#809087]"><span className="flex size-8 items-center justify-center rounded-full bg-[#f4f6f5]">‹</span><span className="flex size-8 items-center justify-center rounded-full bg-[#f4f6f5]">›</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
              {relatedProducts.map(({ id, card }) => <ProductCard key={id} {...card} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
