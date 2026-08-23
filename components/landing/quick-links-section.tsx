import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const tiles = [
  {
    title: "Fasilitas",
    image: "/fasilitas.png",
    href: "/fasilitas",
    span: "lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]",
  },
  {
    title: "Prestasi siswa",
    image: "/prestasi-siswa.png",
    href: "/prestasi-siswa",
    span: "lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[13.5rem]",
  },
  {
    title: "Prestasi sekolah",
    image: "/prestasi-sekolah.png",
    href: "/prestasi-sekolah",
    span: "lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[13.5rem]",
  },
]

export function QuickLinksSection() {
  return (
    <section className="py-20 sm:py-24 bg-(--color-paper-50) dark:bg-(--color-forest-950)">
      <div className="container mx-auto px-4">
        <h2 className="max-w-lg text-balance font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
          Lihat ruang, karya, dan capaian
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {tiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className={`quick-link-card group relative overflow-hidden rounded-[1.75rem] ${tile.span} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-forest-700)`}
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={75}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--color-forest-950)/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <h3 className="font-outfit text-2xl font-bold text-white">{tile.title}</h3>
                <span className="flex size-10 items-center justify-center rounded-full bg-white/15 text-white">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
