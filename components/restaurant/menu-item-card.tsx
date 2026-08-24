'use client'

import Image from 'next/image'
import type { MenuItem } from '@/lib/restaurant'
import { QuantityControl } from '@/components/restaurant/quantity-control'

type MenuItemCardProps = {
  item: MenuItem
  quantity: number
  onQuantityChange: (item: MenuItem, quantity: number) => void
}

export function MenuItemCard({ item, quantity, onQuantityChange }: MenuItemCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden sm:h-44">
        <Image
          src={item.image || '/placeholder.svg'}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-teal px-2.5 py-1 text-[11px] font-semibold text-teal-foreground shadow-sm">
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex-1">
          <h4 className="font-display text-[15px] font-bold leading-snug text-foreground">
            {item.name}
          </h4>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>

        <div className="text-[15px] font-bold text-foreground">
          Rs. {item.price.toLocaleString()}
        </div>

        <div className="flex items-center justify-between pt-1">
          <QuantityControl
            value={quantity}
            label={item.name}
            onChange={(next) => onQuantityChange(item, next)}
          />
          <button
            type="button"
            onClick={() => onQuantityChange(item, Math.max(1, quantity))}
            className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-teal-foreground transition-colors hover:bg-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 focus-visible:ring-offset-1"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}