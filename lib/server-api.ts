import type { ApiResponse } from '@/types'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://dashboard.sdmuhammadiyah3smd.com/api/v2'

export async function serverGetPublic<T>(
  endpoint: string,
  options?: { revalidate?: number }
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: options?.revalidate ?? 3600,
    },
  })

  if (!res.ok) {
    console.error('Public API error:', res.status)
    return { success: false, data: [] as T }
  }

  return res.json()
}
