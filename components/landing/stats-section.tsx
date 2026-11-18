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
    { value: SCHOOL.accreditation, label: "Akreditasi", count: false },
    { value: formatCount(data?.fasilitas), label: "Fasilitas", count: true },
  ]

  return (
    <section className="gsap-stats relative z-20 -mt-6 bg-(--tpl-cream) px-4 pb-8 sm:-mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 divide-y divide-[#191717]/15 overflow-hidden rounded-[24px] border-2 border-[#191717] bg-white shadow-[4px_5px_0_0_#191717] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card px-5 py-6 text-center sm:py-8">
              <p
                className={`${stat.count ? "stat-number" : ""} font-baloo2 text-2xl tabular-nums text-(--tpl-green) sm:text-3xl`}
              >
                {stat.value}
              </p>
              <p className="mt-1 font-quicksand text-sm font-medium text-(--tpl-ink)">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
