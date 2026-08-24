'use client'

import { Minus, Plus } from 'lucide-react'

type QuantityControlProps = {
  value: number
  onChange: (next: number) => void
  label: string
}

export function QuantityControl({ value, onChange, label }: QuantityControlProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        aria-label={`Decrease ${label} quantity`}
        onClick={() => onChange(Math.max(0, value - 1))}
        className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span className="w-4 text-center text-sm font-semibold tabular-nums text-foreground">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label} quantity`}
        onClick={() => onChange(value + 1)}
        className="grid size-7 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-teal hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}