"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

const VIDEO_ID = "lb14Dy0uwI4"

// Facade YouTube: jangan unduh player + cookie pihak ketiga (±1MB)
// sebelum pengguna benar-benar ingin menonton. Mengatasi temuan
// Lighthouse "Menggunakan cookie pihak ketiga" & payload jaringan besar.
export function VideoSection() {
  const [play, setPlay] = useState(false)

  return (
    <section
      id="profil-video"
      aria-labelledby="profil-video-heading"
      className="gsap-video bg-white py-24"
    >
      <div className="container mx-auto px-4">
        <h2
          id="profil-video-heading"
          className="max-w-xl text-balance font-baloo2 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium uppercase tracking-tight text-(--tpl-green-text)"
        >
          Sekolah yang bisa dilihat, bukan hanya dijanjikan
        </h2>
        <div className="video-container relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-[28px] border-2 border-[#191717] bg-(--tpl-ink) shadow-[4px_5px_0_0_#191717]">
          {play ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Profil SD Muhammadiyah 3 Samarinda"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlay(true)}
              className="group relative block size-full cursor-pointer"
              aria-label="Putar video profil SD Muhammadiyah 3 Samarinda"
            >
              <Image
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                loading="lazy"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/25 transition-colors duration-300 motion-reduce:transition-none group-hover:bg-black/15" aria-hidden="true" />
              <span
                className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#191717] bg-(--tpl-green) text-(--tpl-ink) shadow-[3px_4px_0_0_#191717] transition-transform duration-300 motion-safe:group-hover:-translate-y-[calc(50%+2px)]"
                aria-hidden="true"
              >
                <Play className="size-6 fill-current" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
