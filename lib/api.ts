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

export function updateAdminProfile(input: { name?: string; email?: string; phone?: string; address?: string }) {
  return request<AuthUser>('/users/profile', {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export function changeAdminPassword(input: { currentPassword: string; newPassword: string }) {
  return request<{ message: string }>('/users/password', {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export type AdminDashboard = {
  stats: {
    customers: number
    restaurants: number
    orders: number
    revenue: number
  }
  recentOrders: Array<{
    id: string
    orderNumber?: string
    total?: string | number
    status: string
    createdAt?: string
    User?: { id: string; name: string }
    Restaurant?: { id: string; name: string }
  }>
  alerts?: { closedRestaurants?: number }
}

export function getAdminDashboard() {
  return request<AdminDashboard>('/admin/dashboard')
}

export type AdminUser = {
  id: string
  name: string
  email: string
  phone?: string | null
  address?: string | null
  role: string
  isActive?: boolean
  createdAt?: string
}

export function getAdminUsers(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  return request<AdminUser[]>(`/admin/users${query}`)
}

export function getAdminUser(id: string) {
  return request<AdminUser>(`/admin/users/${id}`)
}

export function updateAdminUser(id: string, input: Partial<Pick<AdminUser, 'name' | 'email' | 'phone' | 'address'>> & { role?: string }) {
  return request<AdminUser>(`/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export function deleteAdminUser(id: string) {
  return request<{ message: string }>(`/admin/users/${id}`, { method: 'DELETE' })
}

export function setAdminUserActive(id: string, active: boolean) {
  return request<AdminUser>(`/admin/users/${id}/${active ? 'activate' : 'deactivate'}`, {
    method: 'PATCH',
  })
}

export function changeAdminUserRole(id: string, role: string) {
  return request<AdminUser>(`/admin/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
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

export type AdminRestaurant = {
  id: string
  name: string
  description?: string | null
  city?: string | null
  address?: string | null
  isOpen?: boolean
  approvalStatus?: string
  logoUrl?: string | null
  coverUrl?: string | null
  openingTime?: string | null
  closingTime?: string | null
  deliveryFee?: string | number | null
  minimumOrder?: string | number | null
  owner?: AdminUser
  createdAt?: string
}

export function getAdminRestaurants(input?: { search?: string; approvalStatus?: string; isOpen?: boolean }) {
  const params = new URLSearchParams()
  if (input?.search) params.set('search', input.search)
  if (input?.approvalStatus) params.set('approvalStatus', input.approvalStatus)
  if (typeof input?.isOpen === 'boolean') params.set('isOpen', String(input.isOpen))
  const query = params.toString() ? `?${params.toString()}` : ''
  return request<AdminRestaurant[]>(`/admin/restaurants${query}`)
}

export function getAdminRestaurant(id: string) {
  return request<AdminRestaurant>(`/admin/restaurants/${id}`)
}

export function updateAdminRestaurant(id: string, input: Partial<AdminRestaurant> & { ownerName?: string; email?: string; phone?: string; password?: string; restaurantName?: string }) {
  return request<AdminRestaurant>(`/admin/restaurants/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export function approveAdminRestaurant(id: string) {
  return request<AdminRestaurant>(`/admin/restaurants/${id}/approve`, { method: 'PATCH' })
}

export function rejectAdminRestaurant(id: string, reason: string) {
  return request<AdminRestaurant>(`/admin/restaurants/${id}/reject`, {
    method: 'PATCH',
    body: JSON.stringify({ reason }),
  })
}

export function activateAdminRestaurant(id: string) {
  return request<AdminRestaurant>(`/admin/restaurants/${id}/activate`, { method: 'PATCH' })
}

export function deactivateAdminRestaurant(id: string) {
  return request<AdminRestaurant>(`/admin/restaurants/${id}/deactivate`, { method: 'PATCH' })
}

export function deleteAdminRestaurant(id: string) {
  return request<{ message: string }>(`/admin/restaurants/${id}`, { method: 'DELETE' })
}

export type AdminOrder = {
  id: string
  orderNumber: string
  status: string
  paymentMethod: string
  paymentStatus: string
  total: string | number
  createdAt: string
  User?: { id: string; name: string; phone?: string; email?: string }
  Restaurant?: { id: string; name: string }
  OrderItems?: Array<{ id: string; name: string; quantity: number; unitPrice: string | number; lineTotal: string | number }>
}

export function getAdminOrders(input?: { status?: string; search?: string }) {
  const params = new URLSearchParams()
  if (input?.status && input.status !== 'all') params.set('status', input.status)
  if (input?.search) params.set('search', input.search)
  const query = params.toString() ? `?${params.toString()}` : ''
  return request<AdminOrder[]>(`/admin/orders${query}`)
}

export function getAdminOrder(id: string) {
  return request<AdminOrder>(`/admin/orders/${id}`)
}

export function getAdminReports() {
  return request<{
    status: Array<{ status: string; count: number }>
    topItems: Array<{ id: string; name: string; price: string | number; quantitySold: number; revenue?: number }>
    revenueTrend: Array<{ month: string; revenue: number }>
    totals: { revenue: number; orders: number; averageOrderValue: number }
  }>('/admin/reports')
}

export function getAdminDemand() {
  return request<{ trend: Array<{ date: string; orders: number }>; message: string }>('/admin/demand-prediction')
}

export type AdminExportType = 'orders' | 'users' | 'restaurants' | 'menu' | 'payments'

export async function downloadAdminExport(type: AdminExportType) {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('foodflow_access_token') : null
  const response = await fetch(`${API_BASE_URL}/admin/export/${type}.csv`, {
    credentials: 'include',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!response.ok) {
    const message = await response.text().catch(() => '')
    throw new Error(message || 'Failed to export data.')
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `foodflow-${type}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

export function createAdminBackup() {
  return request<{
    createdAt: string
    users: unknown[]
    restaurants: unknown[]
    orders: unknown[]
    orderItems?: unknown[]
    categories?: unknown[]
    addresses?: unknown[]
    menuItems: unknown[]
  }>('/admin/backup')
}

export function restoreAdminBackup(input: {
  users: unknown[]
  restaurants: unknown[]
  orders: unknown[]
  orderItems?: unknown[]
  categories?: unknown[]
  addresses?: unknown[]
  menuItems: unknown[]
}) {
  return request<{ message: string }>('/admin/backup/restore', {
    method: 'POST',
    body: JSON.stringify({ data: input }),
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
