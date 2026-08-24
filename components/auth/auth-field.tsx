'use client'

import * as React from 'react'
import { Eye, EyeOff, type LucideIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type AuthFieldProps = {
  id: string
  label: string
  icon: LucideIcon
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  required?: boolean
  /** Renders a show/hide toggle and manages the visibility state internally. */
  password?: boolean
}

export function AuthField({
  id,
  label,
  icon: Icon,
  type = 'text',
  placeholder,
  autoComplete,
  required,
  password = false,
}: AuthFieldProps) {
  const [visible, setVisible] = React.useState(false)
  const resolvedType = password ? (visible ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          id={id}
          name={id}
          type={resolvedType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={cn('pl-9', password && 'pr-10')}
        />
        {password ? (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:outline-none"
          >
            {visible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  )
}
