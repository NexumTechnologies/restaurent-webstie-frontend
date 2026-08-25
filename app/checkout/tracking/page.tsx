import { HomeNavbar } from '@/components/home/home-navbar'
import { Footer } from '@/components/layout/footer'
import { OrderTrackingPageContent } from '@/components/checkout/order-tracking-page-content'

export default function OrderTrackingPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <OrderTrackingPageContent />
      </main>

      <Footer />
    </div>
  )
}