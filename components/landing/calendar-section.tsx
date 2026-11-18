import Link from "next/link"
import { CalendarDays, MapPin } from "lucide-react"
import { JENIS_LABEL, type KalenderAkademikEvent } from "@/types/kalender.types"

const JENIS_STYLE: Record<KalenderAkademikEvent["jenis"], string> = {
  holiday: "bg-(--tpl-yellow) text-(--tpl-ink)",
  exam: "bg-(--tpl-red) text-(--tpl-ink)",
  event: "bg-(--tpl-cyan) text-(--tpl-ink)",
  deadline: "bg-(--tpl-terracotta) text-(--tpl-ink)",
  celebration: "bg-(--tpl-mint) text-(--tpl-ink)",
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
    <section
      id="agenda"
      aria-labelledby="agenda-heading"
      className="bg-(--tpl-cream) py-24"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              id="agenda-heading"
              className="text-balance font-baloo2 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium uppercase tracking-tight text-(--tpl-green-text)"
            >
              Agenda sekolah
            </h2>
            <p className="mt-3 max-w-[48ch] text-pretty font-quicksand text-base text-(--tpl-ink)/80">
              Kalender akademik terdekat — ujian, kegiatan, dan hari libur dari kalender resmi sekolah.
            </p>
          </div>
          <Link
            href="/kalender-akademik"
            className="tpl-btn bg-(--tpl-paper) px-6 py-3 text-base text-(--tpl-ink)"
          >
            Kalender lengkap
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="tpl-sticker flex gap-4 rounded-[24px] bg-white p-5"
            >
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-[#191717] bg-white">
                <span
                  className="mb-1 size-2.5 rounded-full border border-[#191717]"
                  style={{ backgroundColor: event.warna || "#3454d1" }}
                  aria-hidden="true"
                />
                <span className="font-baloo2 text-2xl font-medium leading-none text-(--tpl-ink)">
                  {event.tanggal_mulai ? new Date(event.tanggal_mulai + "T00:00:00").getDate() : "•"}
                </span>
                <span className="font-quicksand text-[0.6rem] font-bold uppercase tracking-wide text-(--tpl-ink)/70">
                  {event.tanggal_mulai
                    ? new Date(event.tanggal_mulai + "T00:00:00").toLocaleDateString("id-ID", { month: "short" })
                    : ""}
                </span>
              </div>

              <div className="min-w-0">
                <span
                  className={`inline-block rounded-full border-2 border-[#191717] px-2.5 py-0.5 font-quicksand text-xs font-bold ${JENIS_STYLE[event.jenis] ?? JENIS_STYLE.event}`}
                >
                  {JENIS_LABEL[event.jenis] ?? event.jenis}
                </span>
                <h3 className="mt-1.5 truncate font-baloo2 text-base uppercase tracking-tight text-(--tpl-ink)">
                  {event.judul}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 font-quicksand text-sm text-(--tpl-ink)/80">
                  <CalendarDays className="size-3.5 shrink-0" aria-hidden />
                  {formatTanggal(event)}
                </p>
                {event.lokasi && (
                  <p className="mt-0.5 flex items-center gap-1.5 truncate font-quicksand text-sm text-(--tpl-ink)/80">
                    <MapPin className="size-3.5 shrink-0" aria-hidden />
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
