'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Truck,
  X,
} from 'lucide-react'

import type { Restaurant } from '@/lib/restaurant'

const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'The Burger House',
    slug: 'the-burger-house',
    cover: '/images/restaurants/burger-house-cover.jpg',
    logo: '/images/restaurants/burger-house-logo.jpg',
    cuisines: ['Burger', 'Fast Food', 'Drinks'],
    rating: 4.6,
    deliveryTime: '30–40 min',
    minOrder: 'PKR 300',
    isOpen: true,
  },
  {
    id: '2',
    name: 'Pizza Palace',
    slug: 'pizza-palace',
    cover: '/images/restaurants/pizza-palace-cover.jpg',
    logo: '/images/restaurants/pizza-palace-logo.jpg',
    cuisines: ['Pizza', 'Italian'],
    rating: 4.5,
    deliveryTime: '35–45 min',
    minOrder: 'PKR 500',
    isOpen: true,
  },
  {
    id: '3',
    name: 'Urban Bites',
    slug: 'urban-bites',
    cover:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
    logo:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=300&auto=format&fit=crop',
    cuisines: ['Burgers', 'Fast Food'],
    rating: 4.8,
    deliveryTime: '25–35 min',
    minOrder: 'PKR 400',
    isOpen: true,
  },
  {
    id: '4',
    name: 'Royal Rice',
    slug: 'royal-rice',
    cover:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
    logo:
      'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=300&auto=format&fit=crop',
    cuisines: ['Pakistani', 'Biryani'],
    rating: 4.9,
    deliveryTime: '20–30 min',
    minOrder: 'PKR 250',
    isOpen: true,
  },
  {
    id: '5',
    name: 'Coffee Corner',
    slug: 'coffee-corner',
    cover:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    logo:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=300&auto=format&fit=crop',
    cuisines: ['Coffee', 'Desserts'],
    rating: 4.7,
    deliveryTime: '20–30 min',
    minOrder: 'PKR 300',
    isOpen: true,
  },
  {
    id: '6',
    name: 'Green Bowl',
    slug: 'green-bowl',
    cover:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
    logo:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=300&auto=format&fit=crop',
    cuisines: ['Healthy', 'Salads'],
    rating: 4.8,
    deliveryTime: '25–35 min',
    minOrder: 'PKR 350',
    isOpen: true,
  },
  {
    id: '7',
    name: 'Sweet Treats',
    slug: 'sweet-treats',
    cover:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop',
    logo:
      'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=300&auto=format&fit=crop',
    cuisines: ['Desserts', 'Bakery'],
    rating: 4.7,
    deliveryTime: '25–35 min',
    minOrder: 'PKR 300',
    isOpen: false,
  },
  {
    id: '8',
    name: 'Spice Kitchen',
    slug: 'spice-kitchen',
    cover:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop',
    logo:
      'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=300&auto=format&fit=crop',
    cuisines: ['Pakistani', 'Indian'],
    rating: 4.6,
    deliveryTime: '30–40 min',
    minOrder: 'PKR 350',
    isOpen: true,
  },
  {
    id: '9',
    name: 'Pizza Garden',
    slug: 'pizza-garden',
    cover:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    logo:
      'https://images.unsplash.com/photo-1593560708920-61dd98c8e7a1?q=80&w=300&auto=format&fit=crop',
    cuisines: ['Pizza', 'Italian'],
    rating: 4.7,
    deliveryTime: '30–40 min',
    minOrder: 'PKR 450',
    isOpen: true,
  },
]

type SortOption =
  | 'popular'
  | 'rating'
  | 'fastest'
  | 'price-asc'
  | 'price-desc'

export function RestaurantsPageContent() {
  const [search, setSearch] =
    useState('')

  const [sort, setSort] =
    useState<SortOption>('popular')

  const [rating, setRating] =
    useState('all')

  const [delivery, setDelivery] =
    useState('all')

  const [openOnly, setOpenOnly] =
    useState(false)

  const [favorites, setFavorites] =
    useState<Record<string, boolean>>({})

  const [mobileFilters, setMobileFilters] =
    useState(false)

  const filteredRestaurants =
    useMemo(() => {
      const query =
        search.trim().toLowerCase()

      const filtered =
        RESTAURANTS.filter(
          (restaurant) => {
            const matchesSearch =
              !query ||
              restaurant.name
                .toLowerCase()
                .includes(query) ||
              restaurant.cuisines.some(
                (cuisine) =>
                  cuisine
                    .toLowerCase()
                    .includes(query),
              )

            const ratingValue =
              Number(
                restaurant.rating,
              )

            const matchesRating =
              rating === 'all' ||
              ratingValue >=
                Number(rating)

            const maxMinutes =
              Number(
                restaurant.deliveryTime
                  .split('–')[1]
                  ?.replace(
                    /\D/g,
                    '',
                  ) || 999,
              )

            const matchesDelivery =
              delivery === 'all' ||
              maxMinutes <=
                Number(delivery)

            const matchesOpen =
              !openOnly ||
              restaurant.isOpen

            return (
              matchesSearch &&
              matchesRating &&
              matchesDelivery &&
              matchesOpen
            )
          },
        )

      return [...filtered].sort(
        (a, b) => {
          if (
            sort === 'rating'
          ) {
            return (
              b.rating -
              a.rating
            )
          }

          if (
            sort === 'fastest'
          ) {
            const aTime =
              Number(
                a.deliveryTime
                  .split('–')[0]
                  ?.replace(
                    /\D/g,
                    '',
                  ) || 999,
              )

            const bTime =
              Number(
                b.deliveryTime
                  .split('–')[0]
                  ?.replace(
                    /\D/g,
                    '',
                  ) || 999,
              )

            return (
              aTime - bTime
            )
          }

          if (
            sort === 'price-asc'
          ) {
            return (
              Number(
                a.minOrder.replace(
                  /\D/g,
                  '',
                ),
              ) -
              Number(
                b.minOrder.replace(
                  /\D/g,
                  '',
                ),
              )
            )
          }

          if (
            sort === 'price-desc'
          ) {
            return (
              Number(
                b.minOrder.replace(
                  /\D/g,
                  '',
                ),
              ) -
              Number(
                a.minOrder.replace(
                  /\D/g,
                  '',
                ),
              )
            )
          }

          return (
            b.rating -
            a.rating
          )
        },
      )
    }, [
      search,
      sort,
      rating,
      delivery,
      openOnly,
    ])

  function clearFilters() {
    setSearch('')
    setSort('popular')
    setRating('all')
    setDelivery('all')
    setOpenOnly(false)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="hover:text-foreground"
        >
          Home
        </Link>

        <ChevronRight className="size-4" />

        <span className="font-medium text-foreground">
          Restaurants
        </span>
      </nav>

      {/* Hero */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-navy shadow-card">
        <div className="grid items-center lg:grid-cols-[1fr_0.8fr]">
          <div className="px-6 py-9 sm:px-10 sm:py-11">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85">
              <MapPin className="size-4 text-teal" />
              Restaurants near you
            </span>

            <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Find your next
              <span className="text-teal">
                {' '}favorite restaurant
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Explore top-rated restaurants, discover new
              favorites and order delicious food from places
              you love.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                {RESTAURANTS.length}+ restaurants
              </span>

              <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                Fast delivery
              </span>

              <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                Secure ordering
              </span>
            </div>
          </div>

          <div className="relative min-h-[230px] lg:min-h-[315px]">
            <Image
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1400&auto=format&fit=crop"
              alt="Restaurant food"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/25 to-transparent" />
          </div>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-3 shadow-card sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search restaurants or cuisine..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch('')
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileFilters(true)
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            <FilterSelect
              value={rating}
              onChange={setRating}
              options={[
                ['all', 'All ratings'],
                ['4.5', '4.5+'],
                ['4.7', '4.7+'],
                ['4.8', '4.8+'],
              ]}
            />

            <FilterSelect
              value={delivery}
              onChange={setDelivery}
              options={[
                ['all', 'Any delivery'],
                ['30', 'Under 30 min'],
                ['40', 'Under 40 min'],
              ]}
            />

            <label className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={
                  openOnly
                }
                onChange={(
                  event,
                ) =>
                  setOpenOnly(
                    event.target
                      .checked,
                  )
                }
                className="size-4 accent-[var(--brand)]"
              />

              Open now
            </label>
          </div>

          <label className="relative inline-flex h-11 items-center rounded-xl border border-border bg-background pr-2">
            <select
              value={sort}
              onChange={(event) =>
                setSort(
                  event.target
                    .value as SortOption,
                )
              }
              className="h-full appearance-none bg-transparent px-3 pr-8 text-sm font-semibold outline-none"
            >
              <option value="popular">
                Most Popular
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="fastest">
                Fastest Delivery
              </option>

              <option value="price-asc">
                Lowest Minimum Order
              </option>

              <option value="price-desc">
                Highest Minimum Order
              </option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
          </label>
        </div>
      </section>

      {/* Result heading */}
      <section className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Discover & order
          </p>

          <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
            Popular restaurants
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {filteredRestaurants.length} restaurants available for you.
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
          {filteredRestaurants.length}{' '}
          results
        </span>
      </section>

      {/* Restaurant Grid */}
      {filteredRestaurants.length ===
      0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center shadow-card">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-muted text-brand">
            <Search className="size-6" />
          </div>

          <h3 className="mt-4 font-display text-xl font-extrabold">
            No restaurants found
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={
              clearFilters
            }
            className="mt-5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map(
            (restaurant) => (
              <RestaurantDiscoveryCard
                key={restaurant.id}
                restaurant={
                  restaurant
                }
                favorite={Boolean(
                  favorites[
                    restaurant.id
                  ],
                )}
                onFavorite={() =>
                  setFavorites(
                    (current) => ({
                      ...current,
                      [restaurant.id]:
                        !current[
                          restaurant.id
                        ],
                    }),
                  )
                }
              />
            ),
          )}
        </div>
      )}

      {/* Bottom CTA */}
      <section className="mt-12 rounded-3xl bg-brand-muted/60 px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Looking for something specific?
            </p>

            <h2 className="mt-2 font-display text-2xl font-extrabold">
              Browse food by category
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Find burgers, pizza, rice, drinks, desserts and healthy options.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-brand-foreground"
          >
            Browse Categories
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Mobile filters */}
      {mobileFilters && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
          onClick={() =>
            setMobileFilters(false)
          }
        >
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-card p-5 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  Refine results
                </p>

                <h3 className="mt-1 font-display text-xl font-extrabold">
                  Filters
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFilters(
                    false,
                  )
                }
                className="grid size-10 place-items-center rounded-full border border-border"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <MobileSelect
                label="Minimum Rating"
                value={rating}
                onChange={
                  setRating
                }
                options={[
                  ['all', 'All ratings'],
                  ['4.5', '4.5+'],
                  ['4.7', '4.7+'],
                  ['4.8', '4.8+'],
                ]}
              />

              <MobileSelect
                label="Delivery Time"
                value={delivery}
                onChange={
                  setDelivery
                }
                options={[
                  ['all', 'Any delivery'],
                  ['30', 'Under 30 min'],
                  ['40', 'Under 40 min'],
                ]}
              />

              <label className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold">
                Open restaurants only

                <input
                  type="checkbox"
                  checked={
                    openOnly
                  }
                  onChange={(
                    event,
                  ) =>
                    setOpenOnly(
                      event.target
                        .checked,
                    )
                  }
                  className="size-4 accent-[var(--brand)]"
                />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="rounded-xl border border-border px-4 py-3 text-sm font-bold"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() =>
                  setMobileFilters(
                    false,
                  )
                }
                className="rounded-xl bg-brand px-4 py-3 text-sm font-bold text-brand-foreground"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RestaurantDiscoveryCard({
  restaurant,
  favorite,
  onFavorite,
}: {
  restaurant: Restaurant
  favorite: boolean
  onFavorite: () => void
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/restaurant/${restaurant.slug}`}
        className="block"
      >
        <div className="relative h-44 overflow-hidden">
          <Image
            src={restaurant.cover}
            alt={restaurant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />

          {restaurant.isOpen && (
            <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-xs font-bold text-teal-foreground">
              Open now
            </span>
          )}

          {!restaurant.isOpen && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-foreground">
              Closed
            </span>
          )}

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              onFavorite()
            }}
            aria-label={`${
              favorite
                ? 'Remove'
                : 'Add'
            } ${restaurant.name} from favorites`}
            className={[
              'absolute right-4 top-4 grid size-9 place-items-center rounded-full backdrop-blur',
              favorite
                ? 'bg-white text-red-500'
                : 'bg-white/90 text-foreground',
            ].join(' ')}
          >
            <Heart
              className={[
                'size-4',
                favorite
                  ? 'fill-current'
                  : '',
              ].join(' ')}
            />
          </button>
        </div>
      </Link>

      <div className="relative px-5 pb-5">
        <div className="relative -top-6 size-14 overflow-hidden rounded-full border-4 border-card bg-navy-muted">
          <Image
            src={restaurant.logo}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="-mt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-extrabold">
                {restaurant.name}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {restaurant.cuisines.join(
                  ' • ',
                )}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold">
              <Star className="size-4 fill-[#f6b41f] text-[#f6b41f]" />
              {restaurant.rating}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              {restaurant.deliveryTime}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-3.5" />
              Fast delivery
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <div>
              <p className="text-xs text-muted-foreground">
                Minimum order
              </p>

              <p className="mt-0.5 text-sm font-extrabold text-brand">
                {restaurant.minOrder}
              </p>
            </div>

            <Link
              href={`/restaurant/${restaurant.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-bold text-brand-foreground transition hover:bg-brand/90"
            >
              View Menu
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (
    value: string,
  ) => void
  options: [string, string][]
}) {
  return (
    <label className="relative flex h-11 items-center rounded-xl border border-border bg-background pr-2">
      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="h-full appearance-none bg-transparent px-3 pr-8 text-sm font-medium outline-none"
      >
        {options.map(
          ([value, label]) => (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          ),
        )}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
    </label>
  )
}

function MobileSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (
    value: string,
  ) => void
  options: [string, string][]
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold">
        {label}
      </p>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
      >
        {options.map(
          ([value, label]) => (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          ),
        )}
      </select>
    </div>
  )
}
