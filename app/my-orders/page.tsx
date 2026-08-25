import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { MyOrdersPageContent } from '@/components/orders/my-orders-page-content'

export default function MyOrdersPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <MyOrdersPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}