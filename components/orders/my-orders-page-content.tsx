'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bike,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  HelpCircle,
  MapPin,
  PackageCheck,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

const ORDERS = [
  {
    id: '#FF67489256',
    restaurant: 'The Burger House',
    restaurantSlug: 'the-burger-house',
    emoji: '🍔',
    logoClass: 'bg-black',
    status: 'Delivered',
    statusType: 'completed',
    date: '19 May 2024, 10:42 AM',
    statusDate: 'Delivered on 19 May',
    statusTime: '11:32 AM',
    total: 1477,
    itemsCount: 5,
    items: [
      {
        name: 'Zinger Burger',
        price: 599,
        quantity: 2,
        image: '/images/home/dish-zinger-burger.png',
      },
      {
        name: 'French Fries',
        price: 199,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Coca Cola',
        price: 120,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  {
    id: '#FF67481234',
    restaurant: 'Pizza Palace',
    restaurantSlug: 'the-burger-house',
    emoji: '🍕',
    logoClass: 'bg-[#111827]',
    status: 'On the Way',
    statusType: 'upcoming',
    date: '18 May 2024, 07:15 PM',
    statusDate: 'Estimated Delivery',
    statusTime: '07:50 PM',
    total: 2245,
    itemsCount: 4,
    items: [
      {
        name: 'Fajita Pizza',
        price: 1099,
        quantity: 1,
        image: '/images/home/dish-fajita-pizza.png',
      },
      {
        name: 'Chicken Pizza',
        price: 999,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Garlic Bread',
        price: 199,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  {
    id: '#FF67475621',
    restaurant: 'Wok & Roll',
    restaurantSlug: 'the-burger-house',
    emoji: '🍜',
    logoClass: 'bg-black',
    status: 'Completed',
    statusType: 'completed',
    date: '17 May 2024, 01:20 PM',
    statusDate: 'Delivered on 17 May',
    statusTime: '01:58 PM',
    total: 1195,
    itemsCount: 3,
    items: [
      {
        name: 'Chicken Rice Bowl',
        price: 620,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Chicken Wings',
        price: 450,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1608039755401-742486f3f9e5?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Coca Cola',
        price: 120,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  {
    id: '#FF67461235',
    restaurant: 'Coffee Corner',
    restaurantSlug: 'the-burger-house',
    emoji: '☕',
    logoClass: 'bg-[#4b2e20]',
    status: 'Completed',
    statusType: 'completed',
    date: '16 May 2024, 09:30 AM',
    statusDate: 'Delivered on 16 May',
    statusTime: '09:55 AM',
    total: 845,
    itemsCount: 3,
    items: [
      {
        name: 'Cold Coffee',
        price: 380,
        quantity: 1,
        image: '/images/home/dish-cold-coffee.png',
      },
      {
        name: 'Chocolate Brownie',
        price: 299,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Coca Cola',
        price: 120,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  {
    id: '#FF67451233',
    restaurant: 'Spice India',
    restaurantSlug: 'the-burger-house',
    emoji: '🔥',
    logoClass: 'bg-[#c2410c]',
    status: 'Cancelled',
    statusType: 'cancelled',
    date: '15 May 2024, 08:10 PM',
    statusDate: 'Cancelled on 15 May',
    statusTime: '08:25 PM',
    total: 1380,
    itemsCount: 3,
    items: [
      {
        name: 'Chicken Biryani',
        price: 450,
        quantity: 1,
        image: '/images/home/dish-chicken-biryani.png',
      },
      {
        name: 'Chicken Tikka',
        price: 520,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Garlic Naan',
        price: 180,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  {
    id: '#FF67441221',
    restaurant: 'Sushi World',
    restaurantSlug: 'the-burger-house',
    emoji: '🍣',
    logoClass: 'bg-black',
    status: 'Completed',
    statusType: 'completed',
    date: '14 May 2024, 12:45 PM',
    statusDate: 'Delivered on 14 May',
    statusTime: '01:20 PM',
    total: 2760,
    itemsCount: 5,
    items: [
      {
        name: 'Salmon Sushi',
        price: 890,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'California Roll',
        price: 720,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Chicken Gyoza',
        price: 560,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1496116218417-1b9d4f62b5c4?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  {
    id: '#FF67431215',
    restaurant: 'BBQ Grill',
    restaurantSlug: 'the-burger-house',
    emoji: '🥩',
    logoClass: 'bg-black',
    status: 'Completed',
    statusType: 'completed',
    date: '13 May 2024, 07:00 PM',
    statusDate: 'Delivered on 13 May',
    statusTime: '07:45 PM',
    total: 2760,
    itemsCount: 5,
    items: [
      {
        name: 'BBQ Platter',
        price: 1250,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Chicken Wings',
        price: 450,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1608039755401-742486f3f9e5?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Steak Bites',
        price: 890,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
  {
    id: '#FF67421211',
    restaurant: 'Sandwich Express',
    restaurantSlug: 'the-burger-house',
    emoji: '🥪',
    logoClass: 'bg-[#14532d]',
    status: 'Completed',
    statusType: 'completed',
    date: '12 May 2024, 11:25 AM',
    statusDate: 'Delivered on 12 May',
    statusTime: '11:50 AM',
    total: 960,
    itemsCount: 3,
    items: [
      {
        name: 'Club Sandwich',
        price: 450,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Chicken Sandwich',
        price: 380,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Fries',
        price: 199,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=300&auto=format&fit=crop',
      },
    ],
  },
]

type OrderTab =
  | 'All Orders'
  | 'Upcoming'
  | 'Completed'
  | 'Cancelled'

const tabs: OrderTab[] = [
  'All Orders',
  'Upcoming',
  'Completed',
  'Cancelled',
]

export function MyOrdersPageContent() {
  const [activeTab, setActiveTab] =
    useState<OrderTab>('All Orders')

  const [search, setSearch] =
    useState('')

  const [page, setPage] =
    useState(1)

  const perPage = 8

  const filteredOrders =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase()

      return ORDERS.filter((order) => {
        const matchesTab =
          activeTab === 'All Orders' ||
          (activeTab === 'Upcoming' &&
            order.statusType === 'upcoming') ||
          (activeTab === 'Completed' &&
            order.statusType === 'completed') ||
          (activeTab === 'Cancelled' &&
            order.statusType === 'cancelled')

        const matchesSearch =
          !query ||
          order.restaurant
            .toLowerCase()
            .includes(query) ||
          order.id
            .toLowerCase()
            .includes(query)

        return (
          matchesTab &&
          matchesSearch
        )
      })
    }, [activeTab, search])

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length / perPage,
    ),
  )

  const visibleOrders =
    filteredOrders.slice(
      (page - 1) * perPage,
      page * perPage,
    )

  function changeTab(tab: OrderTab) {
    setActiveTab(tab)
    setPage(1)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  const totalOrders = 24
  const completed = 18
  const upcoming = 3
  const cancelled = 3

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="hover:text-brand"
        >
          Home
        </Link>

        <ChevronRightIcon />

        <span className="font-medium text-foreground">
          My Orders
        </span>
      </nav>

      {/* Heading */}
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Track, view and reorder your past and upcoming orders.
          </p>
        </div>
      </div>

      {/* Tabs + Search */}
      <section className="mt-5">
        <div className="flex flex-col gap-3 border-b border-border lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 gap-6 overflow-x-auto">
            {tabs.map((tab) => {
              const active =
                activeTab === tab

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() =>
                    changeTab(tab)
                  }
                  className={[
                    'relative whitespace-nowrap px-1 pb-3 text-sm font-medium transition',
                    active
                      ? 'font-bold text-brand'
                      : 'text-foreground hover:text-brand',
                  ].join(' ')}
                >
                  {tab}

                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mb-2 flex gap-3 lg:mb-2">
            <div className="relative min-w-0 flex-1 lg:w-[260px] lg:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                value={search}
                onChange={(event) =>
                  handleSearch(
                    event.target.value,
                  )
                }
                placeholder="Search your orders..."
                className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-9 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    handleSearch('')
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand"
                  aria-label="Clear order search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveTab('All Orders')
              }
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-brand px-4 text-sm font-bold text-brand transition hover:bg-brand-muted"
            >
              <Filter className="size-4" />
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        {/* Orders */}
        <section>
          <div className="space-y-3">
            {visibleOrders.length === 0 ? (
              <EmptyOrders />
            ) : (
              visibleOrders.map(
                (order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                  />
                ),
              )
            )}
          </div>

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Showing{' '}
                {Math.min(
                  (page - 1) * perPage + 1,
                  filteredOrders.length,
                )}
                {' to '}
                {Math.min(
                  page * perPage,
                  filteredOrders.length,
                )}
                {' of '}
                {filteredOrders.length} orders
              </p>

              <div className="flex items-center gap-2">
                <PaginationButton
                  disabled={page === 1}
                  onClick={() =>
                    setPage(
                      (current) =>
                        current - 1,
                    )
                  }
                  ariaLabel="Previous page"
                >
                  <ChevronLeft className="size-4" />
                </PaginationButton>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) =>
                    index + 1,
                ).map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() =>
                      setPage(number)
                    }
                    className={[
                      'grid size-9 place-items-center rounded-lg text-sm font-bold',
                      page === number
                        ? 'bg-brand text-brand-foreground'
                        : 'border border-border bg-card hover:bg-brand-muted',
                    ].join(' ')}
                  >
                    {number}
                  </button>
                ))}

                <PaginationButton
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1,
                    )
                  }
                  ariaLabel="Next page"
                >
                  <ChevronRight className="size-4" />
                </PaginationButton>
              </div>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          {/* Order Summary */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h2 className="font-display text-lg font-extrabold">
              Order Summary
            </h2>

            <div className="mt-5 space-y-5">
              <SummaryStat
                icon={PackageCheck}
                label="Total Orders"
                value={totalOrders}
              />

              <SummaryStat
                icon={Check}
                label="Completed"
                value={completed}
                accent
              />

              <SummaryStat
                icon={Clock3}
                label="Upcoming"
                value={upcoming}
                color="blue"
              />

              <SummaryStat
                icon={X}
                label="Cancelled"
                value={cancelled}
                color="red"
              />
            </div>
          </section>

          {/* Reorder CTA */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="relative h-32 overflow-hidden bg-brand-muted">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-muted to-white/30" />

              <div className="absolute bottom-[-8px] right-5 text-6xl">
                🛵
              </div>

              <div className="absolute left-4 top-4">
                <div className="grid size-9 place-items-center rounded-full bg-brand text-brand-foreground">
                  <RefreshCw className="size-4" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-display text-lg font-extrabold">
                Craving something again?
              </h3>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                Reorder your favorites in just one click!
              </p>

              <Link
                href="/categories"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground transition hover:bg-brand/90"
              >
                Explore Restaurants
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>

          {/* Recent Searches */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-extrabold">
                Recent Searches
              </h3>

              <button
                type="button"
                onClick={() =>
                  handleSearch('')
                }
                className="text-xs font-semibold text-red-500 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {[
                'Burger',
                'Pizza',
                'Biryani',
                'Coffee',
                'Pasta',
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    handleSearch(item)
                  }
                  className="flex w-full items-center gap-3 text-left text-sm text-foreground/80 hover:text-brand"
                >
                  <Search className="size-4 text-muted-foreground" />
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Need Help */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="font-display text-lg font-extrabold">
              Need Help?
            </h3>

            <div className="mt-4 space-y-4">
              <HelpLink
                icon={MapPin}
                title="Track Your Order"
                text="Real-time updates"
                href="/checkout/tracking"
              />

              <HelpLink
                icon={RefreshCw}
                title="Return & Refund"
                text="Easy return policy"
                href="/contact"
              />

              <HelpLink
                icon={HelpCircle}
                title="View Help Center"
                text="Find answers to common questions"
                href="/contact"
              />

              <HelpLink
                icon={Phone}
                title="Contact Support"
                text="We're here to help you 24/7"
                href="/contact"
              />
            </div>
          </section>
        </aside>
      </div>

      {/* Bottom Benefits */}
      <section className="mt-5 rounded-2xl border border-border bg-brand-muted/30 p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Benefit
            icon={Bike}
            title="Fast Delivery"
            text="Quick delivery at your doorstep"
          />

          <Benefit
            icon={Sparkles}
            title="Best Quality"
            text="Fresh & hygienic food for you"
          />

          <Benefit
            icon={RefreshCw}
            title="Easy Returns"
            text="Hassle-free order or cancellation"
          />

          <Benefit
            icon={ShieldCheck}
            title="Secure Payments"
            text="100% safe & secure payments"
          />
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------
   Order Card
------------------------------------------------- */

function OrderCard({
  order,
}: {
  order: (typeof ORDERS)[number]
}) {
  function handleReorder() {
    try {
      const existingRaw =
        window.localStorage.getItem(
          'foodflow-cart',
        )

      const existing = existingRaw
        ? JSON.parse(existingRaw)
        : []

      const byId = new Map<
        string,
        {
          id: string
          name: string
          description: string
          price: number
          image: string
          category: string
          quantity: number
        }
      >()

      if (Array.isArray(existing)) {
        existing.forEach((item) => {
          if (item?.id) {
            byId.set(item.id, item)
          }
        })
      }

      order.items.forEach((item) => {
        const id = `reorder-${item.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')}`

        const current = Array.from(
          byId.values(),
        ).find(
          (entry) =>
            entry.name === item.name,
        )

        byId.set(id, {
          id,
          name: item.name,
          description:
            `Reordered from ${order.restaurant}`,
          price: item.price,
          image: item.image,
          category: 'reorder',
          quantity:
            (current?.quantity ?? 0) +
            item.quantity,
        })
      })

      window.localStorage.setItem(
        'foodflow-cart',
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

      window.location.href = '/cart'
    } catch {
      window.location.href = '/cart'
    }
  }

  const statusStyle =
    order.statusType === 'cancelled'
      ? 'bg-red-50 text-red-600'
      : order.statusType === 'upcoming'
        ? 'bg-blue-50 text-blue-600'
        : 'bg-brand-muted text-brand'

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-card transition hover:shadow-md sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(260px,1.25fr)_minmax(190px,0.9fr)_minmax(185px,0.8fr)_90px_105px] lg:items-center">
        {/* Restaurant */}
        <div className="flex min-w-0 gap-4">
          <div
            className={`grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl ${order.logoClass}`}
          >
            <span className="text-4xl">
              {order.emoji}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-lg font-extrabold">
              {order.restaurant}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Order ID:{' '}
              <span className="font-medium text-foreground">
                {order.id}
              </span>
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {order.date}
            </p>
          </div>
        </div>

        {/* Status */}
        <div>
          <span
            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusStyle}`}
          >
            {order.status}
          </span>

          <p className="mt-2 text-xs text-muted-foreground">
            {order.statusDate}
          </p>

          <p className="mt-1 text-xs font-semibold text-foreground">
            {order.statusTime}
          </p>
        </div>

        {/* Items */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {order.items
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.name}
                  className="size-10 overflow-hidden rounded-lg border-2 border-card bg-muted"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}

            {order.itemsCount > 3 && (
              <span className="grid size-10 place-items-center rounded-lg border-2 border-card bg-muted text-xs font-bold text-muted-foreground">
                +{order.itemsCount - 3}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-muted-foreground">
            {order.itemsCount} Items
          </span>
        </div>

        {/* Price */}
        <div className="lg:text-right">
          <p className="text-sm font-extrabold">
            PKR{' '}
            {order.total.toLocaleString(
              'en-PK',
            )}
          </p>
        </div>

        {/* Action */}
        <div>
          {order.statusType === 'upcoming' ? (
            <Link
              href="/checkout/tracking"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-400 px-3 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
            >
              <MapPin className="size-3.5" />
              Track Order
            </Link>
          ) : order.statusType === 'cancelled' ? (
            <button
              type="button"
              onClick={handleReorder}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand px-3 py-2.5 text-xs font-bold text-brand transition hover:bg-brand-muted"
            >
              View Details
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReorder}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand px-3 py-2.5 text-xs font-bold text-brand transition hover:bg-brand-muted"
            >
              <RefreshCw className="size-3.5" />
              Reorder
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------
   Summary Stat
------------------------------------------------- */

function SummaryStat({
  icon: Icon,
  label,
  value,
  accent = false,
  color,
}: {
  icon: typeof Check
  label: string
  value: number
  accent?: boolean
  color?: 'blue' | 'red'
}) {
  const iconClass = accent
    ? 'text-brand bg-brand-muted'
    : color === 'blue'
      ? 'text-blue-600 bg-blue-50'
      : color === 'red'
        ? 'text-red-500 bg-red-50'
        : 'text-foreground bg-muted'

  const valueClass = accent
    ? 'text-brand'
    : color === 'blue'
      ? 'text-blue-600'
      : color === 'red'
        ? 'text-red-500'
        : 'text-foreground'

  return (
    <div className="flex items-center gap-3">
      <div
        className={`grid size-10 shrink-0 place-items-center rounded-xl ${iconClass}`}
      >
        <Icon className="size-5" />
      </div>

      <span className="flex-1 text-sm">
        {label}
      </span>

      <span
        className={`text-sm font-extrabold ${valueClass}`}
      >
        {value}
      </span>
    </div>
  )
}

/* -------------------------------------------------
   Help Link
------------------------------------------------- */

function HelpLink({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: typeof MapPin
  title: string
  text: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group flex gap-3"
    >
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-muted text-brand">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold group-hover:text-brand">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
          {text}
        </p>
      </div>
    </Link>
  )
}

/* -------------------------------------------------
   Bottom Benefit
------------------------------------------------- */

function Benefit({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Bike
  title: string
  text: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-card text-brand">
        <Icon className="size-6" />
      </div>

      <div>
        <p className="text-sm font-extrabold">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Empty State
------------------------------------------------- */

function EmptyOrders() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center shadow-card">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-muted text-brand">
        <ShoppingBag className="size-6" />
      </div>

      <h3 className="mt-4 font-display text-xl font-extrabold">
        No orders found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Try changing your search or selecting another order category.
      </p>

      <Link
        href="/categories"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
      >
        Browse Restaurants
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}

function PaginationButton({
  children,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode
  disabled: boolean
  onClick: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className="grid size-9 place-items-center rounded-lg border border-border bg-card text-foreground transition hover:bg-brand-muted hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function ChevronRightIcon() {
  return (
    <ChevronRight className="size-4" />
  )
}
