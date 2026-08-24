import type { LucideIcon } from 'lucide-react'

export type AuthFeatureItem = {
  icon: LucideIcon
  title: string
  description: string
}

export function AuthFeature({ icon: Icon, title, description }: AuthFeatureItem) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-muted text-brand">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
