import Link from "next/link"
import Image from "next/image"
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
    <section
      id="prestasi"
      aria-labelledby="prestasi-heading"
      className="gsap-achievements bg-(--tpl-cyan) py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h2
            id="prestasi-heading"
            className="text-balance font-baloo2 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium uppercase tracking-tight text-(--tpl-green-text)"
          >
            Prestasi terbaru
          </h2>
          <p className="mt-3 max-w-[48ch] text-pretty font-quicksand text-base text-(--tpl-ink)/80">
            Jejak lomba yang baru diraih siswa. Nama dan juara dari data sekolah.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement) => (
            <article
              key={achievement.slug}
              className="achievement-card tpl-sticker group flex h-80 flex-col overflow-hidden rounded-[24px] bg-white"
            >
              <div className="relative h-44 shrink-0 overflow-hidden">
                <Image
                  src={resolveImageUrl(achievement.foto, "img/prestasi")}
                  alt={achievement.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  quality={75}
                  className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="tpl-sticker-sm inline-block w-fit rounded-full bg-(--tpl-green-text) px-3 py-1 font-quicksand text-[11px] font-bold uppercase tracking-wide text-white">
                  {achievement.juara}
                </span>
                <h3 className="font-baloo2 text-base uppercase leading-snug tracking-tight text-(--tpl-ink)">
                  {truncateWords(achievement.name, 10)}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/prestasi-sekolah"
            className="tpl-btn bg-(--tpl-paper) px-6 py-3 text-base text-(--tpl-ink)"
          >
            Prestasi sekolah
          </Link>
          <Link href="/prestasi-siswa" className="tpl-btn px-6 py-3 text-base">
            Prestasi siswa
          </Link>
        </div>
      </div>
    </section>
  )
}
