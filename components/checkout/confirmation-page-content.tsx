'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  Bike,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Gift,
  Headphones,
  Home,
  MapPin,
  PackageCheck,
  Phone,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
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

const DEFAULT_CART: CartLine[] = [
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
    id: 'f3',
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

    if (!raw) return null

    return JSON.parse(raw)
  } catch {
    return null
  }
}

function readCart(): CartLine[] {
  if (typeof window === 'undefined') {
    return DEFAULT_CART
  }

  try {
    const raw =
      window.localStorage.getItem(CART_STORAGE_KEY)

    if (!raw) return DEFAULT_CART

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return DEFAULT_CART
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

    return cleaned.length > 0 ? cleaned : DEFAULT_CART
  } catch {
    return DEFAULT_CART
  }
}

function createOrderId() {
  return `#FF${Math.floor(
    100000000 + Math.random() * 899999999,
  )}`
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

export function ConfirmationPageContent() {
  const [order, setOrder] =
    useState<StoredOrder | null>(null)

  const [cartItems, setCartItems] =
    useState<CartLine[]>(DEFAULT_CART)

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
        setCartItems(storedOrder.items)
      }
    } else {
      setCartItems(readCart())
    }

    const currentOrder =
      storedOrder ?? {
        id: createOrderId(),
      }

    if (!currentOrder.id) {
      const normalizedOrder = {
        ...currentOrder,
        id: createOrderId(),
      }

      setOrder(normalizedOrder)

      window.localStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify(normalizedOrder),
      )
    }
  }, [])

  const subtotal = useMemo(() => {
    if (typeof order?.subtotal === 'number') {
      return order.subtotal
    }

    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0,
    )
  }, [cartItems, order?.subtotal])

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

  function addRecommendation(
    item: (typeof RECOMMENDATIONS)[number],
  ) {
    setAddedItems((current) => ({
      ...current,
      [item.id]: (current[item.id] ?? 0) + 1,
    }))
  }

  const address =
    order?.address?.address ??
    '123, Green Avenue, Johar Town'

  const city =
    order?.address?.city ?? 'Lahore'

  const fullAddress = `${address}, ${city}`

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground">
        <Home className="size-4 shrink-0" />

        <Link
          href="/"
          className="hover:text-foreground"
        >
          Home
        </Link>

        <ChevronRight className="size-4" />

        <Link
          href="/cart"
          className="hover:text-foreground"
        >
          Cart
        </Link>

        <ChevronRight className="size-4" />

        <Link
          href="/checkout"
          className="hover:text-foreground"
        >
          Checkout
        </Link>

        <ChevronRight className="size-4" />

        <Link
          href="/checkout/payment"
          className="hover:text-foreground"
        >
          Payment
        </Link>

        <ChevronRight className="size-4" />

        <span className="font-medium text-foreground">
          Confirmation
        </span>
      </div>

      {/* Stepper */}
      <section className="mx-auto max-w-4xl px-2 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start">
          <ConfirmationStep
            label="Cart"
            number="✓"
            done
          />

          <ConfirmationLine />

          <ConfirmationStep
            label="Address"
            number="✓"
            done
          />

          <ConfirmationLine />

          <ConfirmationStep
            label="Payment"
            number="✓"
            done
          />

          <ConfirmationLine />

          <ConfirmationStep
            label="Confirmation"
            number="4"
            active
          />
        </div>
      </section>

      {/* Success Hero */}
      <section className="overflow-hidden rounded-xl border border-border bg-brand-muted/40">
        <div className="grid min-h-[210px] items-center gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[1fr_360px]">
          <div className="flex items-center gap-5 sm:gap-7">
            {/* Success icon */}
            <div className="relative hidden shrink-0 sm:block">
              <div className="absolute -inset-5">
                <span className="absolute left-2 top-3 text-xl text-yellow-500">
                  •
                </span>

                <span className="absolute right-1 top-2 text-2xl text-brand">
                  •
                </span>

                <span className="absolute left-0 bottom-4 text-lg text-blue-500">
                  •
                </span>

                <span className="absolute right-3 bottom-1 text-xl text-orange-400">
                  •
                </span>
              </div>

              <div className="grid size-28 place-items-center rounded-full bg-brand shadow-lg shadow-brand/20">
                <Check className="size-16 text-brand-foreground" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-3 grid size-16 place-items-center rounded-full bg-brand shadow-sm sm:hidden">
                <Check className="size-9 text-brand-foreground" />
              </div>

              <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Order Placed Successfully!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Thank you for your order. We’ve
                received your order and it is being
                prepared.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
               <Link
  href="/checkout/tracking"
  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-extrabold text-brand-foreground transition hover:bg-brand/90"
>
  <Truck className="size-4" />
  Track Your Order
</Link>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand bg-card px-5 py-3 text-sm font-extrabold text-foreground transition hover:bg-brand-muted"
                >
                  <Home className="size-4" />
                  Go to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden h-48 lg:block">
            <div className="absolute inset-0">
              <div className="absolute right-8 top-3 size-12 rounded-full bg-white/80" />
              <div className="absolute right-24 top-10 size-20 rounded-full bg-white/70" />
              <div className="absolute bottom-1 left-3 h-16 w-80 rounded-full bg-brand/10 blur-xl" />
            </div>

            <div className="absolute bottom-4 right-4">
              <div className="relative">
                <div className="absolute -top-8 right-8 grid size-12 place-items-center rounded-full bg-brand text-brand-foreground shadow-md">
                  <MapPin className="size-6" />
                </div>

                <div className="flex items-end gap-2">
                  <div className="rounded-xl bg-brand-dark px-3 py-2 text-xs font-bold text-brand-dark-foreground shadow-lg">
                    FoodFlow
                  </div>

                  <div className="text-7xl leading-none">
                    🛵
                  </div>
                </div>

                <div className="mt-2 h-2 w-72 rounded-full bg-brand/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details + Summary */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(350px,0.95fr)]">
        {/* LEFT */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="font-display text-xl font-extrabold">
            Order Details
          </h2>

          <div className="mt-4 flex items-center gap-4">
            <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-black sm:size-[84px]">
              <img
                src={RESTAURANT.logo}
                alt={RESTAURANT.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-extrabold sm:text-xl">
                  {RESTAURANT.name}
                </h3>

                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                  Open
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Burger, Fast Food, Drinks
              </p>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-foreground/80 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4" />
                  30–40 min
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Bike className="size-4" />
                  Min. Order: PKR 300
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4" />
                  10:00 AM – 11:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Order metadata */}
          <div className="mt-5 rounded-xl border border-border bg-muted/15 p-4 sm:p-5">
            <OrderMeta
              icon={
                <FileText className="size-5" />
              }
              label="Order ID"
              value={
                order?.id ??
                createOrderId()
              }
              accent
            />

            <OrderMeta
              icon={
                <CalendarDays className="size-5" />
              }
              label="Order Date & Time"
              value={formatOrderDate(
                order?.createdAt,
              )}
            />

            <OrderMeta
              icon={
                <WalletCardsIcon />
              }
              label="Payment Method"
              value={getPaymentLabel(
                order?.paymentMethod,
              )}
            />

            <OrderMeta
              icon={
                <span className="grid size-5 place-items-center rounded-full border border-brand text-xs font-bold text-brand">
                  +
                </span>
              }
              label="Total Paid"
              value={money(total)}
              accent
              last
            />
          </div>

          {/* Delivery estimate */}
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid size-16 place-items-center rounded-full bg-blue-100 text-blue-600">
                  <Bike className="size-8" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground sm:text-sm">
                    Estimated Delivery Time
                  </p>

                  <p className="mt-1 font-display text-xl font-extrabold text-blue-600 sm:text-2xl">
                    30 – 40 min
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    We'll notify you when your rider is on the way.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(
                    'Live tracking will be available here.',
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-400 bg-card px-4 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
              >
                <MapPin className="size-4" />
                Track Live
              </button>
            </div>
          </div>

          {/* Notification */}
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <Bell className="mt-0.5 size-5 shrink-0 text-amber-600" />

            <p className="text-xs leading-5 text-amber-800 sm:text-sm">
              You will receive order updates on SMS and Email.
              <br />
              You can also track your order in the{' '}
              <Link
                href="#"
                className="font-bold text-brand hover:underline"
              >
                “My Orders”
              </Link>{' '}
              section.
            </p>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-extrabold">
            Order Summary
          </h2>

          <div className="mt-5 space-y-4">
            {cartItems.map((item) => (
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

                <span className="shrink-0 text-sm font-bold">
                  {money(
                    item.price *
                      item.quantity,
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 border-t border-dashed border-border pt-4 text-sm">
            <SummaryRow
              label={`Subtotal (${cartItems.length} items)`}
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

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-brand/15 bg-brand-muted px-3 py-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" />

            <div className="text-sm text-brand-dark">
              <p className="font-bold">
                You are saving {money(discount)}
              </p>

              <p className="mt-0.5">
                with this order
              </p>
            </div>
          </div>
        </aside>
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
              className="grid size-9 place-items-center rounded-full border border-border bg-card hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-border bg-card hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {RECOMMENDATIONS.map(
            (item) => {
              const added =
                addedItems[item.id] ?? 0

              return (
                <div
                  key={item.id}
                  className="w-[150px] min-w-[150px] overflow-hidden rounded-xl border border-border bg-card sm:w-[170px] sm:min-w-[170px]"
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
                        addRecommendation(item)
                      }
                      className="mt-2 flex w-full items-center justify-between rounded-lg border border-brand px-2.5 py-1.5 text-xs font-bold text-brand hover:bg-brand-muted"
                    >
                      <span>
                        {added > 0
                          ? `Added ${added}`
                          : 'Add'}
                      </span>

                      <span className="grid size-5 place-items-center rounded-full border border-brand">
                        <span className="text-sm leading-none">
                          +
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              )
            },
          )}
        </div>
      </section>

      {/* Bottom help cards */}
      <section className="mt-5 rounded-xl border border-border bg-brand-muted/30 p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HelpCard
            icon={
              <Headphones className="size-6" />
            }
            title="Need Help?"
            description="Our support team is here to help you."
            action="Contact Support"
          />

          <HelpCard
            icon={
              <RefreshCw className="size-6" />
            }
            title="Easy Returns"
            description="Not satisfied with your order? We’ll make it right."
            action="Learn More"
          />

          <HelpCard
            icon={
              <Gift className="size-6" />
            }
            title="Refer & Earn"
            description="Refer your friends and earn exciting rewards."
            action="Refer Now"
          />

          <HelpCard
            icon={
              <Tag className="size-6" />
            }
            title="Exclusive Offers"
            description="Get best offers and discounts on your favorite foods."
            action="View Offers"
          />
        </div>
      </section>
    </div>
  )
}

/* ---------------- Stepper ---------------- */

function ConfirmationStep({
  number,
  label,
  done = false,
  active = false,
}: {
  number: string
  label: string
  done?: boolean
  active?: boolean
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center">
      <div
        className={[
          'grid size-8 place-items-center rounded-full border text-xs font-bold sm:size-9 sm:text-sm',
          done || active
            ? 'border-brand bg-brand text-brand-foreground'
            : 'border-border bg-card text-foreground',
        ].join(' ')}
      >
        {number}
      </div>

      <span
        className={[
          'mt-2 text-xs sm:text-sm',
          active
            ? 'font-bold text-foreground'
            : 'text-muted-foreground',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  )
}

function ConfirmationLine() {
  return (
    <div className="mt-4 h-0.5 flex-1 rounded-full bg-brand" />
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
        'grid grid-cols-[28px_minmax(120px,0.75fr)_minmax(0,1fr)] items-center gap-3 py-2.5',
        !last ? 'border-b border-border' : '',
      ].join(' ')}
    >
      <span className="text-brand">
        {icon}
      </span>

      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span
        className={[
          'text-right text-sm font-semibold',
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

function WalletCardsIcon() {
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
          <InfoDot />
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

function InfoDot() {
  return (
    <span className="grid size-4 place-items-center rounded-full border border-muted-foreground/50 text-[9px] font-bold">
      i
    </span>
  )
}

/* ---------------- Help Cards ---------------- */

function HelpCard({
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
    <div className="flex items-start gap-3">
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