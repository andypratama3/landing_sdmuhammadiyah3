import Image from "next/image"
import {
  BookOpen,
  Brain,
  Gamepad2,
  GraduationCap,
  Heart,
  Pencil,
  Smile,
  Sparkles,
  Target,
} from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Tahfidz 2 juz",
    description: "Hafalan juz 29-30 dengan ritme yang ramah anak.",
  },
  {
    icon: Heart,
    title: "Akhlak sehari-hari",
    description: "Adab Islam dilatih di kelas, di masjid, dan di halaman.",
  },
  {
    icon: Smile,
    title: "Shalat berjamaah",
    description: "Wajib dan sunnah jadi kebiasaan, bukan beban.",
  },
  {
    icon: Sparkles,
    title: "Ngaji Tilawati",
    description: "Pagi dimulai dengan tartil yang tertib dan ceria.",
  },
  {
    icon: Pencil,
    title: "Imla Al-Qur'an",
    description: "Menulis ayat untuk menajamkan ketelitian.",
  },
  {
    icon: Brain,
    title: "Minat dan bakat",
    description: "Pemetaan psikologi agar pendampingan lebih tepat.",
  },
  {
    icon: Gamepad2,
    title: "Edutainment",
    description: "Belajar lewat bermain, proyek, dan gerak.",
  },
  {
    icon: Target,
    title: "Otak kiri dan kanan",
    description: "Sains, seni, dan ibadah berjalan beriringan.",
  },
  {
    icon: GraduationCap,
    title: "Tiga ijazah",
    description: "Ijazah sekolah, Muhammadiyah, dan Tilawati.",
  },
]

export function ProgramsSection() {
  const [featured, ...rest] = programs
  const FeaturedIcon = featured.icon

  return (
    <section className="gsap-programs bg-(--tpl-cream) py-24 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h2 className="text-balance font-baloo2 uppercase tracking-tight text-(--tpl-green-text) text-[clamp(1.9rem,4.4vw,3.1rem)]">
            Program yang membentuk kebiasaan
          </h2>
          <p className="mt-4 max-w-[52ch] text-pretty text-base leading-relaxed text-(--tpl-ink)/80 font-quicksand">
            Bukan daftar fitur. Ini ritme harian yang membuat anak hafal, sopan, dan senang datang ke sekolah.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <article className="program-card relative overflow-hidden rounded-[24px] border-2 border-[#191717] shadow-[4px_5px_0_0_#191717] lg:col-span-7 lg:row-span-2 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[22rem]">
            <Image
              src="/GedungSekolah.webp"
              alt="Suasana pembelajaran di sekolah"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#191717]/85 via-[#191717]/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <FeaturedIcon className="mb-3 size-7 text-(--tpl-mint)" aria-hidden />
              <h3 className="font-baloo2 text-2xl text-white">{featured.title}</h3>
              <p className="mt-2 max-w-[36ch] text-pretty text-sm leading-relaxed text-white/85 font-quicksand">
                {featured.description}
              </p>
            </div>
          </article>

          {rest.slice(0, 4).map((program) => {
            const Icon = program.icon
            return (
              <article
                key={program.title}
                className="program-card rounded-[24px] border-2 border-[#191717] bg-white p-5 shadow-[4px_5px_0_0_#191717] lg:col-span-5"
              >
                <Icon className="size-5 text-(--tpl-green-text)" aria-hidden />
                <h3 className="mt-3 font-baloo2 text-lg text-(--tpl-ink)">
                  {program.title}
                </h3>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-(--tpl-ink)/80 font-quicksand">
                  {program.description}
                </p>
              </article>
            )
          })}
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rest.slice(4).map((program) => {
            const Icon = program.icon
            return (
              <li
                key={program.title}
                className="program-card flex gap-3 rounded-[24px] border-2 border-[#191717] bg-(--tpl-paper) px-4 py-3 text-(--tpl-ink) shadow-[4px_5px_0_0_#191717]"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-(--tpl-green-text)" aria-hidden />
                <div>
                  <p className="font-baloo2 text-sm">{program.title}</p>
                  <p className="text-pretty text-sm text-(--tpl-ink)/80 font-quicksand">
                    {program.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
