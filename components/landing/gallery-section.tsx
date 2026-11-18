import Link from "next/link"
import { GalleryCard } from "@/components/landing/gallery-component"
import type { Gallery } from "@/types/gallery.types"

interface GallerySectionProps {
  galleries: Gallery[]
}

export function GallerySection({ galleries }: GallerySectionProps) {
  if (!galleries?.length) return null

  return (
    <section
      id="galeri"
      aria-labelledby="galeri-heading"
      className="gsap-gallery bg-(--tpl-coral) py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h2
            id="galeri-heading"
            className="text-balance font-baloo2 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium uppercase tracking-tight text-(--tpl-green-text)"
          >
            Aktivitas di sekolah
          </h2>
          <p className="mt-3 max-w-[48ch] text-pretty font-quicksand text-base text-(--tpl-ink)/80">
            Cuplikan belajar, ibadah, dan karya siswa. Bukan katalog stok.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {galleries.map((gallery) => (
            <div key={gallery.id ?? gallery.slug} className="gallery-card">
              <GalleryCard gallery={gallery} />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/galeri" className="tpl-btn px-6 py-3 text-base">
            Lihat galeri lengkap
          </Link>
        </div>
      </div>
    </section>
  )
}
