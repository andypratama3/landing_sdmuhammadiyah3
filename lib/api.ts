export class ApiClient {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL

  static async initialize() {
    // Cukup panggil route /api/token untuk set cookie
    await fetch('/api/token', { method: 'POST', credentials: 'include' })
  }

  static async request<T>(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      credentials: 'include', // 🔑 kirim cookie otomatis
    })

    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return res.json() as Promise<T>
  }

  static get<T>(endpoint: string) { return this.request<T>(endpoint) }
  static post<T>(endpoint: string, data: any) { 
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }) 
  }
  static put<T>(endpoint: string, data: any) { 
    return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }) 
  }
  static delete<T>(endpoint: string) { 
    return this.request<T>(endpoint, { method: 'DELETE' }) 
  }
}
