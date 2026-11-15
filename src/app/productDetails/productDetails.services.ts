import type {
  ProductDetailsData,
  ProductDetailsResponse,
} from "./productDetails.interface";

export async function getProductDetails(productId: string): Promise<ProductDetailsData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
  }

  const response = await fetch(
    `${baseUrl.replace(/\/$/, "")}/api/v1/products/${encodeURIComponent(productId)}`,
  );

  if (response.status >= 400 && response.status < 500) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Product details API returned ${response.status}.`);
  }

  const result: ProductDetailsResponse = await response.json();
  return result.data ?? null;
}
