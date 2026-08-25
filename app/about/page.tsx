import { HomeNavbar } from '@/components/home/home-navbar'
import { AboutPageContent } from '@/components/about/about-page-content'
import { SiteFooter } from '@/components/home/site-footer'
export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <AboutPageContent />
      </main>

      <SiteFooter />
    </div>
  )
}