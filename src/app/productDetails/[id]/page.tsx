import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/src/components/ProductDetails/ProductDetails";
import type { ProductCardProps } from "@/src/components/ProductCard/ProductCard";
import { getAllProducts } from "@/src/app/(home)/home.services";
import type { Daum } from "@/src/app/(home)/home.interface";
import { getProductDetails } from "../productDetails.services";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex-1 px-4 py-16 text-center text-sm text-[#708075]">
          Loading product details...
        </main>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}

async function ProductDetailsContent({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) {
    notFound();
  }

  let products: Daum[] = [];
  try {
    products = await getAllProducts();
  } catch {
    // Product details still render if recommendations are unavailable.
  }

  const relatedProducts = products
    .filter((item) => {
      const categoryName =
        typeof item.category === "string" ? item.category : item.category?.name;
      return item.id !== product.id && categoryName === product.category.name;
    })
    .slice(0, 5)
    .map((item) => {
      const card: ProductCardProps = {
        productId: item.id,
        name: item.title,
        category:
          typeof item.category === "string"
            ? item.category
            : item.category?.name ?? "General",
        image: item.imageCover,
        imageAlt: item.title,
        price: item.priceAfterDiscount ?? item.price,
        ...(item.priceAfterDiscount != null
          ? { compareAtPrice: item.price }
          : {}),
        rating: item.ratingsAverage,
        reviewCount: item.ratingsQuantity,
        href: "/shop",
        detailsHref: `/productDetails/${item.id}`,
        ...(item.priceAfterDiscount != null ? { badge: "SALE" } : {}),
      };

      return { id: item.id, card };
    });

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
