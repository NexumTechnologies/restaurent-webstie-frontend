import { RestaurantsPageContent } from '@/components/restaurants/restaurants-page-content'
import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'

export default function RestaurantsPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <RestaurantsPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}