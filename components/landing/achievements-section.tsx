import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { resolveImageUrl } from "@/lib/image-url"
import type { PrestasiSiswa } from "@/types/prestasi.types"

function truncateWords(text: string, limit: number) {
  if (!text) return ""
  const words = text.split(" ")
  if (words.length <= limit) return text
  return `${words.slice(0, limit).join(" ")}...`
}

interface AchievementsSectionProps {
  achievements: PrestasiSiswa[]
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  if (!achievements?.length) return null

  return (
    <section className="gsap-achievements py-24 bg-(--color-paper-50) dark:bg-(--color-forest-950)">
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h2 className="text-balance font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
            Prestasi terbaru
          </h2>
          <p className="mt-3 max-w-[48ch] text-pretty text-base text-(--color-ink-700) dark:text-gray-300 font-quicksand">
            Jejak lomba yang baru diraih siswa. Nama dan juara dari data sekolah.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement) => (
            <article
              key={achievement.slug}
              className="achievement-card group relative h-80 overflow-hidden rounded-[1.5rem]"
            >
              <Image
                src={resolveImageUrl(achievement.foto, "img/prestasi")}
                alt={achievement.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                quality={75}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-sm font-semibold text-(--color-sun-400)">{achievement.juara}</p>
                <h3 className="mt-1 font-outfit text-lg font-bold leading-snug text-white">
                  {truncateWords(achievement.name, 10)}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            variant="outline-brand"
            className="h-12 rounded-full px-7 font-semibold text-(--color-forest-900) dark:text-white dark:border-white/30 dark:hover:bg-white/10"
          >
            <Link href="/prestasi-sekolah">Prestasi sekolah</Link>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full bg-(--color-forest-700) px-7 font-semibold text-white hover:bg-(--color-forest-600) dark:bg-(--color-sun-500) dark:text-(--color-ink-950) dark:hover:bg-(--color-sun-400)"
          >
            <Link href="/prestasi-siswa">Prestasi siswa</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
