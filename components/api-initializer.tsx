// components/api-initializer.tsx - FIXED VERSION
'use client';

import { useEffect, useRef, useState } from 'react';
import { ApiClient } from '@/lib/api';

/**
 * ApiInitializer
 * ------------------------------
 * - Initialize API Client SEBELUM component lain render
 * - Generate JWT token dari backend
 * - Set cookie untuk authentication
 * - Mencegah race condition dengan useApi hooks
 */
export default function ApiInitializer() {
  const initializedRef = useRef(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout | null = null;

    const initializeApi = async () => {
      // 🔒 Cegah double initialization
      if (initializedRef.current) {
        setStatus('ready');
        return;
      }

      // 🔒 Skip jika token masih valid
      if (ApiClient.isTokenReady()) {
        // console.log('✅ [ApiInitializer] Token already ready');
        initializedRef.current = true;
        setStatus('ready');
        return;
      }

      setStatus('loading');

      try {
        // console.log('🚀 [ApiInitializer] Initializing...');
        
        // ✅ Initialize API Client (generate token)
        await ApiClient.initialize();
        
        if (!mounted) return;

        initializedRef.current = true;
        setStatus('ready');

        // console.log('✅ [ApiInitializer] Ready');

      } catch (error) {
        console.error('❌ [ApiInitializer] Failed:', error);

        if (!mounted) return;

        setStatus('error');

        // 🔁 Retry dengan exponential backoff
        if (retryCount < maxRetries) {
          const delay = Math.min(1000 * 2 ** retryCount, 10000);
          console.log(`🔄 [ApiInitializer] Retry in ${delay}ms...`);

          retryTimeout = setTimeout(() => {
            if (mounted) {
              setRetryCount(prev => prev + 1);
            }
          }, delay);
        } else {
          console.error('❌ [ApiInitializer] Max retries reached');
        }
      }
    };

    initializeApi();

    return () => {
      mounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [retryCount]);

  // Tidak render apapun
  return null;
}

/**
 * ApiInitializerStatus
 * ------------------------------
 * Visual indicator untuk debugging (DEV ONLY)
 */
export function ApiInitializerStatus() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const isReady = ApiClient.isTokenReady();
      setTokenReady(isReady);
      
      if (isReady) {
        setStatus('ready');
      } else {
        setStatus('loading');
      }
    };

    // Check every 500ms
    const interval = setInterval(checkStatus, 500);
    checkStatus(); // Initial check

    return () => clearInterval(interval);
  }, []);

  // 🚫 Hide in production
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed z-[9999] bottom-4 right-4">
      <div
        className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all
          ${status === 'loading' ? 'bg-yellow-500 text-white animate-pulse' : ''}
          ${status === 'ready' ? 'bg-green-600 text-white' : ''}
          ${status === 'error' ? 'bg-red-600 text-white' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'ready' ? 'bg-white' : 'bg-white/50'
          }`} />
          <span>API: {status}</span>
        </div>
        {tokenReady && (
          <div className="mt-1 text-xs opacity-75">
            Token Ready ✓
          </div>
        )}
      </div>
    </div>
  );
}