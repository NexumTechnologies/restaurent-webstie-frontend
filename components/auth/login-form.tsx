'use client'

import * as React from 'react'
import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthField } from '@/components/auth/auth-field'
import { SocialLoginButtons } from '@/components/auth/social-login-buttons'

export function LoginForm() {
  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    // TODO: connect to real authentication backend here.
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSubmitting(false)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Welcome Back!
        </h2>
        <p className="text-sm text-muted-foreground">
          Login to continue to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <AuthField
          id="email"
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        <div className="flex flex-col gap-1.5">
          <AuthField
            id="password"
            label="Password"
            icon={Lock}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            password
          />
          <Link
            href="#"
            className="self-end text-sm font-medium text-brand hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full bg-brand text-brand-foreground [a]:hover:bg-brand/90 hover:bg-brand/90"
        >
          {submitting ? 'Logging in…' : 'Login'}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <SocialLoginButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-brand hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
