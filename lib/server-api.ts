import type { ApiResponse } from '@/types'
import crypto from 'crypto'
import { getDummyData, shouldUseDummyData, logDummyDataUsage } from '@/lib/dummy-data'

/**
 * Tag global untuk semua data publik landing. Backend mengirim on-demand
 * revalidation (POST /api/revalidate) setiap data berubah, sehingga ISR cache
 * langsung ter-bypass dan halaman selalu realtime tanpa menunggu 1 jam.
 */
export const LANDING_TAG = 'landing'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://app.sdmuhammadiyah3smd.com/api/v2'

let cachedSystemToken: string | null = null;
let tokenExpiresAt: number = 0;
let backoffUntil: number = 0;

type FetchInit = NonNullable<Parameters<typeof fetch>[1]>;

export async function getSystemAuthToken(forceRefresh = false): Promise<string | null> {
  if (!process.env.API_SECRET_KEY) return null;

  if (forceRefresh) {
    cachedSystemToken = null;
    tokenExpiresAt = 0;
    backoffUntil = 0;
  }

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
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`Token API Failed: ${res.status}`);

    const body = await res.json().catch(() => null) as {
      data?: { access_token?: string };
      access_token?: string;
    } | null;
    let authToken = body?.data?.access_token ?? body?.access_token ?? null;

    if (!authToken) {
      for (const cookie of res.headers.getSetCookie() ?? []) {
        if (cookie.startsWith('access_token=')) {
          authToken = cookie.split(';')[0].split('=')[1] ?? null;
          break;
        }
      }
    }

    if (!authToken) {
      throw new Error('Token response missing access_token');
    }

    cachedSystemToken = authToken;
    tokenExpiresAt = Date.now() + 50 * 60 * 1000;
    return authToken;
  } catch {
    cachedSystemToken = null;
    tokenExpiresAt = 0;
    backoffUntil = Date.now() + 30_000;
    return null;
  }
}

/**
 * Fetch data API v2 dengan Bearer token. Bila token di memori ternyata sudah
 * ditolak backend (mis. cache backend terhapus), ulangi sekali dengan token
 * baru sebelum halaman mengambil keputusan "server error".
 */
export async function authenticatedFetch(endpoint: string, init: FetchInit = {}): Promise<Response> {
  const url = `${BASE_URL}${endpoint}`;

  const withToken = (token: string | null): FetchInit => {
    const headers = new Headers(init.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return { ...init, headers };
  };

  let token = await getSystemAuthToken();
  let res = await fetch(url, withToken(token));

  if (res.status === 401) {
    token = await getSystemAuthToken(true);
    if (token) {
      res = await fetch(url, withToken(token));
    }
  }

  return res;
}

export async function serverGetPublic<T>(
  endpoint: string,
  options?: { revalidate?: number }
): Promise<ApiResponse<T>> {
  // 🎭 Check for dummy data in development only
  if (shouldUseDummyData()) {
    const dummyData = getDummyData<ApiResponse<T>>(endpoint)
    if (dummyData) {
      logDummyDataUsage(endpoint)
      return dummyData
    }
  }

  try {
    const res = await authenticatedFetch(endpoint, {
      next: {
        revalidate: options?.revalidate ?? 3600,
        tags: [LANDING_TAG],
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
