'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CakeSlice,
  ChevronRight,
  CupSoda,
  HeartPulse,
  Pizza,
  Salad,
  Search,
  Sandwich,
  Star,
  Utensils,
  X,
} from 'lucide-react'

import {
  CATEGORY_CONFIGS,
  type CategorySlug,
} from '@/lib/categories'

const CATEGORY_ORDER: CategorySlug[] = [
  'burgers',
  'pizza',
  'rice',
  'drinks',
  'desserts',
  'healthy',
]

const categoryMeta: Record<
  CategorySlug,
  {
    shortDescription: string
    popularText: string
  }
> = {
  burgers: {
    shortDescription:
      'Juicy, cheesy and stacked with flavor.',
    popularText:
      'Zinger, beef and crispy chicken favorites.',
  },
  pizza: {
    shortDescription:
      'Freshly baked pizzas for every craving.',
    popularText:
      'Fajita, cheese, pepperoni and more.',
  },
  rice: {
    shortDescription:
      'Hearty rice dishes packed with flavor.',
    popularText:
      'Biryani, pulao and delicious rice bowls.',
  },
  drinks: {
    shortDescription:
      'Chilled drinks to complete your meal.',
    popularText:
      'Shakes, coffee, coolers and chilled drinks.',
  },
  desserts: {
    shortDescription:
      'Sweet treats worth saving room for.',
    popularText:
      'Brownies, cheesecakes, waffles and more.',
  },
  healthy: {
    shortDescription:
      'Fresh and balanced choices for lighter meals.',
    popularText:
      'Salads, bowls, wraps and fresh favorites.',
  },
}

function getCategoryIcon(
  slug: CategorySlug,
) {
  const icons = {
    burgers: Sandwich,
    pizza: Pizza,
    rice: Salad,
    drinks: CupSoda,
    desserts: CakeSlice,
    healthy: HeartPulse,
  }

  return icons[slug]
}

export function CategoriesOverview() {
  const [search, setSearch] =
    useState('')

  const filteredCategories =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase()

      if (!query) {
        return CATEGORY_ORDER
      }

      return CATEGORY_ORDER.filter(
        (slug) => {
          const category =
            CATEGORY_CONFIGS[slug]

          const meta =
            categoryMeta[slug]

          return (
            category.label
              .toLowerCase()
              .includes(query) ||
            category.description
              .toLowerCase()
              .includes(query) ||
            meta.shortDescription
              .toLowerCase()
              .includes(query)
          )
        },
      )
    }, [search])

  return (
    <div>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <ChevronRight className="size-4" />

          <span className="font-medium text-foreground">
            Categories
          </span>
        </nav>

        {/* Hero */}
        <section className="mt-5 overflow-hidden rounded-2xl bg-navy shadow-card">
          <div className="grid min-h-[320px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85">
                <Utensils className="size-3.5" />
                Explore FoodFlow
              </span>

              <h1 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Explore Food
                <span className="text-teal">
                  {' '}Categories
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Discover your favorite food, drinks and
                desserts from FoodFlow. Choose a category
                and start exploring delicious options near you.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                  6 Categories
                </span>

                <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                  95+ Food Options
                </span>
              </div>
            </div>

            <div className="relative min-h-[240px] overflow-hidden lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1400&auto=format&fit=crop"
                alt="Food variety"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/35 to-transparent" />

              <div className="absolute bottom-5 right-5 rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-wider text-white/65">
                  FoodFlow
                </p>

                <p className="mt-1 text-sm font-bold">
                  Something delicious is waiting
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-3 shadow-card sm:p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              type="search"
              placeholder="Search categories..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-11 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch('')
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </section>

        {/* Section heading */}
        <section className="mt-9">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                What are you craving?
              </p>

              <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
                Browse by category
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Pick a category to discover popular food
                and restaurants.
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredCategories.length}{' '}
              categories
            </span>
          </div>
        </section>

        {/* Category Grid */}
        {filteredCategories.length > 0 ? (
          <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filteredCategories.map(
              (slug) => (
                <CategoryLargeCard
                  key={slug}
                  slug={slug}
                />
              ),
            )}
          </section>
        ) : (
          <section className="mt-5 rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center shadow-card">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-muted text-brand">
              <Search className="size-6" />
            </div>

            <h3 className="mt-4 font-display text-xl font-extrabold">
              No categories found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Try another category name.
            </p>

            <button
              type="button"
              onClick={() =>
                setSearch('')
              }
              className="mt-5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
            >
              Clear Search
            </button>
          </section>
        )}

        {/* Popular Section */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Customer favorites
              </p>

              <h2 className="mt-1 font-display text-2xl font-extrabold">
                Popular right now
              </h2>
            </div>

            <Link
              href="/categories/burgers"
              className="hidden items-center gap-2 text-sm font-bold text-brand hover:underline sm:inline-flex"
            >
              Explore Burgers
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <PopularCard
              href="/categories/burgers"
              category="Burgers"
              title="Stacked favorites"
              description="Juicy beef and crispy chicken burgers."
              image={CATEGORY_CONFIGS.burgers.heroImage}
              rating="4.9"
            />

            <PopularCard
              href="/categories/pizza"
              category="Pizza"
              title="Fresh from the oven"
              description="Cheesy, loaded and baked to perfection."
              image={CATEGORY_CONFIGS.pizza.heroImage}
              rating="4.8"
            />

            <PopularCard
              href="/categories/desserts"
              category="Desserts"
              title="End on a sweet note"
              description="Brownies, cheesecakes and creamy treats."
              image={CATEGORY_CONFIGS.desserts.heroImage}
              rating="4.8"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 overflow-hidden rounded-2xl border border-brand/15 bg-brand-muted/60">
          <div className="flex flex-col items-center justify-between gap-5 px-5 py-7 text-center sm:flex-row sm:text-left sm:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                Ready to order?
              </p>

              <h2 className="mt-2 font-display text-2xl font-extrabold">
                Find something delicious today.
              </h2>

              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Explore a category, discover a restaurant and
                build your perfect order.
              </p>
            </div>

            <Link
              href="/restaurant/the-burger-house"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-brand-foreground transition hover:bg-brand/90"
            >
              Explore Food
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Large Category Card
------------------------------------------------- */

function CategoryLargeCard({
  slug,
}: {
  slug: CategorySlug
}) {
  const category =
    CATEGORY_CONFIGS[slug]

  const Icon = getCategoryIcon(
    slug,
  )

  const meta =
    categoryMeta[slug]

  return (
    <Link
      href={`/categories/${slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-40 overflow-hidden sm:h-52">
        <Image
          src={category.heroImage}
          alt={category.label}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />

        <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
          <span className="grid size-10 place-items-center rounded-xl bg-white/90 text-navy shadow-sm backdrop-blur sm:size-11">
            <Icon className="size-5 sm:size-6" />
          </span>
        </div>

        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
          <span className="rounded-full bg-teal px-2.5 py-1 text-[10px] font-bold text-teal-foreground">
            {category.count}+
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-display text-xl font-extrabold sm:text-2xl">
            {category.label}
          </h3>

          <p className="mt-1 text-xs text-white/75 sm:text-sm">
            {meta.shortDescription}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">
            Popular choices
          </p>

          <p className="mt-1 line-clamp-1 text-xs text-foreground/75">
            {meta.popularText}
          </p>
        </div>

        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-muted text-brand transition-transform group-hover:translate-x-1">
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}

/* -------------------------------------------------
   Popular Card
------------------------------------------------- */

function PopularCard({
  href,
  category,
  title,
  description,
  image,
  rating,
}: {
  href: string
  category: string
  title: string
  description: string
  image: string
  rating: string
}) {
  return (
    <Link
      href={href}
      className="group relative min-h-[210px] overflow-hidden rounded-2xl border border-border shadow-card"
    >
      <Image
        src={image}
        alt={category}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy">
          {category}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-navy">
          <Star className="size-3.5 fill-[#f6b41f] text-[#f6b41f]" />
          {rating}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="font-display text-lg font-extrabold">
          {title}
        </h3>

        <p className="mt-1 max-w-sm text-xs leading-5 text-white/75">
          {description}
        </p>
      </div>
    </Link>
  )
}