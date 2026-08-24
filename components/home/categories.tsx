import {
  CupSoda,
  IceCreamCone,
  Leaf,
  Pizza,
  Salad,
  Sandwich,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeader } from '@/components/home/section-header'

type Category = {
  label: string
  items: number
  icon: LucideIcon
  tint: string
  fg: string
}

const categories: Category[] = [
  { label: 'Burgers', items: 24, icon: Sandwich, tint: 'bg-teal-soft', fg: 'text-teal' },
  { label: 'Pizza', items: 18, icon: Pizza, tint: 'bg-[#e7f5ec]', fg: 'text-[#2f9e58]' },
  { label: 'Rice', items: 16, icon: Salad, tint: 'bg-[#e7eefb]', fg: 'text-[#3f6fd1]' },
  { label: 'Drinks', items: 12, icon: CupSoda, tint: 'bg-teal-soft', fg: 'text-teal' },
  { label: 'Desserts', items: 15, icon: IceCreamCone, tint: 'bg-[#f2e9fb]', fg: 'text-[#8b5cd6]' },
  { label: 'Healthy', items: 10, icon: Leaf, tint: 'bg-[#e7f5ec]', fg: 'text-[#2f9e58]' },
]

export function Categories() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6">
      <SectionHeader
        title="Browse by category"
        subtitle="Find what you are craving today."
        viewAllHref="#restaurants"
      />

      <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6">
        {categories.map(({ label, items, icon: Icon, tint, fg }) => (
          <li key={label}>
            <button
              type="button"
              className="group flex w-full flex-col items-center gap-3 text-center"
            >
              <span
                className={`grid size-16 place-items-center rounded-full ${tint} ${fg} transition-transform group-hover:-translate-y-1`}
              >
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {items} items
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
