"use client";

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Gallery } from "@/types/gallery.types"
import Image from "next/image"
import { resolveImageUrl } from "@/lib/image-url"
import { getGalleryPhotos } from "@/lib/gallery-photos"

interface GalleryCardProps {
  gallery: Gallery
}

export function GalleryCard({ gallery }: GalleryCardProps) {

  // ambil foto pertama dari daftar foto (photos array atau legacy foto CSV)
  const firstFoto = getGalleryPhotos(gallery)[0] || null

  // tentukan foto utama
  const mainFoto = gallery.cover
    ? resolveImageUrl(gallery.cover, "img/gallery/cover")
    : firstFoto
      ? resolveImageUrl(firstFoto, "img/gallery")
      : "/placeholder.svg"

  return (
    <Link href={`/galeri/${gallery.slug}`} className="block h-full group">
      <Card className="overflow-hidden transition-all duration-700 bg-white dark:bg-gray-900 border-0 shadow-xl hover:shadow-2xl rounded-[2.5rem] card-premium flex flex-col h-full glass">
        <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 w-full">
          <Image
            src={mainFoto}
            alt={gallery.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
            <div className="px-8 py-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl">
              Lihat Detail
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <h3 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white line-clamp-2 uppercase tracking-tight group-hover:text-(--color-forest-700) dark:group-hover:text-(--color-sun-400) transition-colors leading-tight mb-2">
            {gallery.name}
          </h3>
          <div className="mt-auto pt-3 sm:pt-4 flex items-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-(--color-forest-700) dark:text-(--color-sun-400)">
            Momen Kreatif
          </div>
        </div>
      </Card>
    </Link>
  )
}