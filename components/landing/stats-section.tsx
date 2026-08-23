import { SCHOOL } from "@/lib/school-info"

interface StatsSectionProps {
  data?: {
    siswa?: number
    guru?: number
    fasilitas?: number
    prestasis_siswa?: number
    prestasis_sekolah?: number
  }
}

const formatCount = (num?: number) =>
  num !== undefined ? `${num.toLocaleString("id-ID")}+` : "—"

export function StatsSection({ data }: StatsSectionProps) {
  const stats = [
    { value: formatCount(data?.siswa ?? SCHOOL.stats.students), label: "Siswa", count: true },
    { value: formatCount(data?.guru ?? SCHOOL.stats.teachers), label: "Guru", count: true },
    { value: "A", label: "Akreditasi", count: false },
    { value: formatCount(data?.fasilitas), label: "Fasilitas", count: true },
  ]

  return (
    <section className="gsap-stats gsap-stats relative z-20 -mt-6 px-4 pb-8 sm:-mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 divide-y divide-(--color-forest-700)/10 overflow-hidden rounded-[1.5rem] border border-(--color-forest-700)/10 bg-(--color-paper-50) sm:grid-cols-4 sm:divide-x sm:divide-y-0 dark:border-white/10 dark:bg-(--color-forest-900)">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card stat-card px-5 py-6 text-center sm:py-8">
              <p
                className={`${stat.count ? "stat-number stat-number" : ""} font-outfit text-2xl font-extrabold tabular-nums text-(--color-forest-700) sm:text-3xl dark:text-(--color-sun-400)`}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-(--color-ink-700) dark:text-(--color-cloud-200) font-quicksand">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
