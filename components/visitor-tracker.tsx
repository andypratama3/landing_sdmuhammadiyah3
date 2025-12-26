'use client';

import { useEffect, useCallback } from 'react';
import { useMutation } from '@/hooks/useApi';

/**
 * Component untuk tracking visitor
 * Mengirim log visitor ke server hanya sekali per hari
 */
const VisitorTracker = () => {
  const { mutate, loading } = useMutation('/visitor/store', 'POST');

  const trackVisitor = useCallback(async () => {
    try {
      // Cek apakah sudah tracking hari ini
      const lastTracked = localStorage.getItem('visitor_tracked_date');
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Jika belum tracking hari ini, kirim request
      if (lastTracked !== today) {
        const result = await mutate();
        
      if (result.success) {
          localStorage.setItem('visitor_tracked_date', today);
          window.dispatchEvent(new Event('visitor-updated'));
        } 
      }
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  }, [mutate]);

  useEffect(() => {
    // Delay tracking untuk menghindari blocking render
    const timer = setTimeout(() => {
      trackVisitor();
    }, 1000);

    return () => clearTimeout(timer);
  }, [trackVisitor]);

  // Component ini tidak render apapun
  return null;
};

export default VisitorTracker;