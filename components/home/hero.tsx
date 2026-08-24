'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import {
  CheckCircle2,
  Clock,
  Leaf,
  Search,
  Star,
  Zap,
} from 'lucide-react'

const trustItems = [
  { icon: CheckCircle2, label: 'Simple ordering' },
  { icon: Clock, label: 'Order tracking' },
  { icon: Leaf, label: 'Fresh choices' },
]

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-10 text-navy-foreground sm:px-10 sm:py-12 lg:px-14">
        {/* soft decorative glow behind the dish */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 hidden size-[520px] -translate-y-1/2 rounded-full bg-teal/15 blur-2xl lg:block"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">
              <Zap className="size-4 text-teal" aria-hidden="true" />
              Fast &amp; Fresh Delivery
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
              Your favourite food,
              <br />
              <span className="text-teal">delivered with ease.</span>
            </h1>

            <p className="mt-4 max-w-md leading-relaxed text-navy-foreground/75">
              Discover restaurants, choose delicious meals, and place your order
              in just a few simple steps.
            </p>

            <form
              className="mt-7 flex w-full max-w-md items-center gap-2 rounded-xl bg-white p-2 shadow-card"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="hero-search" className="sr-only">
                Search for food or restaurant
              </label>
              <span className="grid size-9 place-items-center text-muted-foreground">
                <Search className="size-5" aria-hidden="true" />
              </span>
              <input
                id="hero-search"
                type="search"
                placeholder="Search for food or restaurant"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-teal-foreground transition-colors hover:bg-teal/90"
              >
                Search
              </button>
            </form>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-sm text-navy-foreground/80"
                >
                  <Icon className="size-4 text-teal" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative mx-auto aspect-square w-full max-w-sm"
          >
            <div className="absolute inset-0 rounded-full bg-teal/25" />
            <div className="absolute inset-6 overflow-hidden rounded-full bg-white shadow-card">
              <Image
                src="/images/home/hero-dish.png"
                alt="A freshly plated gourmet dish"
                fill
                sizes="(max-width: 1024px) 80vw, 384px"
                className="object-cover"
                priority
              />
            </div>

            {/* Ratings card */}
            <div className="absolute left-2 top-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-foreground shadow-card sm:left-4">
              <Star
                className="size-4 fill-[#f6b41f] text-[#f6b41f]"
                aria-hidden="true"
              />
              <span className="text-sm font-bold">4.9</span>
              <span className="text-xs text-muted-foreground">Ratings</span>
            </div>

            {/* Delivered card */}
            <div className="absolute -bottom-2 right-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-foreground shadow-card sm:right-4">
              <span className="grid size-7 place-items-center rounded-full bg-teal text-teal-foreground">
                <CheckCircle2 className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold leading-none">
                  Delivered
                </span>
                <span className="text-xs text-muted-foreground">25 min</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
