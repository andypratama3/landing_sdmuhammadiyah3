import {
  BookOpen, Heart, Smile, Sparkles, Pencil, Brain,
  Gamepad2, Target, GraduationCap
} from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Tahfidz Al-Qur'an 2 Juz (29-30)",
    description: "Program menghafal Al-Qur'an dengan metode yang mudah dan menyenangkan",
    size: "full" as const,
  },
  {
    icon: Heart,
    title: "Pembiasaan Akhlak Islami Sejak Dini",
    description: "Pembentukan karakter islami melalui pembiasaan sehari-hari",
    size: "half" as const,
  },
  {
    icon: Smile,
    title: "Pembiasaan Sholat Wajib dan Sunnah",
    description: "Melatih kedisiplinan ibadah sejak dini",
    size: "half" as const,
  },
  {
    icon: Sparkles,
    title: "Pembiasaan Ngaji Morning Metode Tilawati",
    description: "Mengaji dengan metode tilawati setiap pagi",
    size: "half" as const,
  },
  {
    icon: Pencil,
    title: "Pembiasaan Menulis Al-Qur'an Dengan Metode IMLA",
    description: "Melatih menulis ayat Al-Qur'an dengan metode IMLA",
    size: "half" as const,
  },
  {
    icon: Brain,
    title: "Pembinaan Psikologi Untuk Mengetahui Minat & Bakat Anak",
    description: "Identifikasi potensi anak melalui tes psikologi",
    size: "half" as const,
  },
  {
    icon: Gamepad2,
    title: "Pembelajaran Berbasis Edutainment",
    description: "Belajar sambil bermain dengan metode yang menyenangkan",
    size: "half" as const,
  },
  {
    icon: Target,
    title: "Menyeimbangkan Otak Kanan Dan Kiri",
    description: "Pembelajaran holistik untuk perkembangan optimal",
    size: "half" as const,
  },
  {
    icon: GraduationCap,
    title: "Lulus Dengan 3 Ijazah",
    description: "Siswa lulus dengan ijazah sekolah, Muhammadiyah, dan Tilawati",
    size: "full" as const,
  },
]

function ProgramCard({ program, index }: { program: typeof programs[number]; index: number }) {
  const Icon = program.icon
  return (
    <div className={`clay group ${
        program.size === "full" ? "p-8 sm:p-10" : "p-6 sm:p-10"
      }`}
    >
      <div className="clay-icon w-12 h-12 mb-5 flex items-center justify-center">
        <Icon className="w-6 h-6 text-(--color-forest-700)" />
      </div>
      <h3 className={`font-black text-gray-900 dark:text-white group-hover:text-(--color-forest-700) transition-colors leading-tight font-outfit ${
        program.size === "full" ? "text-lg mb-4" : "text-base mb-3"
      }`}>
        {program.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-quicksand">{program.description}</p>
    </div>
  )
}

export function ProgramsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-(--color-cloud-100)/80 to-white dark:from-gray-950/80 dark:to-gray-900">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">
            Program Unggulan Kami
          </h2>
          <p className="max-w-2xl mx-auto mt-5 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400 text-balance font-quicksand">
            Kurikulum yang dirancang khusus untuk membangun fondasi karakter, intelegensi, dan spiritualitas anak sejak dini.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-4 lg:grid-cols-3">
          {programs.map((program, index) => (
            <div key={index} className={program.size === "full" ? "lg:col-span-2" : ""}>
              <ProgramCard program={program} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
