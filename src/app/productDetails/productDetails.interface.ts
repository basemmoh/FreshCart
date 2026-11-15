export interface ProductDetailsResponse {
  data: ProductDetailsData;
}

export interface ProductDetailsData {
  sold: number;
  images: string[];
  subcategory: ProductSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number | null;
  imageCover: string;
  category: ProductCategory;
  brand: ProductBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: ProductReview[];
  availableColors?: string[];
  id: string;
}

export interface ProductSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductReview {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: ProductReviewUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductReviewUser {
  _id: string;
  name: string;
}
