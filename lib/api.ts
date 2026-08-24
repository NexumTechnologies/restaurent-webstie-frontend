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
}

type AuthResult = {
  accessToken: string
  user: AuthUser
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
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
