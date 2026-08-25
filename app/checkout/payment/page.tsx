import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { PaymentPageContent } from '@/components/checkout/payment-page-content'

export default function PaymentPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <PaymentPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}