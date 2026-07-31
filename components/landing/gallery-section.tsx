import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GalleryCard } from "@/components/landing/gallery-component"
import type { Gallery } from "@/types/gallery.types"

interface GallerySectionProps {
  galleries: Gallery[]
}

export function GallerySection({ galleries }: GallerySectionProps) {
  return (
    <section className="py-24 bg-(--color-cloud-100)/80 dark:bg-gray-950/50">
      <div className="container px-4 mx-auto">
        <div className="mb-14 text-center">
          <h2 className="text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">
            Aktivitas Kami
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base text-gray-600 dark:text-gray-400 font-quicksand">
            Kegiatan seru dan edukatif yang dilakukan siswa di sekolah
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-14">
          {galleries?.map((gallery) => (
            <div key={gallery.id}>
              <GalleryCard gallery={gallery} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="bg-(--color-forest-700) hover:bg-(--color-forest-500) text-white rounded-full px-10 py-7 text-base font-bold shadow-lg hover:scale-[1.03] transition-all"
            size="lg"
          >
            <Link href="/galeri">Lihat Semua Aktivitas</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
