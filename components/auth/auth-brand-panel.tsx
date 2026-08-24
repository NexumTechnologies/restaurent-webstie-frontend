'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Store, Truck, ShieldCheck } from 'lucide-react'
import { AuthFeature, type AuthFeatureItem } from '@/components/auth/auth-feature'

const features: AuthFeatureItem[] = [
  {
    icon: Store,
    title: 'Wide Restaurant Choice',
    description: 'Choose from a variety of cuisines and top restaurants.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your food delivered hot and fresh at your doorstep.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Multiple secure payment options to make you worry-free.',
  },
]

type AuthBrandPanelProps = {
  title: React.ReactNode
  description: string
}

export function AuthBrandPanel({ title, description }: AuthBrandPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col"
    >
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-3xl leading-tight font-extrabold text-balance text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {features.map((feature) => (
          <AuthFeature key={feature.title} {...feature} />
        ))}
      </div>

      <div className="relative mt-8">
        {/* decorative pale-green organic shape behind the food image */}
        <div
          aria-hidden="true"
          className="absolute -bottom-4 left-1/2 h-40 w-[112%] -translate-x-1/2 rounded-[50%] bg-brand-muted/70 blur-[2px]"
        />
        <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-2xl">
          <Image
            src="/images/foodflow-burger.png"
            alt="A gourmet cheeseburger served with crispy golden fries and dipping sauce"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </motion.div>
  )
}
