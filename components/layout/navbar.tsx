'use client'

import Link from 'next/link'
import { ChevronDown, Globe, Home, Sun } from 'lucide-react'
import { FoodFlowLogo } from '@/components/foodflow-logo'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4 sm:px-6"
      >
        <Link href="/login" aria-label="FoodFlow home">
          <FoodFlowLogo />
        </Link>

        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand"
        >
          <Home className="size-4" aria-hidden="true" />
          Home
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:outline-none"
          >
            <Sun className="size-[18px]" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:outline-none"
          >
            <Globe className="size-4 text-muted-foreground" aria-hidden="true" />
            <span>English</span>
            <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  )
}
