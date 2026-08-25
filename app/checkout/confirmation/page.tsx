import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { ConfirmationPageContent } from '@/components/checkout/confirmation-page-content'

export default function ConfirmationPage() {
  return (
    <div className="min-h-dvh bg-background">
      <HomeNavbar />

      <main>
        <ConfirmationPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}