import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SCHOOL } from "@/lib/school-info"

export function AboutPreviewSection() {
  return (
    <section className="gsap-about py-24 sm:py-28 bg-(--color-paper-50) dark:bg-(--color-forest-950)">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4]">
            <Image
              src="/foto_sekolah.jpeg"
              alt="Gedung dan halaman SD Muhammadiyah 3 Samarinda"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="about-content max-w-xl">
          <h2 className="text-balance font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
            Sekolah kreatif Islam di Samarinda Seberang
          </h2>
          <p className="mt-5 max-w-[54ch] text-pretty text-base leading-relaxed text-(--color-ink-700) dark:text-gray-300 font-quicksand">
            Sejak {SCHOOL.stats.founded} kami menggabungkan kurikulum nasional, tahfidz, dan edutainment. Anak belajar sains dan seni, lalu pulang dengan adab yang utuh.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-(--color-ink-600) dark:text-(--color-cloud-300) font-quicksand">Siswa aktif</dt>
              <dd className="font-outfit text-2xl font-extrabold tabular-nums text-(--color-forest-700) dark:text-(--color-sun-400)">
                {SCHOOL.stats.students}+
              </dd>
            </div>
            <div>
              <dt className="text-sm text-(--color-ink-600) dark:text-(--color-cloud-300) font-quicksand">Ijazah lulusan</dt>
              <dd className="font-outfit text-2xl font-extrabold text-(--color-forest-700) dark:text-(--color-sun-400)">
                3 jalur
              </dd>
            </div>
            <div>
              <dt className="text-sm text-(--color-ink-600) dark:text-(--color-cloud-300) font-quicksand">Status mutu</dt>
              <dd className="font-outfit text-2xl font-extrabold text-(--color-forest-700) dark:text-(--color-sun-400)">
                {SCHOOL.accreditation}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-(--color-ink-600) dark:text-(--color-cloud-300) font-quicksand">Mandat</dt>
              <dd className="font-outfit text-2xl font-extrabold text-(--color-forest-700) dark:text-(--color-sun-400)">
                Penggerak
              </dd>
            </div>
          </dl>
          <Button
            asChild
            className="mt-8 h-12 rounded-full bg-(--color-forest-700) px-7 font-semibold text-white hover:bg-(--color-forest-600)"
          >
            <Link href="/profil" className="inline-flex items-center gap-2">
              Cerita lengkap sekolah
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
