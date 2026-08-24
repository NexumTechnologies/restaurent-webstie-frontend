'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground shadow-xs outline-none transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
