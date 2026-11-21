"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface BeritaImageZoomProps {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * Gambar utama berita dengan lightbox. Label "Klik untuk zoom" sebelumnya
 * dekoratif tanpa handler; sekarang benar-benar membuka dialog.
 */
export function BeritaImageZoom({ src, alt, width, height }: BeritaImageZoomProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-forest-700)"
          aria-label={`Perbesar gambar: ${alt}`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="h-auto w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-(--color-forest-700)/20 to-(--color-sun-500)/20" />
          <span className="pointer-events-none absolute inset-x-6 bottom-6 translate-y-4 rounded-2xl bg-white/95 px-6 py-3 opacity-0 shadow-2xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-gray-900/95">
            <span className="text-xs font-black uppercase tracking-widest text-(--color-forest-700)">Klik untuk zoom</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[min(96vw,1200px)] border-0 bg-transparent p-0 shadow-none sm:max-w-[min(96vw,1200px)]">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="96vw"
          className="h-auto max-h-[88vh] w-full rounded-2xl object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}
