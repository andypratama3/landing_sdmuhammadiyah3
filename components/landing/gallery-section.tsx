import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GalleryCard } from "@/components/landing/gallery-component"
import type { Gallery } from "@/types/gallery.types"

interface GallerySectionProps {
  galleries: Gallery[]
}

export function GallerySection({ galleries }: GallerySectionProps) {
  if (!galleries?.length) return null

  return (
    <section className="gsap-gallery py-24 bg-(--color-cloud-100) dark:bg-(--color-forest-950)">
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h2 className="text-balance font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
            Aktivitas di kampus
          </h2>
          <p className="mt-3 max-w-[48ch] text-pretty text-base text-(--color-ink-700) dark:text-(--color-cloud-200) font-quicksand">
            Cuplikan belajar, ibadah, dan karya siswa. Bukan katalog stok.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {galleries.map((gallery) => (
            <div key={gallery.id ?? gallery.slug} className="gallery-card">
              <GalleryCard gallery={gallery} />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button
            asChild
            className="h-12 rounded-full bg-(--color-forest-700) px-7 font-semibold text-white hover:bg-(--color-forest-600) dark:bg-(--color-sun-500) dark:text-(--color-ink-950) dark:hover:bg-(--color-sun-400)"
          >
            <Link href="/galeri">Lihat galeri lengkap</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
