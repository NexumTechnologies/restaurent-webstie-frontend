import { ShieldCheck, Headphones, Tag, Users, type LucideIcon } from 'lucide-react'

type Benefit = {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: '100% Safe & Secure',
    description: 'Your data and payments are fully protected.',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'We are here to help you, anytime, anywhere.',
  },
  {
    icon: Tag,
    title: 'Best Offers & Deals',
    description: 'Enjoy exciting offers and exclusive deals.',
  },
  {
    icon: Users,
    title: 'Thousands Happy Users',
    description: 'Join thousands of happy customers today.',
  },
]

export function AuthBenefits() {
  return (
    <section
      aria-label="Why choose FoodFlow"
      className="border-y border-border bg-card"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-6 gap-y-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-muted text-brand">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
