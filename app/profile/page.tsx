import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { ProfilePageContent } from '@/components/profile/profile-page-content'

export default function ProfilePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <ProfilePageContent />
      </main>

      <SiteFooter />
    </div>
  )
}