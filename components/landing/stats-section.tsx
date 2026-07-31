import { Users, Trophy, Award, Building } from "lucide-react"

interface StatsSectionProps {
  data?: {
    siswa: number
    guru: number
    fasilitas: number
    prestasis_siswa: number
    prestasis_sekolah: number
  }
}

const formatCount = (num?: number) => (num !== undefined ? num.toLocaleString() + "+" : "-")

const statsConfig = [
  { icon: Users, valueKey: "siswa" as const, label: "Siswa" },
  { icon: Trophy, valueKey: "guru" as const, label: "Guru" },
  { icon: Award, valueKey: "prestasis_siswa" as const, label: "Prestasi Siswa" },
  { icon: Building, valueKey: "fasilitas" as const, label: "Sarana Prasarana" },
]

export function StatsSection({ data }: StatsSectionProps) {
  return (
    <section className="relative -mt-16 z-20 pb-16 bg-(--color-paper-50) dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {statsConfig.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="clay p-6 sm:p-8 text-center">
                <div className="clay-icon w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 flex items-center justify-center">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-(--color-forest-700) mb-1 font-outfit">
                  {formatCount(data?.[stat.valueKey])}
                </h3>
                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-[0.15em] font-quicksand">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
