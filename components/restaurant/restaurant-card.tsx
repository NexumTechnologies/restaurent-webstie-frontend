import Image from 'next/image'
import Link from 'next/link'
import { Clock, Star } from 'lucide-react'
import type { Restaurant } from '@/lib/restaurant'

type RestaurantCardProps = {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform hover:-translate-y-1"
    >
      <div className="relative h-32">
        <Image
          src={restaurant.cover}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
        {restaurant.isOpen && (
          <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-teal-foreground">
            Open now
          </span>
        )}
      </div>

      <div className="relative px-5 pb-5">
        <div className="relative -top-6 size-12 overflow-hidden rounded-full border-4 border-card bg-navy-muted">
          <Image src={restaurant.logo} alt="" fill sizes="48px" className="object-cover" />
        </div>

        <div className="-mt-4">
          <h3 className="font-display text-base font-bold text-foreground">{restaurant.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{restaurant.cuisines.join(' • ')}</p>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Star className="size-4 fill-[#f6b41f] text-[#f6b41f]" aria-hidden="true" />
            <span className="font-semibold text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground">•</span>
            <Clock className="size-3.5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground">{restaurant.deliveryTime}</span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
            <span className="text-muted-foreground">Min. order</span>
            <span className="font-semibold text-teal">{restaurant.minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}