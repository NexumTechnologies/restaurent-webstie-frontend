'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Globe, Home, Moon, Sun } from 'lucide-react'
import { FoodFlowLogo } from '@/components/foodflow-logo'

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark'

    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark'

    setDarkMode(!darkMode)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-navy text-navy-foreground dark:bg-[#111827] dark:text-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4 sm:px-6"
      >
        <Link href="/" aria-label="FoodFlow home">
          <FoodFlowLogo tone="teal" inverted />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-[#DAEBEB]"
        >
          <Home className="size-4" aria-hidden="true" />
          Home
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-lg text-white transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:outline-none"
          >
            {darkMode ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#076666] focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:outline-none"
          >
            <Globe className="size-4" aria-hidden="true" />
            <span>English</span>
            <ChevronDown className="size-4" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  )
}