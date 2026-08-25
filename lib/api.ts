const API_BASE_URL = 'http://localhost:5000/api/v1'

type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
}

export type AuthUser = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  role: string
  restaurantId?: string
  restaurantName?: string
  restaurantStatus?: string
  restaurantIsOpen?: boolean
  restaurantLogoUrl?: string
  restaurantCity?: string
}

type AuthResult = {
  accessToken: string
  user: AuthUser
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('foodflow_access_token')
      : null

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null
  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message ?? 'Something went wrong. Please try again.')
  }

  return payload.data
}

async function requestFormData<T>(path: string, body: FormData, method = 'POST'): Promise<T> {
  const token =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('foodflow_access_token')
      : null

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body,
  })

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null
  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message ?? 'Something went wrong. Please try again.')
  }

  return payload.data
}

export function login(input: { email: string; password: string }) {
  return request<AuthResult>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function register(input: {
  name: string
  email: string
  password: string
  phone: string
  address: string
}) {
  return request<AuthResult>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function logout() {
  return request<{ message: string }>('/auth/logout', { method: 'POST' })
}

export function createRestaurant(input: {
  name: string
  email?: string
  password?: string
  ownerName?: string
  phone?: string
  address?: string
  city?: string
  description?: string
  openingTime?: string
  closingTime?: string
  deliveryFee?: number
  minimumOrder?: number
  ownerId?: string
}) {
  return request<{
    restaurant: {
      id: string
      name: string
      approvalStatus: string
    }
    owner: AuthUser
    credentials: { email: string }
  }>('/admin/restaurants', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function getCurrentUser() {
  return request<AuthUser>('/auth/me', {
    method: 'GET',
  })
}

export type RestaurantMenuItem = {
  id: string
  restaurantId: string
  categoryId?: string | null
  name: string
  description?: string | null
  imageUrl?: string | null
  imagePublicId?: string | null
  price: string | number
  isAvailable: boolean
  Category?: { id: string; name: string } | null
  category?: { id: string; name: string } | null
  createdAt?: string
}

export type RestaurantCategory = {
  id: string
  name: string
  isGlobal?: boolean
}

export type RestaurantOrder = {
  id: string
  orderNumber: string
  status: string
  paymentMethod: string
  paymentStatus: string
  total: string | number
  subtotal: string | number
  deliveryFee: string | number
  serviceFee: string | number
  discount: string | number
  notes?: string | null
  createdAt: string
  User?: {
    id: string
    name: string
    phone?: string
    email?: string
  }
  OrderItems?: Array<{
    id: string
    name: string
    quantity: number
    unitPrice: string | number
    lineTotal: string | number
  }>
}

export function getRestaurantDashboard() {
  return request<{
    restaurant: AuthUser
    stats: {
      orders: number
      revenue: number
      customers: number
      rating: number | null
    }
    recentOrders: RestaurantOrder[]
  }>('/restaurant-admin/dashboard')
}

export function getRestaurantProfile() {
  return request<AuthUser>('/restaurant-admin/owner-profile')
}

export type RestaurantBranding = {
  id: string
  ownerId: string
  name: string
  description?: string | null
  logoUrl?: string | null
  coverUrl?: string | null
  address?: string | null
  city?: string | null
  isOpen?: boolean
}

export function updateRestaurantBranding(input: FormData) {
  return requestFormData<RestaurantBranding>('/restaurant-admin/branding', input, 'POST')
}

export function getRestaurantMenuItems() {
  return request<RestaurantMenuItem[]>('/restaurant-admin/menu-items')
}

export function getRestaurantCategories() {
  return request<RestaurantCategory[]>('/restaurant-admin/categories')
}

export function createRestaurantMenuItem(input: FormData) {
  return requestFormData<RestaurantMenuItem>('/restaurant-admin/menu-items', input, 'POST')
}

export function updateRestaurantMenuItem(id: string, input: FormData) {
  return requestFormData<RestaurantMenuItem>(`/restaurant-admin/menu-items/${id}`, input, 'PATCH')
}

export function toggleRestaurantMenuItem(id: string, input: { isAvailable: boolean }) {
  return request<RestaurantMenuItem>(`/restaurant-admin/menu-items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export function deleteRestaurantMenuItem(id: string) {
  return request<{ message: string }>(`/restaurant-admin/menu-items/${id}`, {
    method: 'DELETE',
  })
}

export function getRestaurantOrders() {
  return request<RestaurantOrder[]>('/restaurant-admin/orders')
}
