'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft,  Clock, MapPin } from "lucide-react";
import {
  Bike,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Headphones,
  Home,
  Info,
  MessageCircle,
  PackageCheck,
  Phone,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  UserRound,
} from 'lucide-react'

import { RESTAURANT, type MenuItem } from '@/lib/restaurant'

const CART_STORAGE_KEY = 'foodflow-cart'
const ORDER_STORAGE_KEY = 'foodflow-order'

type CartLine = MenuItem & {
  quantity: number
}

type StoredOrder = {
  id?: string
  restaurant?: string
  items?: CartLine[]
  paymentMethod?: string
  subtotal?: number
  deliveryFee?: number
  serviceFee?: number
  discount?: number
  total?: number
  address?: {
    fullName?: string
    phone?: string
    address?: string
    city?: string
    area?: string
    postalCode?: string
    instructions?: string
  }
  createdAt?: string
  status?: string
}

const DEFAULT_ITEMS: CartLine[] = [
  {
    id: 'b1',
    name: 'Zinger Burger',
    description: 'Crispy zinger fillet with lettuce & mayo',
    price: 599,
    image: '/images/home/dish-zinger-burger.png',
    category: 'burgers',
    quantity: 2,
  },
  {
    id: 'f1',
    name: 'French Fries',
    description: 'Crispy golden fries with salt',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=600&auto=format&fit=crop',
    category: 'fries',
    quantity: 1,
  },
  {
    id: 'c1',
    name: 'Coca Cola',
    description: 'Refreshing cold drink',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?q=80&w=600&auto=format&fit=crop',
    category: 'drinks',
    quantity: 1,
  },
]

const RECOMMENDATIONS = [
  {
    id: 'f2',
    name: 'Cheese Fries',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=700&auto=format&fit=crop',
  },
  {
    id: 'f4',
    name: 'Chicken Nuggets',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=700&auto=format&fit=crop',
  },
  {
    id: 'shake',
    name: 'Chocolate Shake',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=700&auto=format&fit=crop',
  },
  {
    id: 'bread',
    name: 'Garlic Bread',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=700&auto=format&fit=crop',
  },
  {
    id: 'rings',
    name: 'Onion Rings',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=700&auto=format&fit=crop',
  },
  {
    id: 'wings',
    name: 'Peri Peri Wings',
    price: 449,
    image:
      'https://images.unsplash.com/photo-1608039755401-742486f3f9e5?q=80&w=700&auto=format&fit=crop',
  },
]

function money(value: number) {
  return `PKR ${value.toLocaleString('en-PK')}`
}

function readOrder(): StoredOrder | null {
  if (typeof window === 'undefined') return null

  try {
    const raw =
      window.localStorage.getItem(ORDER_STORAGE_KEY)

    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function readCart(): CartLine[] {
  if (typeof window === 'undefined') {
    return DEFAULT_ITEMS
  }

  try {
    const raw =
      window.localStorage.getItem(CART_STORAGE_KEY)

    if (!raw) return DEFAULT_ITEMS

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return DEFAULT_ITEMS
    }

    const cleaned = parsed
      .filter(
        (item) =>
          item &&
          typeof item.id === 'string' &&
          typeof item.name === 'string' &&
          typeof item.price === 'number' &&
          typeof item.quantity === 'number',
      )
      .map((item) => ({
        ...item,
        quantity: Math.max(
          0,
          Math.floor(item.quantity),
        ),
      }))
      .filter((item) => item.quantity > 0)

    return cleaned.length
      ? cleaned
      : DEFAULT_ITEMS
  } catch {
    return DEFAULT_ITEMS
  }
}

function formatOrderDate(dateString?: string) {
  if (!dateString) {
    return '19 May 2024, 10:42 AM'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return '19 May 2024, 10:42 AM'
  }

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function getPaymentLabel(
  paymentMethod?: string,
) {
  switch (paymentMethod) {
    case 'card':
      return 'Credit / Debit Card'
    case 'easypaisa':
      return 'Easypaisa'
    case 'jazzcash':
      return 'JazzCash'
    case 'bank':
      return 'Bank Transfer'
    case 'wallet':
      return 'Wallet Balance'
    default:
      return 'Cash on Delivery'
  }
}

export function OrderTrackingPageContent() {
  const [order, setOrder] =
    useState<StoredOrder | null>(null)

  const [items, setItems] =
    useState<CartLine[]>(DEFAULT_ITEMS)

  const [showLiveMessage, setShowLiveMessage] =
    useState(false)

  const [addedItems, setAddedItems] =
    useState<Record<string, number>>({})

  useEffect(() => {
    const storedOrder = readOrder()

    if (storedOrder) {
      setOrder(storedOrder)

      if (
        Array.isArray(storedOrder.items) &&
        storedOrder.items.length > 0
      ) {
        setItems(storedOrder.items)
      }
    } else {
      setItems(readCart())
    }
  }, [])

  const subtotal =
    typeof order?.subtotal === 'number'
      ? order.subtotal
      : items.reduce(
          (sum, item) =>
            sum +
            item.price *
              item.quantity,
          0,
        )

  const deliveryFee =
    typeof order?.deliveryFee === 'number'
      ? order.deliveryFee
      : 80

  const serviceFee =
    typeof order?.serviceFee === 'number'
      ? order.serviceFee
      : 30

  const discount =
    typeof order?.discount === 'number'
      ? order.discount
      : 150

  const total =
    typeof order?.total === 'number'
      ? order.total
      : subtotal +
        deliveryFee +
        serviceFee -
        discount

  const orderId =
    order?.id ?? '#FF67489256'

  const address =
    order?.address?.address ??
    '123, Green Avenue, Johar Town'

  const city =
    order?.address?.city ??
    'Lahore'

  const fullAddress =
    `${address}, ${city}`

  function addItem(
    item: (typeof RECOMMENDATIONS)[number],
  ) {
    setAddedItems((current) => ({
      ...current,
      [item.id]:
        (current[item.id] ?? 0) + 1,
    }))
  }

  function contactRider() {
    window.open(
      'tel:+923001234567',
      '_self',
    )
  }

  function messageRider() {
    alert(
      'Messaging with your rider will open here.',
    )
  }

  function trackLive() {
    setShowLiveMessage(true)

    window.setTimeout(() => {
      setShowLiveMessage(false)
    }, 3000)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground">
        <Home className="size-4" />

        <Link
          href="/"
          className="hover:text-foreground"
        >
          Home
        </Link>

        <ChevronRight className="size-4" />

        <Link
          href="/my-orders"
          className="hover:text-foreground"
        >
          My Orders
        </Link>

        <ChevronRight className="size-4" />

        <span className="font-medium text-foreground">
          Order Tracking
        </span>
      </div>

      {/* Heading */}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
            Track Your Order
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>
              Order ID:{' '}
              <strong className="text-brand">
                {orderId}
              </strong>
            </span>

            <span className="text-border">
              |
            </span>

            <span>
              Placed on{' '}
              {formatOrderDate(
                order?.createdAt,
              )}
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-foreground">
            Need help?
          </p>

          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand px-5 py-2.5 text-sm font-bold text-brand transition hover:bg-brand-muted sm:w-auto"
            onClick={() =>
              alert(
                'Customer support will open here.',
              )
            }
          >
            <Headphones className="size-4" />
            Contact Support
          </button>
        </div>
      </div>

      {/* Status Stepper */}
      <section className="mt-5 overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="flex items-start">
          <TrackingStep
            status="done"
            icon={<Check className="size-5" />}
            title="Order Confirmed"
            time="10:42 AM"
          />

          <TrackingLine active />

          <TrackingStep
            status="done"
            icon={<Check className="size-5" />}
            title="Preparing Your Order"
            time="10:45 AM"
          />

          <TrackingLine active />

          <TrackingStep
            status="current"
            icon={<Bike className="size-5" />}
            title="On The Way"
            time="11:05 AM"
          />

          <TrackingLine />

          <TrackingStep
            status="pending"
            icon={<Bike className="size-5" />}
            title="Out for Delivery"
          />

          <TrackingLine />

          <TrackingStep
            status="pending"
            icon={<PackageCheck className="size-5" />}
            title="Delivered"
          />
        </div>
      </section>

      {showLiveMessage && (
        <div className="mt-4 rounded-lg border border-brand/20 bg-brand-muted px-4 py-3 text-sm font-semibold text-brand">
          Live tracking updated. Your rider is currently
          on the way.
        </div>
      )}

      {/* Map + Rider */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,2fr)_310px]">
        {/* Map */}
        <section className="relative min-h-[325px] overflow-hidden rounded-xl border border-border bg-[#e9f0df]">
          {/* map background */}
          <div className="absolute inset-0 opacity-80">
            <div className="absolute left-0 top-16 h-10 w-full -rotate-3 bg-white/80" />
            <div className="absolute left-0 top-28 h-6 w-full rotate-6 bg-[#d9e4c8]" />
            <div className="absolute left-20 top-0 h-[120%] w-8 rotate-[24deg] bg-white/80" />
            <div className="absolute left-52 top-0 h-[120%] w-5 rotate-[62deg] bg-white/70" />
            <div className="absolute right-28 top-0 h-[120%] w-12 rotate-[18deg] bg-white/75" />
            <div className="absolute right-0 top-24 h-5 w-full rotate-[-18deg] bg-[#d7e4d0]" />

            <div className="absolute left-1/3 top-0 h-full w-px bg-[#d0dcc4]" />
            <div className="absolute left-2/3 top-0 h-full w-px bg-[#d0dcc4]" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-[#d0dcc4]" />

            <div className="absolute right-[22%] top-[15%] size-10 rounded-full bg-green-200/50" />
            <div className="absolute left-[18%] bottom-[15%] size-16 rounded-full bg-green-200/50" />
            <div className="absolute right-[8%] bottom-[20%] size-20 rounded-full bg-green-200/50" />
          </div>

          {/* Dashed route */}
          <svg
            viewBox="0 0 900 450"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d="M220 195 C 360 250, 430 205, 555 260 S 665 300, 720 290"
              fill="none"
              stroke="#008f6a"
              strokeWidth="5"
              strokeDasharray="15 12"
              strokeLinecap="round"
            />
          </svg>

          {/* Restaurant label */}
          <div className="absolute left-5 top-5 flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-3 shadow-lg">
            <div className="size-12 overflow-hidden rounded-lg bg-black">
              <img
                src={RESTAURANT.logo}
                alt={RESTAURANT.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-[10px] font-medium text-muted-foreground">
                Restaurant
              </p>

              <p className="text-sm font-extrabold">
                {RESTAURANT.name}
              </p>

              <p className="text-[10px] text-muted-foreground">
                Being prepared
              </p>
            </div>
          </div>

          {/* Pickup marker */}
          <div className="absolute left-[23%] top-[38%] grid size-9 place-items-center rounded-full bg-red-500 text-white shadow-lg ring-4 ring-white/80">
            <MapPin className="size-5" />
          </div>

          {/* Rider marker */}
          <div className="absolute left-[51%] top-[43%] text-4xl drop-shadow-lg">
            🛵
          </div>

          {/* Address */}
          <div className="absolute right-4 top-[38%] flex items-start gap-3 rounded-xl border border-border bg-white px-3 py-3 shadow-lg sm:right-5">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
              <Home className="size-4" />
            </div>

            <div>
              <p className="text-[10px] font-medium text-muted-foreground">
                Delivery Address
              </p>

              <p className="mt-0.5 max-w-[160px] text-xs font-semibold leading-5 sm:text-sm">
                {fullAddress}
              </p>
            </div>
          </div>

          {/* ETA */}
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-lg">
            <div className="grid size-12 place-items-center rounded-full border-2 border-brand text-brand">
              <Clock3 className="size-6" />
            </div>

            <div>
              <p className="text-[10px] font-medium text-muted-foreground">
                Estimated Delivery
              </p>

              <p className="font-display text-lg font-extrabold text-brand">
                11:20 AM
              </p>

              <p className="text-[10px] text-muted-foreground">
                15 – 20 min remaining
              </p>
            </div>
          </div>
        </section>

        {/* Rider Card */}
        <section className="overflow-hidden rounded-xl border border-border bg-brand-muted/35">
          <div className="p-5">
            <p className="text-xs font-semibold text-foreground">
              Your Rider
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-muted text-brand">
                <UserRound className="size-10" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-extrabold">
                    Usman Khan
                  </h2>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    4.8
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  1250+ Deliveries
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={contactRider}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-bold transition hover:bg-muted"
              >
                <Phone className="size-4 text-brand" />
                Call Rider
              </button>

              <button
                type="button"
                onClick={messageRider}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-bold transition hover:bg-muted"
              >
                <MessageCircle className="size-4 text-brand" />
                Message
              </button>
            </div>
          </div>

          <div className="border-t border-border p-5">
            <p className="text-xs font-semibold">
              Vehicle Details
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  🛵
                </div>

                <span className="text-sm font-semibold">
                  Honda CD 70
                </span>
              </div>

              <span className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold">
                LEA 1234
              </span>
            </div>
          </div>

          <div className="border-t border-border p-5">
            <div className="flex gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <p className="text-sm font-extrabold text-brand">
                  Safety First
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Your safety is our priority. Don’t share
                  personal information with rider.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Order Details + Summary */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Order Details */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="font-display text-xl font-extrabold">
            Order Details
          </h2>

          <div className="mt-4 flex items-center gap-4">
            <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-black sm:size-[68px]">
              <img
                src={RESTAURANT.logo}
                alt={RESTAURANT.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-extrabold">
                  {RESTAURANT.name}
                </h3>

                <span className="rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold text-brand">
                  Open
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Burger, Fast Food, Drinks
              </p>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-foreground/80 sm:text-xs">
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="size-3.5" />
                  30–40 min
                </span>

                <span className="inline-flex items-center gap-1">
                  <Bike className="size-3.5" />
                  Min. Order: PKR 300
                </span>

                <span className="inline-flex items-center gap-1">
                  <Clock3 className="size-3.5" />
                  10:00 AM – 11:00 PM
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-muted/15 p-4">
            <OrderMeta
              icon={<FileText className="size-5" />}
              label="Order ID"
              value={orderId}
              accent
            />

            <OrderMeta
              icon={<CalendarDays className="size-5" />}
              label="Order Date & Time"
              value={formatOrderDate(order?.createdAt)}
            />

            <OrderMeta
              icon={<WalletIcon />}
              label="Payment Method"
              value={getPaymentLabel(
                order?.paymentMethod,
              )}
            />

            <OrderMeta
              icon={
                <span className="grid size-5 place-items-center rounded-full border border-brand text-xs font-bold">
                  +
                </span>
              }
              label="Total Paid"
              value={money(total)}
              accent
              last
            />
          </div>
        </section>

        {/* Summary */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="font-display text-xl font-extrabold">
            Order Summary
          </h2>

          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
              >
                <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold">
                    {item.name}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {money(item.price)}
                    {' × '}
                    {item.quantity}
                  </p>
                </div>

                <span className="text-sm font-bold">
                  {money(
                    item.price *
                      item.quantity,
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3 border-t border-dashed border-border pt-4 text-sm">
            <SummaryRow
              label={`Subtotal (${items.length} items)`}
              value={money(subtotal)}
            />

            <SummaryRow
              label="Delivery Fee"
              value={money(deliveryFee)}
              info
            />

            <SummaryRow
              label="Service Fee"
              value={money(serviceFee)}
              info
            />

            <SummaryRow
              label="Discount"
              value={`– ${money(discount)}`}
              highlight
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-display text-lg font-extrabold">
              Total
            </span>

            <span className="font-display text-xl font-extrabold text-brand">
              {money(total)}
            </span>
          </div>
        </section>
      </div>

      {/* Recommendations */}
      <section className="mt-5 overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold sm:text-xl">
            You May Also Like
          </h2>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {RECOMMENDATIONS.map((item) => {
            const count =
              addedItems[item.id] ?? 0

            return (
              <div
                key={item.id}
                className="w-[150px] min-w-[150px] overflow-hidden rounded-xl border border-border bg-card sm:w-[175px] sm:min-w-[175px]"
              >
                <div className="h-24 overflow-hidden sm:h-28">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-2.5">
                  <p className="truncate text-sm font-bold">
                    {item.name}
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {money(item.price)}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      addItem(item)
                    }
                    className="mt-2 flex w-full items-center justify-between rounded-lg border border-brand px-2.5 py-1.5 text-xs font-bold text-brand hover:bg-brand-muted"
                  >
                    <span>
                      {count
                        ? `Added ${count}`
                        : 'Add'}
                    </span>

                    <span className="grid size-5 place-items-center rounded-full border border-brand">
                      +
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom Benefits */}
      <section className="mt-5 rounded-xl border border-border bg-brand-muted/30 p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <BottomBenefit
            icon={
              <Headphones className="size-6" />
            }
            title="Need Help?"
            description="Our support team is available 24/7."
            action="Contact Support"
          />

          <BottomBenefit
            icon={
              <Clock3 className="size-6" />
            }
            title="Live Tracking"
            description="Track your order in real-time right on the map."
            action="Track Now"
          />

          <BottomBenefit
            icon={
              <GiftIcon />
            }
            title="Easy Returns"
            description="Not satisfied with your order? We’ll make it right."
            action="Learn More"
          />

          <BottomBenefit
            icon={
              <ShieldCheck className="size-6" />
            }
            title="Secure & Safe"
            description="Your payments and data are always 100% secure."
            action="Learn More"
          />
        </div>
      </section>
    </div>
  )
}

/* ---------------- Tracking Step ---------------- */

function TrackingStep({
  status,
  icon,
  title,
  time,
}: {
  status: 'done' | 'current' | 'pending'
  icon: React.ReactNode
  title: string
  time?: string
}) {
  const isActive =
    status === 'done' ||
    status === 'current'

  return (
    <div className="flex min-w-[90px] flex-1 flex-col items-center">
      <div
        className={[
          'grid size-10 place-items-center rounded-full border sm:size-11',
          status === 'done'
            ? 'border-brand bg-brand text-brand-foreground'
            : status === 'current'
              ? 'border-brand bg-brand-muted text-brand'
              : 'border-border bg-muted text-muted-foreground',
        ].join(' ')}
      >
        {icon}
      </div>

      <p
        className={[
          'mt-3 text-center text-[11px] leading-4 sm:text-sm',
          isActive
            ? 'font-bold text-foreground'
            : 'text-muted-foreground',
        ].join(' ')}
      >
        {title}
      </p>

      {time && (
        <span className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
          {time}
        </span>
      )}
    </div>
  )
}

function TrackingLine({
  active = false,
}: {
  active?: boolean
}) {
  return (
    <div
      className={[
        'mt-5 h-0.5 flex-1 rounded-full',
        active ? 'bg-brand' : 'bg-border',
      ].join(' ')}
    />
  )
}

/* ---------------- Order Meta ---------------- */

function OrderMeta({
  icon,
  label,
  value,
  accent = false,
  last = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent?: boolean
  last?: boolean
}) {
  return (
    <div
      className={[
        'grid grid-cols-[25px_minmax(100px,.7fr)_minmax(0,1fr)] items-center gap-3 py-2.5',
        !last ? 'border-b border-border' : '',
      ].join(' ')}
    >
      <span className="text-brand">
        {icon}
      </span>

      <span className="text-xs text-muted-foreground sm:text-sm">
        {label}
      </span>

      <span
        className={[
          'text-right text-xs font-semibold sm:text-sm',
          accent
            ? 'text-brand'
            : 'text-foreground',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}

function WalletIcon() {
  return (
    <span className="grid size-5 place-items-center">
      <span className="h-3.5 w-5 rounded border-2 border-current" />
    </span>
  )
}

/* ---------------- Summary ---------------- */

function SummaryRow({
  label,
  value,
  info = false,
  highlight = false,
}: {
  label: string
  value: string
  info?: boolean
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {label}

        {info && (
          <span className="grid size-4 place-items-center rounded-full border border-muted-foreground/50 text-[9px] font-bold">
            i
          </span>
        )}
      </span>

      <span
        className={
          highlight
            ? 'font-bold text-brand'
            : 'font-bold'
        }
      >
        {value}
      </span>
    </div>
  )
}

/* ---------------- Bottom Benefits ---------------- */

function BottomBenefit({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: string
}) {
  return (
    <div className="flex gap-3">
      <div className="grid size-11 shrink-0 place-items-center rounded-full border border-brand/20 bg-card text-brand">
        {icon}
      </div>

      <div>
        <p className="text-sm font-extrabold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>

        <button
          type="button"
          className="mt-1 text-xs font-bold text-brand hover:underline"
        >
          {action}
        </button>
      </div>
    </div>
  )
}

function GiftIcon() {
  return (
    <span className="text-2xl leading-none">
      🎁
    </span>
  )
}