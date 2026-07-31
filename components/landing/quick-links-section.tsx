import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const facilities = [
  { title: "Fasilitas", image: "/fasilitas.png", link: "/fasilitas", badge: "Jelajahi" },
  { title: "Prestasi Siswa", image: "/prestasi-siswa.png", link: "/prestasi-siswa", badge: "Lihat Karya" },
  { title: "Prestasi Sekolah", image: "/prestasi-sekolah.png", link: "/prestasi-sekolah", badge: "Lihat Capaian" },
]

export function QuickLinksSection() {
  return (
    <section className="py-28 bg-(--color-paper-50) dark:bg-gray-950 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
              <Link
                  key={index}
                  href={facility.link}
                  className="relative overflow-hidden shadow-xl group rounded-[2.5rem] h-[400px] sm:h-[480px] block border-0 focus-visible:outline-4 focus-visible:outline-(--color-forest-700) focus-visible:outline-offset-4"
            >
              <div className="relative h-full w-full">
                <Image
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <Badge className="bg-white/15 backdrop-blur-md text-white border-white/20 font-black uppercase tracking-[0.18em] text-[10px] mb-5 px-3.5 py-1 h-auto">
                    {facility.badge}
                  </Badge>
                  <h3 className="mb-6 text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tight font-outfit">
                    {facility.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/80 group-hover:text-white transition-all group-hover:gap-5">
                    <span className="text-sm font-black uppercase tracking-[0.15em] font-quicksand">LIHAT DETAIL</span>
                    <div className="w-11 h-11 rounded-xl bg-(--color-forest-700) flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
