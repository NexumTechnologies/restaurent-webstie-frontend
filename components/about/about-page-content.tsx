'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Utensils,
  Zap,
} from 'lucide-react'

const values = [
  {
    icon: Utensils,
    title: 'Food First',
    description:
      'We make discovering great food simple, convenient and enjoyable.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Safety',
    description:
      'We focus on reliable ordering, secure checkout and transparent information.',
  },
  {
    icon: Heart,
    title: 'Made for People',
    description:
      'Every part of FoodFlow is designed around a better customer experience.',
  },
  {
    icon: Sparkles,
    title: 'Always Improving',
    description:
      'We keep improving the experience through thoughtful product decisions.',
  },
]

const stats = [
  {
    value: '50+',
    label: 'Food choices',
  },
  {
    value: '20+',
    label: 'Restaurant options',
  },
  {
    value: '30–40',
    label: 'Min average delivery',
  },
  {
    value: '24/7',
    label: 'Customer support',
  },
]

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description:
      'Browse categories and restaurants to find exactly what you are craving.',
  },
  {
    number: '02',
    icon: ShoppingBag,
    title: 'Choose',
    description:
      'Explore menus, customize your order and add your favorite items to the cart.',
  },
  {
    number: '03',
    icon: Bike,
    title: 'Order',
    description:
      'Confirm your address, select payment and place your order in a few taps.',
  },
  {
    number: '04',
    icon: MapPin,
    title: 'Track',
    description:
      'Follow your order status and know when your food is arriving.',
  },
]

export function AboutPageContent() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
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

        <span className="font-medium text-foreground">
          About
        </span>
      </nav>

      {/* Hero */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-navy text-navy-foreground shadow-card">
        <div className="grid items-center lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 sm:text-sm">
              <Zap className="size-4 text-teal" />
              Welcome to FoodFlow
            </span>

            <h1 className="mt-6 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Great food,
              <br />
              <span className="text-teal">
                made simple.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              FoodFlow is a modern food-ordering experience
              built to make discovering restaurants, choosing
              meals and tracking deliveries easier from start
              to finish.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-bold text-teal-foreground transition hover:bg-teal/90"
              >
                Explore Categories
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/restaurant/the-burger-house"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Restaurant
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <span className="inline-flex items-center gap-2 text-sm text-white/75">
                <CheckCircle2 className="size-4 text-teal" />
                Simple ordering
              </span>

              <span className="inline-flex items-center gap-2 text-sm text-white/75">
                <Clock3 className="size-4 text-teal" />
                Fast delivery
              </span>

              <span className="inline-flex items-center gap-2 text-sm text-white/75">
                <ShieldCheck className="size-4 text-teal" />
                Secure checkout
              </span>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-[500px]">
            <div
              aria-hidden="true"
              className="absolute -right-24 top-1/2 hidden size-[420px] -translate-y-1/2 rounded-full bg-teal/20 blur-3xl lg:block"
            />

            <Image
              src="/images/home/hero-dish.png"
              alt="FoodFlow meal"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/25 to-transparent" />

            <div className="absolute bottom-6 left-5 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md sm:left-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-teal text-teal-foreground">
                  <Star className="size-5 fill-current" />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Built around great experiences
                  </p>

                  <p className="mt-0.5 text-xs text-white/65">
                    From discovery to delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl py-14 text-center sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
          Our story
        </p>

        <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          Food ordering should feel effortless.
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          We created FoodFlow around a simple idea: finding good
          food should not require a complicated experience. From
          the first search to the final delivery update, every step
          should be clear, fast and easy to understand.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={[
              'px-4 py-6 text-center sm:px-6 sm:py-7',
              index !== 0
                ? 'border-l border-border'
                : '',
              index === 2
                ? 'border-t border-border sm:border-t-0'
                : '',
              index === 3
                ? 'border-t border-border sm:border-t-0'
                : '',
            ].join(' ')}
          >
            <p className="font-display text-2xl font-extrabold text-brand sm:text-3xl">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="grid min-h-[390px] items-center md:grid-cols-2">
            <div className="relative min-h-[250px] h-full">
              <Image
                src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000&auto=format&fit=crop"
                alt="Fresh food preparation"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-muted text-brand">
                <Leaf className="size-6" />
              </span>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand">
                Our mission
              </p>

              <h2 className="mt-2 font-display text-2xl font-extrabold">
                Make better food choices easier.
              </h2>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                FoodFlow brings discovery, ordering, payment and
                delivery tracking into one connected experience.
                We want customers to spend less time figuring out
                how to order and more time enjoying their food.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-teal-soft p-6 sm:p-8">
          <span className="grid size-12 place-items-center rounded-xl bg-card text-teal shadow-card">
            <Users className="size-6" />
          </span>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Built for everyone
          </p>

          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            One simple experience for hungry people and great restaurants.
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Whether you are searching for a quick lunch, planning
            dinner with friends or simply craving your favorite
            dessert, FoodFlow is designed to keep the journey
            straightforward.
          </p>

          <div className="mt-6 space-y-3">
            <FeatureRow
              icon={Search}
              text="Discover food by category or restaurant"
            />

            <FeatureRow
              icon={ShoppingBag}
              text="Build your order with clear pricing"
            />

            <FeatureRow
              icon={Bike}
              text="Track delivery from preparation to arrival"
            />

            <FeatureRow
              icon={MessageCircle}
              text="Get support whenever you need it"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-14">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            What matters to us
          </p>

          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            The principles behind FoodFlow
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Every feature is shaped by the same goal: make food
            ordering useful, trustworthy and enjoyable.
          </p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon

            return (
              <article
                key={value.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-brand-muted text-brand">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 font-display text-lg font-extrabold">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {value.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* How FoodFlow Works */}
      <section className="mt-14 rounded-3xl bg-teal-soft px-5 py-9 sm:px-8 sm:py-11">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Simple from start to finish
          </p>

          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            How FoodFlow works
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            A clear journey built around the way people actually order food.
          </p>
        </div>

        <div className="mt-9 grid gap-8 md:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="relative text-center md:text-left"
              >
                <div className="relative mx-auto w-fit md:mx-0">
                  <span className="grid size-16 place-items-center rounded-full bg-card text-teal shadow-card">
                    <Icon className="size-7" />
                  </span>

                  <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-teal text-xs font-bold text-teal-foreground">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Trust / Delivery */}
      <section className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl bg-navy p-6 text-white sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-teal text-teal-foreground">
              <ShieldCheck className="size-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">
                Built around trust
              </p>

              <h2 className="mt-2 font-display text-2xl font-extrabold">
                Clear information at every step.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                From restaurant details and delivery timing to
                checkout and order tracking, FoodFlow keeps important
                information visible so customers can make confident
                decisions.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <TrustItem text="Clear pricing before checkout" />
            <TrustItem text="Secure payment experience" />
            <TrustItem text="Order status visibility" />
            <TrustItem text="Accessible customer support" />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-xl bg-brand-muted text-brand">
              <Clock3 className="size-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                Delivery experience
              </p>

              <h2 className="mt-1 font-display text-xl font-extrabold">
                Keep customers informed.
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <DeliveryPoint
              icon={CheckCircle2}
              title="Order confirmed"
              text="Know that your order has been received."
            />

            <DeliveryPoint
              icon={Utensils}
              title="Preparing"
              text="See when the restaurant starts preparing your meal."
            />

            <DeliveryPoint
              icon={Bike}
              title="On the way"
              text="Follow delivery progress once your rider picks it up."
            />

            <DeliveryPoint
              icon={MapPin}
              title="Delivered"
              text="Finish with a clear confirmation that your order arrived."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 overflow-hidden rounded-3xl bg-brand px-5 py-9 text-brand-foreground sm:px-8 sm:py-11">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-80">
              Your next meal is waiting
            </p>

            <h2 className="mt-2 max-w-2xl font-display text-2xl font-extrabold sm:text-3xl">
              Ready to discover something delicious?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 opacity-80">
              Explore categories, browse restaurants and build your
              order with FoodFlow.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-brand shadow-sm transition hover:bg-white/90"
            >
              Browse Categories
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/restaurant/the-burger-house"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              View Restaurant
            </Link>
          </div>
        </div>
      </section>

      {/* Closing strip */}
      <section className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-5 text-center shadow-card sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-full bg-brand-muted text-brand">
            <Leaf className="size-5" />
          </div>

          <div>
            <p className="text-sm font-extrabold">
              Simple. Fresh. Reliable.
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              That is the experience we want every FoodFlow order to deliver.
            </p>
          </div>
        </div>

        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
        >
          Start exploring
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  )
}

function FeatureRow({
  icon: Icon,
  text,
}: {
  icon: typeof Search
  text: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-brand/10 bg-card px-3 py-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-muted text-brand">
        <Icon className="size-4" />
      </span>

      <span className="text-sm font-semibold text-foreground">
        {text}
      </span>
    </div>
  )
}

function TrustItem({
  text,
}: {
  text: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-3">
      <CheckCircle2 className="size-4 shrink-0 text-teal" />
      <span className="text-sm text-white/80">
        {text}
      </span>
    </div>
  )
}

function DeliveryPoint({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CheckCircle2
  title: string
  text: string
}) {
  return (
    <div className="flex gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-muted text-brand">
        <Icon className="size-4" />
      </span>

      <div>
        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  )
}