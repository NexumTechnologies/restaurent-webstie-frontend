'use client'


import { Search } from 'lucide-react'
import type { MenuCategory, MenuItem, MenuSection } from '@/lib/restaurant'
import { CategoriesCard } from '@/components/restaurant/categories-card'
import { CartCard, type CartLine } from '@/components/restaurant/cart-card'
import { MenuCategorySection } from '@/components/restaurant/menu-category-section'
import { useEffect, useMemo, useRef, useState } from 'react'

const CART_STORAGE_KEY = 'foodflow-cart'

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Sort by: Popular' },
  { value: 'price-asc', label: 'Sort by: Price (Low to High)' },
  { value: 'price-desc', label: 'Sort by: Price (High to Low)' },
  { value: 'name', label: 'Sort by: Name' },
]

type MenuExperienceProps = {
  categories: MenuCategory[]
  sections: MenuSection[]
}

export function MenuExperience({ categories, sections }: MenuExperienceProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('popular')
  // id -> quantity, seeded so the cart preview isn't empty on first load
  const [quantities, setQuantities] = useState<Record<string, number>>({
  b1: 2,
  f1: 1,
  c1: 1,
})

const cartHydrated = useRef(false)

  const itemsById = useMemo(() => {
    const map: Record<string, MenuItem> = {}
    sections.forEach((section) => section.items.forEach((item) => (map[item.id] = item)))
    return map
  }, [sections])

  useEffect(() => {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)

    if (stored) {
      const savedItems = JSON.parse(stored) as CartLine[]

      const savedQuantities = savedItems.reduce<Record<string, number>>(
        (acc, item) => {
          acc[item.id] = item.quantity
          return acc
        },
        {},
      )

      if (Object.keys(savedQuantities).length > 0) {
        setQuantities(savedQuantities)
      }
    }
  } catch {
    // Ignore invalid localStorage data.
  } finally {
    cartHydrated.current = true
  }
}, [])

useEffect(() => {
  if (!cartHydrated.current) return

  const storedItems = Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0 && itemsById)
    .map(([id, quantity]) => {
      const item = itemsById[id]

      if (!item) return null

      return {
        ...item,
        quantity,
      }
    })
    .filter(Boolean)

  window.localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(storedItems),
  )

  window.dispatchEvent(new Event('foodflow-cart-updated'))
}, [quantities, itemsById])

  function handleQuantityChange(item: MenuItem, quantity: number) {
    setQuantities((prev) => ({ ...prev, [item.id]: quantity }))
  }

  function handleRemove(id: string) {
    setQuantities((prev) => ({ ...prev, [id]: 0 }))
  }

  const cartItems: CartLine[] = Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => ({ ...itemsById[id], quantity }))

  const visibleSections = useMemo(() => {
    const query = search.trim().toLowerCase()

    const sortItems = (items: MenuItem[]) => {
      const sorted = [...items]
      if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
      if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
      if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
      return sorted
    }

    return sections
      .filter((section) => activeCategory === 'all' || activeCategory === section.category)
      .map((section) => ({
        ...section,
        items: sortItems(section.items.filter((item) => item.name.toLowerCase().includes(query))),
      }))
      .filter((section) => section.items.length > 0)
  }, [sections, activeCategory, search, sort])

  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[260px_1fr]">
      <div className="flex flex-col gap-5 lg:sticky lg:top-5">
        <CategoriesCard categories={categories} active={activeCategory} onSelect={setActiveCategory} />
        <CartCard items={cartItems} onRemove={handleRemove} />
      </div>

      <div className="min-w-0">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">All Menu Items</h2>

          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <div className="relative flex-1 sm:flex-none">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search menu items..."
                aria-label="Search menu items"
                className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/25 sm:w-64"
              />
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              aria-label="Sort menu items"
              className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/25"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {visibleSections.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card py-16 text-center text-sm text-muted-foreground">
            No menu items match your search.
          </div>
        ) : (
          visibleSections.map((section) => (
            <MenuCategorySection
              key={section.category}
              section={section}
              quantities={quantities}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}
      </div>
    </div>
  )
}