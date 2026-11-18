"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface PlayfulVideoProps {
  /** 1080p, untuk layar >=1024px */
  srcHd: string
  /** 720p, cadangan untuk layar sempit (jauh lebih ringan) */
  srcSd: string
  /** Poster webp, dipakai sebagai LCP dan saat video belum/tidak dimuat */
  poster: string
  /** alt untuk poster/video; kosong = dekoratif (aria-hidden) */
  alt?: string
  /** Kelas tambahan untuk <video>/<img>; container sudah absolute inset-0 */
  className?: string
  sizes?: string
  priority?: boolean
}

const REDUCED = "(prefers-reduced-motion: reduce)"
/** Di bawah lebar ini layar tidak cukup untuk 1080p terlihat berbeda dari 720p. */
const HD_QUERY = "(min-width: 1024px)"

/**
 * Latar video (animasi karakter template / adegan sekolah) dengan pagar yang
 * sama seperti HeroSekolahVideo: tunda unduh sampai idle, hormati
 * prefers-reduced-motion dan mode hemat data. Sumber video dipilih per lebar
 * layar — 1080p di desktop, 720p di ponsel — supaya HD tidak membebani ponsel.
 */
export function PlayfulVideo({ srcHd, srcSd, poster, alt = "", className = "", sizes = "100vw", priority = false }: PlayfulVideoProps) {
  const [motionOk, setMotionOk] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const [activeSrc, setActiveSrc] = useState<string | null>(null)

  useEffect(() => {
    const media = window.matchMedia(REDUCED)
    const sync = () => setMotionOk(!media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!motionOk) return
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
  }, [motionOk, srcHd, srcSd])

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover object-center ${className} ${canPlay && loadVideo ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
      />
      {motionOk && loadVideo && activeSrc ? (
        <video
          className={`absolute inset-0 size-full object-cover object-center ${className} ${canPlay ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
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
