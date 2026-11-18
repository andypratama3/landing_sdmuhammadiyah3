import { SCHOOL } from "@/lib/school-info"

export function AccreditationSection() {
  return (
    <section className="gsap-accreditation bg-(--tpl-cyan) py-20 sm:py-24">
      <div className="container mx-auto grid gap-10 px-4 sm:grid-cols-2 sm:gap-16">
        <div className="accreditation-card max-w-md rounded-[24px] border-2 border-[#191717] bg-white p-6 shadow-[4px_5px_0_0_#191717] sm:p-8">
          <p className="font-baloo2 text-5xl tabular-nums text-(--tpl-green)">
            {SCHOOL.accreditation}
          </p>
          <h3 className="mt-3 font-baloo2 text-2xl text-(--tpl-ink)">
            Akreditasi unggul
          </h3>
          <p className="mt-2 max-w-[42ch] text-pretty text-sm leading-relaxed text-(--tpl-ink)/80 font-quicksand">
            Predikat {SCHOOL.accreditation} dari BAN-S/M. Standar mutu yang orang tua bisa cek, bukan slogan.
          </p>
        </div>
        <div className="accreditation-card max-w-md rounded-[24px] border-2 border-[#191717] bg-white p-6 shadow-[4px_5px_0_0_#191717] sm:mt-10 sm:p-8">
          <p className="font-baloo2 text-5xl text-(--tpl-green)">
            {SCHOOL.mandate}
          </p>
          <h3 className="mt-3 font-baloo2 text-2xl text-(--tpl-ink)">
            Sekolah {SCHOOL.mandate}
          </h3>
          <p className="mt-2 max-w-[42ch] text-pretty text-sm leading-relaxed text-(--tpl-ink)/80 font-quicksand">
            Program Kemendikbudristek untuk pembelajaran yang berpihak pada murid.
          </p>
        </div>
      </div>
    </section>
  )
}
