'use client'

import { useState } from 'react'
import { Image as ImageIcon, Info, MessageSquare, Utensils } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'menu', label: 'Menu', icon: Utensils },
  { id: 'reviews', label: 'Reviews (245)', icon: MessageSquare },
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'information', label: 'Information', icon: Info },
] as const

export function RestaurantTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('menu')

  return (
    <div className="rounded-2xl border border-border bg-card px-2 shadow-card sm:px-4">
      <div className="scrollbar-none overflow-x-auto border-b border-border">
        <nav className="flex min-w-max gap-6 px-1 sm:gap-8" aria-label="Restaurant sections">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === active
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex items-center gap-1.5 whitespace-nowrap py-3.5 text-sm font-medium transition-colors',
                  isActive ? 'text-teal' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-teal" />
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}