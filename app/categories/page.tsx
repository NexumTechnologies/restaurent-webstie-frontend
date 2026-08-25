import { HomeNavbar } from '@/components/home/home-navbar'
import { CategoriesOverview } from '@/components/category/categories-overview'
import { SiteFooter } from '@/components/home/site-footer'
export default function CategoriesPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <CategoriesOverview />
      </main>

      <SiteFooter />
    </div>
  )
}