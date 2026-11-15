"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/src/assests/Hero.jpg";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    primary: "Shop Now",
    primaryHref: "/shop",
    secondary: "View Deals",
    secondaryHref: "#home-deals",
  },
  {
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    primary: "Shop Now",
    primaryHref: "/shop",
    secondary: "Learn More",
    secondaryHref: "/categories",
  },
  {
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    primary: "Order Now",
    primaryHref: "/shop",
    secondary: "Delivery Info",
    secondaryHref: "/shop",
  },
];

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  function showPreviousSlide() {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % slides.length);
  }

  return (
    <section aria-label="Featured offers" aria-roledescription="carousel" className="relative isolate min-h-[275px] overflow-hidden bg-[#087a49] text-white sm:min-h-[310px] lg:min-h-[350px]">
      <Image
        alt="Fresh vegetables displayed at a grocery market"
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src={heroImage}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#05b955]/90 via-[#078a51]/70 to-[#006042]/45" />

      <div className="relative mx-auto flex min-h-[275px] max-w-7xl items-center px-14 py-12 sm:min-h-[310px] sm:px-20 lg:min-h-[350px] lg:px-24">
        <div aria-live="polite" className="max-w-lg" key={activeSlide}>
          <h1 className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            {slide.title}
          </h1>
          <p className="mt-3 text-sm font-medium text-white/95 sm:text-base">
            {slide.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-xs font-bold text-[#087a49] shadow-sm transition hover:bg-[#eaffdd] sm:text-sm" href={slide.primaryHref}>
              {slide.primary}
            </Link>
            <Link className="inline-flex h-10 items-center justify-center rounded-md border border-white/80 px-5 text-xs font-semibold text-white transition hover:bg-white/10 sm:text-sm" href={slide.secondaryHref}>
              {slide.secondary}
            </Link>
          </div>
        </div>
      </div>

      <button
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#07884d] shadow transition hover:bg-white sm:left-5 sm:size-10"
        onClick={showPreviousSlide}
        type="button"
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>
      <button
        aria-label="Next slide"
        className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#07884d] shadow transition hover:bg-white sm:right-5 sm:size-10"
        onClick={showNextSlide}
        type="button"
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>

      <div aria-label="Choose slide" className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((item, index) => (
          <button
            aria-label={`Show slide ${index + 1}: ${item.title}`}
            aria-pressed={activeSlide === index}
            className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/85"}`}
            key={item.title}
            onClick={() => setActiveSlide(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
