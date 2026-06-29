'use client'

import { useEffect } from 'react'

type MetricName = 'LCP' | 'FID' | 'INP' | 'CLS' | 'FCP' | 'TTFB'

const THRESHOLDS: Record<MetricName, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
}

function reportMetric(name: MetricName, value: number) {
  const threshold = THRESHOLDS[name]
  const rating =
    value <= threshold.good ? 'good' : value <= threshold.poor ? 'needs-improvement' : 'poor'

  if (process.env.NODE_ENV === 'development') {
    const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'
    console.log(`[Web Vitals] ${emoji} ${name}: ${value.toFixed(2)} (${rating})`)
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      non_interaction: true,
    })
  }
}

export function usePageSpeed() {
  useEffect(() => {
    import('web-vitals').then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      onLCP((m) => reportMetric('LCP', m.value))
      onINP((m) => reportMetric('INP', m.value))
      onCLS((m) => reportMetric('CLS', m.value))
      onFCP((m) => reportMetric('FCP', m.value))
      onTTFB((m) => reportMetric('TTFB', m.value))
    })
  }, [])
}
