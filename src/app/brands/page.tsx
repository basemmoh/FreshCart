import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, House, Tags } from "lucide-react";
import { getBrands } from "@/src/app/(home)/home.services";

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <main className="flex-1 bg-[#f8fafb]">
      <section aria-labelledby="brands-title" className="relative isolate overflow-hidden bg-linear-to-r from-[#792cf0] via-[#8b3ff5] to-[#b45af5] text-white">
        <span aria-hidden="true" className="absolute -right-16 -top-24 -z-10 size-64 rounded-full border-[42px] border-white/5" />
        <span aria-hidden="true" className="absolute -bottom-36 left-[45%] -z-10 size-72 rounded-full bg-white/5" />
        <div className="relative mx-auto flex min-h-32 max-w-[1560px] items-center gap-4 px-4 py-6 sm:min-h-36 sm:px-6 lg:px-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner ring-1 ring-white/20 sm:size-14">
            <Tags aria-hidden="true" className="size-6 sm:size-7" />
          </span>
          <div>
            <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/80 sm:text-xs">
              <Link className="inline-flex items-center gap-1 transition hover:text-white" href="/">
                <House aria-hidden="true" className="size-3" /> Home
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Brands</span>
            </nav>
            <h1 id="brands-title" className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">Top Brands</h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">Shop from your favorite brands</p>
          </div>
        </div>
      </section>

      <section aria-label="All brands" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-[1560px]">
          {brands.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {brands.map((brand) => (
                <li className="min-w-0" key={brand._id}>
                  <Link
                    aria-label={`View ${brand.name} products`}
                    className="group relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-xl border border-[#e8edef] bg-white p-3 shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)] transition hover:-translate-y-0.5 hover:border-[#d8c3fb] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#792cf0] sm:min-h-[304px] sm:p-4"
                    href={`/brands/${encodeURIComponent(brand._id)}`}
                  >
                    <span className="relative mb-2 flex aspect-square w-full max-w-40 items-center justify-center overflow-hidden rounded-lg bg-[#f8fafb] p-3 transition group-hover:bg-[#f7f2ff]">
                      {brand.image ? (
                        <Image alt="" className="object-contain p-2" fill sizes="(max-width: 640px) 40vw, 120px" src={brand.image} unoptimized />
                      ) : (
                        <BadgeCheck aria-hidden="true" className="size-10 text-[#a16ce9]" />
                      )}
                    </span>
                    <span className="line-clamp-2 text-center text-xs font-semibold leading-tight text-[#27352c] transition group-hover:text-[#792cf0]">{brand.name}</span>

                    <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center bg-white p-3 text-[#8c43ef] opacity-0 shadow-[0_8px_24px_-12px_rgba(84,37,143,0.22)] ring-1 ring-inset ring-[#eadcff] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
                      <span className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-[#f7f8fa] p-3">
                        {brand.image ? (
                          <Image alt="" className="object-contain p-2" fill sizes="(max-width: 640px) 40vw, 150px" src={brand.image} unoptimized />
                        ) : (
                          <BadgeCheck className="size-10 text-[#a16ce9]" />
                        )}
                      </span>
                      <span className="text-sm font-semibold">{brand.name}</span>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium">View Products <ArrowRight className="size-3.5" /></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-[#e8edef] bg-white px-5 py-12 text-center text-sm text-[#708075]">
              Brands are temporarily unavailable. Please try again shortly.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
