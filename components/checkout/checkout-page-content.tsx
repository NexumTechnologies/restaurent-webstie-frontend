'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Bike,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  Home,
  Info,
  MapPin,
  Navigation,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  WalletCards,
  Zap,
} from 'lucide-react'

import { RESTAURANT, type MenuItem } from '@/lib/restaurant'

const CART_STORAGE_KEY = 'foodflow-cart'
const CHECKOUT_STORAGE_KEY = 'foodflow-checkout'

type CartLine = MenuItem & {
  quantity: number
}

type DeliveryMethod = 'standard' | 'express' | 'scheduled'

type PaymentMethod =
  | 'cod'
  | 'card'
  | 'easypaisa'
  | 'jazzcash'

type AddressForm = {
  fullName: string
  phone: string
  address: string
  city: string
  area: string
  postalCode: string
  instructions: string
}

const DEFAULT_ADDRESS: AddressForm = {
  fullName: 'Ali Khan',
  phone: '+92 300 1234567',
  address: '123, Green Avenue, Johar Town',
  city: 'Lahore',
  area: 'Johar Town',
  postalCode: '54000',
  instructions: '',
}

const DEFAULT_CART: CartLine[] = [
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

const restaurantFoodImage =
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'

function money(value: number) {
  return `PKR ${value.toLocaleString('en-PK')}`
}

function readCart(): CartLine[] {
  if (typeof window === 'undefined') {
    return DEFAULT_CART
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!raw) {
      return DEFAULT_CART
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return DEFAULT_CART
    }

    const clean = parsed
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
      .filter((item) => item.quantity > 0)

    return clean.length > 0 ? clean : DEFAULT_CART
  } catch {
    return DEFAULT_CART
  }
}

function CheckoutStepper({
  activeStep,
}: {
  activeStep: number
}) {
  const steps = [
    'Cart',
    'Address',
    'Payment',
    'Confirmation',
  ]

  return (
    <div className="mx-auto max-w-4xl px-2 py-5 sm:px-6 sm:py-6">
      <div className="flex items-start">
        {steps.map((step, index) => {
          const number = index + 1
          const completed = number < activeStep
          const active = number === activeStep

          return (
            <div
              key={step}
              className="flex flex-1 items-start"
            >
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={[
                    'grid size-8 place-items-center rounded-full border text-xs font-bold sm:size-9 sm:text-sm',
                    completed || active
                      ? 'border-teal bg-teal text-teal-foreground'
                      : 'border-border bg-card text-foreground',
                  ].join(' ')}
                >
                  {completed ? (
                    <Check className="size-4" />
                  ) : (
                    number
                  )}
                </div>

                <span
                  className={[
                    'mt-2 text-xs sm:text-sm',
                    active || completed
                      ? 'font-bold text-foreground'
                      : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {step}
                </span>
              </div>

              {number < steps.length && (
                <div
                  className={[
                    'mt-4 h-0.5 flex-1 rounded-full',
                    number < activeStep
                      ? 'bg-teal'
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

function FieldLabel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <label className="text-sm font-bold text-foreground">
      {children}
    </label>
  )
}

function InputField({
  value,
  onChange,
  type = 'text',
}: {
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="mt-2 h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/15"
    />
  )
}

export function CheckoutPageContent() {
  const router = useRouter()

  const [cartItems, setCartItems] =
    useState<CartLine[]>(DEFAULT_CART)

  const [address, setAddress] =
    useState<AddressForm>(DEFAULT_ADDRESS)

  const [delivery, setDelivery] =
    useState<DeliveryMethod>('standard')

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('cod')

  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] =
    useState(false)

  const [promoMessage, setPromoMessage] =
    useState('')

  const [activeStep, setActiveStep] = useState(2)

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressForm, string>>
  >({})

  const [submitted, setSubmitted] =
    useState(false)

  useEffect(() => {
    setCartItems(readCart())

    try {
      const saved =
        window.localStorage.getItem(
          CHECKOUT_STORAGE_KEY,
        )

      if (!saved) return

      const parsed = JSON.parse(saved)

      if (parsed?.address) {
        setAddress({
          ...DEFAULT_ADDRESS,
          ...parsed.address,
        })
      }

      if (parsed?.delivery) {
        setDelivery(parsed.delivery)
      }

      if (parsed?.paymentMethod) {
        setPaymentMethod(parsed.paymentMethod)
      }
    } catch {
      // Ignore invalid saved data.
    }
  }, [])

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
    delivery === 'express' ? 150 : 80

  const serviceFee = 30

  const baseDiscount =
    subtotal >= 1000 ? 150 : 0

  const promoDiscount =
    promoApplied ? 100 : 0

  const total = Math.max(
    0,
    subtotal +
      deliveryFee +
      serviceFee -
      baseDiscount -
      promoDiscount,
  )

  function updateAddress(
    field: keyof AddressForm,
    value: string,
  ) {
    setAddress((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
  }

  function validateAddress() {
    const nextErrors: Partial<
      Record<keyof AddressForm, string>
    > = {}

    if (!address.fullName.trim()) {
      nextErrors.fullName =
        'Full name is required.'
    }

    if (!address.phone.trim()) {
      nextErrors.phone =
        'Phone number is required.'
    }

    if (!address.address.trim()) {
      nextErrors.address =
        'Delivery address is required.'
    }

    if (!address.city.trim()) {
      nextErrors.city = 'City is required.'
    }

    if (!address.area.trim()) {
      nextErrors.area = 'Area is required.'
    }

    if (!address.postalCode.trim()) {
      nextErrors.postalCode =
        'Postal code is required.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  function applyPromo() {
    const code = promo.trim().toUpperCase()

    if (!code) {
      setPromoApplied(false)
      setPromoMessage(
        'Enter a promo code to apply.',
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

 function proceedToPayment() {
  if (!validateAddress()) {
    window.scrollTo({
      top: 250,
      behavior: 'smooth',
    })
    return
  }

  const checkoutData = {
    address,
    delivery,
    paymentMethod,
    cartItems,
    subtotal,
    deliveryFee,
    serviceFee,
    discount:
      baseDiscount + promoDiscount,
    total,
    createdAt: new Date().toISOString(),
  }

  window.localStorage.setItem(
    CHECKOUT_STORAGE_KEY,
    JSON.stringify(checkoutData),
  )

  window.localStorage.setItem(
    'foodflow-checkout-step',
    '3',
  )

  router.push('/checkout/payment')
}

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 border-b border-border py-4 text-sm text-muted-foreground">
        <Home className="size-4" />

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

        <span className="font-medium text-foreground">
          Checkout
        </span>
      </div>

      {/* Checkout Steps */}
      <CheckoutStepper activeStep={activeStep} />

      {/* Restaurant Banner */}
      <section className="overflow-hidden rounded-xl border border-border bg-teal-muted/45">
        <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="size-[78px] shrink-0 overflow-hidden rounded-lg bg-black sm:size-[100px]">
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

                <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">
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

          <div className="hidden h-28 w-52 shrink-0 sm:block">
            <img
              src={restaurantFoodImage}
              alt="Burger meal"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {submitted && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-teal/20 bg-teal-muted px-4 py-4 text-sm text-teal-dark">
          <Check className="mt-0.5 size-5 shrink-0 text-teal" />

          <div>
            <p className="font-bold">
              Address saved successfully.
            </p>

            <p className="mt-0.5">
              Payment step is ready. Your checkout
              details have been saved.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(340px,1fr)]">
        {/* LEFT */}
        <div className="space-y-5">
          {/* Delivery Address */}
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-teal" />

              <h2 className="font-display text-lg font-extrabold sm:text-xl">
                Delivery Address
              </h2>
            </div>

            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
              <Navigation className="size-4" />
              Delivering to your doorstep
            </p>

            {/* Name + Phone */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>
                  Full Name
                </FieldLabel>

                <InputField
                  value={address.fullName}
                  onChange={(value) =>
                    updateAddress(
                      'fullName',
                      value,
                    )
                  }
                />

                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <FieldLabel>
                  Phone Number
                </FieldLabel>

                <InputField
                  type="tel"
                  value={address.phone}
                  onChange={(value) =>
                    updateAddress(
                      'phone',
                      value,
                    )
                  }
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mt-4">
              <FieldLabel>
                Address
              </FieldLabel>

              <InputField
                value={address.address}
                onChange={(value) =>
                  updateAddress(
                    'address',
                    value,
                  )
                }
              />

              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address}
                </p>
              )}
            </div>

            {/* City Area Postal */}
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <FieldLabel>
                  City
                </FieldLabel>

                <div className="relative">
                  <select
                    value={address.city}
                    onChange={(event) =>
                      updateAddress(
                        'city',
                        event.target.value,
                      )
                    }
                    className="mt-2 h-11 w-full appearance-none rounded-lg border border-border bg-card px-3 pr-9 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15"
                  >
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Rawalpindi</option>
                    <option>Karachi</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-5 size-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <FieldLabel>
                  Area
                </FieldLabel>

                <div className="relative">
                  <select
                    value={address.area}
                    onChange={(event) =>
                      updateAddress(
                        'area',
                        event.target.value,
                      )
                    }
                    className="mt-2 h-11 w-full appearance-none rounded-lg border border-border bg-card px-3 pr-9 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15"
                  >
                    <option>Johar Town</option>
                    <option>Model Town</option>
                    <option>Gulberg</option>
                    <option>DHA</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-5 size-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <FieldLabel>
                  Postal Code
                </FieldLabel>

                <InputField
                  value={address.postalCode}
                  onChange={(value) =>
                    updateAddress(
                      'postalCode',
                      value,
                    )
                  }
                />

                {errors.postalCode && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.postalCode}
                  </p>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4">
              <FieldLabel>
                Delivery Instructions (Optional)
              </FieldLabel>

              <textarea
                value={address.instructions}
                onChange={(event) =>
                  updateAddress(
                    'instructions',
                    event.target.value,
                  )
                }
                placeholder="E.g. Please ring the bell, call on arrival, leave at gate, etc."
                rows={3}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-3 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-teal focus:ring-2 focus:ring-teal/15"
              />
            </div>

            {/* Delivery Options */}
            <div className="mt-5 rounded-lg border border-border p-3 sm:p-4">
              <h3 className="text-sm font-extrabold">
                Delivery Options
              </h3>

              <div className="mt-3 space-y-2">
                <DeliveryOption
                  selected={delivery === 'standard'}
                  onSelect={() =>
                    setDelivery('standard')
                  }
                  icon={<Bike className="size-5" />}
                  title="Standard Delivery"
                  subtitle="30 – 40 min"
                  price={money(80)}
                />

                <DeliveryOption
                  selected={delivery === 'express'}
                  onSelect={() =>
                    setDelivery('express')
                  }
                  icon={<Zap className="size-5" />}
                  title="Express Delivery"
                  subtitle="15 – 25 min"
                  price={money(150)}
                />

                <DeliveryOption
                  selected={delivery === 'scheduled'}
                  onSelect={() =>
                    setDelivery('scheduled')
                  }
                  icon={<Clock3 className="size-5" />}
                  title="Schedule Delivery"
                  subtitle="Choose a date & time"
                  price=""
                  chevron
                />
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h2 className="font-display text-lg font-extrabold">
              Payment Methods
            </h2>

            <div className="mt-3 space-y-2">
              <PaymentOption
                selected={
                  paymentMethod === 'cod'
                }
                onSelect={() =>
                  setPaymentMethod('cod')
                }
                icon={
                  <WalletCards className="size-5" />
                }
                title="Cash on Delivery"
                subtitle="Pay in cash when your order arrives"
                badge="💵"
              />

              <PaymentOption
                selected={
                  paymentMethod === 'card'
                }
                onSelect={() =>
                  setPaymentMethod('card')
                }
                icon={
                  <CreditCard className="size-5" />
                }
                title="Credit / Debit Card"
                subtitle="Visa, Mastercard, UnionPay"
                badge="VISA  ●"
              />

              <PaymentOption
                selected={
                  paymentMethod === 'easypaisa'
                }
                onSelect={() =>
                  setPaymentMethod('easypaisa')
                }
                icon={
                  <Smartphone className="size-5" />
                }
                title="Easypaisa"
                subtitle="Pay via Easypaisa Wallet"
                badge="easypaisa"
              />

              <PaymentOption
                selected={
                  paymentMethod === 'jazzcash'
                }
                onSelect={() =>
                  setPaymentMethod('jazzcash')
                }
                icon={
                  <Smartphone className="size-5" />
                }
                title="JazzCash"
                subtitle="Pay via JazzCash Wallet"
                badge="JazzCash"
              />
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          {/* Order Summary */}
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5" />

              <h2 className="font-display text-lg font-extrabold sm:text-xl">
                Order Summary
              </h2>
            </div>

            <div className="mt-4 space-y-4">
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
                      <span className="mx-1">
                        ×
                      </span>
                      {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold">
                    {money(
                      item.price *
                        item.quantity,
                    )}
                  </p>
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
                  baseDiscount +
                    promoDiscount,
                )}`}
                highlight
              />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-display text-lg font-extrabold">
                Total
              </span>

              <span className="font-display text-xl font-extrabold text-teal">
                {money(total)}
              </span>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-lg border border-teal/15 bg-teal-muted px-3 py-3 text-sm text-teal-dark">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal" />

              <div>
                <p className="font-bold">
                  You are saving{' '}
                  {money(
                    baseDiscount +
                      promoDiscount,
                  )}
                </p>

                <p className="mt-0.5">
                  with this order
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={proceedToPayment}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-3.5 text-sm font-extrabold text-teal-foreground transition hover:bg-teal/90"
            >
              Proceed to Payment
              <ArrowRight className="size-4" />
            </button>

            <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <ShieldCheck className="size-4" />
              Secure checkout. Your data is safe with us.
            </p>
          </section>

          {/* Promo + Trust */}
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-teal-muted text-xs font-bold text-teal">
                %
              </span>

              <h2 className="text-sm font-extrabold">
                Apply Promo Code
              </h2>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={promo}
                onChange={(event) =>
                  setPromo(event.target.value)
                }
                placeholder="Enter promo code"
                className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15"
              />

              <button
                type="button"
                onClick={applyPromo}
                className="h-11 rounded-lg border border-teal px-4 text-sm font-bold text-teal transition hover:bg-teal-muted"
              >
                Apply
              </button>
            </div>

            {promoMessage && (
              <p
                className={`mt-2 text-xs ${
                  promoApplied
                    ? 'text-teal'
                    : 'text-red-500'
                }`}
              >
                {promoMessage}
              </p>
            )}

            <div className="mt-5 space-y-4">
              <TrustRow
                icon={
                  <ShieldCheck className="size-5" />
                }
                title="Safe & Secure Payments"
                description="Your payments are 100% secure"
              />

              <TrustRow
                icon={
                  <Check className="size-5" />
                }
                title="Best Quality Food"
                description="Fresh & hygienic food delivered"
              />

              <TrustRow
                icon={
                  <Radio className="size-5" />
                }
                title="Easy Returns"
                description="Hassle-free order or cancellation"
              />

              <TrustRow
                icon={
                  <Smartphone className="size-5" />
                }
                title="24/7 Customer Support"
                description="We are here to help you"
              />
            </div>
          </section>
        </aside>
      </div>

      {/* Bottom Benefits */}
      <section className="mt-5 rounded-xl border border-border bg-card px-4 py-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MiniBenefit
            icon={<Bike className="size-6" />}
            title="Fast Delivery"
            text="Get your order in 30–40 minutes"
          />

          <MiniBenefit
            icon={
              <ShoppingBag className="size-6" />
            }
            title="Best Quality"
            text="Fresh & hygienic food for you"
          />

          <MiniBenefit
            icon={
              <ShieldCheck className="size-6" />
            }
            title="Safe & Secure"
            text="Your payments are 100% secure"
          />

          <MiniBenefit
            icon={
              <Smartphone className="size-6" />
            }
            title="24/7 Support"
            text="We are always here to help"
          />
        </div>
      </section>
    </div>
  )
}

/* ---------------- Delivery Option ---------------- */

function DeliveryOption({
  selected,
  onSelect,
  icon,
  title,
  subtitle,
  price,
  chevron,
}: {
  selected: boolean
  onSelect: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
  price: string
  chevron?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition',
        selected
          ? 'border-teal bg-teal-muted/60'
          : 'border-border hover:bg-muted/60',
      ].join(' ')}
    >
      <span
        className={[
          'grid size-7 shrink-0 place-items-center rounded-full border',
          selected
            ? 'border-teal text-teal'
            : 'border-border text-muted-foreground',
        ].join(' ')}
      >
        {selected ? (
          <Check className="size-4" />
        ) : (
          <span className="size-2 rounded-full bg-muted-foreground/50" />
        )}
      </span>

      <span
        className={[
          'grid size-9 shrink-0 place-items-center rounded-full',
          selected
            ? 'bg-teal text-teal-foreground'
            : 'bg-muted text-foreground',
        ].join(' ')}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold">
          {title}
        </span>

        <span className="mt-0.5 block text-xs text-muted-foreground">
          {subtitle}
        </span>
      </span>

      {price && (
        <span className="shrink-0 text-xs font-extrabold text-teal">
          {price}
        </span>
      )}

      {chevron && (
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  )
}

/* ---------------- Payment Option ---------------- */

function PaymentOption({
  selected,
  onSelect,
  icon,
  title,
  subtitle,
  badge,
}: {
  selected: boolean
  onSelect: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
  badge: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition',
        selected
          ? 'border-teal bg-teal-muted/50'
          : 'border-border hover:bg-muted/60',
      ].join(' ')}
    >
      <span
        className={[
          'grid size-6 place-items-center rounded-full border',
          selected
            ? 'border-teal'
            : 'border-border',
        ].join(' ')}
      >
        {selected && (
          <span className="size-2.5 rounded-full bg-teal" />
        )}
      </span>

      <span
        className={[
          'grid size-9 place-items-center rounded-full',
          selected
            ? 'bg-teal text-teal-foreground'
            : 'bg-muted',
        ].join(' ')}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">
          {title}
        </span>

        <span className="block truncate text-xs text-muted-foreground">
          {subtitle}
        </span>
      </span>

      <span className="shrink-0 text-xs font-extrabold text-foreground/80">
        {badge}
      </span>
    </button>
  )
}

/* ---------------- Summary ---------------- */

function SummaryRow({
  label,
  value,
  info,
  highlight,
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
        {info && <Info className="size-3.5" />}
      </span>

      <span
        className={
          highlight
            ? 'font-bold text-teal'
            : 'font-bold'
        }
      >
        {value}
      </span>
    </div>
  )
}

/* ---------------- Trust ---------------- */

function TrustRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0 text-teal">
        {icon}
      </span>

      <div>
        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

/* ---------------- Bottom Benefits ---------------- */

function MiniBenefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-teal-muted text-teal">
        {icon}
      </span>

      <div>
        <p className="text-sm font-extrabold">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  )
}
