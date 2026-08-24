'use client'

import {
  Beer,
  CakeSlice,
  CookingPot,
  Drumstick,
  IceCreamCone,
  LayoutGrid,
  Package,
  Pizza,
  Sandwich,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { MenuCategory, MenuIconName } from '@/lib/restaurant'

type CategoriesCardProps = {
  categories: MenuCategory[]
  active: string
  onSelect: (category: string) => void
}

const iconMap: Record<MenuIconName, ComponentType<{ className?: string }>> = {
  all: LayoutGrid,
  burger: Sandwich,
  pizza: Pizza,
  fries: Drumstick,
  drink: Beer,
  dessert: IceCreamCone,
  combo: Package,
}

export function CategoriesCard({
  categories,
  active,
  onSelect,
}: CategoriesCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="px-4 py-4">
        <h3 className="font-display text-base font-bold text-foreground">
          Categories
        </h3>
      </div>

      <div className="pb-2">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] ?? LayoutGrid
          const isActive = active === category.id

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left text-sm transition-colors ${
                isActive
                  ? 'border-teal bg-teal/10 text-foreground'
                  : 'border-transparent text-foreground hover:bg-muted'
              }`}
            >
              <Icon
                className={`size-5 shrink-0 ${
                  isActive ? 'text-teal' : 'text-muted-foreground'
                }`}
                aria-hidden="true"
              />

              <span className="min-w-0 flex-1 font-medium">
                {category.label}
              </span>

              <span className="text-xs text-muted-foreground">
                ({category.count})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}