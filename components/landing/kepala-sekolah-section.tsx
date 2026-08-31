import Image from "next/image"
import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function KepalaSekolahSection() {
  return (
    <section className="gsap-kepala-sekolah py-24 sm:py-28 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mb-12">
          <Badge className="mb-4 bg-(--color-forest-700)/10 text-(--color-forest-700) dark:bg-(--color-forest-700)/20 dark:text-(--color-forest-400) border-(--color-forest-700)/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">
            Pesan Kepemimpinan
          </Badge>
          <h2 className="text-balance font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
            Sambutan Kepala Sekolah
          </h2>
          <p className="mt-4 max-w-[52ch] text-pretty text-base leading-relaxed text-(--color-ink-700) dark:text-gray-300 font-quicksand">
            Visi dan harapan untuk masa depan pendidikan di SD Muhammadiyah 3 Samarinda
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 flex flex-col items-center kepala-sekolah-image">
              <div className="relative group">
                <div className="absolute -inset-3 sm:-inset-4 bg-linear-to-r from-(--color-forest-700) to-(--color-sun-500) rounded-[1.5rem] sm:rounded-[1.75rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 border-white dark:border-gray-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/kepala-sekolah.jpeg"
                    alt="Ansar HS. S.Pd.,M.M. Gr."
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                    className="object-contain transition-transform duration-700 group-hover:scale-110 bg-white"
                  />
                </div>
              </div>
              <div className="mt-6 sm:mt-8 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-(--color-forest-900) dark:text-white uppercase tracking-tight">
                  Ansar HS. S.Pd.,M.M. Gr.
                </h3>
                <div className="inline-flex items-center gap-2 mt-2 px-4 sm:px-6 py-2 bg-(--color-forest-700)/10 dark:bg-(--color-forest-700)/30 text-(--color-forest-700) dark:text-(--color-forest-400) font-black rounded-full text-[10px] sm:text-xs uppercase tracking-widest">
                  <Shield className="w-3 h-3" />
                  Kepala Sekolah
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4 sm:space-y-6 kepala-sekolah-content">
              <div className="p-4 sm:p-6 bg-(--color-forest-700)/10 dark:bg-(--color-forest-700)/10 rounded-2xl sm:rounded-3xl border border-(--color-forest-700)/10 dark:border-(--color-forest-700)/20">
                <p className="text-base sm:text-lg md:text-xl font-bold italic text-(--color-forest-800) dark:text-(--color-forest-300) leading-relaxed">
                  "Assalamu'alaikum Warahmatullahi Wabarakatuh,"
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg font-medium text-(--color-ink-700) dark:text-gray-300 leading-relaxed font-quicksand">
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
                <div className="pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-800">
                  <p className="font-bold text-(--color-forest-700) dark:text-(--color-forest-400)">
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