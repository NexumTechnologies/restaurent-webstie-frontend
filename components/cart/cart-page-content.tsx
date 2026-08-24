'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Home,
  Info,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Trash2,
  Headphones,
  Sparkles,
} from 'lucide-react'
import type { MenuItem } from '@/lib/restaurant'

const CART_STORAGE_KEY = 'foodflow-cart'

type CartItem = MenuItem & {
  quantity: number
}

const DEFAULT_CART: CartItem[] = [
  {
    id: 'b1',
    name: 'Zinger Burger',
    description: 'Crispy zinger fillet with lettuce & mayo',
    price: 599,
    image: '/images/home/dish-zinger-burger.png',
    category: 'burgers',
    badge: 'Bestseller',
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
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=600&auto=format&fit=crop',
    description: 'Fries with melted cheese',
    category: 'fries',
  },
  {
    id: 'f3',
    name: 'Onion Rings',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=600&auto=format&fit=crop',
    description: 'Crispy onion rings served hot',
    category: 'fries',
  },
  {
    id: 'f4',
    name: 'Chicken Nuggets',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop',
    description: '6 pieces with dip sauce',
    category: 'fries',
  },
  {
    id: 'shake',
    name: 'Chocolate Shake',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop',
    description: 'Creamy chocolate shake',
    category: 'drinks',
  },
  {
    id: 'bread',
    name: 'Garlic Bread',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=600&auto=format&fit=crop',
    description: 'Toasted garlic bread',
    category: 'sides',
  },
]

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_CART
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!raw) {
      return DEFAULT_CART
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_CART
    }

 return parsed
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
    quantity: Math.max(0, Math.floor(item.quantity)),
  }))
  .filter((item) => item.quantity > 0) as CartItem[]
  } catch {
    return DEFAULT_CART
  }
}

function saveCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('foodflow-cart-updated'))
}

function formatPKR(value: number) {
  return `PKR ${value.toLocaleString('en-PK')}`
}

export function CartPageContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>(DEFAULT_CART)

  useEffect(() => {
    setCartItems(readStoredCart())
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveCart(cartItems)
    }
  }, [cartItems])

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    [cartItems],
  )

  const deliveryFee = cartItems.length > 0 ? 80 : 0
  const serviceFee = cartItems.length > 0 ? 30 : 0
  const discount = subtotal >= 1000 ? 150 : 0
  const total = subtotal + deliveryFee + serviceFee - discount

  const updateQuantity = (id: string, nextQuantity: number) => {
    setCartItems((current) => {
      const updated = current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(0, nextQuantity),
              }
            : item,
        )
        .filter((item) => item.quantity > 0)

      return updated
    })
  }

  const removeItem = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id))
  }

  const addRecommendation = (item: (typeof RECOMMENDATIONS)[number]) => {
    setCartItems((current) => {
      const exists = current.find((cartItem) => cartItem.id === item.id)

      if (exists) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        )
      }

      return [
        ...current,
        {
          ...item,
          quantity: 1,
        },
      ]
    })
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 border-b border-border pb-4 text-sm text-muted-foreground">
        <Home className="size-4" />
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>

        <ChevronRight className="size-4" />

        <span className="font-medium text-foreground">Cart</span>
      </div>

      {/* Page heading */}
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground shadow-sm sm:size-[58px]">
            <ShoppingCart className="size-7 sm:size-8" />
          </div>

          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              My Cart
            </h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>

        <Link
          href="/restaurant/the-burger-house"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand px-5 py-3 text-sm font-bold text-brand transition-colors hover:bg-brand-muted sm:w-auto"
        >
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_315px]">
        {/* LEFT */}
        <div className="min-w-0">
          {/* Restaurant card */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="bg-brand-muted/70 p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-black sm:size-[84px]">
                  <img
                    src="/images/foodflow-burger.png"
                    alt="The Burger House"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-extrabold text-foreground sm:text-xl">
                      The Burger House
                    </h2>

                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                      Open
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Burger, Fast Food, Drinks
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-foreground/80 sm:text-sm">
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

              <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-card px-3 py-3 text-xs font-medium text-brand-dark sm:text-sm">
                <Info className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>You can only order from one restaurant at a time.</span>
              </div>
            </div>

            {/* Desktop table heading */}
            <div className="hidden grid-cols-[minmax(0,1fr)_95px_120px_100px_45px] border-t border-border bg-card px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground md:grid">
              <span>Item</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span />
            </div>

            {/* Items */}
            <div>
              {cartItems.length === 0 ? (
                <div className="px-5 py-16 text-center">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-brand-muted text-brand">
                    <ShoppingCart className="size-7" />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold">
                    Your cart is empty
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Add some delicious items to continue.
                  </p>

                  <Link
                    href="/restaurant/the-burger-house"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
                  >
                    Start Shopping
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-t border-border px-4 py-4 sm:px-5 md:grid md:grid-cols-[minmax(0,1fr)_95px_120px_100px_45px] md:items-center md:gap-3"
                  >
                    <div className="flex min-w-0 gap-4">
                      <div className="relative size-[76px] shrink-0 overflow-hidden rounded-lg bg-muted sm:size-[84px]">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[16px] font-extrabold text-foreground">
                          {item.name}
                        </h3>

                        <p className="mt-1 max-w-[280px] text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {item.description}
                        </p>

                        <div className="mt-3 text-sm font-bold text-foreground md:hidden">
                          {formatPKR(item.price)}
                        </div>
                      </div>
                    </div>

                    <div className="hidden text-sm font-semibold text-foreground md:block">
                      {formatPKR(item.price)}
                    </div>

                    <div className="mt-4 flex items-center justify-between md:mt-0 md:justify-start">
                      <span className="text-xs font-semibold text-muted-foreground md:hidden">
                        Quantity
                      </span>

                      <div className="inline-flex items-center overflow-hidden rounded-lg border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="grid size-8 place-items-center text-brand transition-colors hover:bg-brand-muted"
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Minus className="size-4" />
                        </button>

                        <span className="grid h-8 min-w-10 place-items-center border-x border-border px-2 text-sm font-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="grid size-8 place-items-center text-brand transition-colors hover:bg-brand-muted"
                          aria-label={`Increase ${item.name}`}
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between md:mt-0 md:block">
                      <span className="text-xs font-semibold text-muted-foreground md:hidden">
                        Total
                      </span>

                      <span className="text-sm font-bold text-foreground">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-end md:mt-0">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-500 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-border px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-xs font-semibold text-amber-700 sm:text-sm">
                  <ShieldCheck className="size-4 shrink-0" />
                  <span>Note: Add items from the same restaurant only.</span>
                </div>
              </div>
            )}
          </div>

          {/* Delivery banner */}
          <div className="mt-5 flex flex-col gap-4 rounded-xl border border-border bg-brand-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🛵</div>

              <div>
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  Estimated Delivery Time
                </p>
                <p className="mt-0.5 font-display text-xl font-extrabold text-brand">
                  30 – 40 min
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand px-4 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand-muted"
            >
              <Tag className="size-4" />
              Add Special Instructions
            </button>
          </div>

          {/* Recommendations */}
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold text-foreground sm:text-xl">
                You may also like
              </h2>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
                  aria-label="Previous recommendations"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
                  aria-label="Next recommendations"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {RECOMMENDATIONS.map((item) => (
                <div
                  key={item.id}
                  className="w-[190px] min-w-[190px] overflow-hidden rounded-xl border border-border bg-card sm:w-[205px] sm:min-w-[205px]"
                >
                  <div className="relative h-32 overflow-hidden sm:h-36">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="font-display text-sm font-bold text-foreground">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm font-bold text-foreground">
                      {formatPKR(item.price)}
                    </p>

                    <button
                      type="button"
                      onClick={() => addRecommendation(item)}
                      className="mt-3 flex w-full items-center justify-between rounded-lg border border-brand px-3 py-2 text-sm font-bold text-brand transition-colors hover:bg-brand-muted"
                    >
                      <span>Add</span>
                      <span className="grid size-5 place-items-center rounded-full border border-brand">
                        <Plus className="size-3" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-display text-xl font-extrabold">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({cartItems.length} items)
                </span>
                <span className="font-bold text-foreground">
                  {formatPKR(subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  Delivery Fee
                  <Info className="size-3.5" />
                </span>
                <span className="font-bold text-foreground">
                  {formatPKR(deliveryFee)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  Service Fee
                  <Info className="size-3.5" />
                </span>
                <span className="font-bold text-foreground">
                  {formatPKR(serviceFee)}
                </span>
              </div>

              <div className="border-t border-dashed border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-bold text-brand">
                    – {formatPKR(discount)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-extrabold">
                    Total
                  </span>
                  <span className="font-display text-xl font-extrabold text-brand">
                    {formatPKR(total)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-brand/20 bg-brand-muted px-3 py-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" />

                <div className="text-sm">
                  <p className="font-bold text-brand">
                    You are saving {formatPKR(discount)}
                  </p>
                  <p className="mt-0.5 text-brand-dark/80">
                    with this order
                  </p>
                </div>
              </div>

            <Link
  href="/checkout"
  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3.5 text-sm font-extrabold text-brand-foreground transition-colors hover:bg-brand/90"
>
  Proceed to Checkout
  <ArrowRight className="size-4" />
</Link>
            </div>
          </div>

          {/* Trust card */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-6 shrink-0" />

                <div>
                  <p className="font-bold text-foreground">
                    Safe & Secure Payments
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your payments are 100% secure
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Sparkles className="mt-0.5 size-6 shrink-0" />

                <div>
                  <p className="font-bold text-foreground">
                    Best Quality Food
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Fresh & hygienic food delivery
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <RotateCcw className="mt-0.5 size-6 shrink-0" />

                <div>
                  <p className="font-bold text-foreground">Easy Returns</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Hassle-free order or cancellation
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Headphones className="mt-0.5 size-6 shrink-0" />

                <div>
                  <p className="font-bold text-foreground">
                    24/7 Customer Support
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    We are here to help you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}