'use client'

import * as React from 'react'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthField } from '@/components/auth/auth-field'

export function RegisterForm() {
  const [agreed, setAgreed] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!agreed) return
    setSubmitting(true)
    // TODO: connect to real authentication backend here.
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSubmitting(false)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Join FoodFlow
        </h2>
        <p className="text-sm text-muted-foreground">
          Register to start ordering your favourite food.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <AuthField
          id="fullName"
          label="Full Name"
          icon={User}
          placeholder="Enter your full name"
          autoComplete="name"
          required
        />
        <AuthField
          id="email"
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
        />
        <AuthField
          id="phone"
          label="Phone Number"
          icon={Phone}
          type="tel"
          placeholder="Enter your phone number"
          autoComplete="tel"
          required
        />
        <AuthField
          id="address"
          label="Address"
          icon={MapPin}
          placeholder="Enter your address"
          autoComplete="street-address"
          required
        />
        <AuthField
          id="password"
          label="Password"
          icon={Lock}
          placeholder="Enter your password"
          autoComplete="new-password"
          required
          password
        />
        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          icon={Lock}
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
          password
        />

        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-border text-brand accent-brand focus-visible:ring-2 focus-visible:ring-brand/30"
          />
          <span>
            I agree to the{' '}
            <Link href="#" className="font-medium text-brand hover:underline">
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link href="#" className="font-medium text-brand hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          disabled={!agreed || submitting}
          className="h-11 w-full bg-brand text-brand-foreground [a]:hover:bg-brand/90 hover:bg-brand/90"
        >
          {submitting ? 'Creating account…' : 'Register'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-brand hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
