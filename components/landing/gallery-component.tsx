"use client";

import Image from "next/image"
import Link from "next/link"
import { Gallery } from "@/types/gallery.types"
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
    <Link href={`/galeri/${gallery.slug}`} className="group block h-full">
      <article className="tpl-sticker flex h-full flex-col overflow-hidden rounded-[24px] bg-white">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--tpl-cream) sm:aspect-square">
          <Image
            src={mainFoto}
            alt={gallery.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
            className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="tpl-sticker-sm rounded-full bg-(--tpl-paper) px-4 py-1.5 font-baloo2 text-[11px] uppercase tracking-tight text-(--tpl-ink)">
              Lihat Detail
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="mb-2 line-clamp-2 font-baloo2 text-sm uppercase leading-tight tracking-tight text-(--tpl-ink) transition-colors group-hover:text-(--tpl-green-text)">
            {gallery.name}
          </h3>
          <div className="mt-auto flex items-center pt-3 font-quicksand text-[10px] font-bold uppercase tracking-widest text-(--tpl-ink)/70">
            Momen Kreatif
          </div>
        </div>
      </article>
    </Link>
  )
}
