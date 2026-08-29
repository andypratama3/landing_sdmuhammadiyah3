import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from "lucide-react"
import { JENIS_LABEL, type KalenderAkademikEvent } from "@/types/kalender.types"

const JENIS_STYLE: Record<KalenderAkademikEvent["jenis"], string> = {
  holiday: "bg-(--color-sun-400)/15 text-(--color-sun-600) dark:text-(--color-sun-400)",
  exam: "bg-red-500/10 text-red-600 dark:text-red-400",
  event: "bg-(--color-forest-700)/10 text-(--color-forest-700) dark:text-gray-300",
  deadline: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  celebration: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

function formatTanggal(event: KalenderAkademikEvent): string {
  const mulai = event.tanggal_mulai ? new Date(event.tanggal_mulai + "T00:00:00") : null
  const selesai = event.tanggal_selesai ? new Date(event.tanggal_selesai + "T00:00:00") : null
  if (!mulai) return ""

  if (selesai && selesai.getTime() !== mulai.getTime()) {
    const sameMonth = mulai.getMonth() === selesai.getMonth()
    return sameMonth
      ? `${mulai.getDate()}–${selesai.getDate()} ${selesai.toLocaleDateString("id-ID", { month: "short" })}`
      : `${mulai.getDate()} ${mulai.toLocaleDateString("id-ID", { month: "short" })} – ${selesai.getDate()} ${selesai.toLocaleDateString("id-ID", { month: "short" })}`
  }

  return mulai.toLocaleDateString("id-ID", { day: "numeric", month: "long" })
}

interface CalendarSectionProps {
  events: KalenderAkademikEvent[]
}

export function CalendarSection({ events }: CalendarSectionProps) {
  if (!events?.length) return null

  return (
    <section className="py-24 bg-white dark:bg-(--color-forest-900)">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-balance font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
              Agenda sekolah
            </h2>
            <p className="mt-3 max-w-[48ch] text-pretty text-base font-quicksand text-(--color-ink-700) dark:text-gray-300">
              Kalender akademik terdekat — ujian, kegiatan, dan hari libur dari kalender resmi sekolah.
            </p>
          </div>
          <Button
            asChild
            variant="outline-brand"
            className="h-12 rounded-full px-7 font-semibold text-(--color-forest-900) dark:text-white dark:border-white/30 dark:hover:bg-white/10"
          >
            <Link href="/kalender-akademik">Kalender lengkap</Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group flex gap-4 rounded-[1.5rem] border border-black/5 bg-(--color-paper-50) p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-(--color-forest-900)/5 dark:border-white/10 dark:bg-(--color-forest-950)"
            >
              <div
                className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl text-white"
                style={{ backgroundColor: event.warna || "#3454d1" }}
              >
                <span className="font-outfit text-2xl font-extrabold leading-none">
                  {event.tanggal_mulai ? new Date(event.tanggal_mulai + "T00:00:00").getDate() : "•"}
                </span>
                <span className="text-[0.65rem] font-bold uppercase tracking-wide">
                  {event.tanggal_mulai
                    ? new Date(event.tanggal_mulai + "T00:00:00").toLocaleDateString("id-ID", { month: "short" })
                    : ""}
                </span>
              </div>

              <div className="min-w-0">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${JENIS_STYLE[event.jenis] ?? JENIS_STYLE.event}`}
                >
                  {JENIS_LABEL[event.jenis] ?? event.jenis}
                </span>
                <h3 className="mt-1.5 truncate font-outfit text-base font-bold text-(--color-forest-900) dark:text-white">
                  {event.judul}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-quicksand text-(--color-ink-700) dark:text-gray-300">
                  <CalendarDays className="size-3.5 shrink-0" />
                  {formatTanggal(event)}
                </p>
                {event.lokasi && (
                  <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm font-quicksand text-(--color-ink-700) dark:text-gray-300">
                    <MapPin className="size-3.5 shrink-0" />
                    {event.lokasi}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
