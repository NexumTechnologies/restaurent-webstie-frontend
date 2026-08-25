import { HomeNavbar } from '@/components/home/home-navbar'
import { ContactPageContent } from '@/components/contact/contact-page-content'
import { SiteFooter } from '@/components/home/site-footer'
export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <ContactPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}