'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useMemo,
  useState,
} from 'react'
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

const CART_STORAGE_KEY = 'foodflow-cart'

type Dish = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  restaurant: string
  restaurantSlug: string
  rating: number
  deliveryTime: number
  badge?: string
  isVegetarian: boolean
}

const DISHES: Dish[] = [
  {
    id: 'dish-1',
    name: 'Zinger Burger',
    description:
      'Crispy zinger fillet with lettuce and creamy mayo.',
    price: 599,
    image:
      '/images/home/dish-zinger-burger.png',
    category: 'Burgers',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.9,
    deliveryTime: 30,
    badge: 'Bestseller',
    isVegetarian: false,
  },
  {
    id: 'dish-2',
    name: 'Fajita Pizza',
    description:
      'Loaded chicken fajita pizza with mozzarella and fresh vegetables.',
    price: 1099,
    image:
      '/images/home/dish-fajita-pizza.png',
    category: 'Pizza',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.8,
    deliveryTime: 35,
    badge: 'Popular',
    isVegetarian: false,
  },
  {
    id: 'dish-3',
    name: 'Chicken Biryani',
    description:
      'Fragrant basmati rice layered with tender spicy chicken.',
    price: 450,
    image:
      '/images/home/dish-chicken-biryani.png',
    category: 'Rice',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.9,
    deliveryTime: 30,
    badge: 'Top Rated',
    isVegetarian: false,
  },
  {
    id: 'dish-4',
    name: 'Cold Coffee',
    description:
      'Smooth chilled coffee with a rich creamy finish.',
    price: 380,
    image:
      '/images/home/dish-cold-coffee.png',
    category: 'Drinks',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.7,
    deliveryTime: 25,
    isVegetarian: true,
  },
  {
    id: 'dish-5',
    name: 'Double Beef Burger',
    description:
      'Two juicy beef patties, melted cheese and house sauce.',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop',
    category: 'Burgers',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.8,
    deliveryTime: 35,
    badge: 'Popular',
    isVegetarian: false,
  },
  {
    id: 'dish-6',
    name: 'Cheese Fries',
    description:
      'Golden fries topped with melted cheese and fresh herbs.',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=900&auto=format&fit=crop',
    category: 'Sides',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.7,
    deliveryTime: 30,
    isVegetarian: true,
  },
  {
    id: 'dish-7',
    name: 'Chocolate Shake',
    description:
      'Creamy chocolate shake finished with whipped cream.',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=900&auto=format&fit=crop',
    category: 'Desserts',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.9,
    deliveryTime: 25,
    badge: 'Bestseller',
    isVegetarian: true,
  },
  {
    id: 'dish-8',
    name: 'Chicken Nuggets',
    description:
      'Crispy chicken nuggets served with your choice of dip.',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=900&auto=format&fit=crop',
    category: 'Sides',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.8,
    deliveryTime: 30,
    isVegetarian: false,
  },
  {
    id: 'dish-9',
    name: 'Garlic Bread',
    description:
      'Toasted bread with garlic butter and herbs.',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=900&auto=format&fit=crop',
    category: 'Sides',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.6,
    deliveryTime: 30,
    isVegetarian: true,
  },
  {
    id: 'dish-10',
    name: 'Mint Lemonade',
    description:
      'Fresh lemon and mint with crushed ice.',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=900&auto=format&fit=crop',
    category: 'Drinks',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.8,
    deliveryTime: 20,
    isVegetarian: true,
  },
  {
    id: 'dish-11',
    name: 'Lotus Cheesecake',
    description:
      'Creamy cheesecake with a buttery biscuit base.',
    price: 449,
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=900&auto=format&fit=crop',
    category: 'Desserts',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.9,
    deliveryTime: 35,
    badge: 'Top Rated',
    isVegetarian: true,
  },
  {
    id: 'dish-12',
    name: 'Grilled Chicken Salad',
    description:
      'Grilled chicken, greens, cucumber and light dressing.',
    price: 599,
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=900&auto=format&fit=crop',
    category: 'Healthy',
    restaurant:
      'The Burger House',
    restaurantSlug:
      'the-burger-house',
    rating: 4.9,
    deliveryTime: 30,
    badge: 'Healthy Choice',
    isVegetarian: false,
  },
]

const CATEGORY_OPTIONS = [
  'All',
  'Burgers',
  'Pizza',
  'Rice',
  'Drinks',
  'Desserts',
  'Sides',
  'Healthy',
]

type SortOption =
  | 'popular'
  | 'rating'
  | 'fastest'
  | 'price-asc'
  | 'price-desc'

function money(value: number) {
  return `PKR ${value.toLocaleString(
    'en-PK',
  )}`
}

export function DishesPageContent() {
  const [search, setSearch] =
    useState('')

  const [category, setCategory] =
    useState('All')

  const [sort, setSort] =
    useState<SortOption>(
      'popular',
    )

  const [rating, setRating] =
    useState('all')

  const [maxPrice, setMaxPrice] =
    useState('all')

  const [delivery, setDelivery] =
    useState('all')

  const [vegetarian, setVegetarian] =
    useState(false)

  const [favorites, setFavorites] =
    useState<Record<string, boolean>>(
      {},
    )

  const [quantities, setQuantities] =
    useState<Record<string, number>>(
      {},
    )

  const [addedId, setAddedId] =
    useState<string | null>(null)

  const [mobileFilters, setMobileFilters] =
    useState(false)

  const filteredDishes = useMemo(() => {
    const query =
      search
        .trim()
        .toLowerCase()

    const filtered = DISHES.filter(
      (dish) => {
        const matchesSearch =
          !query ||
          dish.name
            .toLowerCase()
            .includes(query) ||
          dish.description
            .toLowerCase()
            .includes(query) ||
          dish.restaurant
            .toLowerCase()
            .includes(query)

        const matchesCategory =
          category === 'All' ||
          dish.category ===
            category

        const matchesRating =
          rating === 'all' ||
          dish.rating >=
            Number(rating)

        const matchesPrice =
          maxPrice === 'all' ||
          dish.price <=
            Number(maxPrice)

        const matchesDelivery =
          delivery === 'all' ||
          dish.deliveryTime <=
            Number(delivery)

        const matchesVegetarian =
          !vegetarian ||
          dish.isVegetarian

        return (
          matchesSearch &&
          matchesCategory &&
          matchesRating &&
          matchesPrice &&
          matchesDelivery &&
          matchesVegetarian
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
          return (
            a.deliveryTime -
            b.deliveryTime
          )
        }

        if (
          sort ===
          'price-asc'
        ) {
          return (
            a.price -
            b.price
          )
        }

        if (
          sort ===
          'price-desc'
        ) {
          return (
            b.price -
            a.price
          )
        }

        return (
          Number(Boolean(b.badge)) -
          Number(Boolean(a.badge))
        )
      },
    )
  }, [
    search,
    category,
    sort,
    rating,
    maxPrice,
    delivery,
    vegetarian,
  ])

  function addToCart(
    dish: Dish,
  ) {
    const nextQuantity =
      (quantities[dish.id] ??
        0) + 1

    const next = {
      ...quantities,
      [dish.id]:
        nextQuantity,
    }

    setQuantities(next)
    setAddedId(dish.id)

    try {
      const raw =
        window.localStorage.getItem(
          CART_STORAGE_KEY,
        )

      const existing = raw
        ? JSON.parse(raw)
        : []

      const existingArray =
        Array.isArray(existing)
          ? existing
          : []

      const existingIndex =
        existingArray.findIndex(
          (item: {
            id?: string
          }) =>
            item?.id ===
            dish.id,
        )

      const cartItem = {
        id: dish.id,
        name: dish.name,
        description:
          dish.description,
        price: dish.price,
        image: dish.image,
        category:
          dish.category,
        quantity:
          nextQuantity,
      }

      if (
        existingIndex >= 0
      ) {
        existingArray[
          existingIndex
        ] = cartItem
      } else {
        existingArray.push(
          cartItem,
        )
      }

      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(
          existingArray,
        ),
      )

      window.dispatchEvent(
        new Event(
          'foodflow-cart-updated',
        ),
      )
    } catch {
      // Keep UI state working if storage is unavailable.
    }

    window.setTimeout(
      () => setAddedId(null),
      1000,
    )
  }

  function clearFilters() {
    setSearch('')
    setCategory('All')
    setSort('popular')
    setRating('all')
    setMaxPrice('all')
    setDelivery('all')
    setVegetarian(false)
  }

  const hasFilters =
    Boolean(search.trim()) ||
    category !== 'All' ||
    rating !== 'all' ||
    maxPrice !== 'all' ||
    delivery !== 'all' ||
    vegetarian

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
          Popular Dishes
        </span>
      </nav>

      {/* Hero */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-navy shadow-card">
        <div className="grid items-center lg:grid-cols-[1fr_0.8fr]">
          <div className="px-6 py-9 sm:px-10 sm:py-11">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85">
              <Star className="size-4 text-teal" />
              Customer favorites
            </span>

            <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Popular dishes,
              <br />
              <span className="text-teal">
                ready to order
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Discover the dishes FoodFlow customers
              are loving right now. Search, filter and
              add your favorites directly to your cart.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                {DISHES.length}+ dishes
              </span>

              <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                Top rated
              </span>

              <span className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white">
                Fast delivery
              </span>
            </div>
          </div>

          <div className="relative min-h-[230px] lg:min-h-[315px]">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop"
              alt="Popular FoodFlow dishes"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <div className="-mx-1 mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2 px-1">
          {CATEGORY_OPTIONS.map(
            (item) => {
              const active =
                category === item

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setCategory(
                      item,
                    )
                  }
                  className={[
                    'rounded-full border px-4 py-2 text-sm font-semibold transition',
                    active
                      ? 'border-brand bg-brand text-brand-foreground'
                      : 'border-border bg-card hover:border-brand/40 hover:bg-brand-muted',
                  ].join(' ')}
                >
                  {item}
                </button>
              )
            },
          )}
        </div>
      </div>

      {/* Search + Filters */}
      <section className="mt-4 rounded-2xl border border-border bg-card p-3 shadow-card sm:p-4">
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
              placeholder="Search dishes, restaurants..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch('')
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileFilters(
                true,
              )
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>

          {/* Desktop */}
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
              value={maxPrice}
              onChange={setMaxPrice}
              options={[
                ['all', 'Any price'],
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
              value={delivery}
              onChange={setDelivery}
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
                checked={vegetarian}
                onChange={(
                  event,
                ) =>
                  setVegetarian(
                    event.target
                      .checked,
                  )
                }
                className="size-4 accent-[var(--brand)]"
              />

              Vegetarian
            </label>
          </div>

          {/* Sort */}
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

      {/* Active filters */}
      {hasFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-muted-foreground">
            Active:
          </span>

          {category !== 'All' && (
            <FilterChip
              label={category}
              onRemove={() =>
                setCategory('All')
              }
            />
          )}

          {rating !== 'all' && (
            <FilterChip
              label={`${rating}+ rating`}
              onRemove={() =>
                setRating('all')
              }
            />
          )}

          {maxPrice !==
            'all' && (
            <FilterChip
              label={`Up to ${money(
                Number(maxPrice),
              )}`}
              onRemove={() =>
                setMaxPrice(
                  'all',
                )
              }
            />
          )}

          {delivery !==
            'all' && (
            <FilterChip
              label={`Under ${delivery} min`}
              onRemove={() =>
                setDelivery(
                  'all',
                )
              }
            />
          )}

          {vegetarian && (
            <FilterChip
              label="Vegetarian"
              onRemove={() =>
                setVegetarian(
                  false,
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
            onClick={
              clearFilters
            }
            className="ml-1 font-bold text-brand hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results */}
      <section className="mt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Fresh picks
            </p>

            <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
              Popular dishes
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {filteredDishes.length}{' '}
              dishes matching your preferences.
            </p>
          </div>

          <span className="text-sm text-muted-foreground">
            {filteredDishes.length}{' '}
            results
          </span>
        </div>

        {filteredDishes.length ===
        0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center shadow-card">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-muted text-brand">
              <Search className="size-6" />
            </div>

            <h3 className="mt-4 font-display text-xl font-extrabold">
              No dishes found
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
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDishes.map(
              (dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  quantity={
                    quantities[
                      dish.id
                    ] ?? 0
                  }
                  favorite={Boolean(
                    favorites[
                      dish.id
                    ],
                  )}
                  added={
                    addedId ===
                    dish.id
                  }
                  onFavorite={() =>
                    setFavorites(
                      (current) => ({
                        ...current,
                        [dish.id]:
                          !current[
                            dish.id
                          ],
                      }),
                    )
                  }
                  onAdd={() =>
                    addToCart(
                      dish,
                    )
                  }
                />
              ),
            )}
          </div>
        )}
      </section>

      {/* Restaurant discovery */}
      <section className="mt-12 rounded-3xl bg-brand-muted/45 p-5 sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Explore more
            </p>

            <h2 className="mt-1 font-display text-2xl font-extrabold">
              Want to see the full menu?
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Visit the restaurant page to explore its complete menu
              and build your order.
            </p>
          </div>

          <Link
            href="/restaurant/the-burger-house"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-brand-foreground"
          >
            View Restaurant
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Mobile filters */}
      {mobileFilters && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
          onClick={() =>
            setMobileFilters(
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
                label="Minimum rating"
                value={rating}
                onChange={setRating}
                options={[
                  ['all', 'All ratings'],
                  ['4.5', '4.5+'],
                  ['4.7', '4.7+'],
                  ['4.8', '4.8+'],
                ]}
              />

              <MobileSelect
                label="Price"
                value={maxPrice}
                onChange={
                  setMaxPrice
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

              <MobileSelect
                label="Delivery"
                value={delivery}
                onChange={
                  setDelivery
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

              <label className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold">
                Vegetarian only

                <input
                  type="checkbox"
                  checked={
                    vegetarian
                  }
                  onChange={(
                    event,
                  ) =>
                    setVegetarian(
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

/* -------------------------------------------------
   Dish Card
------------------------------------------------- */

function DishCard({
  dish,
  quantity,
  favorite,
  added,
  onFavorite,
  onAdd,
}: {
  dish: Dish
  quantity: number
  favorite: boolean
  added: boolean
  onFavorite: () => void
  onAdd: () => void
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-36 overflow-hidden sm:h-44">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <div>
            {dish.badge && (
              <span className="inline-flex rounded-md bg-teal px-2.5 py-1 text-[10px] font-bold text-teal-foreground shadow-sm">
                {dish.badge}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={
              onFavorite
            }
            aria-label={`${favorite ? 'Remove' : 'Add'} ${dish.name} ${favorite ? 'from' : 'to'} favorites`}
            className={[
              'grid size-8 place-items-center rounded-full backdrop-blur',
              favorite
                ? 'bg-white text-red-500'
                : 'bg-white/90 text-foreground hover:text-brand',
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
      </div>

      <div className="p-3.5 sm:p-4">
        <div className="min-h-[76px]">
          <h3 className="font-display text-sm font-extrabold leading-snug sm:text-base">
            {dish.name}
          </h3>

          <p className="mt-1 text-[11px] font-medium text-muted-foreground">
            {dish.restaurant}
          </p>

          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {dish.description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-display text-sm font-extrabold text-brand sm:text-base">
            {money(dish.price)}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="size-3 fill-[#f6b41f] text-[#f6b41f]" />
            {dish.rating}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Clock3 className="size-3.5" />

          <span>
            {dish.deliveryTime}–
            {dish.deliveryTime + 5}{' '}
            min
          </span>

          <span>•</span>

          <span>
            {dish.category}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">
            {quantity > 0
              ? `${quantity} in cart`
              : 'Ready to order'}
          </span>

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex min-w-[76px] items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-bold text-brand-foreground transition hover:bg-brand/90"
          >
            {added
              ? 'Added'
              : 'Add'}

            {!added && (
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
   Filter Select
------------------------------------------------- */

function FilterSelect({
  value,
  onChange,
  options,
}: {
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

/* -------------------------------------------------
   Mobile Select
------------------------------------------------- */

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
  options: [
    string,
    string,
  ][]
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