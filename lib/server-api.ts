import type { ApiResponse } from '@/types'
import crypto from 'crypto'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://app.sdmuhammadiyah3smd.com/api/v2'

let cachedSystemToken: string | null = null;
let tokenExpiresAt: number = 0;
let backoffUntil: number = 0;

export async function getSystemAuthToken(): Promise<string | null> {
  if (!process.env.API_SECRET_KEY) return null;

  if (Date.now() < backoffUntil) return null;

  if (cachedSystemToken && Date.now() < tokenExpiresAt) {
    return cachedSystemToken;
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomUUID();
    const stringToSign = `${timestamp}.${nonce}`;
    const secretKey = Buffer.from(process.env.API_SECRET_KEY, 'hex');
    const signature = crypto.createHmac('sha256', secretKey).update(stringToSign).digest('hex');

    const res = await fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TIMESTAMP': timestamp,
        'X-NONCE': nonce,
        'X-SIGNATURE': signature,
        'User-Agent': 'NextJS-SSR-Internal/1.0',
      },
      next: { revalidate: 3000 },
    });

    if (!res.ok) throw new Error(`Token API Failed: ${res.status}`);

    const setCookies = res.headers.getSetCookie();
    let authToken = null;

    if (setCookies && setCookies.length > 0) {
      for (const cookie of setCookies) {
        if (cookie.startsWith('access_token=')) {
          authToken = cookie.split(';')[0].split('=')[1];
          break;
        }
      }
    }

    if (authToken) {
      cachedSystemToken = authToken;
      tokenExpiresAt = Date.now() + 50 * 60 * 1000;
      return authToken;
    }

    return null;
  } catch {
    backoffUntil = Date.now() + 30_000;
    return null;
  }
}

export async function serverGetPublic<T>(
  endpoint: string,
  options?: { revalidate?: number }
): Promise<ApiResponse<T>> {
  const token = await getSystemAuthToken();
  if (!token) return { success: false, data: [] as T, message: 'Server unavailable' };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: {
        revalidate: options?.revalidate ?? 3600,
      },
    });

    if (!res.ok) {
      return { success: false, data: [] as T, message: 'Server communication error' };
    }

    return res.json();
  } catch {
    return { success: false, data: [] as T, message: 'Server unavailable' };
  }
}
