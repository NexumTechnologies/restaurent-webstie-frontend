'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react'
import { logout } from '@/lib/api'
import { FoodFlowLogo } from '@/components/foodflow-logo'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Restaurants',
    href: '/restaurant/the-burger-house',
  },
  { label: 'About', href: '/about' } ,
  { label: 'Contact', href: '/contact' },
]

export function HomeNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const readUser = () => {
      try {
        const storedUser = window.localStorage.getItem('foodflow_user')
        setUserName(storedUser ? JSON.parse(storedUser).name ?? '' : '')
      } catch {
        setUserName('')
      }
    }

    readUser()
    window.addEventListener('storage', readUser)
    return () => window.removeEventListener('storage', readUser)
  }, [])

  const initials = userName
    ? userName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  function handleLogout() {
    logout().catch(() => undefined)
    window.localStorage.removeItem('foodflow_access_token')
    window.localStorage.removeItem('foodflow_user')
    setUserName('')
    setProfileOpen(false)
  }

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
          {!userName && (
            <>
              <Link href="/login" className="hidden rounded-lg border border-white/25 px-4 py-2 text-sm font-medium text-navy-foreground transition-colors hover:bg-white/10 sm:inline-flex">Login</Link>
              <Link href="/register" className="hidden rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-teal-foreground transition-colors hover:bg-teal/90 sm:inline-flex">Register</Link>
            </>
          )}

          <button
            type="button"
            aria-label="Search restaurants"
            className="grid size-10 place-items-center rounded-full bg-white/10 text-navy-foreground transition-colors hover:bg-white/15"
          >
            <Search className="size-5" aria-hidden="true" />
          </button>

      <Link
  href="/cart"
  aria-label="View cart, 2 items"
  className="relative grid size-10 place-items-center rounded-full bg-white/10 text-navy-foreground transition-colors hover:bg-white/15"
>
  <ShoppingCart className="size-5" aria-hidden="true" />

  <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-teal text-[11px] font-bold text-teal-foreground">
    2
  </span>
</Link>

          {userName && (
            <div className="relative">
              <button
                type="button"
                aria-label={`Open ${userName} profile menu`}
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((value) => !value)}
                className="grid size-10 place-items-center rounded-full bg-teal text-sm font-bold text-teal-foreground ring-2 ring-white/20 transition-transform hover:scale-105"
              >
                {initials}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-white/15 bg-navy p-1.5 shadow-xl">
                  <div className="border-b border-white/10 px-3 py-2">
                    <p className="truncate text-sm font-semibold text-navy-foreground">{userName}</p>
                    <p className="text-xs text-navy-foreground/60">FoodFlow account</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-navy-foreground/85 hover:bg-white/10 hover:text-navy-foreground" onClick={() => setProfileOpen(false)}>
                    <UserRound className="size-4" aria-hidden="true" />
                    View Profile
                  </Link>
                  <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-200 hover:bg-red-400/10">
                    <LogOut className="size-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

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

            {userName ? (
              <div className="mt-2 flex flex-col gap-1 rounded-lg bg-white/10 p-2">
                <Link href="/profile" className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium hover:bg-white/10" onClick={() => setOpen(false)}>
                  <UserRound className="size-4" aria-hidden="true" />
                  View Profile
                </Link>
                <button type="button" onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-200 hover:bg-red-400/10">
                  <LogOut className="size-4" aria-hidden="true" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href="/login" className="flex-1 rounded-lg border border-white/25 px-4 py-2 text-center text-sm font-medium">Login</Link>
                <Link href="/register" className="flex-1 rounded-lg bg-teal px-4 py-2 text-center text-sm font-semibold text-teal-foreground">Register</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}