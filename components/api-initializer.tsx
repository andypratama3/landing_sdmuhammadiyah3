'use client'
import { useEffect, useRef, useState } from 'react'
import { ApiClient } from '@/lib/api'

export default function ApiInitializer() {
  const initializedRef = useRef(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  useEffect(() => {
    let mounted = true
    let retryTimeout: NodeJS.Timeout | null = null

    const initializeApi = async () => {
      if (initializedRef.current) return

      try {
        await ApiClient.initialize()
        initializedRef.current = true
        console.log('✅ API Client initialized')
      } catch (error) {
        console.error('❌ API initialization failed:', error)
        if (mounted && retryCount < maxRetries) {
          const delay = Math.min(1000 * 2 ** retryCount, 10000)
          retryTimeout = setTimeout(() => setRetryCount(prev => prev + 1), delay)
        }
      }
    }

    initializeApi()
    return () => {
      mounted = false
      if (retryTimeout) clearTimeout(retryTimeout)
    }
  }, [retryCount])

  return null
}
