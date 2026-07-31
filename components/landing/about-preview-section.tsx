import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ChevronRight, Smile } from "lucide-react"

export function AboutPreviewSection() {
  return (
    <section className="py-24 bg-(--color-paper-50) dark:bg-gray-900 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
          <div className="relative group">
            <div className="relative overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] rounded-[2.5rem] h-[320px] sm:h-[420px] lg:h-[500px]">
              <Image
                src="/foto_sekolah.jpeg"
                alt="Suasana Sekolah Kreatif"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="card-premium absolute -bottom-6 -right-6 hidden sm:block p-6">
              <div className="flex items-center gap-3">
                <div className="clay-icon flex items-center justify-center">
                  <Smile className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-black text-xl text-gray-900 dark:text-white font-outfit">100%</p>
                  <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tight font-quicksand">Siswa Ceria</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Badge className="mb-5 bg-(--color-forest-700)/10 dark:bg-(--color-forest-700)/20 text-(--color-forest-700) dark:text-(--color-teal-400) border-(--color-forest-700)/20 px-5 py-2 text-sm font-bold rounded-full">
              TENTANG KAMI
            </Badge>
            <h2 className="mb-5 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">
              Mendidik dengan Hati, Melayani dengan Kreativitas
            </h2>
            <p className="mb-8 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-medium font-quicksand">
              SD Muhammadiyah 3 Samarinda hadir bukan sekadar memberi pengetahuan, tetapi membentuk karakter Islami yang tangguh, adaptif, dan penuh inovasi melalui metode <strong className="text-gray-900 dark:text-white">Edutainment</strong> yang menyenangkan.
            </p>
            <Button
              asChild
              className="bg-(--color-forest-700) hover:bg-(--color-forest-500) text-white rounded-full px-10 py-7 text-base font-bold shadow-lg hover:scale-[1.03] transition-all"
              size="lg"
            >
              <Link href="/profil" className="flex items-center gap-2">
                Selengkapnya
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
