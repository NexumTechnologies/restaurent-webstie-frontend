export type MenuIconName =
  | 'all'
  | 'burger'
  | 'pizza'
  | 'fries'
  | 'drink'
  | 'dessert'
  | 'combo'

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  badge?: string
}

export type MenuSection = {
  category: string
  title: string
  icon: MenuIconName
  items: MenuItem[]
}

export type MenuCategory = {
  id: string
  label: string
  count: number
  icon: MenuIconName
}

export type Restaurant = {
  slug: string
  name: string
  logo: string
  cover: string
  rating: number
  reviewCount: number
  priceLevel: string
  cuisines: string[]
  deliveryTime: string
  minOrder: string
  isOpen: boolean
  hours: string
}

export const RESTAURANT: Restaurant = {
  slug: 'the-burger-house',
  name: 'The Burger House',
  logo: '/images/foodflow-burger.png',
  cover:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
  rating: 4.6,
  reviewCount: 245,
  priceLevel: '$$',
  cuisines: ['Burger', 'Fast Food', 'Drinks'],
  deliveryTime: '30–40 min',
  minOrder: 'Rs. 300',
  isOpen: true,
  hours: '10:00 AM – 11:00 PM',
}

export const RESTAURANTS: Restaurant[] = [RESTAURANT]

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'all',
    label: 'All Items',
    count: 42,
    icon: 'all',
  },
  {
    id: 'burgers',
    label: 'Burgers',
    count: 12,
    icon: 'burger',
  },
  {
    id: 'pizza',
    label: 'Pizza',
    count: 8,
    icon: 'pizza',
  },
  {
    id: 'fries',
    label: 'Fries & Sides',
    count: 6,
    icon: 'fries',
  },
  {
    id: 'drinks',
    label: 'Drinks',
    count: 6,
    icon: 'drink',
  },
  {
    id: 'desserts',
    label: 'Desserts',
    count: 4,
    icon: 'dessert',
  },
  {
    id: 'combo',
    label: 'Combo Deals',
    count: 6,
    icon: 'combo',
  },
]

export const MENU_SECTIONS: MenuSection[] = [
  {
    category: 'burgers',
    title: 'Burgers',
    icon: 'burger',
    items: [
      {
        id: 'b1',
        name: 'Zinger Burger',
        description: 'Crispy zinger fillet with lettuce & mayo',
        price: 599,
        image: '/images/home/dish-zinger-burger.png',
        category: 'burgers',
        badge: 'Bestseller',
      },
      {
        id: 'b2',
        name: 'Cheese Burger',
        description: 'Beef patty with cheese, lettuce & special sauce',
        price: 549,
        image:
          'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop',
        category: 'burgers',
      },
      {
        id: 'b3',
        name: 'Beef Burger',
        description: 'Juicy beef patty with fresh veggies',
        price: 499,
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
        category: 'burgers',
      },
      {
        id: 'b4',
        name: 'Double Decker',
        description: 'Double beef patty with cheese & sauce',
        price: 699,
        image:
          'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=600&auto=format&fit=crop',
        category: 'burgers',
      },
    ],
  },
  {
    category: 'pizza',
    title: 'Pizza',
    icon: 'pizza',
    items: [
      {
        id: 'p1',
        name: 'Chicken Tikka Pizza',
        description: 'Chicken tikka with special toppings',
        price: 999,
        image:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop',
        category: 'pizza',
      },
      {
        id: 'p2',
        name: 'Veggie Pizza',
        description: 'Fresh veggies with cheese',
        price: 899,
        image:
          'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?q=80&w=600&auto=format&fit=crop',
        category: 'pizza',
      },
      {
        id: 'p3',
        name: 'Fajita Pizza',
        description: 'Fajita chicken with onions & capsicum',
        price: 1099,
        image: '/images/home/dish-fajita-pizza.png',
        category: 'pizza',
      },
      {
        id: 'p4',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni with cheese & pizza sauce',
        price: 1049,
        image:
          'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600&auto=format&fit=crop',
        category: 'pizza',
      },
    ],
  },
  {
    category: 'fries',
    title: 'Fries & Sides',
    icon: 'fries',
    items: [
      {
        id: 'f1',
        name: 'French Fries',
        description: 'Crispy golden fries with salt',
        price: 199,
        image:
          'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=600&auto=format&fit=crop',
        category: 'fries',
      },
      {
        id: 'f2',
        name: 'Cheese Fries',
        description: 'Fries with melted cheese',
        price: 299,
        image:
          'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=600&auto=format&fit=crop',
        category: 'fries',
      },
      {
        id: 'f3',
        name: 'Onion Rings',
        description: 'Crispy onion rings served hot',
        price: 249,
        image:
          'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=600&auto=format&fit=crop',
        category: 'fries',
      },
      {
        id: 'f4',
        name: 'Chicken Nuggets',
        description: '6 pieces with dip sauce',
        price: 349,
        image:
          'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop',
        category: 'fries',
      },
    ],
  },
  {
  category: 'drinks',
  title: 'Drinks',
  icon: 'drink',
  items: [
    {
      id: 'c1',
      name: 'Coca Cola',
      description: 'Refreshing cold drink',
      price: 120,
      image:
        'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?q=80&w=600&auto=format&fit=crop',
      category: 'drinks',
    },
  ],
},
]