import { Hash, Star, Triangle, Utensils, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/home/section-header'

type Restaurant = {
  name: string
  cuisine: string
  rating: number
  time: string
  fee: string
  header: string
  icon: LucideIcon
}

const restaurants: Restaurant[] = [
  {
    name: 'Urban Bites',
    cuisine: 'Burgers • Fast Food',
    rating: 4.8,
    time: '25–35 min',
    fee: 'Rs. 150',
    header: 'from-navy to-navy-muted',
    icon: Hash,
  },
  {
    name: 'Pizza Garden',
    cuisine: 'Pizza • Italian',
    rating: 4.7,
    time: '30–40 min',
    fee: 'Rs. 120',
    header: 'from-[#2f5d43] to-[#213f30]',
    icon: Triangle,
  },
  {
    name: 'Royal Rice',
    cuisine: 'Pakistani • Biryani',
    rating: 4.9,
    time: '20–30 min',
    fee: 'Rs. 100',
    header: 'from-[#6b5433] to-[#4c3c25]',
    icon: Utensils,
  },
]

export function PopularRestaurants() {
  return (
    <section
      id="restaurants"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6"
    >
      <SectionHeader
        title="Popular restaurants"
        subtitle="Top-rated places near you."
        viewAllHref="#restaurants"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((r) => (
          <article
            key={r.name}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform hover:-translate-y-1"
          >
            <div
              className={`relative flex h-28 items-center justify-end bg-gradient-to-br px-6 ${r.header}`}
            >
              <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-teal-foreground">
                Open now
              </span>
              <span className="grid size-16 place-items-center rounded-full bg-white/15 text-white">
                <r.icon className="size-7" aria-hidden="true" />
              </span>
            </div>

            <div className="relative px-5 pb-5">
              <span className="absolute -top-6 left-5 grid size-12 place-items-center rounded-full border-4 border-card bg-teal text-teal-foreground">
                <r.icon className="size-5" aria-hidden="true" />
              </span>

              <div className="pt-8">
                <h3 className="font-display text-base font-bold text-foreground">
                  {r.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {r.cuisine}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Star
                    className="size-4 fill-[#f6b41f] text-[#f6b41f]"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-foreground">
                    {r.rating}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{r.time}</span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span className="font-semibold text-teal">{r.fee}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
