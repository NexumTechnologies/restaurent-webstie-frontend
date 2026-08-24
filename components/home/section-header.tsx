import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type SectionHeaderProps = {
  title: string
  subtitle: string
  viewAllHref?: string
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-teal/80"
        >
          View all
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
