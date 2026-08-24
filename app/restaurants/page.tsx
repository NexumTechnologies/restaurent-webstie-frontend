import { RestaurantCard } from '@/components/restaurant/restaurant-card'
import { CartCard } from '@/components/restaurant/cart-card'
import { CategoriesCard } from '@/components/restaurant/categories-card'
import { MenuCategorySection } from '@/components/restaurant/menu-category-section'
import { MenuExperience } from '@/components/restaurant/menu-experience'
import { RestaurantBenefits } from '@/components/restaurant/restaurant-benefits'

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Burger House',
    slug: 'the-burger-house',
    cover: '/images/restaurants/burger-house-cover.jpg',
    logo: '/images/restaurants/burger-house-logo.jpg',
    cuisines: ['Burger', 'Fast Food', 'Drinks'],
    rating: 4.6,
    deliveryTime: '30–40 min',
    minOrder: 'PKR 300',
    isOpen: true,
  },

  {
    id: '2',
    name: 'Pizza Palace',
    slug: 'pizza-palace',
    cover: '/images/restaurants/pizza-palace-cover.jpg',
    logo: '/images/restaurants/pizza-palace-logo.jpg',
    cuisines: ['Pizza', 'Italian'],
    rating: 4.5,
    deliveryTime: '35–45 min',
    minOrder: 'PKR 500',
    isOpen: true,
  },
]

export default function RestaurantsPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">Restaurants</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </div>
      </section>
    </main>
  )
}