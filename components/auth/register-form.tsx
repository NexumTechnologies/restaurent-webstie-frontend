'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Lock } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { AuthField } from '@/components/auth/auth-field'
import { register } from '@/lib/api'

export function RegisterForm() {
  const router = useRouter()
  const [agreed, setAgreed] = React.useState(false)
  const [formError, setFormError] = React.useState('')

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: ({ accessToken, user }) => {
      window.localStorage.setItem('foodflow_access_token', accessToken)
      window.localStorage.setItem('foodflow_user', JSON.stringify(user))
      router.push('/')
      router.refresh()
    },
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    if (!agreed) {
      return setFormError(
        'Please accept the Terms & Conditions and Privacy Policy.'
      )
    }

    const formData = new FormData(event.currentTarget)
    const password = String(formData.get('password') ?? '')

    if (password !== String(formData.get('confirmPassword') ?? '')) {
      return setFormError('Passwords do not match.')
    }

    registerMutation.mutate({
      name: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      address: String(formData.get('address') ?? ''),
      password,
    })
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
            <Link
              href="#"
              className="font-medium text-teal hover:underline"
            >
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link
              href="#"
              className="font-medium text-teal hover:underline"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          disabled={!agreed || registerMutation.isPending}
          className="h-11 w-full bg-brand text-brand-foreground [a]:hover:bg-brand/90 hover:bg-brand/90"
        >
          {registerMutation.isPending ? 'Creating account...' : 'Register'}
        </Button>

        {(formError || registerMutation.isError) && (
          <p role="alert" className="text-sm text-destructive">
            {formError || registerMutation.error.message}
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-teal hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  )
}