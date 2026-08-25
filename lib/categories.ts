import type { LucideIcon } from 'lucide-react'
import type { MenuItem } from '@/lib/restaurant'

export type CategoryIcon =
  | 'burger'
  | 'pizza'
  | 'rice'
  | 'drink'
  | 'dessert'
  | 'healthy'

export type CategoryConfig = {
  slug: CategorySlug
  label: string
  count: number
  description: string
  heroImage: string
  accent: string
  icon: CategoryIcon
  items: CategoryFoodItem[]
  restaurants: CategoryRestaurant[]
}
export type CategorySlug =
  | 'burgers'
  | 'pizza'
  | 'rice'
  | 'drinks'
  | 'desserts'
  | 'healthy'

export type CategoryRestaurant = {
  name: string
  slug: string
  rating: number
  cuisine: string
  deliveryTime: string
  fee: string
  isOpen: boolean
}

export type CategoryFoodItem = MenuItem & {
  rating: number
  deliveryMinutes: number
  isVegetarian: boolean
  restaurantName: string
  restaurantSlug: string
}


const allRestaurant: CategoryRestaurant = {
  name: 'The Burger House',
  slug: 'the-burger-house',
  rating: 4.6,
  cuisine: 'Burger • Fast Food • Drinks',
  deliveryTime: '30–40 min',
  fee: 'Rs. 80',
  isOpen: true,
}

const burgerItems: CategoryFoodItem[] = [
  {
    id: 'cat-burger-1',
    name: 'Zinger Burger',
    description: 'Crispy zinger fillet with lettuce & mayo',
    price: 599,
    image: '/images/home/dish-zinger-burger.png',
    category: 'burgers',
    badge: 'Bestseller',
    rating: 4.9,
    deliveryMinutes: 25,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-burger-2',
    name: 'Double Beef Burger',
    description: 'Two juicy beef patties with cheese and house sauce',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop',
    category: 'burgers',
    badge: 'Popular',
    rating: 4.8,
    deliveryMinutes: 30,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-burger-3',
    name: 'Smoky BBQ Burger',
    description: 'Grilled beef patty, smoky BBQ sauce and crispy onions',
    price: 749,
    image:
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=900&auto=format&fit=crop',
    category: 'burgers',
    rating: 4.7,
    deliveryMinutes: 35,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-burger-4',
    name: 'Chicken Cheese Burger',
    description: 'Crispy chicken, melted cheese and fresh greens',
    price: 649,
    image:
      'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=900&auto=format&fit=crop',
    category: 'burgers',
    rating: 4.8,
    deliveryMinutes: 30,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-burger-5',
    name: 'Spicy Jalapeño Burger',
    description: 'Beef patty, jalapeños, cheese and spicy mayo',
    price: 699,
    image:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=900&auto=format&fit=crop',
    category: 'burgers',
    rating: 4.6,
    deliveryMinutes: 35,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-burger-6',
    name: 'Classic Beef Burger',
    description: 'Classic grilled beef with tomato, lettuce and sauce',
    price: 499,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=900&auto=format&fit=crop',
    category: 'burgers',
    rating: 4.5,
    deliveryMinutes: 30,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
]

const pizzaItems: CategoryFoodItem[] = [
  {
    id: 'cat-pizza-1',
    name: 'Fajita Pizza',
    description: 'Fajita chicken with onions, capsicum and melted cheese',
    price: 1099,
    image: '/images/home/dish-fajita-pizza.png',
    category: 'pizza',
    badge: 'Bestseller',
    rating: 4.8,
    deliveryMinutes: 30,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-pizza-2',
    name: 'Chicken Tikka Pizza',
    description: 'Tender tikka chicken with mozzarella and special sauce',
    price: 999,
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=900&auto=format&fit=crop',
    category: 'pizza',
    rating: 4.7,
    deliveryMinutes: 35,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-pizza-3',
    name: 'Pepperoni Feast',
    description: 'Classic pepperoni, mozzarella and rich pizza sauce',
    price: 1049,
    image:
      'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=900&auto=format&fit=crop',
    category: 'pizza',
    badge: 'Popular',
    rating: 4.9,
    deliveryMinutes: 30,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-pizza-4',
    name: 'Garden Veggie',
    description: 'Fresh vegetables, herbs and a generous cheese layer',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?q=80&w=900&auto=format&fit=crop',
    category: 'pizza',
    rating: 4.6,
    deliveryMinutes: 35,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-pizza-5',
    name: 'Cheese Lover',
    description: 'Four-cheese blend with a creamy garlic finish',
    price: 949,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=900&auto=format&fit=crop',
    category: 'pizza',
    rating: 4.7,
    deliveryMinutes: 40,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-pizza-6',
    name: 'Creamy Chicken Pizza',
    description: 'Creamy garlic sauce, chicken strips and mozzarella',
    price: 1149,
    image:
      'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?q=80&w=900&auto=format&fit=crop',
    category: 'pizza',
    rating: 4.8,
    deliveryMinutes: 35,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
]

const riceItems: CategoryFoodItem[] = [
  {
    id: 'cat-rice-1',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spicy tender chicken',
    price: 450,
    image: '/images/home/dish-chicken-biryani.png',
    category: 'rice',
    badge: 'Popular',
    rating: 4.9,
    deliveryMinutes: 30,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-rice-2',
    name: 'Chicken Pulao',
    description: 'Aromatic rice cooked with tender chicken and whole spices',
    price: 420,
    image:
      'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=900&auto=format&fit=crop',
    category: 'rice',
    rating: 4.7,
    deliveryMinutes: 35,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-rice-3',
    name: 'Beef Biryani',
    description: 'Slow-cooked beef with basmati rice and aromatic spices',
    price: 520,
    image:
      'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d44?q=80&w=900&auto=format&fit=crop',
    category: 'rice',
    rating: 4.8,
    deliveryMinutes: 40,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-rice-4',
    name: 'Malai Tikka Rice Bowl',
    description: 'Creamy chicken tikka served over seasoned rice',
    price: 620,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=900&auto=format&fit=crop',
    category: 'rice',
    rating: 4.6,
    deliveryMinutes: 35,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-rice-5',
    name: 'Vegetable Fried Rice',
    description: 'Wok-tossed rice with fresh vegetables and herbs',
    price: 380,
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=900&auto=format&fit=crop',
    category: 'rice',
    rating: 4.5,
    deliveryMinutes: 30,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-rice-6',
    name: 'Mutton Biryani',
    description: 'Slow-cooked mutton with saffron basmati rice',
    price: 680,
    image:
      'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d44?q=80&w=900&auto=format&fit=crop',
    category: 'rice',
    rating: 4.7,
    deliveryMinutes: 40,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
]

const drinkItems: CategoryFoodItem[] = [
  {
    id: 'cat-drink-1',
    name: 'Cold Coffee',
    description: 'Smooth iced coffee with a creamy finish',
    price: 380,
    image: '/images/home/dish-cold-coffee.png',
    category: 'drinks',
    badge: 'Popular',
    rating: 4.7,
    deliveryMinutes: 25,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-drink-2',
    name: 'Coca Cola',
    description: 'Refreshing chilled cola',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?q=80&w=900&auto=format&fit=crop',
    category: 'drinks',
    rating: 4.6,
    deliveryMinutes: 20,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-drink-3',
    name: 'Mango Cooler',
    description: 'Chilled mango drink with a bright tropical taste',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=900&auto=format&fit=crop',
    category: 'drinks',
    rating: 4.6,
    deliveryMinutes: 25,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-drink-4',
    name: 'Mint Lemonade',
    description: 'Fresh lemon, mint and crushed ice',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=900&auto=format&fit=crop',
    category: 'drinks',
    rating: 4.8,
    deliveryMinutes: 20,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-drink-5',
    name: 'Chocolate Shake',
    description: 'Creamy chocolate shake topped with whipped cream',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=900&auto=format&fit=crop',
    category: 'drinks',
    badge: 'Bestseller',
    rating: 4.9,
    deliveryMinutes: 25,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-drink-6',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice served chilled',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=900&auto=format&fit=crop',
    category: 'drinks',
    rating: 4.7,
    deliveryMinutes: 25,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
]

const dessertItems: CategoryFoodItem[] = [
  {
    id: 'cat-dessert-1',
    name: 'Chocolate Brownie',
    description: 'Warm fudgy brownie with rich chocolate flavor',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=900&auto=format&fit=crop',
    category: 'desserts',
    badge: 'Bestseller',
    rating: 4.8,
    deliveryMinutes: 30,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-dessert-2',
    name: 'Lotus Cheesecake',
    description: 'Creamy cheesecake with a buttery biscuit base',
    price: 449,
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=900&auto=format&fit=crop',
    category: 'desserts',
    rating: 4.9,
    deliveryMinutes: 35,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-dessert-3',
    name: 'Chocolate Shake',
    description: 'Rich chocolate milkshake with whipped cream',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=900&auto=format&fit=crop',
    category: 'desserts',
    rating: 4.7,
    deliveryMinutes: 25,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-dessert-4',
    name: 'Caramel Waffle',
    description: 'Crisp waffle with caramel drizzle and cream',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=900&auto=format&fit=crop',
    category: 'desserts',
    rating: 4.6,
    deliveryMinutes: 35,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-dessert-5',
    name: 'Classic Tiramisu',
    description: 'Coffee-soaked sponge with mascarpone cream',
    price: 499,
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=900&auto=format&fit=crop',
    category: 'desserts',
    rating: 4.8,
    deliveryMinutes: 35,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-dessert-6',
    name: 'Strawberry Sundae',
    description: 'Vanilla ice cream, strawberry sauce and crunchy topping',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=900&auto=format&fit=crop',
    category: 'desserts',
    rating: 4.7,
    deliveryMinutes: 30,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
]

const healthyItems: CategoryFoodItem[] = [
  {
    id: 'cat-healthy-1',
    name: 'Grilled Chicken Salad',
    description: 'Grilled chicken, greens, cucumber and light dressing',
    price: 599,
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=900&auto=format&fit=crop',
    category: 'healthy',
    badge: 'Healthy Choice',
    rating: 4.9,
    deliveryMinutes: 30,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-healthy-2',
    name: 'Protein Bowl',
    description: 'Chicken, brown rice, avocado and fresh vegetables',
    price: 699,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=900&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.8,
    deliveryMinutes: 35,
    isVegetarian: false,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-healthy-3',
    name: 'Avocado Toast',
    description: 'Sourdough toast with avocado, herbs and chili flakes',
    price: 499,
    image:
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=900&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.7,
    deliveryMinutes: 25,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-healthy-4',
    name: 'Grilled Veggie Wrap',
    description: 'Grilled vegetables, greens and yogurt herb dressing',
    price: 449,
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=900&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.8,
    deliveryMinutes: 30,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-healthy-5',
    name: 'Fruit Yogurt Bowl',
    description: 'Greek yogurt with seasonal fruit and granola',
    price: 399,
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=900&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.9,
    deliveryMinutes: 25,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
  {
    id: 'cat-healthy-6',
    name: 'Quinoa Power Bowl',
    description: 'Quinoa, chickpeas, greens and lemon herb dressing',
    price: 649,
    image:
      'https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=900&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.6,
    deliveryMinutes: 35,
    isVegetarian: true,
    restaurantName: 'The Burger House',
    restaurantSlug: 'the-burger-house',
  },
]

export const CATEGORY_CONFIGS: Record<
  CategorySlug,
  CategoryConfig
> = {
  burgers: {
    slug: 'burgers',
    label: 'Burgers',
    count: 24,
    description:
      'Discover juicy burgers, crispy chicken stacks and loaded favorites from FoodFlow.',
    heroImage:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop',
    accent: 'bg-teal-soft',
    icon: 'burger',
    items: burgerItems,
    restaurants: [allRestaurant],
  },

  pizza: {
    slug: 'pizza',
    label: 'Pizza',
    count: 18,
    description:
      'From classic cheese to loaded fajita, find a pizza for every kind of craving.',
    heroImage:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop',
    accent: 'bg-[#e7f5ec]',
    icon: 'pizza',
    items: pizzaItems,
    restaurants: [allRestaurant],
  },

  rice: {
    slug: 'rice',
    label: 'Rice',
    count: 16,
    description:
      'Comforting biryani, pulao and hearty rice bowls packed with flavor.',
    heroImage:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop',
    accent: 'bg-[#e7eefb]',
    icon: 'rice',
    items: riceItems,
    restaurants: [allRestaurant],
  },

  drinks: {
    slug: 'drinks',
    label: 'Drinks',
    count: 12,
    description:
      'Cold coffee, refreshing coolers, shakes and chilled favorites for every meal.',
    heroImage:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1600&auto=format&fit=crop',
    accent: 'bg-teal-soft',
    icon: 'drink',
    items: drinkItems,
    restaurants: [allRestaurant],
  },

  desserts: {
    slug: 'desserts',
    label: 'Desserts',
    count: 15,
    description:
      'Finish your meal with brownies, cheesecakes, shakes and sweet treats.',
    heroImage:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop',
    accent: 'bg-[#f2e9fb]',
    icon: 'dessert',
    items: dessertItems,
    restaurants: [allRestaurant],
  },

  healthy: {
    slug: 'healthy',
    label: 'Healthy',
    count: 10,
    description:
      'Fresh salads, wholesome bowls and balanced choices made for lighter days.',
    heroImage:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop',
    accent: 'bg-[#e7f5ec]',
   icon: 'healthy',
    items: healthyItems,
    restaurants: [allRestaurant],
  },
}

export const CATEGORY_LIST = Object.values(
  CATEGORY_CONFIGS,
)