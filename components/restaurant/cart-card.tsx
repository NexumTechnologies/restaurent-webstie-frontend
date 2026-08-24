'use client'

import Image from 'next/image'
import { ChevronRight, ShoppingCart, Trash2 } from 'lucide-react'
import type { MenuItem } from '@/lib/restaurant'
import Link from 'next/link'


export type CartLine = MenuItem & { quantity: number }

type CartCardProps = {
  items: CartLine[]
  onRemove: (id: string) => void
}

const DELIVERY_FEE = 80

export function CartCard({ items, onRemove }: CartCardProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <ShoppingCart className="size-4 text-foreground" aria-hidden="true" />
        <h3 className="font-display text-[15px] font-bold text-foreground">Your Cart</h3>
      </div>

      {items.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">Your cart is empty</p>
      ) : (
        <ul className="mb-3 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-2.5">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">{item.name}</div>
                <div className="text-xs text-muted-foreground">x {item.quantity}</div>
              </div>
              <div className="whitespace-nowrap text-sm font-semibold text-foreground">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </div>
              <button
                type="button"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => onRemove(item.id)}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-[15px]" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-1.5 border-t border-border pt-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery Fee</span>
          <span>Rs. {deliveryFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pt-1 text-[15px] font-bold text-foreground">
          <span>Total</span>
          <span className="text-teal">Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link
  href="/cart"
  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
>
  <ShoppingCart className="size-[15px]" aria-hidden="true" />
  View Cart
</Link>
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal py-2.5 text-sm font-semibold text-teal-foreground transition-colors hover:bg-teal/90"
        >
          Checkout
          <ChevronRight className="size-[15px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}