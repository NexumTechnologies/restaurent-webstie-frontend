import { Award, Headphones, Shield, Truck, type LucideIcon } from 'lucide-react'

type Benefit = {
  icon: LucideIcon
  title: string
  description: string
}

const BENEFITS: Benefit[] = [
  { icon: Shield, title: 'Safe & Secure', description: 'Your payments are 100% safe' },
  { icon: Truck, title: 'Fast Delivery', description: 'Get your order in 30–40 min' },
  { icon: Award, title: 'Best Quality', description: 'Fresh & high quality food' },
  { icon: Headphones, title: '24/7 Support', description: 'We are here to help you' },
]

export function RestaurantBenefits() {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-muted px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
      {BENEFITS.map((benefit) => {
        const Icon = benefit.icon
        return (
          <div key={benefit.title} className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
              <Icon className="size-[19px]" aria-hidden="true" />
            </span>
            <div>
              <div className="text-sm font-bold text-foreground">{benefit.title}</div>
              <div className="text-xs text-muted-foreground">{benefit.description}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}