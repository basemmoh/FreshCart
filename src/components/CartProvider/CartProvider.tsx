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

export type CartItem = ProductCardProps & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (item: ProductCardProps) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  contains: (productId: string) => boolean;
};

const STORAGE_KEY = "freshcart:cart:v1";
const CHANGE_EVENT = "freshcart:cart-change";
const EMPTY_SNAPSHOT = "[]";
const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<CartItem>;
  return typeof item.productId === "string"
    && typeof item.name === "string"
    && typeof item.category === "string"
    && typeof item.image === "string"
    && typeof item.imageAlt === "string"
    && typeof item.price === "number"
    && typeof item.rating === "number"
    && typeof item.reviewCount === "number"
    && typeof item.href === "string"
    && typeof item.quantity === "number"
    && item.quantity > 0;
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function readItems(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(getSnapshot());
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function writeItems(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Browser storage may be disabled; keep the page usable without persistence.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_SNAPSHOT);
  const items = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(snapshot);
      return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
    } catch {
      return [];
    }
  }, [snapshot]);

  const addItem = useCallback((item: ProductCardProps) => {
    const current = readItems();
    const existing = current.find((saved) => saved.productId === item.productId);
    writeItems(existing
      ? current.map((saved) => saved.productId === item.productId ? { ...saved, quantity: saved.quantity + 1 } : saved)
      : [...current, { ...item, quantity: 1 }]);
  }, []);

  const decrementItem = useCallback((productId: string) => {
    const current = readItems();
    const existing = current.find((item) => item.productId === productId);
    if (!existing) return;
    writeItems(existing.quantity <= 1
      ? current.filter((item) => item.productId !== productId)
      : current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item));
  }, []);

  const removeItem = useCallback((productId: string) => {
    writeItems(readItems().filter((item) => item.productId !== productId));
  }, []);

  const clearItems = useCallback(() => writeItems([]), []);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    addItem,
    decrementItem,
    removeItem,
    clearItems,
    contains: (productId) => items.some((item) => item.productId === productId),
  }), [items, addItem, decrementItem, removeItem, clearItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider.");
  return context;
}
