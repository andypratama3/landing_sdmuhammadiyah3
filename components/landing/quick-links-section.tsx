import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { resolveImageUrl } from "@/lib/image-url"
import type { Fasilitas } from "@/types/fasilitas.types"
import type { PrestasiSekolah } from "@/types/prestasi.types"

interface QuickLinksSectionProps {
  fasilitas?: Fasilitas[]
  prestasiSekolah?: PrestasiSekolah[]
}

const chipFills = ["bg-(--tpl-paper)", "bg-(--tpl-mint)", "bg-(--tpl-yellow)"]

export function QuickLinksSection({ fasilitas, prestasiSekolah }: QuickLinksSectionProps) {
  // Use API data if available, otherwise fallback to default tiles
  const tiles = [
    {
      title: "Fasilitas",
      image: fasilitas && fasilitas.length > 0
        ? resolveImageUrl(fasilitas[0].foto, "img/fasilitas")
        : "/fasilitas.webp",
      href: "/fasilitas",
      span: "lg:col-span-7 lg:row-span-2 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[28rem]",
    },
    {
      title: "Prestasi siswa",
      image: "/prestasi-siswa.webp",
      href: "/prestasi-siswa",
      span: "lg:col-span-5 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[13.5rem]",
    },
    {
      title: "Prestasi sekolah",
      image: prestasiSekolah && prestasiSekolah.length > 0
        ? resolveImageUrl(prestasiSekolah[0].foto, "img/prestasi")
        : "/prestasi-sekolah.webp",
      href: "/prestasi-sekolah",
      span: "lg:col-span-5 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[13.5rem]",
    },
  ]

  return (
    <section
      id="tautan-cepat"
      aria-labelledby="tautan-cepat-heading"
      className="bg-(--tpl-cream) py-20 sm:py-24"
    >
      <div className="container mx-auto px-4">
        <h2
          id="tautan-cepat-heading"
          className="max-w-lg text-balance font-baloo2 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium uppercase tracking-tight text-(--tpl-green-text)"
        >
          Lihat ruang, karya, dan capaian
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {tiles.map((tile, index) => (
            <Link
              key={tile.href}
              href={tile.href}
              className={`quick-link-card group relative overflow-hidden rounded-[24px] border-2 border-[#191717] bg-white shadow-[4px_5px_0_0_#191717] ${tile.span} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--tpl-ring)`}
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={75}
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <h3
                  className={`tpl-sticker-sm inline-block rounded-full px-3 py-1.5 font-baloo2 text-sm uppercase tracking-tight text-(--tpl-ink) sm:text-base ${chipFills[index % chipFills.length]}`}
                >
                  {tile.title}
                </h3>
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#191717] bg-white text-(--tpl-ink)"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
