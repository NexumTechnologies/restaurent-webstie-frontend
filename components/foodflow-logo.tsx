import { cn } from '@/lib/utils'

type FoodFlowLogoProps = {
  className?: string
  /** Brand accent tone. 'green' is used on auth pages, 'teal' on the main site. */
  tone?: 'green' | 'teal'
  /** Uses light word-mark text suitable for dark backgrounds. */
  inverted?: boolean
}

export function FoodFlowLogo({
  className,
  tone = 'green',
  inverted = false,
}: FoodFlowLogoProps) {
  const isTeal = tone === 'teal'

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'grid size-8 place-items-center',
          isTeal
            ? 'rounded-xl bg-teal text-teal-foreground'
            : 'rounded-full bg-brand-muted text-brand',
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* bowl */}
          <path
            d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z"
            fill="currentColor"
            opacity="0.95"
          />
          {/* leaf / steam */}
          <path
            d="M12 3c2.6 0 4.2 1.7 4.2 3.9 0 .6-.1 1.1-.3 1.6-1-1.6-2.6-2.4-3.9-2.4 1.6.9 2.6 2.3 2.6 2.3H8.1S9.4 3 12 3Z"
            fill={isTeal ? 'currentColor' : '#f6b41f'}
            opacity={isTeal ? 0.7 : 1}
          />
        </svg>
      </span>
      <span
        className={cn(
          'font-display text-lg font-extrabold tracking-tight',
          inverted ? 'text-white' : 'text-foreground',
        )}
      >
        Food
        <span className={isTeal ? 'text-teal' : 'text-brand'}>Flow</span>
      </span>
    </span>
  )
}
