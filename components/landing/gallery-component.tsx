import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Gallery } from "@/types/gallery.types"

interface GalleryCardProps {
  gallery: Gallery
}

export function GalleryCard({ gallery }: GalleryCardProps) {

  // ambil foto pertama dari string (jika ada)
  const firstFoto =
    gallery.foto?.split(",")?.[0]?.trim() || null

  // tentukan foto utama
  const mainFoto = gallery.cover
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/gallery/cover/${gallery.cover}`
    : firstFoto
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/gallery/${firstFoto}`
    : "/placeholder.svg"

  return (
    <Link href={`/galeri/${gallery.slug}`} className="block">
      <Card className="overflow-hidden transition-all bg-white border-0 hover:shadow-xl group rounded-2xl dark:bg-gray-700">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={mainFoto}
            alt={gallery.name}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 rounded-2xl"
          />
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
            {gallery.name}
          </h3>

          <span className="text-xs text-[#33b962] hover:underline">
            Lihat Detail
          </span>
        </div>
      </Card>
    </Link>
  )
}
