import Link from 'next/link'
import type { SVGProps } from 'react'
import { FoodFlowLogo } from '@/components/foodflow-logo'

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Contact Us', href: '#' },
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

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.76-1.77C19.34 5.1 12 5.1 12 5.1s-7.34 0-8.84.42A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.76 1.77c1.5.43 8.84.43 8.84.43s7.34 0 8.84-.43a2.5 2.5 0 0 0 1.76-1.77C23 15.2 23 12 23 12Zm-13 3.02V8.98L15.2 12 10 15.02Z" />
    </svg>
  )
}

const socials = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Twitter', href: '#', Icon: TwitterIcon },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-dark-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <FoodFlowLogo inverted />
          <p className="text-sm text-brand-dark-foreground/70">
            © 2024 FoodFlow. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-dark-foreground/80">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-brand-dark-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">Follow Us</h2>
          <ul className="flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  className="grid size-8 place-items-center rounded-full bg-white/10 text-brand-dark-foreground transition-colors hover:bg-white/20"
                >
                  <Icon className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
