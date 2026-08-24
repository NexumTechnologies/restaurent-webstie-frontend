import { MapPin, Search, ShoppingBag, type LucideIcon } from 'lucide-react'

type Step = {
  n: number
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    n: 1,
    icon: Search,
    title: 'Choose restaurant',
    description: 'Browse menus and select your favourite place.',
  },
  {
    n: 2,
    icon: ShoppingBag,
    title: 'Select your meal',
    description: 'Add food items to your cart and customize as you like.',
  },
  {
    n: 3,
    icon: MapPin,
    title: 'Place order',
    description: 'Confirm and track your order status in real time.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6"
    >
      <div className="rounded-3xl bg-teal-soft px-6 py-10 sm:px-10">
        <div className="text-center">
          <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            How it works
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Order your meal in three easy steps.
          </p>
        </div>

        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {steps.map(({ n, icon: Icon, title, description }) => (
            <li key={n} className="relative flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative">
                <span className="grid size-16 place-items-center rounded-full bg-card text-teal shadow-card">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-teal text-xs font-bold text-teal-foreground">
                  {n}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                {title}
              </h3>
              <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
