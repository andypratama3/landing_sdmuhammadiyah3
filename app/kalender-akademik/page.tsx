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
    <div className="pt-24 pb-16 min-h-screen bg-(--color-paper-50) dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      <PageAnimations />
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-(--color-cloud-100)/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main Card */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[380px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <Button asChild variant="ghost" className="mb-6 -ml-2 rounded-full font-quicksand text-white/90 hover:text-white hover:bg-white/10">
                  <Link href="/">
                    <ArrowLeft className="size-4" /> Kembali
                  </Link>
                </Button>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm uppercase">
                  Kalender <br /> <span className="text-(--color-sun-200)">Akademik</span>
                </h1>
                <p className="text-white/95 text-lg font-medium max-w-xl leading-relaxed drop-shadow-sm">
                  Agenda resmi tahun ajaran berjalan — ujian, kegiatan sekolah, hari libur nasional, dan perayaan.
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1 transition-colors relative overflow-hidden group hover:border-(--color-forest-450)">
                <CalendarDays className="w-10 h-10 text-(--color-forest-450) mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">Total Agenda</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">{events.length} kegiatan terjadwal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {JENIS_FILTERS.map(filter => (
            <button
              key={filter.value}
              onClick={() => setJenis(filter.value)}
              className={`rounded-xl px-5 py-2.5 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                jenis === filter.value
                  ? "bg-(--color-forest-450) text-white shadow-lg shadow-(--color-forest-450)/20 border-0"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 hover:border-(--color-forest-450) hover:text-(--color-forest-450)"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {error && (
          <Alert className="mt-8 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 rounded-[1.5rem]">
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
          <div className="mt-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-[1.75rem]" />
            ))}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="mt-16 text-center p-12 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-200 dark:border-gray-800">
            <CalendarDays className="mx-auto size-16 text-(--color-ink-700)/30" />
            <p className="mt-4 font-outfit text-xl font-bold text-(--color-forest-900) dark:text-white">
              Belum ada agenda
            </p>
            <p className="mt-2 font-quicksand text-base text-gray-500 dark:text-gray-400">
              Kalender akademik tahun ajaran ini belum dipublikasikan.
            </p>
          </div>
        )}

        {!loading && groupedByMonth.map(([bulan, items]) => (
          <section key={bulan} className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-(--color-forest-450) rounded-full" />
              <h2 className="font-outfit text-2xl font-black text-(--color-forest-900) dark:text-white uppercase tracking-tight">{bulan}</h2>
            </div>
            <div className="space-y-4">
              {items.map((event) => (
                  <article
                    key={event.id}
                    className={`group flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                      isUpcoming(event)
                        ? "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 glass"
                        : "border-transparent bg-gray-50 dark:bg-gray-900/20 opacity-60"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={`${JENIS_BADGE[event.jenis] ?? JENIS_BADGE.event} border-0 font-black uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-lg`}>
                          {JENIS_LABEL[event.jenis] ?? event.jenis}
                        </Badge>
                        {!isUpcoming(event) && (
                          <Badge variant="secondary" className="border-0 font-black uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-lg">Selesai</Badge>
                        )}
                      </div>
                      <h3 className="font-outfit text-lg font-black text-(--color-forest-900) dark:text-white leading-tight group-hover:text-(--color-forest-450) transition-colors">
                        {event.judul}
                      </h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-quicksand text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-4 text-(--color-forest-450)" />
                          {formatRange(event)}
                        </span>
                        {event.lokasi && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-4 text-(--color-sun-500)" />
                            {event.lokasi}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="size-4 shrink-0 rounded-full ring-4 ring-white dark:ring-gray-800"
                        style={{ backgroundColor: event.warna || "#3454d1" }}
                        title={event.warna || ""}
                      />
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
