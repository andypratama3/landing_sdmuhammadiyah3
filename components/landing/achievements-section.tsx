import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Trophy } from "lucide-react"
import type { PrestasiSiswa } from "@/types/prestasi.types"

function truncateWords(text: string, limit: number) {
  if (!text) return ""
  const words = text.split(" ")
  if (words.length <= limit) return text
  return words.slice(0, limit).join(" ") + "..."
}

interface AchievementsSectionProps {
  achievements: PrestasiSiswa[]
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-gray-900">
      <div className="container relative z-10 px-4 mx-auto">
        <div className="mb-16 text-center">
          <Badge className="mb-5 bg-[#ffd166] text-gray-900 px-5 py-2 text-sm font-bold rounded-full">
            SANG JUARA
          </Badge>
          <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">
            Prestasi Terbaru
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium font-quicksand">
            Perwujudan dedikasi dan kerja keras seluruh civitas akademika
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements?.map((achievement, index) => (
            <Card
              key={index}
              className="card-premium h-[340px] sm:h-[380px] lg:h-[420px] group"
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/prestasi/${achievement.foto}`}
                  alt={achievement.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-11 h-11 bg-[#ffd166] rounded-[1rem] flex items-center justify-center mb-4 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <Trophy className="w-6 h-6 text-gray-900" />
                  </div>
                  <Badge className="bg-[#ffd166]/15 backdrop-blur-md text-[#ffd166] border-[#ffd166]/20 font-black uppercase tracking-[0.18em] text-[9px] mb-3 px-3 py-1">
                    {achievement.juara}
                  </Badge>
                  <h3 className="text-lg font-black text-white leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-[#ffd166] transition-colors font-outfit">
                    {truncateWords(achievement.name, 8)}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Button
            asChild
            variant="outline-brand"
            className="rounded-full px-10 py-7 text-base font-bold shadow-md"
            size="lg"
          >
            <Link href="/prestasi-sekolah">Prestasi Sekolah</Link>
          </Button>
          <Button
            asChild
            className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full px-10 py-7 text-base font-bold shadow-lg hover:scale-[1.03] transition-all"
            size="lg"
          >
            <Link href="/prestasi-siswa">Prestasi Siswa</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
