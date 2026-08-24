'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Home,
  Info,
  LockKeyhole,
  MapPin,
  Smartphone,
  Tag,
  WalletCards,
  ShieldCheck,
  Bike,
  RefreshCw,
  Headphones,
} from 'lucide-react'

import { RESTAURANT, type MenuItem } from '@/lib/restaurant'

const CART_STORAGE_KEY = 'foodflow-cart'
const CHECKOUT_STORAGE_KEY = 'foodflow-checkout'
const ORDER_STORAGE_KEY = 'foodflow-order'

type CartLine = MenuItem & {
  quantity: number
}

type PaymentMethod =
  | 'cod'
  | 'card'
  | 'easypaisa'
  | 'jazzcash'
  | 'bank'
  | 'wallet'

type CardDetails = {
  number: string
  name: string
  expiry: string
  cvv: string
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

const DELIVERY_FEE = 80
const SERVICE_FEE = 30
const DISCOUNT = 150

const defaultCard: CardDetails = {
  number: '',
  name: 'Ali Khan',
  expiry: '',
  cvv: '',
}

function money(value: number) {
  return `PKR ${value.toLocaleString('en-PK')}`
}

function readCart(): CartLine[] {
  if (typeof window === 'undefined') {
    return DEFAULT_CART
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)

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

type CheckoutData = {
  address?: {
    fullName?: string
    phone?: string
    address?: string
    city?: string
    area?: string
    postalCode?: string
    instructions?: string
  }
  delivery?: string
  paymentMethod?: string
  subtotal?: number
  deliveryFee?: number
  serviceFee?: number
  discount?: number
  total?: number
}

function readCheckout(): CheckoutData {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const raw =
      window.localStorage.getItem(
        CHECKOUT_STORAGE_KEY,
      )

    if (!raw) return {}

    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function PaymentPageContent() {
  const [cartItems, setCartItems] =
    useState<CartLine[]>(DEFAULT_CART)

  const [checkout, setCheckout] =
    useState<CheckoutData>({})

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('cod')

  const [card, setCard] =
    useState<CardDetails>(defaultCard)

  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] =
    useState(false)

  const [promoMessage, setPromoMessage] =
    useState('')

  const [error, setError] = useState('')

  const [paying, setPaying] = useState(false)

  useEffect(() => {
    setCartItems(readCart())
    setCheckout(readCheckout())

    const savedPayment =
      window.localStorage.getItem(
        'foodflow-payment-method',
      )

    if (
      savedPayment === 'cod' ||
      savedPayment === 'card' ||
      savedPayment === 'easypaisa' ||
      savedPayment === 'jazzcash' ||
      savedPayment === 'bank' ||
      savedPayment === 'wallet'
    ) {
      setPaymentMethod(savedPayment)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.localStorage.setItem(
      'foodflow-payment-method',
      paymentMethod,
    )
  }, [paymentMethod])

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0,
      ),
    [cartItems],
  )

  const deliveryFee =
    typeof checkout.deliveryFee === 'number'
      ? checkout.deliveryFee
      : DELIVERY_FEE

  const serviceFee =
    typeof checkout.serviceFee === 'number'
      ? checkout.serviceFee
      : SERVICE_FEE

  const discount =
    typeof checkout.discount === 'number'
      ? checkout.discount
      : subtotal >= 1000
        ? DISCOUNT
        : 0

  const total = Math.max(
    0,
    subtotal +
      deliveryFee +
      serviceFee -
      discount -
      (promoApplied ? 100 : 0),
  )

  function applyPromo() {
    const code = promo
      .trim()
      .toUpperCase()

    if (!code) {
      setPromoApplied(false)
      setPromoMessage(
        'Please enter a promo code.',
      )
      return
    }

    if (code === 'FOODFLOW100') {
      setPromoApplied(true)
      setPromoMessage(
        'Promo applied: PKR 100 discount.',
      )
      return
    }

    setPromoApplied(false)
    setPromoMessage(
      'Invalid promo code. Try FOODFLOW100.',
    )
  }

  function validatePayment() {
    if (paymentMethod !== 'card') {
      return true
    }

    if (
      card.number.replace(/\s/g, '').length <
      16
    ) {
      setError(
        'Please enter a valid 16-digit card number.',
      )
      return false
    }

    if (!card.name.trim()) {
      setError(
        'Please enter the cardholder name.',
      )
      return false
    }

    if (!/^\d{2}\s?\/\s?\d{2}$/.test(card.expiry)) {
      setError(
        'Please enter expiry date in MM / YY format.',
      )
      return false
    }

    if (!/^\d{3,4}$/.test(card.cvv)) {
      setError(
        'Please enter a valid CVV.',
      )
      return false
    }

    return true
  }

  function handlePayNow() {
    setError('')

    if (!validatePayment()) {
      return
    }

    setPaying(true)

    const order = {
      id: `FF-${Date.now()}`,
      restaurant: RESTAURANT.name,
      items: cartItems,
      paymentMethod,
      subtotal,
      deliveryFee,
      serviceFee,
      discount:
        discount +
        (promoApplied ? 100 : 0),
      total,
      address: checkout.address ?? {},
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    }

    window.localStorage.setItem(
      ORDER_STORAGE_KEY,
      JSON.stringify(order),
    )

    window.localStorage.setItem(
      'foodflow-checkout-step',
      '4',
    )

    window.setTimeout(() => {
      setPaying(false)
      window.location.href =
        '/checkout/confirmation'
    }, 500)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground">
        <Home className="size-4" />

        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          Home
        </Link>

        <ChevronRight className="size-4" />

        <Link
          href="/cart"
          className="transition-colors hover:text-foreground"
        >
          Cart
        </Link>

        <ChevronRight className="size-4" />

        <Link
          href="/checkout"
          className="transition-colors hover:text-foreground"
        >
          Checkout
        </Link>

        <ChevronRight className="size-4" />

        <span className="font-medium text-foreground">
          Payment
        </span>
      </div>

      {/* Stepper */}
      <section className="mx-auto max-w-4xl px-2 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start">
          <Step
            number="✓"
            label="Cart"
            done
          />

          <StepLine active />

          <Step
            number="✓"
            label="Address"
            done
          />

          <StepLine active />

          <Step
            number="3"
            label="Payment"
            active
          />

          <StepLine />

          <Step
            number="4"
            label="Confirmation"
          />
        </div>
      </section>

      {/* Restaurant banner */}
      <section className="overflow-hidden rounded-xl border border-border bg-brand-muted/40">
        <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="size-[82px] shrink-0 overflow-hidden rounded-lg bg-black sm:size-[98px]">
              <img
                src={RESTAURANT.logo}
                alt={RESTAURANT.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-xl font-extrabold sm:text-2xl">
                  {RESTAURANT.name}
                </h1>

                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                  Open
                </span>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Burger, Fast Food, Drinks
              </p>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-foreground/80 sm:text-sm">
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

          <div className="hidden h-28 w-56 shrink-0 overflow-hidden rounded-xl sm:block">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
              alt="Burger meal"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(340px,1fr)]">
        {/* LEFT */}
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-extrabold">
                  Select Payment Method
                </h2>

                <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                  <ShieldCheck className="size-4 text-brand" />
                  All transactions are secure and encrypted
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <PaymentMethodRow
                selected={paymentMethod === 'cod'}
                onClick={() =>
                  setPaymentMethod('cod')
                }
                icon={
                  <WalletCards className="size-6" />
                }
                title="Cash on Delivery"
                subtitle="Pay in cash when your order arrives"
                badge="💵"
              />

              <PaymentMethodRow
                selected={paymentMethod === 'card'}
                onClick={() => {
                  setPaymentMethod('card')
                  setError('')
                }}
                icon={
                  <CreditCard className="size-6" />
                }
                title="Credit / Debit Card"
                subtitle="Pay securely using your card"
                badge="VISA  ●"
              />

              {paymentMethod === 'card' && (
                <div className="rounded-xl border border-border bg-muted/20 p-4">
                  <div>
                    <label className="text-xs font-semibold">
                      Card Number
                    </label>

                    <div className="relative">
                      <input
                        inputMode="numeric"
                        maxLength={19}
                        value={card.number}
                        onChange={(event) =>
                          setCard((current) => ({
                            ...current,
                            number:
                              event.target.value,
                          }))
                        }
                        placeholder="1234 5678 9012 3456"
                        className="mt-1.5 h-10 w-full rounded-lg border border-border bg-card px-3 pr-11 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                      />

                      <CreditCard className="absolute right-3 top-4 size-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[1.3fr_0.7fr_0.7fr]">
                    <div>
                      <label className="text-xs font-semibold">
                        Cardholder Name
                      </label>

                      <input
                        value={card.name}
                        onChange={(event) =>
                          setCard((current) => ({
                            ...current,
                            name:
                              event.target.value,
                          }))
                        }
                        className="mt-1.5 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold">
                        Expiry Date
                      </label>

                      <input
                        inputMode="numeric"
                        maxLength={5}
                        value={card.expiry}
                        onChange={(event) =>
                          setCard((current) => ({
                            ...current,
                            expiry:
                              event.target.value,
                          }))
                        }
                        placeholder="MM / YY"
                        className="mt-1.5 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold">
                        CVV
                      </label>

                      <input
                        inputMode="numeric"
                        maxLength={4}
                        value={card.cvv}
                        onChange={(event) =>
                          setCard((current) => ({
                            ...current,
                            cvv:
                              event.target.value,
                          }))
                        }
                        placeholder="123"
                        className="mt-1.5 h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                      />
                    </div>
                  </div>
                </div>
              )}

              <PaymentMethodRow
                selected={
                  paymentMethod === 'easypaisa'
                }
                onClick={() =>
                  setPaymentMethod(
                    'easypaisa',
                  )
                }
                icon={
                  <Smartphone className="size-6" />
                }
                title="Easypaisa"
                subtitle="Pay via Easypaisa Wallet"
                badge="easypaisa"
              />

              <PaymentMethodRow
                selected={
                  paymentMethod === 'jazzcash'
                }
                onClick={() =>
                  setPaymentMethod(
                    'jazzcash',
                  )
                }
                icon={
                  <Smartphone className="size-6" />
                }
                title="JazzCash"
                subtitle="Pay via JazzCash Wallet"
                badge="JazzCash"
              />

              <PaymentMethodRow
                selected={
                  paymentMethod === 'bank'
                }
                onClick={() =>
                  setPaymentMethod('bank')
                }
                icon={
                  <Building2 className="size-6" />
                }
                title="Bank Transfer"
                subtitle="Transfer directly from your bank"
                badge="▦"
              />

              <PaymentMethodRow
                selected={
                  paymentMethod === 'wallet'
                }
                onClick={() =>
                  setPaymentMethod('wallet')
                }
                icon={
                  <WalletCards className="size-6" />
                }
                title="Wallet Balance"
                subtitle="Pay using your FoodFlow wallet balance"
                badge="Balance: PKR 1,250"
              />
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <div className="mt-4 flex items-start gap-3 rounded-lg border border-brand/15 bg-brand-muted px-3 py-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" />

              <div>
                <p className="text-sm font-bold text-brand-dark">
                  Secure & Safe Payments
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Your payment information is 100% secure.
                  We do not store your card details.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
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

                  <span className="text-sm font-bold">
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
                value={`– ${money(
                  discount +
                    (promoApplied
                      ? 100
                      : 0),
                )}`}
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
              <Tag className="mt-0.5 size-5 shrink-0 text-brand" />

              <div className="text-sm text-brand-dark">
                <p className="font-bold">
                  You are saving{' '}
                  {money(
                    discount +
                      (promoApplied
                        ? 100
                        : 0),
                  )}
                </p>

                <p className="mt-0.5">
                  with this order
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePayNow}
              disabled={paying}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3.5 text-sm font-extrabold text-brand-foreground transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {paying ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <LockKeyhole className="size-4" />
                  Pay Now
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>

            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4" />
              Secure checkout. Your data is safe with us.
            </p>
          </section>

          {/* Promo */}
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Tag className="size-5" />
              <h3 className="text-sm font-extrabold">
                Apply Promo Code
              </h3>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={promo}
                onChange={(event) =>
                  setPromo(event.target.value)
                }
                placeholder="Enter promo code"
                className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
              />

              <button
                type="button"
                onClick={applyPromo}
                className="h-10 rounded-lg border border-brand px-4 text-sm font-bold text-brand transition hover:bg-brand-muted"
              >
                Apply
              </button>
            </div>

            {promoMessage && (
              <p
                className={`mt-2 text-xs ${
                  promoApplied
                    ? 'text-brand'
                    : 'text-red-500'
                }`}
              >
                {promoMessage}
              </p>
            )}
          </section>
        </aside>
      </div>

      {/* Delivery information */}
      <section className="mt-5 rounded-xl border border-border bg-brand-muted/55 p-4 sm:p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex items-center gap-4 border-b border-border pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-5">
            <div className="text-4xl">🛵</div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground sm:text-sm">
                Estimated Delivery Time
              </p>

              <p className="mt-1 font-display text-xl font-extrabold text-brand">
                30 – 40 min
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                We will deliver your order as soon as possible
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-full bg-card text-brand">
              <Clock3 className="size-7" />
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground sm:text-sm">
                Delivering to
              </p>

              <p className="mt-1 text-sm font-semibold text-foreground">
                {checkout.address?.address ??
                  '123, Green Avenue, Johar Town'}
                ,{' '}
                {checkout.address?.city ??
                  'Lahore'}
              </p>

              <Link
                href="/checkout"
                className="mt-1 inline-block text-xs font-bold text-brand hover:underline"
              >
                Change Address
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom benefits */}
      <section className="mt-5 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Benefit
            icon={
              <ShieldCheck className="size-6" />
            }
            title="100% Secure Payments"
            description="Your payments are safe and encrypted"
          />

          <Benefit
            icon={
              <Check className="size-6" />
            }
            title="Best Quality Food"
            description="Fresh & hygienic food delivered"
          />

          <Benefit
            icon={
              <RefreshCw className="size-6" />
            }
            title="Easy Returns"
            description="Hassle-free order or cancellation"
          />

          <Benefit
            icon={
              <Headphones className="size-6" />
            }
            title="24/7 Support"
            description="We are always here to help you"
          />
        </div>
      </section>
    </div>
  )
}

function Step({
  number,
  label,
  done,
  active,
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
          active || done
            ? 'font-bold text-foreground'
            : 'text-muted-foreground',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  )
}

function StepLine({
  active = false,
}: {
  active?: boolean
}) {
  return (
    <div
      className={[
        'mt-4 h-0.5 flex-1 rounded-full',
        active ? 'bg-brand' : 'bg-border',
      ].join(' ')}
    />
  )
}

function PaymentMethodRow({
  selected,
  onClick,
  icon,
  title,
  subtitle,
  badge,
}: {
  selected: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
  badge: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex w-full items-center gap-3 rounded-lg border px-3 py-3.5 text-left transition sm:px-4',
        selected
          ? 'border-brand bg-brand-muted/45'
          : 'border-border hover:bg-muted/50',
      ].join(' ')}
    >
      <span
        className={[
          'grid size-6 shrink-0 place-items-center rounded-full border',
          selected
            ? 'border-brand'
            : 'border-border',
        ].join(' ')}
      >
        {selected && (
          <span className="size-2.5 rounded-full bg-brand" />
        )}
      </span>

      <span
        className={[
          'grid size-10 shrink-0 place-items-center rounded-full',
          selected
            ? 'bg-brand text-brand-foreground'
            : 'bg-muted text-foreground',
        ].join(' ')}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">
          {title}
        </span>

        <span className="mt-0.5 block text-xs text-muted-foreground">
          {subtitle}
        </span>
      </span>

      <span className="shrink-0 text-xs font-extrabold text-brand sm:text-sm">
        {badge}
      </span>
    </button>
  )
}

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
          <Info className="size-3.5" />
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

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-12 shrink-0 place-items-center rounded-full border border-brand/25 bg-brand-muted text-brand">
        {icon}
      </div>

      <div>
        <p className="text-sm font-extrabold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}