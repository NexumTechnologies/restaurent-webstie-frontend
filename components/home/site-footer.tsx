'use client'

import Link from 'next/link'
import type { SVGProps } from 'react'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { FoodFlowLogo } from '@/components/foodflow-logo'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Restaurants', href: '#restaurants' },
  { label: 'About Us', href: '#how-it-works' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'FAQ', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
]

const contactInfo = [
  { icon: Phone, text: '+92 300 1234567' },
  { icon: Mail, text: 'info@foodflow.com' },
  { icon: MapPin, text: 'Lahore, Pakistan' },
  { icon: Clock, text: 'Mon - Sun: 9:00 AM - 11:00 PM' },
]

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 5.9c-.7.32-1.5.53-2.3.63a4 4 0 0 0 1.76-2.2c-.77.46-1.63.79-2.54.97a4 4 0 0 0-6.82 3.65A11.35 11.35 0 0 1 3.9 4.7a4 4 0 0 0 1.24 5.34c-.65-.02-1.26-.2-1.8-.5v.05a4 4 0 0 0 3.2 3.92c-.6.16-1.22.18-1.8.07a4 4 0 0 0 3.73 2.78A8.02 8.02 0 0 1 2 18.06a11.32 11.32 0 0 0 6.13 1.8c7.35 0 11.37-6.09 11.37-11.37v-.52A8.1 8.1 0 0 0 22 5.9Z" />
    </svg>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

const socials = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Twitter', href: '#', Icon: TwitterIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedinIcon },
]

const payments = ['VISA', 'mastercard', 'JazzCash', 'easypaisa']

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mt-16 scroll-mt-20 bg-navy text-navy-foreground"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-foreground">
              About FoodFlow
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
              FoodFlow is your smart food ordering platform with demand
              prediction to serve you better, faster, and smarter every day.
            </p>
            <div className="mt-5">
              <FoodFlowLogo tone="teal" inverted />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-foreground/70 transition-colors hover:text-teal"
                  >
                    {'› '}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-foreground">
              Contact Info
            </h3>
            <ul className="mt-4 space-y-3">
              {contactInfo.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-sm text-navy-foreground/70"
                >
                  <Icon className="size-4 shrink-0 text-teal" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-foreground">
              Stay Connected
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
              Subscribe to get the latest offers and updates from FoodFlow.
            </p>
            <form
              className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 p-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Enter your email
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-navy-foreground outline-none placeholder:text-navy-foreground/50"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal text-teal-foreground transition-colors hover:bg-teal/90"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-navy-foreground/80 transition-colors hover:bg-teal hover:text-teal-foreground"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-navy-foreground/60">
            © 2026 FoodFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-navy-foreground/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
