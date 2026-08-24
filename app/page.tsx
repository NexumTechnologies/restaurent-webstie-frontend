import { HomeNavbar } from '@/components/home/home-navbar'
import { Hero } from '@/components/home/hero'
import { Categories } from '@/components/home/categories'
import { PopularRestaurants } from '@/components/home/popular-restaurants'
import { PopularDishes } from '@/components/home/popular-dishes'
import { HowItWorks } from '@/components/home/how-it-works'
import { SiteFooter } from '@/components/home/site-footer'



export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />
      <main className="flex-1 pb-4">
        <Hero />
        <Categories />
        <PopularRestaurants />
        <PopularDishes />
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  )
}
