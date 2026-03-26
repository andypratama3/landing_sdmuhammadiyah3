import type { ApiResponse } from '@/types'
import crypto from 'crypto'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://dashboard.sdmuhammadiyah3smd.com/api/v2'

let cachedSystemToken: string | null = null;
let tokenExpiresAt: number = 0;

export async function getSystemAuthToken(): Promise<string | null> {
  // If memory cache holds a valid token (under 50 mins), serve it instantly bypassing crypto load
  if (cachedSystemToken && Date.now() < tokenExpiresAt) {
    return cachedSystemToken;
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomUUID();
    const stringToSign = `${timestamp}.${nonce}`;
    if (!process.env.API_SECRET_KEY) throw new Error('API_SECRET_KEY environment variable is missing');
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
      next: { revalidate: 3000 } // Allows sitemaps and static generation to build without crashing
    });

    if (!res.ok) throw new Error(`Token API Failed: ${res.status}`);

    // Parse the payload out of Set-Cookie specifically emitted by Laravel
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
      tokenExpiresAt = Date.now() + (50 * 60 * 1000); // Expiration valid locally for 50 minutes Memory
      return authToken;
    }
    
    return null;
  } catch (error) {
    console.error('System Auth generation error:', error);
    return null;
  }
}

export async function serverGetPublic<T>(
  endpoint: string,
  options?: { revalidate?: number }
): Promise<ApiResponse<T>> {
  const token = await getSystemAuthToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    next: {
      revalidate: options?.revalidate ?? 3600,
    },
  })

  if (!res.ok) {
    console.error('Public API error:', res.status)
    return { success: false, data: [] as T, message: 'Server communication error' }
  }

  return res.json()
}
