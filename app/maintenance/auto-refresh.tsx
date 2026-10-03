'use client'

import { useEffect } from 'react'

const RELOAD_MS = 60_000

export default function AutoRefresh() {
  useEffect(() => {
    const id = setTimeout(() => window.location.reload(), RELOAD_MS)
    return () => clearTimeout(id)
  }, [])

  return null
}