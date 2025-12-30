'use client';

import { useEffect, useRef, useState } from 'react';
import { ApiClient } from '@/lib/api';
import { JWTManager } from '@/lib/jwt';

/**
 * ApiInitializer
 * ------------------------------
 * - Inisialisasi API Client saat app pertama kali load
 * - Generate / refresh JWT token jika diperlukan
 * - Mencegah double initialization
 * - Retry otomatis dengan exponential backoff
 * - Tidak memblokir rendering UI
 *
 * Gunakan di RootLayout (App Router)
 */
export default function ApiInitializer() {
  const initializedRef = useRef(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout | null = null;

    const initializeApi = async () => {
      // 🔒 Cegah init dua kali
      if (initializedRef.current) return;

      // 🔒 Skip init jika token masih valid
      const token = JWTManager.getAccessToken();
      if (token && !JWTManager.isAccessTokenExpired()) {
        initializedRef.current = true;
        return;
      }

      try {
        await ApiClient.initialize();
        initializedRef.current = true;

        if (process.env.NODE_ENV !== 'production') {
          console.log('✅ API Client initialized');
        }
      } catch (error) {
        console.error('❌ API initialization failed:', error);

        // 🔁 Retry dengan exponential backoff
        if (mounted && retryCount < maxRetries) {
          const delay = Math.min(1000 * 2 ** retryCount, 10000);

          retryTimeout = setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, delay);
        }
      }
    };

    initializeApi();

    return () => {
      mounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [retryCount]);

  // Komponen ini tidak merender apa pun
  return null;
}

/**
 * ApiInitializerStatus
 * ------------------------------
 * Optional helper untuk debugging (DEV ONLY)
 * Menampilkan status API di pojok layar
 */
export function ApiInitializerStatus() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
          method: 'GET',
        });
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };

    const timer = setTimeout(checkHealth, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🚫 Jangan tampil di production
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed z-50 bottom-4 right-4">
      <div
        className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-lg
          ${status === 'loading' ? 'bg-yellow-500 text-white' : ''}
          ${status === 'ready' ? 'bg-green-600 text-white' : ''}
          ${status === 'error' ? 'bg-red-600 text-white' : ''}
        `}
      >
        API: {status}
      </div>
    </div>
  );
}
