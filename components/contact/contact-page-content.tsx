'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Headphones,
  HelpCircle,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Star,
} from 'lucide-react'

const contactMethods = [
  {
    icon: Headphones,
    title: 'Customer Support',
    description:
      'Need help with an order, payment or delivery? Our support team is here to help.',
    action: 'Chat with Support',
    href: '#contact-form',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description:
      'Speak directly with our support team for quick assistance.',
    action: '+92 300 1234567',
    href: 'tel:+923001234567',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description:
      'Send us your questions, feedback or business inquiries.',
    action: 'support@foodflow.pk',
    href: 'mailto:support@foodflow.pk',
  },
]

const quickHelp = [
  {
    icon: ShoppingBag,
    title: 'Order Help',
    description:
      'Issues with an existing order, missing items or delivery.',
    href: '/checkout/tracking',
    linkText: 'Track Order',
  },
  {
    icon: ShieldCheck,
    title: 'Payment Help',
    description:
      'Questions about payment methods, charges or refunds.',
    href: '#contact-form',
    linkText: 'Get Support',
  },
  {
    icon: MessageCircle,
    title: 'General Support',
    description:
      'Something else? Tell us what you need and we will guide you.',
    href: '#contact-form',
    linkText: 'Contact Us',
  },
]

const faqs = [
  {
    question:
      'How can I track my order?',
    answer:
      'Open your order confirmation and choose Track Your Order. You can follow the delivery status and current rider progress from there.',
  },
  {
    question:
      'What should I do if an item is missing?',
    answer:
      'Contact support with your order ID and the missing item details. Our support team can help resolve the issue.',
  },
  {
    question:
      'Which payment methods are supported?',
    answer:
      'FoodFlow supports cash on delivery, card payments, Easypaisa, JazzCash, bank transfer and wallet balance where available.',
  },
  {
    question:
      'Can I change my delivery address?',
    answer:
      'Address changes should be made before the order is finalized. For an existing order, contact support as soon as possible.',
  },
]

export function ContactPageContent() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Support',
    message: '',
  })

  const [errors, setErrors] =
    useState<
      Partial<
        Record<
          keyof typeof form,
          string
        >
      >
    >({})

  const [submitted, setSubmitted] =
    useState(false)

  const [openFaq, setOpenFaq] =
    useState<number | null>(0)

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))

    setSubmitted(false)
  }

  function validate() {
    const nextErrors: Partial<
      Record<
        keyof typeof form,
        string
      >
    > = {}

    if (!form.name.trim()) {
      nextErrors.name =
        'Name is required.'
    }

    if (!form.email.trim()) {
      nextErrors.email =
        'Email is required.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email,
      )
    ) {
      nextErrors.email =
        'Enter a valid email address.'
    }

    if (!form.message.trim()) {
      nextErrors.message =
        'Please enter your message.'
    } else if (
      form.message.trim().length <
      10
    ) {
      nextErrors.message =
        'Please provide a little more detail.'
    }

    setErrors(nextErrors)

    return (
      Object.keys(
        nextErrors,
      ).length === 0
    )
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    setSubmitted(true)

    setForm({
      name: '',
      email: '',
      phone: '',
      subject:
        'Order Support',
      message: '',
    })
  }

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
          Contact
        </span>
      </nav>

      {/* Hero */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-navy text-white shadow-card">
        <div className="grid items-center lg:grid-cols-[1fr_0.8fr]">
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 sm:text-sm">
              <MessageCircle className="size-4 text-teal" />
              We are here to help
            </span>

            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Let&apos;s talk.
              <br />
              <span className="text-teal">
                We&apos;re listening.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Have a question about your order, payment,
              restaurant or delivery? Send us a message and
              our support team will help you out.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white/85">
                <Clock3 className="size-4 text-teal" />
                24/7 Support
              </span>

              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white/85">
                <ShieldCheck className="size-4 text-teal" />
                Secure assistance
              </span>

              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white/85">
                <Headphones className="size-4 text-teal" />
                Customer-first
              </span>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[330px]">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
              alt="Customer support"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/35 to-transparent" />

            <div className="absolute bottom-6 left-5 right-5 sm:left-8 sm:right-8">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-full bg-teal text-teal-foreground">
                    <Headphones className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Need help right now?
                    </p>

                    <p className="mt-0.5 text-xs text-white/65">
                      Our support team is ready to assist.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="mt-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Contact options
          </p>

          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            Choose the way that works for you
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Whether you need quick order support or want to send
            us detailed feedback, we&apos;re here.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {contactMethods.map(
            (method) => {
              const Icon =
                method.icon

              return (
                <a
                  key={method.title}
                  href={method.href}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-muted text-brand">
                      <Icon className="size-6" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-extrabold">
                        {method.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {method.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">
                        {method.action}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </a>
              )
            },
          )}
        </div>
      </section>

      {/* Main contact area */}
      <section
        id="contact-form"
        className="mt-12 grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
      >
        {/* Form */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Send us a message
            </p>

            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
              How can we help?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Tell us what&apos;s going on and include your
              order number when it&apos;s related to an existing order.
            </p>
          </div>

          {submitted && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-brand/20 bg-brand-muted p-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                <Check className="size-4" />
              </div>

              <div>
                <p className="text-sm font-extrabold text-brand-dark">
                  Message sent successfully.
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Thanks for contacting FoodFlow. Our team
                  will review your message and get back to you.
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Full Name"
                required
                value={form.name}
                onChange={(value) =>
                  updateField(
                    'name',
                    value,
                  )
                }
                error={errors.name}
                placeholder="Enter your name"
              />

              <Field
                label="Email Address"
                required
                type="email"
                value={form.email}
                onChange={(value) =>
                  updateField(
                    'email',
                    value,
                  )
                }
                error={errors.email}
                placeholder="you@example.com"
              />

              <Field
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(value) =>
                  updateField(
                    'phone',
                    value,
                  )
                }
                error={errors.phone}
                placeholder="+92 300 1234567"
              />

              <div>
                <label className="text-sm font-bold">
                  Subject
                </label>

                <div className="relative">
                  <select
                    value={
                      form.subject
                    }
                    onChange={(event) =>
                      updateField(
                        'subject',
                        event.target
                          .value,
                      )
                    }
                    className="mt-2 h-11 w-full appearance-none rounded-xl border border-border bg-background px-3 pr-10 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
                  >
                    <option>
                      Order Support
                    </option>

                    <option>
                      Payment Issue
                    </option>

                    <option>
                      Delivery Issue
                    </option>

                    <option>
                      Restaurant Feedback
                    </option>

                    <option>
                      General Question
                    </option>

                    <option>
                      Business Inquiry
                    </option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-5 size-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-bold">
                Message
                <span className="ml-1 text-brand">
                  *
                </span>
              </label>

              <textarea
                value={form.message}
                onChange={(event) =>
                  updateField(
                    'message',
                    event.target
                      .value,
                  )
                }
                rows={6}
                placeholder="Tell us how we can help..."
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15"
              />

              {errors.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-brand" />
                Your information is kept private and secure.
              </p>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-brand-foreground transition hover:bg-brand/90"
              >
                Send Message
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Contact information */}
        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-teal-soft p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              FoodFlow Support
            </p>

            <h2 className="mt-2 font-display text-2xl font-extrabold">
              We&apos;re just a message away.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              For order-related issues, keep your order ID nearby
              so we can help you faster.
            </p>

            <div className="mt-6 space-y-4">
              <InfoRow
                icon={Phone}
                title="Phone"
                value="+92 300 1234567"
              />

              <InfoRow
                icon={Mail}
                title="Email"
                value="support@foodflow.pk"
              />

              <InfoRow
                icon={Clock3}
                title="Support Hours"
                value="24 hours • 7 days a week"
              />

              <InfoRow
                icon={MapPin}
                title="Service Area"
                value="Available in selected cities"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-brand-muted text-brand">
                <HelpCircle className="size-5" />
              </div>

              <div>
                <h3 className="font-display text-lg font-extrabold">
                  Need quick help?
                </h3>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Try these popular support options.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {quickHelp.map(
                (item) => {
                  const Icon =
                    item.icon

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-brand/30 hover:bg-brand-muted/40"
                    >
                      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-muted text-brand">
                        <Icon className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">
                          {item.title}
                        </p>

                        <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <ArrowRight className="size-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                    </Link>
                  )
                },
              )}
            </div>
          </div>
        </aside>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Frequently asked
          </p>

          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            Common questions
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Quick answers to common FoodFlow support questions.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          {faqs.map(
            (faq, index) => {
              const open =
                openFaq === index

              return (
                <div
                  key={faq.question}
                  className={
                    index !== 0
                      ? 'border-t border-border'
                      : ''
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(
                        open
                          ? null
                          : index,
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
                  >
                    <span className="text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={[
                        'size-5 shrink-0 text-muted-foreground transition-transform',
                        open
                          ? 'rotate-180 text-brand'
                          : '',
                      ].join(' ')}
                    />
                  </button>

                  {open && (
                    <div className="px-4 pb-5 sm:px-6">
                      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            },
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-12 overflow-hidden rounded-3xl bg-brand px-5 py-9 text-brand-foreground sm:px-8 sm:py-11">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-80">
              Need something else?
            </p>

            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
              Your next FoodFlow order is only a few taps away.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 opacity-80">
              Explore categories, find a restaurant and enjoy the
              FoodFlow experience.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-brand shadow-sm transition hover:bg-white/90"
          >
            Browse Categories
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------
   Field
------------------------------------------------- */

function Field({
  label,
  required = false,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string
  required?: boolean
  type?: string
  value: string
  onChange: (
    value: string,
  ) => void
  error?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="text-sm font-bold">
        {label}

        {required && (
          <span className="ml-1 text-brand">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15"
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

/* -------------------------------------------------
   Info Row
------------------------------------------------- */

function InfoRow({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Phone
  title: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-card text-brand shadow-sm">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">
          {title}
        </p>

        <p className="mt-0.5 truncate text-sm font-bold">
          {value}
        </p>
      </div>
    </div>
  )
}