"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ProductCardProps } from "@/src/components/ProductCard/ProductCard";

export type WishlistProduct = ProductCardProps;

type WishlistContextValue = {
  items: WishlistProduct[];
  addItem: (item: WishlistProduct) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  contains: (productId: string) => boolean;
};

const STORAGE_KEY = "freshcart:wishlist:v1";
const CHANGE_EVENT = "freshcart:wishlist-change";
const EMPTY_SNAPSHOT = "[]";
const WishlistContext = createContext<WishlistContextValue | null>(null);

function isWishlistProduct(value: unknown): value is WishlistProduct {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<WishlistProduct>;
  return typeof item.productId === "string"
    && typeof item.name === "string"
    && typeof item.category === "string"
    && typeof item.image === "string"
    && typeof item.imageAlt === "string"
    && typeof item.price === "number"
    && typeof item.rating === "number"
    && typeof item.reviewCount === "number"
    && typeof item.href === "string";
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function getServerSnapshot() {
  return EMPTY_SNAPSHOT;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function readItems(): WishlistProduct[] {
  try {
    const parsed: unknown = JSON.parse(getSnapshot());
    return Array.isArray(parsed) ? parsed.filter(isWishlistProduct) : [];
  } catch {
    return [];
  }
}

function writeItems(items: WishlistProduct[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Browser storage may be disabled; keep the page usable without persistence.
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(snapshot);
      return Array.isArray(parsed) ? parsed.filter(isWishlistProduct) : [];
    } catch {
      return [];
    }
  }, [snapshot]);

  const addItem = useCallback((item: WishlistProduct) => {
    const current = readItems();
    if (!current.some((saved) => saved.productId === item.productId)) {
      writeItems([...current, item]);
    }
  }, []);

  const removeItem = useCallback((productId: string) => {
    writeItems(readItems().filter((item) => item.productId !== productId));
  }, []);

  const clearItems = useCallback(() => writeItems([]), []);

  const value = useMemo<WishlistContextValue>(() => ({
    items,
    addItem,
    removeItem,
    clearItems,
    contains: (productId) => items.some((item) => item.productId === productId),
  }), [items, addItem, removeItem, clearItems]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider.");
  return context;
}
