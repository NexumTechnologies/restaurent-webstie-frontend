import { HomeNavbar } from '@/components/home/home-navbar'
import { Footer } from '@/components/layout/footer'
import { CheckoutPageContent } from '@/components/checkout/checkout-page-content'

export default function CheckoutPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <CheckoutPageContent />
      </main>

      <Footer />
    </div>
  )
}