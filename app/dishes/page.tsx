import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { DishesPageContent } from '@/components/dishes/dishes-page-content'

export default function DishesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <DishesPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}