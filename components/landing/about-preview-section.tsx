import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroSekolahVideo } from "@/components/landing/HeroSekolahVideo"
import { SCHOOL } from "@/lib/school-info"

const formatCount = (num: number) => `${num.toLocaleString("id-ID")}+`

interface AboutPreviewSectionProps {
  data?: {
    siswa?: number
  }
}

export function AboutPreviewSection({ data }: AboutPreviewSectionProps) {
  return (
    <section className="gsap-about bg-(--tpl-cream) py-24 sm:py-28">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4]">
            <HeroSekolahVideo
              srcHd="/video/SEKOTIF-1080p.mp4"
              srcSd="/video/SEKOTIF_BND-720p.mp4"
              poster="/foto_sekolah-poster.webp"
              alt="Cuplikan kegiatan SD Muhammadiyah 3 Samarinda"
            />
          </div>
        </div>
        <div className="about-content max-w-xl">
          <h2 className="text-balance font-baloo2 uppercase tracking-tight text-(--tpl-green-text) text-[clamp(1.9rem,4.4vw,3.1rem)]">
            Sekolah kreatif Islam di Samarinda Seberang
          </h2>
          <p className="mt-5 max-w-[54ch] text-pretty text-base leading-relaxed text-(--tpl-ink)/80 font-quicksand">
            Sejak {SCHOOL.stats.founded} kami menggabungkan kurikulum nasional, tahfidz, dan edutainment. Anak belajar sains dan seni, lalu pulang dengan adab yang utuh.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt className="font-quicksand text-sm text-(--tpl-ink)/80">Siswa aktif</dt>
              <dd className="font-baloo2 text-2xl tabular-nums text-(--tpl-green)">
                {formatCount(data?.siswa ?? SCHOOL.stats.students)}
              </dd>
            </div>
            <div>
              <dt className="font-quicksand text-sm text-(--tpl-ink)/80">Ijazah lulusan</dt>
              <dd className="font-baloo2 text-2xl text-(--tpl-green)">
                {SCHOOL.stats.graduateTracks} jalur
              </dd>
            </div>
            <div>
              <dt className="font-quicksand text-sm text-(--tpl-ink)/80">Status mutu</dt>
              <dd className="font-baloo2 text-2xl text-(--tpl-green)">
                {SCHOOL.accreditation}
              </dd>
            </div>
            <div>
              <dt className="font-quicksand text-sm text-(--tpl-ink)/80">Mandat</dt>
              <dd className="font-baloo2 text-2xl text-(--tpl-green)">
                {SCHOOL.mandate}
              </dd>
            </div>
          </dl>
          <Link href="/profil" className="tpl-btn mt-8 px-6 py-3 text-base">
            Cerita lengkap sekolah
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
