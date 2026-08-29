'use client';

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarDays, MapPin, AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import PageAnimations from "@/components/PageAnimations"
import { JENIS_LABEL, type KalenderAkademikEvent } from "@/types/kalender.types"

const JENIS_FILTERS = [
  { value: "semua", label: "Semua" },
  { value: "exam", label: "Ujian" },
  { value: "event", label: "Kegiatan" },
  { value: "holiday", label: "Libur" },
  { value: "celebration", label: "Perayaan" },
  { value: "deadline", label: "Deadline" },
] as const

const JENIS_BADGE: Record<string, string> = {
  holiday: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  exam: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  event: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  deadline: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  celebration: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
}

function formatRange(event: KalenderAkademikEvent): string {
  const mulai = event.tanggal_mulai ? new Date(event.tanggal_mulai + "T00:00:00") : null
  const selesai = event.tanggal_selesai ? new Date(event.tanggal_selesai + "T00:00:00") : null
  if (!mulai) return "-"

  const fmt = (d: Date) => d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
  if (selesai && selesai.getTime() !== mulai.getTime()) {
    return `${fmt(mulai)} – ${fmt(selesai)}`
  }
  return fmt(mulai)
}

export default function KalenderAkademikPage() {
  const [jenis, setJenis] = useState<string>("semua")

  const {
    data,
    loading,
    error,
    refetch
  } = useApi<KalenderAkademikEvent[]>("/kalender-akademik?limit=100", {
    cache: true,
    cacheTTL: 600000,
    immediate: true
  })

  const events = useMemo<KalenderAkademikEvent[]>(() => {
    if (!data) return []
    const list = Array.isArray(data) ? data : []

    if (jenis === "semua") return list
    return list.filter(e => e.jenis === jenis)
  }, [data, jenis])

  const groupedByMonth = useMemo(() => {
    const groups = new Map<string, KalenderAkademikEvent[]>()
    for (const event of events) {
      const date = event.tanggal_mulai ? new Date(event.tanggal_mulai + "T00:00:00") : null
      const key = date
        ? date.toLocaleDateString("id-ID", { month: "long", year: "numeric" })
        : "Tanpa Tanggal"
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(event)
    }
    return Array.from(groups.entries())
  }, [events])

  const today = new Date().toISOString().slice(0, 10)
  const isUpcoming = (e: KalenderAkademikEvent) => (e.tanggal_selesai ?? "") >= today

  return (
    <div className="min-h-screen bg-(--color-paper-50) dark:bg-(--color-forest-950)">
      <PageAnimations />
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <Button asChild variant="ghost" className="mb-6 -ml-2 rounded-full font-quicksand">
          <Link href="/">
            <ArrowLeft className="size-4" /> Kembali
          </Link>
        </Button>

        <h1 className="font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
          Kalender Akademik
        </h1>
        <p className="mt-3 max-w-[56ch] text-base font-quicksand text-(--color-ink-700) dark:text-(--color-cloud-200)">
          Agenda resmi tahun ajaran berjalan — ujian, kegiatan sekolah, hari libur nasional, dan perayaan.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {JENIS_FILTERS.map(filter => (
            <button
              key={filter.value}
              onClick={() => setJenis(filter.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                jenis === filter.value
                  ? "bg-(--color-forest-700) text-white dark:bg-(--color-sun-500) dark:text-(--color-ink-950)"
                  : "border border-black/10 bg-white text-(--color-forest-900) hover:border-(--color-forest-700)/40 dark:border-white/15 dark:bg-(--color-forest-900) dark:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {error && (
          <Alert className="mt-8 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
            <AlertCircle className="size-4 text-red-600" />
            <AlertDescription className="flex items-center justify-between gap-3 font-quicksand">
              Gagal memuat kalender akademik.
              <Button variant="outline" size="sm" onClick={() => refetch()} className="shrink-0 rounded-full">
                <RefreshCw className="size-3.5" /> Coba lagi
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="mt-8 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-[1.25rem]" />
            ))}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="mt-16 text-center">
            <CalendarDays className="mx-auto size-12 text-(--color-ink-700)/30" />
            <p className="mt-4 font-outfit text-lg font-bold text-(--color-forest-900) dark:text-white">
              Belum ada agenda
            </p>
            <p className="mt-1 font-quicksand text-sm text-(--color-ink-700) dark:text-(--color-cloud-200)">
              Kalender akademik tahun ajaran ini belum dipublikasikan.
            </p>
          </div>
        )}

        {!loading && groupedByMonth.map(([bulan, items]) => (
          <section key={bulan} className="mt-10">
            <h2 className="font-outfit text-xl font-bold text-(--color-forest-900) dark:text-white">{bulan}</h2>
            <div className="mt-4 space-y-3">
              {items.map((event) => (
                  <article
                    key={event.id}
                    className={`flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border p-4 transition-shadow hover:shadow-md hover:shadow-(--color-forest-900)/5 ${
                      isUpcoming(event)
                        ? "border-black/5 bg-white dark:border-white/10 dark:bg-(--color-forest-900)"
                        : "border-transparent bg-black/[0.03] opacity-60 dark:bg-white/[0.03]"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`${JENIS_BADGE[event.jenis] ?? JENIS_BADGE.event} border-0 font-semibold`}>
                          {JENIS_LABEL[event.jenis] ?? event.jenis}
                        </Badge>
                        {!isUpcoming(event) && (
                          <Badge variant="secondary" className="border-0">Selesai</Badge>
                        )}
                      </div>
                      <h3 className="mt-1.5 truncate font-outfit text-base font-bold text-(--color-forest-900) dark:text-white">
                        {event.judul}
                      </h3>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-quicksand text-(--color-ink-700) dark:text-(--color-cloud-200)">
                        <CalendarDays className="size-3.5 shrink-0" />
                        {formatRange(event)}
                        {event.lokasi && (
                          <>
                            <MapPin className="ml-2 size-3.5 shrink-0" />
                            {event.lokasi}
                          </>
                        )}
                      </p>
                    </div>
                    <span
                      className="size-3 shrink-0 rounded-full"
                      style={{ backgroundColor: event.warna || "#3454d1" }}
                      title={event.warna || ""}
                    />
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
