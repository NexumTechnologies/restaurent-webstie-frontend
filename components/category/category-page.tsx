'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  CakeSlice,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CupSoda,
  Heart,
  HeartPulse,
  MapPin,
  Pizza,
  Salad,
  Search,
  SlidersHorizontal,
  Star,
  Sandwich,
  Truck,
  X,
  type LucideIcon,
} from 'lucide-react'

import {
  CATEGORY_CONFIGS,
  type CategoryConfig,
  type CategoryFoodItem,
} from '@/lib/categories'

import { cn } from '@/lib/utils'

const CART_STORAGE_KEY = 'foodflow-cart'

type SortOption =
  | 'popular'
  | 'rating'
  | 'fastest'
  | 'price-asc'
  | 'price-desc'

type FilterState = {
  rating: string
  maxPrice: string
  delivery: string
  vegOnly: boolean
}

const defaultFilters: FilterState = {
  rating: 'all',
  maxPrice: 'all',
  delivery: 'all',
  vegOnly: false,
}

const categoryNotes: Record<
  CategoryConfig['slug'],
  string
> = {
  burgers:
    'Handcrafted, stacked and delivered hot.',
  pizza:
    'Freshly baked, cheesy and made to share.',
  rice:
    'Comfort food with rich Pakistani flavors.',
  drinks:
    'Chilled favorites to complete your order.',
  desserts:
    'Sweet finishes for every kind of craving.',
  healthy:
    'Fresh, balanced choices for lighter meals.',
}

/* -------------------------------------------------
   Helpers
------------------------------------------------- */

function money(value: number) {
  return `PKR ${value.toLocaleString('en-PK')}`
}

function getCategoryIcon(
  icon: CategoryConfig['icon'],
): LucideIcon {
  const icons: Record<
    CategoryConfig['icon'],
    LucideIcon
  > = {
    burger: Sandwich,
    pizza: Pizza,
    rice: Salad,
    drink: CupSoda,
    dessert: CakeSlice,
    healthy: HeartPulse,
  }

  return icons[icon]
}

function hasActiveFilters(
  filters: FilterState,
) {
  return (
    filters.rating !== 'all' ||
    filters.maxPrice !== 'all' ||
    filters.delivery !== 'all' ||
    filters.vegOnly
  )
}

function matchesFilters(
  item: CategoryFoodItem,
  filters: FilterState,
) {
  if (
    filters.rating !== 'all' &&
    item.rating < Number(filters.rating)
  ) {
    return false
  }

  if (
    filters.maxPrice !== 'all' &&
    item.price > Number(filters.maxPrice)
  ) {
    return false
  }

  if (
    filters.delivery !== 'all' &&
    item.deliveryMinutes > Number(filters.delivery)
  ) {
    return false
  }

  if (
    filters.vegOnly &&
    !item.isVegetarian
  ) {
    return false
  }

  return true
}

/* -------------------------------------------------
   Main Category Page
------------------------------------------------- */

export function CategoryPage({
  category,
}: {
  category: CategoryConfig
}) {
  const [search, setSearch] =
    useState('')

  const [sort, setSort] =
    useState<SortOption>('popular')

  const [filters, setFilters] =
    useState<FilterState>(defaultFilters)

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen,
  ] = useState(false)

  const [favorites, setFavorites] =
    useState<Record<string, boolean>>({})

  const [quantities, setQuantities] =
    useState<Record<string, number>>({})

  const [addedId, setAddedId] =
    useState<string | null>(null)

  /* ---------------------------------------------
     Restore existing cart quantities
  --------------------------------------------- */

  useEffect(() => {
    try {
      const raw =
        window.localStorage.getItem(
          CART_STORAGE_KEY,
        )

      if (!raw) return

      const parsed = JSON.parse(raw)

      if (!Array.isArray(parsed)) {
        return
      }

      const next: Record<
        string,
        number
      > = {}

      parsed.forEach((item) => {
        if (
          item?.id &&
          typeof item.quantity ===
            'number' &&
          item.quantity > 0
        ) {
          next[item.id] =
            item.quantity
        }
      })

      setQuantities(next)
    } catch {
      // Ignore invalid localStorage data.
    }
  }, [])

  /* ---------------------------------------------
     Search + filters + sorting
  --------------------------------------------- */

  const filteredItems = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()

    const items =
      category.items.filter(
        (item) => {
          const searchable =
            `${item.name} ${item.description} ${item.restaurantName}`.toLowerCase()

          const matchesSearch =
            !query ||
            searchable.includes(query)

          return (
            matchesSearch &&
            matchesFilters(
              item,
              filters,
            )
          )
        },
      )

    return [...items].sort(
      (a, b) => {
        if (sort === 'price-asc') {
          return a.price - b.price
        }

        if (sort === 'price-desc') {
          return b.price - a.price
        }

        if (sort === 'rating') {
          return b.rating - a.rating
        }

        if (sort === 'fastest') {
          return (
            a.deliveryMinutes -
            b.deliveryMinutes
          )
        }

        // Popular
        return (
          Number(Boolean(b.badge)) -
          Number(Boolean(a.badge))
        )
      },
    )
  }, [
    category.items,
    filters,
    search,
    sort,
  ])

  /* ---------------------------------------------
     Cart persistence
  --------------------------------------------- */

  function persistCart(
    nextQuantities: Record<
      string,
      number
    >,
  ) {
    const catalog = new Map(
      category.items.map((item) => [
        item.id,
        item,
      ]),
    )

    try {
      const raw =
        window.localStorage.getItem(
          CART_STORAGE_KEY,
        )

      const existing = raw
        ? JSON.parse(raw)
        : []

      const byId = new Map<
        string,
        CategoryFoodItem & {
          quantity: number
        }
      >()

      if (Array.isArray(existing)) {
        existing.forEach((item) => {
          if (
            item?.id &&
            item?.name &&
            typeof item.price ===
              'number'
          ) {
            byId.set(
              item.id,
              item,
            )
          }
        })
      }

      Object.entries(
        nextQuantities,
      ).forEach(
        ([id, quantity]) => {
          const item =
            catalog.get(id)

          if (!item) return

          if (quantity <= 0) {
            byId.delete(id)
          } else {
            byId.set(id, {
              ...item,
              quantity,
            })
          }
        },
      )

      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(
          Array.from(
            byId.values(),
          ),
        ),
      )

      window.dispatchEvent(
        new Event(
          'foodflow-cart-updated',
        ),
      )
    } catch {
      // Keep UI functional even if storage fails.
    }
  }

  function addToCart(
    item: CategoryFoodItem,
  ) {
    const current =
      quantities[item.id] ?? 0

    const next = {
      ...quantities,
      [item.id]:
        current + 1,
    }

    setQuantities(next)
    setAddedId(item.id)

    persistCart(next)

    window.setTimeout(() => {
      setAddedId(null)
    }, 1200)
  }

  function toggleFavorite(
    id: string,
  ) {
    setFavorites((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  function clearFilters() {
    setSearch('')
    setSort('popular')
    setFilters(defaultFilters)
  }

  const hasFilters =
    Boolean(search.trim()) ||
    sort !== 'popular' ||
    hasActiveFilters(filters)

  /* ---------------------------------------------
     UI
  --------------------------------------------- */

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* -----------------------------------------
            Breadcrumb
        ----------------------------------------- */}

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

          <span>
            Categories
          </span>

          <ChevronRight className="size-4" />

          <span className="font-medium text-foreground">
            {category.label}
          </span>
        </nav>

        {/* -----------------------------------------
            Category Navigation
        ----------------------------------------- */}

        <div className="-mx-1 mt-5 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2 px-1">
            {(
              [
                'burgers',
                'pizza',
                'rice',
                'drinks',
                'desserts',
                'healthy',
              ] as CategoryConfig['slug'][]
            ).map((slug) => {
              const item =
                CATEGORY_CONFIGS[
                  slug
                ]

              const active =
                slug ===
                category.slug

              const Icon =
                getCategoryIcon(
                  item.icon,
                )

              return (
                <Link
                  key={slug}
                  href={`/categories/${slug}`}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                    active
                      ? 'border-brand bg-brand text-brand-foreground'
                      : 'border-border bg-card hover:border-brand/40 hover:bg-brand-muted',
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* -----------------------------------------
            Category Hero
        ----------------------------------------- */}

        <section className="mt-4 overflow-hidden rounded-2xl bg-navy shadow-card">
          <div className="grid min-h-[270px] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/90">
                <MapPin className="size-3.5" />
                Available near you
              </span>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {category.label}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                {category.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/80">
                <span className="rounded-lg bg-white/10 px-3 py-2 font-semibold">
                  {category.count}{' '}
                  options
                </span>

                <span>•</span>

                <span>
                  {
                    categoryNotes[
                      category.slug
                    ]
                  }
                </span>
              </div>
            </div>

            <div className="relative min-h-[220px]">
              <Image
                src={category.heroImage}
                alt={`${category.label} food`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/35 to-transparent" />
            </div>
          </div>
        </section>

        {/* -----------------------------------------
            Search + Filters
        ----------------------------------------- */}

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
                type="search"
                placeholder={`Search ${category.label.toLowerCase()}, restaurants...`}
                className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch('')
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Mobile filter */}
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(
                  true,
                )
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal className="size-4" />

              Filters

              {hasActiveFilters(
                filters,
              ) && (
                <span className="grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                  !
                </span>
              )}
            </button>

            {/* Desktop filters */}
            <div className="hidden items-center gap-2 lg:flex">
              <FilterSelect
                label="Rating"
                value={filters.rating}
                onChange={(value) =>
                  setFilters(
                    (current) => ({
                      ...current,
                      rating:
                        value,
                    }),
                  )
                }
                options={[
                  [
                    'all',
                    'All ratings',
                  ],
                  ['4.5', '4.5+'],
                  ['4.7', '4.7+'],
                  ['4.8', '4.8+'],
                ]}
              />

              <FilterSelect
                label="Price"
                value={
                  filters.maxPrice
                }
                onChange={(value) =>
                  setFilters(
                    (current) => ({
                      ...current,
                      maxPrice:
                        value,
                    }),
                  )
                }
                options={[
                  [
                    'all',
                    'Any price',
                  ],
                  [
                    '500',
                    'Up to PKR 500',
                  ],
                  [
                    '750',
                    'Up to PKR 750',
                  ],
                  [
                    '1000',
                    'Up to PKR 1,000',
                  ],
                ]}
              />

              <FilterSelect
                label="Delivery"
                value={
                  filters.delivery
                }
                onChange={(value) =>
                  setFilters(
                    (current) => ({
                      ...current,
                      delivery:
                        value,
                    }),
                  )
                }
                options={[
                  [
                    'all',
                    'Any delivery',
                  ],
                  [
                    '30',
                    'Under 30 min',
                  ],
                  [
                    '40',
                    'Under 40 min',
                  ],
                ]}
              />

              <label className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={
                    filters.vegOnly
                  }
                  onChange={(
                    event,
                  ) =>
                    setFilters(
                      (current) => ({
                        ...current,
                        vegOnly:
                          event.target
                            .checked,
                      }),
                    )
                  }
                  className="size-4 accent-[var(--brand)]"
                />

                Vegetarian
              </label>
            </div>

            {/* Sort */}
            <label className="relative inline-flex h-11 items-center rounded-xl border border-border bg-background pr-2">
              <span className="sr-only">
                Sort items
              </span>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target
                      .value as SortOption,
                  )
                }
                className="h-full appearance-none rounded-xl bg-transparent px-3 pr-9 text-sm font-semibold outline-none"
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
                  Price: Low to High
                </option>

                <option value="price-desc">
                  Price: High to Low
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
            </label>
          </div>
        </section>

        {/* -----------------------------------------
            Filter Chips
        ----------------------------------------- */}

        {hasFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-muted-foreground">
              Active filters:
            </span>

            {filters.rating !==
              'all' && (
              <FilterChip
                label={`${filters.rating}+ rating`}
                onRemove={() =>
                  setFilters(
                    (current) => ({
                      ...current,
                      rating:
                        'all',
                    }),
                  )
                }
              />
            )}

            {filters.maxPrice !==
              'all' && (
              <FilterChip
                label={`Up to PKR ${Number(
                  filters.maxPrice,
                ).toLocaleString()}`}
                onRemove={() =>
                  setFilters(
                    (current) => ({
                      ...current,
                      maxPrice:
                        'all',
                    }),
                  )
                }
              />
            )}

            {filters.delivery !==
              'all' && (
              <FilterChip
                label={`Under ${filters.delivery} min`}
                onRemove={() =>
                  setFilters(
                    (current) => ({
                      ...current,
                      delivery:
                        'all',
                    }),
                  )
                }
              />
            )}

            {filters.vegOnly && (
              <FilterChip
                label="Vegetarian"
                onRemove={() =>
                  setFilters(
                    (current) => ({
                      ...current,
                      vegOnly:
                        false,
                    }),
                  )
                }
              />
            )}

            {search && (
              <FilterChip
                label={`Search: ${search}`}
                onRemove={() =>
                  setSearch('')
                }
              />
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 font-bold text-brand hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* -----------------------------------------
            Food Listing
        ----------------------------------------- */}

        <section className="mt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Fresh picks for you
              </p>

              <h2 className="mt-1 font-display text-2xl font-extrabold">
                Popular{' '}
                {category.label}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Top choices customers are ordering right now.
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredItems.length}{' '}
              results
            </span>
          </div>

          {filteredItems.length ===
          0 ? (
            <EmptyState
              onClear={
                clearFilters
              }
              categoryLabel={
                category.label
              }
            />
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map(
                (item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    quantity={
                      quantities[
                        item.id
                      ] ?? 0
                    }
                    isFavorite={Boolean(
                      favorites[
                        item.id
                      ],
                    )}
                    isAdded={
                      addedId ===
                      item.id
                    }
                    onFavorite={() =>
                      toggleFavorite(
                        item.id,
                      )
                    }
                    onAdd={() =>
                      addToCart(item)
                    }
                  />
                ),
              )}
            </div>
          )}
        </section>

        {/* -----------------------------------------
            Restaurants
        ----------------------------------------- */}

        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Discover nearby
              </p>

              <h2 className="mt-1 font-display text-2xl font-extrabold">
                Popular restaurants
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Browse a menu and keep your order moving in a few taps.
              </p>
            </div>

            <Link
              href="/restaurant/the-burger-house"
              className="hidden items-center gap-2 text-sm font-bold text-brand hover:underline sm:inline-flex"
            >
              View restaurant
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {category.restaurants.map(
              (restaurant) => (
                <Link
                  key={
                    restaurant.slug
                  }
                  href={`/restaurant/${restaurant.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-32 overflow-hidden bg-navy">
                    <Image
                      src={
                        category.heroImage
                      }
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-navy/10" />

                    {restaurant.isOpen && (
                      <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-xs font-bold text-teal-foreground">
                        Open now
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid size-12 place-items-center rounded-xl bg-brand-muted text-brand">
                        <MapPin className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-base font-extrabold">
                          {
                            restaurant.name
                          }
                        </h3>

                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {
                            restaurant.cuisine
                          }
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1 text-sm font-bold">
                        <Star className="size-4 fill-[#f6b41f] text-[#f6b41f]" />
                        {
                          restaurant.rating
                        }
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="size-3.5" />
                        {
                          restaurant.deliveryTime
                        }
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Truck className="size-3.5" />
                        {
                          restaurant.fee
                        }{' '}
                        delivery
                      </span>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">
                      View Menu
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </section>
      </div>

      {/* -----------------------------------------
          Mobile Filter Sheet
      ----------------------------------------- */}

      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
          onClick={() =>
            setMobileFiltersOpen(
              false,
            )
          }
        >
          <div
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-card p-5 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Refine
                </p>

                <h3 className="mt-1 font-display text-xl font-extrabold">
                  Filters
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false,
                  )
                }
                className="grid size-10 place-items-center rounded-full border border-border"
                aria-label="Close filters"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <MobileFilter title="Minimum rating">
                <select
                  value={
                    filters.rating
                  }
                  onChange={(event) =>
                    setFilters(
                      (current) => ({
                        ...current,
                        rating:
                          event.target
                            .value,
                      }),
                    )
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
                >
                  <option value="all">
                    All ratings
                  </option>
                  <option value="4.5">
                    4.5+
                  </option>
                  <option value="4.7">
                    4.7+
                  </option>
                  <option value="4.8">
                    4.8+
                  </option>
                </select>
              </MobileFilter>

              <MobileFilter title="Price range">
                <select
                  value={
                    filters.maxPrice
                  }
                  onChange={(event) =>
                    setFilters(
                      (current) => ({
                        ...current,
                        maxPrice:
                          event.target
                            .value,
                      }),
                    )
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
                >
                  <option value="all">
                    Any price
                  </option>
                  <option value="500">
                    Up to PKR 500
                  </option>
                  <option value="750">
                    Up to PKR 750
                  </option>
                  <option value="1000">
                    Up to PKR 1,000
                  </option>
                </select>
              </MobileFilter>

              <MobileFilter title="Delivery time">
                <select
                  value={
                    filters.delivery
                  }
                  onChange={(event) =>
                    setFilters(
                      (current) => ({
                        ...current,
                        delivery:
                          event.target
                            .value,
                      }),
                    )
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
                >
                  <option value="all">
                    Any delivery
                  </option>
                  <option value="30">
                    Under 30 min
                  </option>
                  <option value="40">
                    Under 40 min
                  </option>
                </select>
              </MobileFilter>

              <label className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold">
                Vegetarian only

                <input
                  type="checkbox"
                  checked={
                    filters.vegOnly
                  }
                  onChange={(event) =>
                    setFilters(
                      (current) => ({
                        ...current,
                        vegOnly:
                          event.target
                            .checked,
                      }),
                    )
                  }
                  className="size-4 accent-[var(--brand)]"
                />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-border px-4 py-3 text-sm font-bold"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(
                    false,
                  )
                }
                className="rounded-xl bg-brand px-4 py-3 text-sm font-bold text-brand-foreground"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------
   Filter Select
------------------------------------------------- */

function FilterSelect({
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
  options: [
    string,
    string,
  ][]
}) {
  return (
    <label className="relative flex h-11 items-center rounded-xl border border-border bg-background pr-2">
      <span className="sr-only">
        {label}
      </span>

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
          ([optionValue, text]) => (
            <option
              key={
                optionValue
              }
              value={
                optionValue
              }
            >
              {text}
            </option>
          ),
        )}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
    </label>
  )
}

/* -------------------------------------------------
   Filter Chip
------------------------------------------------- */

function FilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full bg-brand-muted px-3 py-1.5 font-semibold text-brand-dark"
    >
      {label}
      <X className="size-3.5" />
    </button>
  )
}

/* -------------------------------------------------
   Empty State
------------------------------------------------- */

function EmptyState({
  onClear,
  categoryLabel,
}: {
  onClear: () => void
  categoryLabel: string
}) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center shadow-card">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-muted text-brand">
        <Search className="size-6" />
      </div>

      <h3 className="mt-4 font-display text-xl font-extrabold">
        No{' '}
        {categoryLabel.toLowerCase()}{' '}
        found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Try changing your search or filters to see more options.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground"
      >
        Clear Filters
        <ArrowRight className="size-4" />
      </button>
    </div>
  )
}

/* -------------------------------------------------
   Food Card
------------------------------------------------- */

function FoodCard({
  item,
  quantity,
  isFavorite,
  isAdded,
  onFavorite,
  onAdd,
}: {
  item: CategoryFoodItem
  quantity: number
  isFavorite: boolean
  isAdded: boolean
  onFavorite: () => void
  onAdd: () => void
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-36 overflow-hidden sm:h-44">
        <Image
          src={
            item.image ||
            '/placeholder.svg'
          }
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <div>
            {item.badge && (
              <span className="inline-flex rounded-md bg-teal px-2.5 py-1 text-[10px] font-bold text-teal-foreground shadow-sm">
                {item.badge}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={
              onFavorite
            }
            aria-label={`${isFavorite ? 'Remove' : 'Add'} ${item.name} to favorites`}
            className={cn(
              'grid size-8 place-items-center rounded-full backdrop-blur transition',
              isFavorite
                ? 'bg-white text-red-500'
                : 'bg-white/90 text-foreground hover:text-brand',
            )}
          >
            <Heart
              className={cn(
                'size-4',
                isFavorite &&
                  'fill-current',
              )}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3.5 sm:p-4">
        <div className="min-h-[76px]">
          <h3 className="font-display text-sm font-extrabold leading-snug sm:text-base">
            {item.name}
          </h3>

          <p className="mt-1 text-[11px] font-medium text-muted-foreground">
            {item.restaurantName}
          </p>

          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-sm font-extrabold text-brand sm:text-base">
            {money(item.price)}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock3 className="size-3.5" />

            {item.deliveryMinutes}–
            {item.deliveryMinutes + 5}{' '}
            min
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">
            {quantity > 0
              ? `${quantity} in cart`
              : 'Ready to order'}
          </span>

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex min-w-[72px] items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground transition hover:bg-brand/90"
          >
            <span>
              {isAdded
                ? 'Added'
                : 'Add'}
            </span>

            {!isAdded && (
              <span className="text-sm leading-none">
                +
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------
   Mobile Filter
------------------------------------------------- */

function MobileFilter({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold">
        {title}
      </p>

      {children}
    </div>
  )
}