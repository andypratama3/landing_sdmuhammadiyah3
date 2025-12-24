'use client'

import { useEffect } from 'react'
import { useApi } from '@/hooks/useApi'

export default function VisitorTracker() {
  // useApi POST (tidak auto fetch)
  const { post } = useApi()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hasLogged = sessionStorage.getItem('visitor_logged')

    if (!hasLogged) {
      post('/views') // POST ke Laravel
      sessionStorage.setItem('visitor_logged', 'true')
    }
  }, [post])

  return null
}
