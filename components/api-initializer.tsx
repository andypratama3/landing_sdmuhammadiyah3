'use client';

import { useEffect } from 'react';
import { ApiClient } from '@/lib/api';

/**
 * Component untuk inisialisasi API Client
 * - Generate/refresh JWT token
 * - Setup auto-refresh token setiap 6 hari
 * - Jalankan di root layout
 */
export default function ApiInitializer() {
  useEffect(() => {
    // Initialize API client saat app pertama kali load
    ApiClient.initialize().catch(error => {
      console.error('Failed to initialize API client:', error);
    });

    // Cleanup tidak diperlukan karena setInterval di-handle di ApiClient
  }, []);

  // Component ini tidak render apa-apa
  return null;
}