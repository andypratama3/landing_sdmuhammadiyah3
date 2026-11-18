import Image from "next/image"
import { Shield } from "lucide-react"

export function KepalaSekolahSection() {
  return (
    <section className="gsap-kepala-sekolah bg-white py-24 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mb-12">
          <span className="mb-4 inline-flex rounded-full border-2 border-[#191717] bg-(--tpl-paper) px-4 py-2 font-baloo2 text-xs uppercase tracking-widest text-(--tpl-ink) shadow-[3px_4px_0_0_#191717]">
            Pesan Kepemimpinan
          </span>
          <h2 className="text-balance font-baloo2 uppercase tracking-tight text-(--tpl-green-text) text-[clamp(1.9rem,4.4vw,3.1rem)]">
            Sambutan Kepala Sekolah
          </h2>
          <p className="mt-4 max-w-[52ch] text-pretty text-base leading-relaxed text-(--tpl-ink)/80 font-quicksand">
            Visi dan harapan untuk masa depan pendidikan di SD Muhammadiyah 3 Samarinda
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 flex flex-col items-center kepala-sekolah-image">
              <div className="relative group">
                <div className="absolute -inset-3 sm:-inset-4 rounded-[1.5rem] bg-(--tpl-green) sm:rounded-[1.75rem]" aria-hidden />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/kepala-sekolah.jpeg"
                    alt="Potret Kepala Sekolah SD Muhammadiyah 3 Samarinda"
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                    className="object-contain transition-transform duration-700 group-hover:scale-110 bg-white"
                  />
                </div>
              </div>
              <div className="mt-6 sm:mt-8 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-baloo2 text-(--tpl-ink) uppercase tracking-tight">
                  Ansar HS. S.Pd.,M.M. Gr.
                </h3>
                <div className="inline-flex items-center gap-2 mt-2 px-4 sm:px-6 py-2 rounded-full border-2 border-[#191717] bg-(--tpl-paper) text-(--tpl-ink) font-baloo2 text-[10px] sm:text-xs uppercase tracking-widest shadow-[3px_4px_0_0_#191717]">
                  <Shield className="w-3 h-3" aria-hidden />
                  Kepala Sekolah
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4 sm:space-y-6 kepala-sekolah-content">
              <div className="rounded-[24px] border-2 border-[#191717] bg-(--tpl-mint) p-4 text-(--tpl-ink) shadow-[4px_5px_0_0_#191717] sm:p-6">
                <p className="text-base sm:text-lg md:text-xl font-bold italic leading-relaxed">
                  "Assalamu'alaikum Warahmatullahi Wabarakatuh,"
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg font-medium text-(--tpl-ink)/80 leading-relaxed font-quicksand">
                <p>
                  Puji syukur kehadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya. SD Muhammadiyah 3
                  Samarinda berkomitmen untuk memberikan pendidikan terbaik bagi putra-putri Anda. Kami tidak hanya
                  fokus pada pencapaian akademik, tetapi juga pembentukan karakter Islami yang kuat, kreativitas, dan
                  keterampilan abad 21.
                </p>
                <p>
                  Melalui metode pembelajaran yang inovatif berbasis edutainment dan didukung oleh tenaga pengajar
                  profesional, kami yakin dapat menghasilkan generasi yang cerdas, berakhlak mulia, dan siap menghadapi
                  masa depan dengan penuh percaya diri.
                </p>
                <div className="pt-4 sm:pt-6 border-t-2 border-[#191717]/15">
                  <p className="font-baloo2 text-(--tpl-green-text)">
                    Wassalamu'alaikum Warahmatullahi Wabarakatuh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
