import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { CartPageContent } from '@/components/cart/cart-page-content'

export default function CartPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <CartPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}