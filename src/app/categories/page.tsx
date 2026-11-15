import Image from "next/image";
import Link from "next/link";
import { ArrowRight, House, Layers3, PackageOpen } from "lucide-react";
import { getCategories } from "@/src/app/(home)/home.services";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="flex-1 bg-[#f8fafb]">
      <section aria-labelledby="categories-title" className="relative isolate overflow-hidden bg-linear-to-r from-[#0ebc60] via-[#08aa58] to-[#36d86e] text-white">
        <span aria-hidden="true" className="absolute -right-20 -top-28 -z-10 size-80 rounded-full border-[48px] border-white/5" />
        <span aria-hidden="true" className="absolute -bottom-32 left-[42%] -z-10 size-72 rounded-full bg-white/5" />
        <div className="relative mx-auto flex min-h-32 max-w-[1560px] items-center gap-4 px-4 py-6 sm:min-h-36 sm:px-6 lg:px-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner ring-1 ring-white/20 sm:size-14">
            <Layers3 aria-hidden="true" className="size-6 sm:size-7" />
          </span>
          <div>
            <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/80 sm:text-xs">
              <Link className="inline-flex items-center gap-1 transition hover:text-white" href="/"><House aria-hidden="true" className="size-3" /> Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Categories</span>
            </nav>
            <h1 id="categories-title" className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">All Categories</h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">Browse our wide range of product categories</p>
          </div>
        </div>
      </section>

      <section aria-label="All product categories" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-[1560px]">
          {categories.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    aria-label={`Browse ${category.name} products`}
                    className="group relative flex min-h-[300px] flex-col items-center overflow-hidden rounded-xl border border-[#e8edef] bg-white p-3 shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)] transition hover:-translate-y-0.5 hover:border-[#c6ead4] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07884d] sm:min-h-[360px] sm:p-4"
                    href={`/categories/${encodeURIComponent(category._id)}`}
                  >
                    <span className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-[#f8fafb]">
                      {category.image ? (
                        <Image alt="" className="object-cover transition duration-300 group-hover:scale-[1.02]" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" src={category.image} unoptimized />
                      ) : (
                        <span className="flex size-full items-center justify-center text-[#36a96c]"><PackageOpen aria-hidden="true" className="size-12" /></span>
                      )}
                    </span>
                    <span className="mt-auto pb-1 text-center text-sm font-semibold text-[#27352c] transition group-hover:text-[#07884d]">{category.name}</span>

                    <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center bg-white p-3 text-[#07884d] opacity-0 shadow-[0_8px_24px_-12px_rgba(20,100,60,0.22)] ring-1 ring-inset ring-[#c6ead4] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
                      <span className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-[#f5faf7]">
                        {category.image ? (
                          <Image alt="" className="object-cover" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" src={category.image} unoptimized />
                        ) : (
                          <span className="flex size-full items-center justify-center"><PackageOpen className="size-12" /></span>
                        )}
                      </span>
                      <span className="text-sm font-semibold">{category.name}</span>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium">View Products <ArrowRight className="size-3.5" /></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-[#e8edef] bg-white px-5 py-12 text-center text-sm text-[#708075]">
              Categories are temporarily unavailable. Please try again shortly.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
