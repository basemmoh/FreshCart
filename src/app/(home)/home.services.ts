import type { AllProductsResponse, BrandResponse, BrandsResponse, Brand, CategoriesResponse, Category, CategoryResponse, Daum } from "./home.interface";

export async function getAllProducts(): Promise<Daum[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/products`);

  if (!response.ok) {
    throw new Error(`Products API returned ${response.status}.`);
  }

  const result: AllProductsResponse = await response.json();
  return result.data;
}

export async function getCategories(): Promise<Category[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return [];

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/categories`);
    if (!response.ok) return [];
    const result: CategoriesResponse = await response.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}

export async function getCategoryById(categoryId: string): Promise<Category | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/v1/categories/${encodeURIComponent(categoryId)}`,
    );
    if (!response.ok) return null;
    const result: CategoryResponse = await response.json();
    return result.data ?? null;
  } catch {
    return null;
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Daum[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return [];

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/v1/products?category=${encodeURIComponent(categoryId)}`,
    );
    if (!response.ok) return [];
    const result: AllProductsResponse = await response.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}

export async function getBrands(): Promise<Brand[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return [];

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/brands`);
    if (!response.ok) return [];
    const result: BrandsResponse = await response.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}

export async function getBrandById(brandId: string): Promise<Brand | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/v1/brands/${encodeURIComponent(brandId)}`,
    );
    if (!response.ok) return null;
    const result: BrandResponse = await response.json();
    return result.data ?? null;
  } catch {
    return null;
  }
}

export async function getProductsByBrand(brandId: string): Promise<Daum[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return [];

  try {
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/api/v1/products?brand=${encodeURIComponent(brandId)}`,
    );
    if (!response.ok) return [];
    const result: AllProductsResponse = await response.json();
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}
