'use client'

import {
  Beer,
  CakeSlice,
  ChevronRight,
  CookingPot,
  Drumstick,
  IceCreamCone,
  LayoutGrid,
  Package,
  Pizza,
  Sandwich,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { MenuIconName, MenuItem, MenuSection } from '@/lib/restaurant'
import { MenuItemCard } from '@/components/restaurant/menu-item-card'

type MenuCategorySectionProps = {
  section: MenuSection
  quantities: Record<string, number>
  onQuantityChange: (item: MenuItem, quantity: number) => void
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

export function MenuCategorySection({
  section,
  quantities,
  onQuantityChange,
}: MenuCategorySectionProps) {
  const Icon = iconMap[section.icon] ?? LayoutGrid

  return (
    <section className="mb-8 scroll-mt-4">
      <div className="mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            className="size-[18px] text-teal"
            aria-hidden="true"
          />

          <h3 className="font-display text-lg font-bold text-foreground">
            {section.title}
          </h3>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-0.5 text-sm font-semibold text-teal transition-colors hover:text-teal/80"
        >
          View All
          <ChevronRight className="size-[15px]" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {section.items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={quantities[item.id] || 0}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    </section>
  )
}