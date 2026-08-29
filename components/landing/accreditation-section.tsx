import { SCHOOL } from "@/lib/school-info"

export function AccreditationSection() {
  return (
    <section className="gsap-accreditation py-20 sm:py-24 bg-(--color-cloud-100) dark:bg-(--color-forest-900)">
      <div className="container mx-auto grid gap-10 px-4 sm:grid-cols-2 sm:gap-16">
        <div className="accreditation-card max-w-md">
          <p className="font-outfit text-5xl font-extrabold tabular-nums text-(--color-forest-700) dark:text-(--color-sun-400)">
            {SCHOOL.accreditation.split(' ')[0]}
          </p>
          <h3 className="mt-3 font-outfit text-2xl font-bold text-(--color-forest-900) dark:text-white">
            Akreditasi unggul
          </h3>
          <p className="mt-2 max-w-[42ch] text-pretty text-sm leading-relaxed text-(--color-ink-700) dark:text-gray-300 font-quicksand">
            Predikat {SCHOOL.accreditation} dari BAN-S/M. Standar mutu yang orang tua bisa cek, bukan slogan.
          </p>
        </div>
        <div className="accreditation-card max-w-md sm:pt-10">
          <p className="font-outfit text-5xl font-extrabold text-(--color-forest-700) dark:text-(--color-sun-400)">
            Penggerak
          </p>
          <h3 className="mt-3 font-outfit text-2xl font-bold text-(--color-forest-900) dark:text-white">
            Sekolah Penggerak
          </h3>
          <p className="mt-2 max-w-[42ch] text-pretty text-sm leading-relaxed text-(--color-ink-700) dark:text-gray-300 font-quicksand">
            Program Kemendikbudristek untuk pembelajaran yang berpihak pada murid.
          </p>
        </div>
      </div>
    </section>
  )
}
