'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import {
  Bike,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  Headphones,
  Home,
  KeyRound,
  Leaf,
  LogOut,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  RefreshCw,
  Save,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react'

type ProfileForm = {
  fullName: string
  email: string
  phone: string
  address: string
}

type PasswordForm = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const INITIAL_PROFILE: ProfileForm = {
  fullName: 'Ali Khan',
  email: 'ali.khan@email.com',
  phone: '+92 300 1234567',
  address:
    '123, Green Avenue, Johar Town,\nLahore, Punjab 54000, Pakistan',
}

const SIDEBAR_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Browse Restaurants',
    href: '/categories',
    icon: UtensilsIcon,
  },
  {
    label: 'My Cart',
    href: '/cart',
    icon: ShoppingCart,
    badge: '3',
  },
  {
    label: 'Current Orders',
    href: '/orders/current',
    icon: PackageCheck,
  },
  {
    label: 'Order History',
    href: '/my-orders',
    icon: FileText,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
]

export function ProfilePageContent() {
  const [profile, setProfile] =
    useState<ProfileForm>(
      INITIAL_PROFILE,
    )

  const [password, setPassword] =
    useState<PasswordForm>({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })

  const [profileMessage, setProfileMessage] =
    useState('')

  const [passwordMessage, setPasswordMessage] =
    useState('')

  const [passwordError, setPasswordError] =
    useState('')

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false)

  const [showNewPassword, setShowNewPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false)

  function updateProfileField(
    field: keyof ProfileForm,
    value: string,
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }))

    setProfileMessage('')
  }

  function updatePasswordField(
    field: keyof PasswordForm,
    value: string,
  ) {
    setPassword((current) => ({
      ...current,
      [field]: value,
    }))

    setPasswordMessage('')
    setPasswordError('')
  }

  function handleProfileSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setProfileMessage(
      'Profile information updated successfully.',
    )
  }

  function handlePasswordSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setPasswordMessage('')
    setPasswordError('')

    if (!password.currentPassword.trim()) {
      setPasswordError(
        'Please enter your current password.',
      )
      return
    }

    if (password.newPassword.length < 8) {
      setPasswordError(
        'New password must be at least 8 characters.',
      )
      return
    }

    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      setPasswordError(
        'New password and confirmation do not match.',
      )
      return
    }

    setPasswordMessage(
      'Password updated successfully.',
    )

    setPassword({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  return (
    <div className="w-full">
      {/* Mobile menu button */}
      <div className="border-b border-border bg-card px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() =>
            setMobileSidebarOpen(true)
          }
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-bold"
        >
          <Menu className="size-4" />
          Account Menu
        </button>
      </div>

      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Desktop Sidebar */}
        <aside className="hidden w-[220px] shrink-0 border-r border-border bg-card lg:block">
          <ProfileSidebar />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-[70] bg-black/40 lg:hidden"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
          >
            <aside
              className="h-full w-[280px] bg-card shadow-2xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">
                    Account
                  </p>

                  <p className="mt-1 font-display text-lg font-extrabold">
                    FoodFlow
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileSidebarOpen(false)
                  }
                  className="grid size-9 place-items-center rounded-full border border-border"
                  aria-label="Close account menu"
                >
                  <X className="size-4" />
                </button>
              </div>

              <ProfileSidebar
                mobile
                onNavigate={() =>
                  setMobileSidebarOpen(false)
                }
              />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 bg-background">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-sm text-muted-foreground"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-foreground"
              >
                Home
              </Link>

              <ChevronRight className="size-4" />

              <span className="font-medium text-foreground">
                Profile
              </span>
            </nav>

            {/* Heading */}
            <div className="mt-5">
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                My Profile
              </h1>

              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                View and update your account information.
              </p>
            </div>

            {/* Profile Information */}
            <section className="mt-7 rounded-2xl border border-border bg-card shadow-card">
              <div className="border-b border-border px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-teal-50 text-teal-600">
                    <User className="size-5" />
                  </div>

                  <h2 className="font-display text-lg font-extrabold sm:text-xl">
                    Profile Information
                  </h2>
                </div>
              </div>

              <form
                onSubmit={
                  handleProfileSubmit
                }
                className="p-5 sm:p-6"
              >
                <div className="space-y-5">
                  {/* Full Name */}
                  <ProfileInput
                    icon={User}
                    label="Full Name"
                    value={
                      profile.fullName
                    }
                    onChange={(value) =>
                      updateProfileField(
                        'fullName',
                        value,
                      )
                    }
                  />

                  {/* Email */}
                  <ProfileInput
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    onChange={(value) =>
                      updateProfileField(
                        'email',
                        value,
                      )
                    }
                  />

                  {/* Phone */}
                  <ProfileInput
                    icon={Phone}
                    label="Phone Number"
                    type="tel"
                    value={profile.phone}
                    onChange={(value) =>
                      updateProfileField(
                        'phone',
                        value,
                      )
                    }
                  />

                  {/* Address */}
                  <div>
                    <label className="text-sm font-semibold">
                      Address
                    </label>

                    <div className="relative mt-2">
                      <MapPin className="pointer-events-none absolute left-3 top-3.5 size-5 text-muted-foreground" />

                      <textarea
                        value={
                          profile.address
                        }
                        onChange={(event) =>
                          updateProfileField(
                            'address',
                            event.target
                              .value,
                          )
                        }
                        rows={2}
                        className="w-full resize-none rounded-xl border border-border bg-background py-3 pl-10 pr-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
                      />
                    </div>
                  </div>

                  {/* Success */}
                  {profileMessage && (
                    <SuccessMessage
                      message={
                        profileMessage
                      }
                    />
                  )}

                  {/* Save */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-teal-700"
                  >
                    <Save className="size-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </section>

            {/* Change Password */}
            <section className="mt-5 rounded-2xl border border-border bg-card shadow-card">
              <div className="border-b border-border px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-teal-50 text-teal-600">
                    <KeyRound className="size-5" />
                  </div>

                  <h2 className="font-display text-lg font-extrabold sm:text-xl">
                    Change Password
                  </h2>
                </div>
              </div>

              <form
                onSubmit={
                  handlePasswordSubmit
                }
                className="p-5 sm:p-6"
              >
                <div className="space-y-5">
                  <PasswordInput
                    label="Current Password"
                    placeholder="Enter current password"
                    value={
                      password.currentPassword
                    }
                    onChange={(value) =>
                      updatePasswordField(
                        'currentPassword',
                        value,
                      )
                    }
                    visible={
                      showCurrentPassword
                    }
                    onToggle={() =>
                      setShowCurrentPassword(
                        (current) =>
                          !current,
                      )
                    }
                  />

                  <PasswordInput
                    label="New Password"
                    placeholder="Enter new password"
                    value={
                      password.newPassword
                    }
                    onChange={(value) =>
                      updatePasswordField(
                        'newPassword',
                        value,
                      )
                    }
                    visible={
                      showNewPassword
                    }
                    onToggle={() =>
                      setShowNewPassword(
                        (current) =>
                          !current,
                      )
                    }
                  />

                  <PasswordInput
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={
                      password.confirmPassword
                    }
                    onChange={(value) =>
                      updatePasswordField(
                        'confirmPassword',
                        value,
                      )
                    }
                    visible={
                      showConfirmPassword
                    }
                    onToggle={() =>
                      setShowConfirmPassword(
                        (current) =>
                          !current,
                      )
                    }
                  />

                  {passwordError && (
                    <ErrorMessage
                      message={
                        passwordError
                      }
                    />
                  )}

                  {passwordMessage && (
                    <SuccessMessage
                      message={
                        passwordMessage
                      }
                    />
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-teal-700"
                  >
                    <KeyRound className="size-4" />
                    Update Password
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>

      {/* Bottom Benefits */}
      <section className="mx-auto mb-5 mt-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-teal-50/35 sm:grid-cols-2 lg:grid-cols-4">
          <Benefit
            icon={Bike}
            title="Fast Delivery"
            text="Quick delivery at your doorstep"
          />

          <Benefit
            icon={ShieldCheck}
            title="Secure Payments"
            text="100% safe & secure payments"
          />

          <Benefit
            icon={RefreshCw}
            title="Easy Returns"
            text="Hassle-free order cancellation"
          />

          <Benefit
            icon={Sparkles}
            title="Best Quality"
            text="Fresh & hygienic food for you"
          />
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------
   Sidebar
------------------------------------------------- */

function ProfileSidebar({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean
  onNavigate?: () => void
}) {
  return (
    <nav
      className={[
        'py-5',
        mobile
          ? 'px-3'
          : 'sticky top-0 min-h-[calc(100vh-72px)]',
      ].join(' ')}
    >
      <div className="space-y-1">
        {SIDEBAR_ITEMS.map(
          (item) => {
            const Icon =
              item.icon

            const active =
              item.label === 'Profile'

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={[
                  'relative flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition',
                  active
                    ? 'bg-teal-50 font-bold text-teal-600'
                    : 'text-foreground/80 hover:bg-muted hover:text-foreground',
                ].join(' ')}
              >
                {active && (
                  <span className="absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-teal-600" />
                )}

                <Icon className="size-5 shrink-0" />

                <span className="flex-1">
                  {item.label}
                </span>

                {item.badge && (
                  <span className="grid size-5 place-items-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          },
        )}

        <button
          type="button"
          onClick={() =>
            alert('Logout action will be connected here.')
          }
          className="flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground"
        >
          <LogOut className="size-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  )
}

/* -------------------------------------------------
   Profile Input
------------------------------------------------- */

function ProfileInput({
  icon: Icon,
  label,
  type = 'text',
  value,
  onChange,
}: {
  icon: typeof User
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
      </label>

      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className="h-11 w-full rounded-xl border border-border bg-background px-3 pl-10 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Password Input
------------------------------------------------- */

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  visible,
  onToggle,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  visible: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
      </label>

      <div className="relative mt-2">
        <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type={
            visible
              ? 'text'
              : 'password'
          }
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          placeholder={
            placeholder
          }
          className="h-11 w-full rounded-xl border border-border bg-background px-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={
            visible
              ? 'Hide password'
              : 'Show password'
          }
        >
          {visible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Success / Error
------------------------------------------------- */

function SuccessMessage({
  message,
}: {
  message: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-teal-600/20 bg-teal-50 px-4 py-3">
      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-teal-600 text-white">
        <Check className="size-4" />
      </div>

      <p className="text-sm font-semibold text-teal-700">
        {message}
      </p>
    </div>
  )
}

function ErrorMessage({
  message,
}: {
  message: string
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
      {message}
    </div>
  )
}

/* -------------------------------------------------
   Benefits
------------------------------------------------- */

function Benefit({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Bike
  title: string
  text: string
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-5 last:border-b-0 sm:px-5 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-card text-teal-600">
        <Icon className="size-6" />
      </div>

      <div>
        <p className="text-sm font-extrabold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------
   Icon wrapper used in sidebar
------------------------------------------------- */

function UtensilsIcon(
  props: React.ComponentProps<
    typeof ShoppingCart
  >,
) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 3v8" />
      <path d="M4 3v5a3 3 0 0 0 6 0V3" />
      <path d="M7 11v10" />
      <path d="M17 3c1.7 2.1 2.5 4.3 2.5 6.3 0 1.8-1 3.2-2.5 3.2s-2.5-1.4-2.5-3.2c0-2 .8-4.2 2.5-6.3Z" />
      <path d="M17 12.5V21" />
    </svg>
  )
}