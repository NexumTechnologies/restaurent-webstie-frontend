import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { CurrentOrdersPageContent } from '@/components/orders/current-orders-page-content'

export default function CurrentOrdersPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <CurrentOrdersPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}