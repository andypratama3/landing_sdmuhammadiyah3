"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface HeroYouTubeVideoProps {
  videoId: string
  poster: string
}

export function HeroYouTubeVideo({ videoId, poster }: HeroYouTubeVideoProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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
        sizes="(max-width: 1024px) 100vw, 52vw"
        className={`object-cover transition-opacity duration-500 ${isLoaded && !reduceMotion ? "opacity-0" : "opacity-100"}`}
      />
      {!reduceMotion ? (
        <div className={`absolute inset-0 size-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <iframe
            className="pointer-events-none size-full"
            style={{
              transform: "scale(1.5)",
              transformOrigin: "center center",
              width: "100%",
              height: "100%"
            }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&autohide=1`}
            title="Sekotif Band Video Background"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
            aria-label="Video sinematik halaman kampus SD Muhammadiyah 3 Samarinda"
          />
          <div className="absolute inset-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-(--color-paper-50)/30 to-transparent dark:from-(--color-forest-950)/30" />
        </div>
      ) : null}
    </>
  )
}
