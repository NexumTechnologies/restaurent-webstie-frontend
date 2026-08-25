import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { OrderTrackingPageContent } from '@/components/checkout/order-tracking-page-content'

export default function OrderTrackingPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <OrderTrackingPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}