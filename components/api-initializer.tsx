// components/api-initializer.tsx
'use client';

import { useEffect, useRef } from 'react';
import { ApiClient } from '@/lib/api';

/**
 * ApiInitializer
 * ------------------------------
 * - Initialize API Client SEBELUM component lain render
 * - Generate JWT token dari backend
 * - Mencegah race condition dengan useApi hooks
 */
export default function ApiInitializer() {
  const initializedRef = useRef(false);

  useEffect(() => {
    const initializeApi = async () => {
      // 🔒 Cegah double initialization
      if (initializedRef.current) return;

      // 🔒 Skip jika token masih valid
      if (ApiClient.isTokenReady()) {
        initializedRef.current = true;
        return;
      }

      try {
        // ✅ Initialize API Client (generate token)
        await ApiClient.initialize();
        initializedRef.current = true;
      } catch (error) {
        // Error handled in ApiClient
      }
    };

    initializeApi();
  }, []);

  return null;
}
