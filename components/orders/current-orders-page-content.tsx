'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bike,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  Edit3,
  Headphones,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Utensils,
  WalletCards,
} from 'lucide-react'

type OrderStatus =
  | 'Preparing'
  | 'On the Way'
  | 'Confirmed'
  | 'Delivered'

type CurrentOrder = {
  id: string
  restaurant: string
  shortName: string
  date: string
  time: string
  status: OrderStatus
  total: number
  address: string
  payment: string
  eta: string
  etaColor: 'amber' | 'blue' | 'teal'
  items: string[]
  extraItems: number
  progress: number
  firstImage: string
}

const CURRENT_ORDERS: CurrentOrder[] = [
  {
    id: '#FF78492',
    restaurant: 'Optp Pizza',
    shortName: 'OPTP',
    date: 'May 10, 2024',
    time: '12:30 PM',
    status: 'Preparing',
    total: 2350,
    address:
      'Hostel 5, Room 213, University of Malakand, Chakdara',
    payment: 'Cash on Delivery',
    eta: '1:05 PM – 1:20 PM',
    etaColor: 'amber',
    items: [
      '2 x Large Chicken Fajita Pizza',
      '1 x Garlic Bread',
      '1 x 1.5L Drink',
    ],
    extraItems: 1,
    progress: 2,
    firstImage:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '#FF78411',
    restaurant: 'Kababjees',
    shortName: 'KB',
    date: 'May 10, 2024',
    time: '11:45 AM',
    status: 'On the Way',
    total: 1480,
    address:
      'Hostel 5, Room 213, University of Malakand, Chakdara',
    payment: 'JazzCash',
    eta: '12:50 PM – 1:05 PM',
    etaColor: 'blue',
    items: [
      '1 x Chicken Seekh Kabab (3pcs)',
      '1 x Chicken Biryani',
      '1 x Raita',
    ],
    extraItems: 1,
    progress: 3,
    firstImage:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '#FF78355',
    restaurant: 'Pizza Max',
    shortName: 'PM',
    date: 'May 10, 2024',
    time: '10:20 AM',
    status: 'Confirmed',
    total: 1250,
    address:
      'Hostel 5, Room 213, University of Malakand, Chakdara',
    payment: 'Easypaisa',
    eta: '12:30 PM – 12:45 PM',
    etaColor: 'teal',
    items: [
      '1 x Medium Pepperoni Pizza',
      '1 x Cheesy Fries',
    ],
    extraItems: 1,
    progress: 1,
    firstImage:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '#FF78221',
    restaurant: "Kooter's Fried Chicken",
    shortName: "KOOTER'S",
    date: 'May 9, 2024',
    time: '08:15 PM',
    status: 'Preparing',
    total: 990,
    address:
      'Hostel 5, Room 213, University of Malakand, Chakdara',
    payment: 'Cash on Delivery',
    eta: '9:15 PM – 9:30 PM',
    etaColor: 'amber',
    items: [
      '1 x Breast Chicken (2pcs)',
      '1 x Fries',
      '1 x Coleslaw',
    ],
    extraItems: 1,
    progress: 2,
    firstImage:
      'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop',
  },
]

const RECOMMENDED = [
  {
    name: 'Pepperoni Pizza',
    restaurant: 'Pizza Max',
    price: 1050,
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Zinger Burger',
    restaurant: 'Kababjees',
    price: 690,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Chicken Biryani',
    restaurant: 'Kababjees',
    price: 650,
    image:
      'https://images.unsplash.com/photo-1631515242808-497c3c5d5b36?q=80&w=400&auto=format&fit=crop',
  },
]

export function CurrentOrdersPageContent() {
  const [activeFilter, setActiveFilter] =
    useState<'All Active' | 'Preparing' | 'On the Way' | 'Delivered Recently'>(
      'All Active',
    )

  const [showPaymentMenu, setShowPaymentMenu] =
    useState(false)

  const visibleOrders = useMemo(() => {
    if (activeFilter === 'All Active') {
      return CURRENT_ORDERS
    }

    if (activeFilter === 'Preparing') {
      return CURRENT_ORDERS.filter(
        (order) => order.status === 'Preparing',
      )
    }

    if (activeFilter === 'On the Way') {
      return CURRENT_ORDERS.filter(
        (order) => order.status === 'On the Way',
      )
    }

    return []
  }, [activeFilter])

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground"
      >
        <Link
          href="/"
          className="hover:text-foreground"
        >
          Home
        </Link>

        <ChevronRight className="size-4" />

        <span className="font-medium text-foreground">
          Current Orders
        </span>
      </nav>

      {/* Heading */}
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Current Orders
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Track your active food orders
          </p>
        </div>

        <Link
          href="/my-orders"
          className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:underline"
        >
          View Order History
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-1 shadow-card sm:p-1.5">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
          {[
            'All Active',
            'Preparing',
            'On the Way',
            'Delivered Recently',
          ].map((filter) => {
            const active =
              activeFilter === filter

            return (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  setActiveFilter(
                    filter as typeof activeFilter,
                  )
                }
                className={[
                  'flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition sm:text-sm',
                  active
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-muted-foreground hover:bg-muted',
                ].join(' ')}
              >
                {filter === 'All Active' && (
                  <ShoppingBag className="size-4" />
                )}

                {filter === 'Preparing' && (
                  <Utensils className="size-4" />
                )}

                {filter === 'On the Way' && (
                  <Bike className="size-4" />
                )}

                {filter === 'Delivered Recently' && (
                  <PackageCheck className="size-4" />
                )}

                {filter}
              </button>
            )
          })}
        </div>
      </section>

      {/* Layout */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_295px]">
        {/* Orders */}
        <section className="space-y-4">
          {visibleOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center shadow-card">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-teal-50 text-teal-600">
                <PackageCheck className="size-6" />
              </div>

              <h2 className="mt-4 font-display text-xl font-extrabold">
                No orders in this section
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no orders matching this filter right now.
              </p>

              <button
                type="button"
                onClick={() =>
                  setActiveFilter(
                    'All Active',
                  )
                }
                className="mt-5 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white"
              >
                View All Active
              </button>
            </div>
          ) : (
            visibleOrders.map((order) => (
              <CurrentOrderCard
                key={order.id}
                order={order}
              />
            ))
          )}

          {/* Recommended */}
          <section className="pt-2">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                  Just for you
                </p>

                <h2 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
                  Recommended For You
                </h2>
              </div>

              <Link
                href="/categories"
                className="text-xs font-bold text-teal-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {RECOMMENDED.map(
                (item) => (
                  <RecommendedCard
                    key={item.name}
                    {...item}
                  />
                ),
              )}
            </div>
          </section>
        </section>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          {/* Stats */}
          <section className="grid grid-cols-3 gap-2">
            <MiniStat
              number="4"
              label="Active Orders"
              icon={ShoppingBag}
              variant="teal"
            />

            <MiniStat
              number="2"
              label="Preparing"
              icon={Utensils}
              variant="amber"
            />

            <MiniStat
              number="1"
              label="On-the-Way"
              icon={Bike}
              variant="blue"
            />
          </section>

          {/* Delivery Address */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-teal-600" />

                <h2 className="font-display text-base font-extrabold">
                  Delivery Address
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(
                    'Address editor will open here.',
                  )
                }
                className="text-xs font-bold text-teal-600 hover:underline"
              >
                Edit
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Hostel 5, Room 213,
              <br />
              University of Malakand,
              <br />
              Chakdara, Dir Lower,
              <br />
              Khyber Pakhtunkhwa
              <br />
              Pakistan
            </p>

            <div className="mt-5 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">
                  Payment Methods
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setShowPaymentMenu(
                      !showPaymentMenu,
                    )
                  }
                  className="text-xs font-bold text-teal-600 hover:underline"
                >
                  Manage
                </button>
              </div>

              <div className="mt-3 space-y-3">
                <PaymentMethod
                  icon={<WalletCards className="size-5" />}
                  name="Cash on Delivery"
                  active
                />

                <PaymentMethod
                  icon={<CreditCard className="size-5" />}
                  name="JazzCash"
                />

                <PaymentMethod
                  icon={<CreditCard className="size-5" />}
                  name="EasyPaisa"
                />
              </div>

              {showPaymentMenu && (
                <div className="mt-3 rounded-lg border border-teal-600/20 bg-teal-50 px-3 py-2 text-xs text-muted-foreground">
                  Payment management is ready to connect
                  with your payment profile.
                </div>
              )}
            </div>
          </section>

          {/* Help */}
          <section className="rounded-2xl border border-teal-600/15 bg-teal-50 p-5">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-card text-teal-600">
                <Headphones className="size-5" />
              </div>

              <div>
                <h2 className="font-display text-base font-extrabold">
                  Need Help?
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  If you have any issues with your order,
                  our support team is here to help you.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-teal-600 bg-card px-4 py-2.5 text-sm font-bold text-teal-600 transition hover:bg-teal-50"
            >
              Contact Support
              <ArrowRight className="size-4" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Current Order Card
------------------------------------------------- */

function CurrentOrderCard({
  order,
}: {
  order: CurrentOrder
}) {
  const statusStyles = {
    Preparing:
      'bg-amber-50 text-amber-600',
    'On the Way':
      'bg-blue-50 text-blue-600',
    Confirmed:
      'bg-teal-50 text-teal-600',
    Delivered:
      'bg-teal-50 text-teal-600',
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="p-4 sm:p-5">
        {/* Top */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-navy text-2xl text-white">
              {order.shortName}
            </div>

            <div>
              <h2 className="font-display text-base font-extrabold sm:text-lg">
                {order.restaurant}
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Order ID:{' '}
                <span className="font-semibold text-foreground">
                  {order.id}
                </span>
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {order.date}
                <span>•</span>
                {order.time}
              </p>
            </div>
          </div>

          <span
            className={[
              'w-fit rounded-lg px-3 py-1.5 text-xs font-bold',
              statusStyles[order.status],
            ].join(' ')}
          >
            {order.status}
          </span>
        </div>

        {/* Progress */}
        <OrderProgress
          currentStep={order.progress}
        />

        {/* Details */}
        <div className="mt-4 grid gap-4 border-t border-border pt-4 lg:grid-cols-[1.1fr_0.8fr_0.9fr]">
          {/* Items */}
          <div className="flex gap-3">
            <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
              <img
                src={order.firstImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 text-xs leading-5 text-muted-foreground">
              {order.items.map(
                (item) => (
                  <p
                    key={item}
                    className="truncate"
                  >
                    {item}
                  </p>
                ),
              )}

              {order.extraItems > 0 && (
                <p className="font-semibold text-teal-600">
                  + {order.extraItems} more item
                </p>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <InfoLine
              icon={WalletCards}
              label="Total Amount"
              value={`PKR ${order.total.toLocaleString('en-PK')}`}
            />

            <div className="mt-3">
              <InfoLine
                icon={CreditCard}
                label="Payment Method"
                value={order.payment}
              />
            </div>
          </div>

          {/* Delivery */}
          <div className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <InfoLine
              icon={MapPin}
              label="Delivery Address"
              value={order.address}
            />

            <div className="mt-3">
              <InfoLine
                icon={Clock3}
                label="Est. Delivery"
                value={order.eta}
                teal
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
          <Link
            href="/checkout/tracking"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-teal-600 px-4 py-2.5 text-sm font-bold text-teal-600 transition hover:bg-teal-50"
          >
            <MapPin className="size-4" />
            Track Order
          </Link>

          <button
            type="button"
            onClick={() =>
              alert(
                `Order ${order.id} details will open here.`,
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-navy/90"
          >
            View Details
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------
   Order Progress
------------------------------------------------- */

function OrderProgress({
  currentStep,
}: {
  currentStep: number
}) {
  const steps = [
    {
      label: 'Confirmed',
      icon: Check,
      time: '12:30 PM',
    },
    {
      label: 'Preparing',
      icon: Utensils,
      time: '12:40 PM',
    },
    {
      label: 'On the Way',
      icon: Bike,
      time: '11:05 AM',
    },
    {
      label: 'Delivered',
      icon: PackageCheck,
      time: '',
    },
  ]

  return (
    <div className="mt-5 overflow-x-auto pb-1">
      <div className="flex min-w-[600px] items-start">
        {steps.map((step, index) => {
          const Icon = step.icon

          const stepNumber =
            index + 1

          const completed =
            stepNumber <
            currentStep

          const active =
            stepNumber ===
            currentStep

          return (
            <div
              key={step.label}
              className="flex flex-1 items-start"
            >
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={[
                    'grid size-9 place-items-center rounded-full border-2',
                    completed
                      ? 'border-teal-600 bg-teal-600 text-white'
                      : active
                        ? 'border-amber-500 bg-amber-50 text-amber-600'
                        : 'border-border bg-card text-muted-foreground',
                  ].join(' ')}
                >
                  <Icon className="size-4" />
                </div>

                <p
                  className={[
                    'mt-2 text-center text-[11px] font-medium',
                    completed ||
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {step.label}
                </p>

                {step.time && (
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {step.time}
                  </p>
                )}
              </div>

              {index <
                steps.length - 1 && (
                <div
                  className={[
                    'mt-4 h-0.5 flex-1 rounded-full',
                    stepNumber <
                    currentStep
                      ? 'bg-teal-600'
                      : stepNumber ===
                          currentStep
                        ? 'bg-amber-400'
                        : 'bg-border',
                  ].join(' ')}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Info Line
------------------------------------------------- */

function InfoLine({
  icon: Icon,
  label,
  value,
  teal = false,
}: {
  icon: typeof WalletCards
  label: string
  value: string
  teal?: boolean
}) {
  return (
    <div className="flex gap-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p
          className={[
            'mt-0.5 line-clamp-2 text-xs font-semibold',
            teal
              ? 'text-teal-600'
              : 'text-foreground',
          ].join(' ')}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Mini Stat
------------------------------------------------- */

function MiniStat({
  number,
  label,
  icon: Icon,
  variant,
}: {
  number: string
  label: string
  icon: typeof ShoppingBag
  variant: 'teal' | 'amber' | 'blue'
}) {
  const styles = {
    teal: {
      wrapper: 'bg-teal-50',
      icon: 'bg-teal-100 text-teal-600',
    },
    amber: {
      wrapper: 'bg-amber-50',
      icon: 'bg-amber-100 text-amber-600',
    },
    blue: {
      wrapper: 'bg-blue-50',
      icon: 'bg-blue-100 text-blue-600',
    },
  }

  return (
    <div
      className={[
        'rounded-2xl border border-border p-3 text-center shadow-card sm:p-4',
        styles[variant].wrapper,
      ].join(' ')}
    >
      <div
        className={[
          'mx-auto grid size-10 place-items-center rounded-full',
          styles[variant].icon,
        ].join(' ')}
      >
        <Icon className="size-5" />
      </div>

      <p className="mt-2 font-display text-xl font-extrabold sm:text-2xl">
        {number}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
        {label}
      </p>
    </div>
  )
}

/* -------------------------------------------------
   Payment Method
------------------------------------------------- */

function PaymentMethod({
  icon,
  name,
  active = false,
}: {
  icon: React.ReactNode
  name: string
  active?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-teal-600">
        {icon}
      </span>

      <span className="flex-1 text-sm text-muted-foreground">
        {name}
      </span>

      {active && (
        <span className="grid size-5 place-items-center rounded-full bg-teal-600 text-white">
          <Check className="size-3" />
        </span>
      )}
    </div>
  )
}

/* -------------------------------------------------
   Recommended Card
------------------------------------------------- */

function RecommendedCard({
  name,
  restaurant,
  price,
  image,
}: {
  name: string
  restaurant: string
  price: number
  image: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="h-28 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-extrabold">
          {name}
        </h3>

        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {restaurant}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm font-extrabold text-teal-600">
            PKR {price.toLocaleString('en-PK')}
          </span>

          <Link
            href="/restaurant/the-burger-house"
            className="inline-flex items-center gap-1 rounded-lg border border-teal-600 px-2.5 py-1.5 text-[11px] font-bold text-teal-600 hover:bg-teal-50"
          >
            Order Again
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}