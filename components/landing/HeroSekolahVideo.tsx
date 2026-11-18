"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface HeroSekolahVideoProps {
  /** 1080p, untuk layar >=1024px */
  srcHd: string
  /** 720p, cadangan untuk layar sempit */
  srcSd: string
  poster: string
  alt: string
}

const HD_QUERY = "(min-width: 1024px)"

/**
 * Latar video sekolah asli. Tunda pemuatan sampai LCP selesai + browser idle,
 * hormati prefers-reduced-motion dan mode hemat data, dan pilih sumber per
 * lebar layar: 1080p di desktop, 720p di ponsel (7,5MB -> 1,8MB).
 */
export function HeroSekolahVideo({ srcHd, srcSd, poster, alt }: HeroSekolahVideoProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const [activeSrc, setActiveSrc] = useState<string | null>(null)

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

    setActiveSrc(window.matchMedia(HD_QUERY).matches ? srcHd : srcSd)

    const start = () => setLoadVideo(true)
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 2500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(start, 1500)
    return () => window.clearTimeout(t)
  }, [reduceMotion, srcHd, srcSd])

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={`object-cover transition-opacity duration-500 ${canPlay && !reduceMotion ? "opacity-0" : "opacity-100"}`}
      />
      {!reduceMotion && loadVideo && activeSrc ? (
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
          <source src={activeSrc} type="video/mp4" />
        </video>
      ) : null}
    </>
  )
}