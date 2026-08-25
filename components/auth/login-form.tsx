'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { AuthField } from '@/components/auth/auth-field'
import { SocialLoginButtons } from '@/components/auth/social-login-buttons'
import { login } from '@/lib/api'

export function LoginForm() {
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken, user }) => {
      window.localStorage.setItem('foodflow_access_token', accessToken)
      window.localStorage.setItem('foodflow_user', JSON.stringify(user))
      router.push('/')
      router.refresh()
    },
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    loginMutation.mutate({
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    })
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
            className="self-end text-sm font-medium text-teal hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="h-11 w-full bg-brand text-brand-foreground [a]:hover:bg-brand/90 hover:bg-brand/90"
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Button>

        {loginMutation.isError && (
          <p role="alert" className="text-sm text-destructive">
            {loginMutation.error.message}
          </p>
        )}
      </form>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">
          or continue with
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <SocialLoginButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-semibold text-teal hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}