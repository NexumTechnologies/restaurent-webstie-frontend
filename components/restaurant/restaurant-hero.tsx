import Image from 'next/image'
import { CircleCheck, Clock, Star, Truck } from 'lucide-react'
import type { Restaurant } from '@/lib/restaurant'

type RestaurantHeroProps = {
  restaurant: Restaurant
}

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={restaurant.cover}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />
      </div>

      <div className="relative flex flex-col gap-6 px-5 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-9">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-navy-muted shadow-card sm:size-28">
          <Image
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
            fill
            sizes="112px"
            className="object-cover opacity-95"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {restaurant.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/90">
            <span className="inline-flex items-center gap-1 font-semibold text-[#f6b41f]">
              <Star className="size-[15px] fill-[#f6b41f] text-[#f6b41f]" aria-hidden="true" />
              {restaurant.rating}
            </span>
            <span className="text-white/60">({restaurant.reviewCount} Reviews)</span>
            <span className="text-white/40">•</span>
            <span>{restaurant.priceLevel}</span>
            <span className="text-white/40">•</span>
            <span>{restaurant.cuisines.join(', ')}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-white/70" aria-hidden="true" />
              <div className="leading-tight">
                <div className="font-semibold">{restaurant.deliveryTime}</div>
                <div className="text-xs text-white/60">Delivery Time</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="size-4 text-white/70" aria-hidden="true" />
              <div className="leading-tight">
                <div className="font-semibold">{restaurant.minOrder}</div>
                <div className="text-xs text-white/60">Min. Order</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="size-4 text-teal" aria-hidden="true" />
              <div className="leading-tight">
                <div className="font-semibold text-teal">
                  {restaurant.isOpen ? 'Open Now' : 'Closed'}
                </div>
                <div className="text-xs text-white/60">{restaurant.hours}</div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:self-center"
        >
          <Star className="size-[15px]" aria-hidden="true" />
          Add to Favorites
        </button>
      </div>
    </div>
  )
}