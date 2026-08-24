import Image from 'next/image'
import { Plus, Star } from 'lucide-react'
import { SectionHeader } from '@/components/home/section-header'

type Dish = {
  name: string
  restaurant: string
  rating: number
  price: string
  image: string
}

const dishes: Dish[] = [
  {
    name: 'Zinger Burger',
    restaurant: 'Urban Bites',
    rating: 4.9,
    price: 'Rs. 650',
    image: '/images/home/dish-zinger-burger.png',
  },
  {
    name: 'Fajita Pizza',
    restaurant: 'Pizza Garden',
    rating: 4.8,
    price: 'Rs. 1,200',
    image: '/images/home/dish-fajita-pizza.png',
  },
  {
    name: 'Chicken Biryani',
    restaurant: 'Royal Rice',
    rating: 4.9,
    price: 'Rs. 450',
    image: '/images/home/dish-chicken-biryani.png',
  },
  {
    name: 'Cold Coffee',
    restaurant: 'Cafe Corner',
    rating: 4.7,
    price: 'Rs. 380',
    image: '/images/home/dish-cold-coffee.png',
  },
]

export function PopularDishes() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6">
      <SectionHeader
        title="Popular dishes"
        subtitle="Most ordered meals this week."
        viewAllHref="#restaurants"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((dish) => (
          <article
            key={dish.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-card transition-transform hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted">
                <Image
                  src={dish.image || '/placeholder.svg'}
                  alt={dish.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-sm font-bold text-foreground">
                  {dish.name}
                </h3>
                <p className="truncate text-xs text-muted-foreground">
                  {dish.restaurant}
                </p>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <Star
                    className="size-3.5 fill-[#f6b41f] text-[#f6b41f]"
                    aria-hidden="true"
                  />
                  <span className="font-medium text-foreground">
                    {dish.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-sm font-bold text-teal">
                {dish.price}
              </span>
              <button
                type="button"
                aria-label={`Add ${dish.name} to cart`}
                className="grid size-9 place-items-center rounded-xl bg-teal text-teal-foreground transition-colors hover:bg-teal/90"
              >
                <Plus className="size-5" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
