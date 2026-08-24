import { notFound } from 'next/navigation'
import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
// import { Footer } from '@/components/layout/footer'
import { RestaurantHero } from '@/components/restaurant/restaurant-hero'
import { RestaurantTabs } from '@/components/restaurant/restaurant-tabs'
import { MenuExperience } from '@/components/restaurant/menu-experience'
import { RestaurantBenefits } from '@/components/restaurant/restaurant-benefits'
import {
  MENU_CATEGORIES,
  MENU_SECTIONS,
  RESTAURANT,
} from '@/lib/restaurant'

type RestaurantPageProps = {
  params: Promise<{ slug: string }>
}

export default async function RestaurantPage({
  params,
}: RestaurantPageProps) {
  const { slug } = await params

  if (slug !== RESTAURANT.slug) {
    notFound()
  }

  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <RestaurantHero restaurant={RESTAURANT} />

        <RestaurantTabs />

        <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <MenuExperience
            categories={MENU_CATEGORIES}
            sections={MENU_SECTIONS}
          />
        </section>

        <RestaurantBenefits />
      </main>
      <SiteFooter/>
      {/* <Footer /> */}
    </div>
  )
}