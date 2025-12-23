'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api';

/**
 * Component untuk inisialisasi API Client dengan error handling
 * - Generate/refresh JWT token
 * - Setup auto-refresh token setiap 6 hari
 * - Handle initialization errors gracefully
 * - Jalankan di root layout
 */
export default function ApiInitializer() {
  const [initStatus, setInitStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout;

    const initializeApi = async () => {
      try {
        await ApiClient.initialize();
        
        if (mounted) {
          setInitStatus('success');
          console.log('API Client initialized successfully');
        }
      } catch (error) {
        console.error('Failed to initialize API client:', error);
        
        if (mounted) {
          // Retry with exponential backoff
          if (retryCount < maxRetries) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
            console.log(`Retrying API initialization in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
            
            retryTimeout = setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, delay);
          } else {
            setInitStatus('error');
            console.error('API initialization failed after max retries');
            // App can still work with cache/local data
          }
        }
      }
    };

    if (initStatus === 'pending' || retryCount > 0) {
      initializeApi();
    }

    return () => {
      mounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [retryCount]);

  // Component ini tidak render apa-apa
  // Errors are logged but don't block the app
  return null;
}

/**
 * Optional: Status indicator component for debugging
 * Tambahkan di development mode untuk melihat status inisialisasi
 */
export function ApiInitializerStatus() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    // Check if API is ready
    const checkStatus = async () => {
      try {
        // Simple health check
        await ApiClient.get('/health');
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };

    const timer = setTimeout(checkStatus, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed z-50 bottom-4 right-4">
      <div className={`
        px-4 py-2 rounded-lg text-sm font-medium shadow-lg
        ${status === 'loading' ? 'bg-yellow-500 text-white' : ''}
        ${status === 'ready' ? 'bg-green-500 text-white' : ''}
        ${status === 'error' ? 'bg-red-500 text-white' : ''}
      `}>
        API: {status}
      </div>
    </div>
  );
}