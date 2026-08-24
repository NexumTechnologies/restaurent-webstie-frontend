import { HomeNavbar } from '@/components/home/home-navbar'
import { Footer } from '@/components/layout/footer'
import { CartPageContent } from '@/components/cart/cart-page-content'

export default function CartPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <CartPageContent />
      </main>

      <Footer />
    </div>
  )
}