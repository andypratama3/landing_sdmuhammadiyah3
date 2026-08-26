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

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  return (
    <>
      <Image
        src={poster}
        alt="Halaman dan gedung SD Muhammadiyah 3 Samarinda"
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-500 ${canPlay && !reduceMotion ? "opacity-0" : "opacity-100"}`}
      />
      {!reduceMotion ? (
        <video
          className={`absolute inset-0 size-full transition-opacity duration-500 ${canPlay ? "opacity-100" : "opacity-0"}`}
          style={{
            objectFit: "fill",
            width: "100%",
            height: "100%"
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden={canPlay ? undefined : true}
          aria-label="Video sinematik halaman sekolah SD Muhammadiyah 3 Samarinda"
          onCanPlay={() => setCanPlay(true)}
          onError={() => setCanPlay(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </>
  )
}
