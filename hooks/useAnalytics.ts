'use client'

import { useGoogleAnalytics } from '@/components/google-analytics'

export type SchoolEventAction =
  | 'click_cta'
  | 'view_prestasi'
  | 'download_jadwal'
  | 'contact_whatsapp'
  | 'view_guru'
  | 'contact_phone'
  | 'view_berita'

export interface SchoolEvent {
  action: SchoolEventAction
  label: string
  value?: number
}

export function useAnalytics() {
  const { trackEvent } = useGoogleAnalytics()

  const trackSchoolEvent = ({ action, label, value }: SchoolEvent) => {
    trackEvent(action, {
      event_category: 'school_engagement',
      event_label: label,
      ...(value !== undefined ? { value } : {}),
    })
  }

  const trackPageView = (path: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: path,
      })
    }
  }

  const trackConversion = (label: string) => {
    trackSchoolEvent({ action: 'click_cta', label })
  }

  return { trackSchoolEvent, trackPageView, trackConversion, trackEvent }
}
