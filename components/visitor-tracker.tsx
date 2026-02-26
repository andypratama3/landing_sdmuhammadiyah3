'use client';

import { useEffect } from 'react';

const VisitorTracker = () => {
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastTracked = localStorage.getItem('visitor_tracked_date');

    if (lastTracked === today) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/visitor/store`;

    const send = () => {
      navigator.sendBeacon(url);
      localStorage.setItem('visitor_tracked_date', today);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(send, { timeout: 5000 });
    } else {
      setTimeout(send, 3000);
    }
  }, []);

  return null;
};

export default VisitorTracker;