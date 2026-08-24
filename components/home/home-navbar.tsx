'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, ShoppingCart, X } from 'lucide-react'
import { FoodFlowLogo } from '@/components/foodflow-logo'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Restaurants',
    href: '/restaurant/the-burger-house',
  },
  { label: 'About', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
]

export function HomeNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    // Restaurants should remain active on all restaurant detail pages.
    if (href.startsWith('/restaurant/')) {
      return pathname.startsWith('/restaurant/')
    }

    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 bg-navy text-navy-foreground">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="FoodFlow home">
          <FoodFlowLogo tone="teal" inverted />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href)

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  active
                    ? 'text-navy-foreground'
                    : 'text-navy-foreground/80 hover:text-navy-foreground',
                )}
              >
                {link.label}

                {active && (
                  <span
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-teal"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg border border-white/25 px-4 py-2 text-sm font-medium text-navy-foreground transition-colors hover:bg-white/10 sm:inline-flex"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="hidden rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-teal-foreground transition-colors hover:bg-teal/90 sm:inline-flex"
          >
            Register
          </Link>

          <button
            type="button"
            aria-label="View cart, 2 items"
            className="relative grid size-10 place-items-center rounded-full bg-white/10 text-navy-foreground transition-colors hover:bg-white/15"
          >
            <ShoppingCart className="size-5" aria-hidden="true" />

            <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-teal text-[11px] font-bold text-teal-foreground">
              2
            </span>
          </button>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid size-10 place-items-center rounded-full bg-white/10 text-navy-foreground transition-colors hover:bg-white/15 lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy px-4 pb-4 lg:hidden">
          <nav
            className="flex flex-col gap-1 py-2"
            aria-label="Mobile"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href)

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'relative rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-white/10 text-navy-foreground'
                      : 'text-navy-foreground/85 hover:bg-white/10',
                  )}
                >
                  {link.label}

                  {active && (
                    <span
                      className="absolute bottom-1 left-3 h-0.5 w-10 rounded-full bg-teal"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}

            <div className="mt-2 flex gap-2">
              <Link
                href="/login"
                className="flex-1 rounded-lg border border-white/25 px-4 py-2 text-center text-sm font-medium"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex-1 rounded-lg bg-teal px-4 py-2 text-center text-sm font-semibold text-teal-foreground"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}