import { HomeNavbar } from '@/components/home/home-navbar'
import { Footer } from '@/components/layout/footer'
import { PaymentPageContent } from '@/components/checkout/payment-page-content'

export default function PaymentPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <PaymentPageContent />
      </main>

      <Footer />
    </div>
  )
}