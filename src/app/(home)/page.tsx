import { Suspense } from "react";
import { HomeBenefits } from "@/src/components/HomeBenefits/HomeBenefits";
import { HomeDeals } from "@/src/components/HomeDeals/HomeDeals";
import { HomeHero } from "@/src/components/HomeHero/HomeHero";
import { ShopByCategory } from "@/src/components/ShopByCategory/ShopByCategory";
import { FeaturedProducts } from "@/src/components/FeaturedProducts/FeaturedProducts";
import { NewsletterPromo } from "@/src/components/NewsletterPromo/NewsletterPromo";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HomeHero />
      <HomeBenefits />
      <ShopByCategory />
      <HomeDeals />
      <Suspense
        fallback={
          <section className="px-4 py-16 text-center text-sm text-[#708075]">
            Loading featured products…
          </section>
        }
      >
        <FeaturedProducts />
      </Suspense>
      <NewsletterPromo />
    </main>
  );
}
