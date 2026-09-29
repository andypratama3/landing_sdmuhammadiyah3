"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface HeroSekolahVideoProps {
  src: string
  poster: string
}

export function HeroSekolahVideo({ src, poster }: HeroSekolahVideoProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  // Tunda pemuatan video sampai LCP selesai + browser idle agar tidak
  // memblokir First/Largest Contentful Paint (video 6,6MB -> 1,8MB 720p).
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    // Hormati mode hemat data & koneksi lambat: tetap tampilkan poster saja.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (conn?.saveData) return
    if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return

    const start = () => setLoadVideo(true)
    if ("requestIdleCallback" in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(start, { timeout: 2500 })
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(start, 1500)
    return () => window.clearTimeout(t)
  }, [reduceMotion])

  return (
    <>
      <Image
        src={poster}
        alt="Halaman dan gedung SD Muhammadiyah 3 Samarinda"
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        className={`object-cover transition-opacity duration-500 ${canPlay && !reduceMotion ? "opacity-0" : "opacity-100"}`}
      />
      {!reduceMotion && loadVideo ? (
        <video
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${canPlay ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setCanPlay(true)}
          onError={() => setCanPlay(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </>
  )
}
