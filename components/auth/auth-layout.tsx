'use client'

import { motion } from 'motion/react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AuthBenefits } from '@/components/auth/auth-benefits'
import { AuthBrandPanel } from '@/components/auth/auth-brand-panel'

type AuthLayoutProps = {
  brandTitle: React.ReactNode
  brandDescription: string
  children: React.ReactNode
}

export function AuthLayout({
  brandTitle,
  brandDescription,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-14">
          <AuthBrandPanel title={brandTitle} description={brandDescription} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>
      </main>

      <AuthBenefits />
      <Footer />
    </div>
  )
}
