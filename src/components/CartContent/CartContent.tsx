"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, House, Minus, Plus, ShieldCheck, ShoppingCart, Tag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/src/components/CartProvider/CartProvider";

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 50;

export function CartContent() {
  const { items, itemCount, addItem, decrementItem, removeItem, clearItems } = useCart();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <main className="flex-1 bg-[#f8fafb] px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="pt-5 text-[10px] text-[#748078] sm:text-xs">
          <ol className="flex items-center gap-2">
            <li><Link className="inline-flex items-center gap-1 hover:text-[#07884d]" href="/"><House aria-hidden="true" className="size-3" /> Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[#34453a]">Shopping Cart</li>
          </ol>
        </nav>

        <header className="mb-5 mt-3 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-[#109b56] text-white shadow-sm sm:size-10">
            <ShoppingCart aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-xl font-bold text-[#202d25] sm:text-2xl">Shopping Cart</h1>
            <p className="mt-0.5 text-[10px] text-[#748078] sm:text-xs">You have <span className="font-semibold text-[#129252]">{itemCount} {itemCount === 1 ? "item" : "items"}</span> in your cart</p>
          </div>
        </header>

        {items.length > 0 ? (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.9fr)]">
            <section aria-label="Cart items" className="space-y-3">
              {items.map((item) => (
                <article className="grid gap-3 rounded-xl border border-[#e6ece8] bg-white p-3 shadow-[0_4px_16px_-15px_rgba(20,40,28,0.35)] sm:grid-cols-[104px_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-4" key={item.productId}>
                  <Link aria-label={`View ${item.name}`} className="relative mx-auto aspect-square w-full max-w-24 overflow-hidden rounded-lg bg-[#f8fafb] sm:mx-0 sm:size-24" href={item.detailsHref ?? item.href}>
                    <Image alt={item.imageAlt} className="object-contain p-2" fill sizes="96px" src={item.image} unoptimized />
                  </Link>

                  <div className="min-w-0">
                    <Link className="line-clamp-2 text-sm font-semibold text-[#27352c] transition hover:text-[#07884d]" href={item.detailsHref ?? item.href}>{item.name}</Link>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#eaf8ef] px-2 py-0.5 text-[9px] font-medium text-[#14814a]">{item.category}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-medium text-[#149252]"><Check aria-hidden="true" className="size-3" /> In Stock</span>
                    </div>
                    <p className="mt-2 text-xs font-bold text-[#10924f]">{item.price.toFixed(0)} EGP <span className="font-normal text-[#829087]">per unit</span></p>
                    <div className="mt-2.5 inline-flex h-8 items-center overflow-hidden rounded-lg border border-[#e2e9e4] bg-[#fafcfb]">
                      <button aria-label={`Decrease ${item.name} quantity`} className="flex size-8 items-center justify-center text-[#77847b] transition hover:bg-[#f0f5f2] hover:text-[#07884d] disabled:opacity-40" disabled={item.quantity <= 1} onClick={() => decrementItem(item.productId)} type="button">
                        <Minus aria-hidden="true" className="size-3" />
                      </button>
                      <span aria-live="polite" className="min-w-7 px-1 text-center text-xs font-semibold text-[#29372e]">{item.quantity}</span>
                      <button aria-label={`Increase ${item.name} quantity`} className="flex size-8 items-center justify-center rounded-md bg-[#16a34a] text-white transition hover:bg-[#087a49]" onClick={() => addItem(item)} type="button">
                        <Plus aria-hidden="true" className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#eef1ef] pt-2 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="block text-[9px] text-[#859188]">Total</span>
                      <span className="text-sm font-bold text-[#202d25]">{(item.price * item.quantity).toFixed(0)} <span className="text-[9px] font-medium text-[#748078]">EGP</span></span>
                    </div>
                    <button aria-label={`Remove ${item.name} from cart`} className="flex size-8 items-center justify-center rounded-lg border border-rose-100 bg-rose-50 text-rose-500 transition hover:bg-rose-100" onClick={() => removeItem(item.productId)} type="button">
                      <Trash2 aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                </article>
              ))}

              <div className="flex items-center justify-between gap-3 pt-1 text-[10px]">
                <Link className="inline-flex items-center gap-1.5 font-semibold text-[#119252] transition hover:text-[#087a49]" href="/shop"><ArrowLeft aria-hidden="true" className="size-3.5" /> Continue Shopping</Link>
                <button className="inline-flex items-center gap-1.5 text-[#89958d] transition hover:text-rose-600" onClick={clearItems} type="button"><Trash2 aria-hidden="true" className="size-3" /> Clear all items</button>
              </div>
            </section>

            <aside aria-labelledby="order-summary-title" className="overflow-hidden rounded-xl border border-[#e4ebe6] bg-white shadow-[0_6px_24px_-18px_rgba(20,40,28,0.32)] lg:sticky lg:top-24">
              <div className="bg-linear-to-r from-[#119b56] to-[#087a49] px-4 py-3.5 text-white sm:px-5">
                <h2 className="flex items-center gap-2 text-sm font-bold" id="order-summary-title"><ShoppingCart aria-hidden="true" className="size-4" /> Order Summary</h2>
                <p className="mt-1 text-[10px] text-white/80">{itemCount} {itemCount === 1 ? "item" : "items"} in your cart</p>
              </div>
              <div className="p-4 sm:p-5">
                {remainingForFreeShipping > 0 ? (
                  <div className="rounded-lg border border-[#f4e8cc] bg-[#fffaf0] p-3">
                    <p className="flex items-center gap-2 text-[10px] text-[#685c43]"><Truck aria-hidden="true" className="size-3.5 text-[#e88b18]" /> Add <strong>{remainingForFreeShipping.toFixed(0)} EGP</strong> for free shipping</p>
                    <div aria-label={`${Math.round(shippingProgress)}% towards free shipping`} className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f2e9d6]">
                      <div className="h-full rounded-full bg-[#f4b740] transition-all" style={{ width: `${shippingProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-[#d8f0e1] bg-[#f0fbf4] p-3 text-[10px] font-medium text-[#16814c]">You’ve unlocked free shipping!</div>
                )}

                <dl className="mt-4 space-y-3 text-xs text-[#657169]">
                  <div className="flex justify-between gap-3"><dt>Subtotal</dt><dd className="font-medium text-[#2d3b32]">{subtotal.toFixed(0)} EGP</dd></div>
                  <div className="flex justify-between gap-3"><dt>Shipping</dt><dd className="font-medium text-[#2d3b32]">{shipping === 0 ? "Free" : `${shipping} EGP`}</dd></div>
                  <div className="flex justify-between gap-3 border-t border-dashed border-[#e6ece8] pt-3 text-sm"><dt className="font-semibold text-[#2d3b32]">Total</dt><dd className="font-extrabold text-[#172820]">{(subtotal + shipping).toFixed(0)} <span className="text-[10px] font-semibold">EGP</span></dd></div>
                </dl>

                <p className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#e2e9e4] py-2.5 text-[10px] font-medium text-[#718078]"><Tag aria-hidden="true" className="size-3.5" /> Promo codes can be applied at checkout</p>
                <p className="mt-3 flex items-center justify-center gap-4 text-[9px] text-[#7b8880]"><span className="inline-flex items-center gap-1"><ShieldCheck aria-hidden="true" className="size-3 text-[#159451]" /> Secure Payment</span><span className="inline-flex items-center gap-1"><Truck aria-hidden="true" className="size-3 text-blue-500" /> Fast Delivery</span></p>
              </div>
            </aside>
          </div>
        ) : (
          <section className="rounded-2xl border border-[#e5ece7] bg-white px-5 py-14 text-center shadow-[0_8px_28px_-24px_rgba(20,40,28,0.3)]">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#effbf4] text-[#129252]"><ShoppingCart aria-hidden="true" className="size-6" /></span>
            <h2 className="mt-4 font-heading text-lg font-bold text-[#26372d]">Your cart is empty</h2>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#718078]">Add a few favorites and they’ll be ready here whenever you are.</p>
            <Link className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#16a34a] px-5 text-xs font-bold text-white transition hover:bg-[#128340]" href="/shop">Start Shopping <ArrowLeft aria-hidden="true" className="ml-2 size-3.5 rotate-180" /></Link>
          </section>
        )}
      </div>
    </main>
  );
}
