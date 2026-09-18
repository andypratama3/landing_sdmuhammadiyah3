'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import type { Alumni } from '@/types/alumni.types'
import {
  GraduationCap,
  Users,
  Award,
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Instagram,
  Linkedin,
  Facebook,
  Trophy,
  Sparkles,
  Star,
  ChevronRight,
  Quote,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AlumniSearchClient, { type ViewMode, type SortMode } from './AlumniSearchClient'

interface AlumniContentProps {
  initialAlumni: Alumni[]
}

const STORAGE_URL =
  typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_STORAGE_URL || 'https://app.sdmuhammadiyah3smd.com/storage'
    : 'https://app.sdmuhammadiyah3smd.com/storage'

/** Resolve photo: absolute URLs pass through, relative paths get STORAGE_URL prefix */
function resolvePhoto(photo: string | undefined): string | null {
  if (!photo) return null
  const clean = photo.trim().replace(/\/+$/, '')
  if (!clean || clean === '/') return null
  if (clean.startsWith('http://') || clean.startsWith('https://')) return clean
  return `${STORAGE_URL.replace(/\/+$/, '')}/${clean.replace(/^\/+/, '')}`.replace(/\/{2,}/g, '/')
}

// ─── Animated Counter ───────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}</span>
}

// ─── Alumni Card — Grid Mode ─────────────────────────────────────────
function AlumniGridCard({ alumni }: { alumni: Alumni }) {
  const photoUrl = resolvePhoto(alumni.photo)

  const hasSocial =
    alumni.social_media?.linkedin ||
    alumni.social_media?.instagram ||
    alumni.social_media?.facebook

  return (
    <div className="group relative bg-white dark:bg-gray-900/60 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:shadow-(--color-forest-450)/10 hover:-translate-y-2 transition-all duration-500 flex flex-col">
      {/* Top accent bar — tournament-card style */}
      <div className="h-1.5 w-full bg-linear-to-r from-(--color-forest-450) via-(--color-teal-400) to-(--color-sun-500)" />

      {/* Photo area */}
      <div className="relative h-60 overflow-hidden bg-(--color-cloud-100) dark:bg-gray-800">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={alumni.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-(--color-forest-450)/10 flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-(--color-forest-450)/60" />
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Year badge — tournament card chip */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 bg-(--color-forest-450) text-white px-3 py-1.5 rounded-xl shadow-lg">
            <GraduationCap className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">{alumni.graduation_year}</span>
          </div>
        </div>

        {/* Social links — appear on hover */}
        {hasSocial && (
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {alumni.social_media?.linkedin && (
              <a
                href={alumni.social_media.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn ${alumni.name}`}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#0A66C2] transition-colors border border-white/30"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {alumni.social_media?.instagram && (
              <a
                href={alumni.social_media.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${alumni.name}`}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E1306C] transition-colors border border-white/30"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {alumni.social_media?.facebook && (
              <a
                href={alumni.social_media.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook ${alumni.name}`}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors border border-white/30"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1 group-hover:text-(--color-forest-450) transition-colors leading-tight uppercase tracking-tight line-clamp-1">
          {alumni.name}
        </h3>

        {alumni.class_name && (
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
            Kelas {alumni.class_name}
          </p>
        )}

        {/* Profession + workplace */}
        <div className="space-y-2 mb-4">
          {alumni.current_profession && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-(--color-forest-450) shrink-0" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 line-clamp-1">
                {alumni.current_profession}
              </span>
            </div>
          )}
          {alumni.workplace && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-(--color-teal-400) shrink-0" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 line-clamp-1">
                {alumni.workplace}
              </span>
            </div>
          )}
        </div>

        {/* Achievement chip */}
        {alumni.achievement && (
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
            <div className="flex items-start gap-2 bg-(--color-sun-500)/10 dark:bg-(--color-sun-500)/5 rounded-xl px-3 py-2.5">
              <Award className="w-3.5 h-3.5 text-(--color-sun-500) shrink-0 mt-0.5" />
              <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                {alumni.achievement}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Alumni Card — List Mode ──────────────────────────────────────────
function AlumniListCard({ alumni, index }: { alumni: Alumni; index: number }) {
  const photoUrl = resolvePhoto(alumni.photo)

  return (
    <div className="group relative bg-white dark:bg-gray-900/60 rounded-[1.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl hover:shadow-(--color-forest-450)/10 hover:-translate-y-1 transition-all duration-300 flex gap-0">
      {/* Left accent */}
      <div className="w-1 shrink-0 bg-linear-to-b from-(--color-forest-450) via-(--color-teal-400) to-(--color-sun-500)" />

      {/* Index */}
      <div className="flex items-center justify-center w-14 shrink-0 text-2xl font-black text-gray-100 dark:text-gray-800 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Photo */}
      <div className="relative w-20 h-20 shrink-0 my-auto rounded-2xl overflow-hidden bg-(--color-cloud-100) dark:bg-gray-800">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={alumni.name}
            fill
            sizes="80px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-(--color-forest-450)/50" />
          </div>
        )}
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-(--color-forest-450) transition-colors uppercase tracking-tight">
            {alumni.name}
          </h3>
          <Badge className="bg-(--color-forest-450)/10 text-(--color-forest-450) border-0 text-[9px] font-black uppercase tracking-widest shrink-0">
            {alumni.graduation_year}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {alumni.current_profession && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <Briefcase className="w-3 h-3 text-(--color-forest-450)" />
              {alumni.current_profession}
            </div>
          )}
          {alumni.workplace && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <MapPin className="w-3 h-3 text-(--color-teal-400)" />
              {alumni.workplace}
            </div>
          )}
          {alumni.class_name && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              Kelas {alumni.class_name}
            </div>
          )}
        </div>

        {alumni.achievement && (
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-(--color-sun-500)">
            <Award className="w-3 h-3 shrink-0" />
            <span className="line-clamp-1">{alumni.achievement}</span>
          </div>
        )}
      </div>

      {/* Social right */}
      <div className="hidden sm:flex flex-col items-center justify-center gap-2 px-4 shrink-0">
        {alumni.social_media?.linkedin && (
          <a href={alumni.social_media.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {alumni.social_media?.instagram && (
          <a href={alumni.social_media.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all">
            <Instagram className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Featured Alumni Spotlight Card ──────────────────────────────────
function SpotlightCard({ alumni, rank }: { alumni: Alumni; rank: number }) {
  const photoUrl = resolvePhoto(alumni.photo)

  const rankConfig = [
    { color: 'from-(--color-sun-500) to-(--color-sun-400)', badge: 'bg-(--color-sun-500)', icon: '🥇', label: 'ALUMNI TERBAIK' },
    { color: 'from-gray-300 to-gray-200',                  badge: 'bg-gray-400',          icon: '🥈', label: 'ALUMNI INSPIRATIF' },
    { color: 'from-amber-600 to-amber-500',                badge: 'bg-amber-600',          icon: '🥉', label: 'ALUMNI BERPRESTASI' },
  ][rank] ?? { color: 'from-(--color-forest-450) to-(--color-forest-500)', badge: 'bg-(--color-forest-450)', icon: '⭐', label: 'ALUMNI' }

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
      {/* Top rank stripe */}
      <div className={`h-2 w-full bg-linear-to-r ${rankConfig.color}`} />

      {/* Rank chip — tournament style */}
      <div className="absolute top-5 left-5 z-10">
        <div className={`${rankConfig.badge} text-white px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5`}>
          <span className="text-sm leading-none">{rankConfig.icon}</span>
          <span className="text-[9px] font-black uppercase tracking-widest">{rankConfig.label}</span>
        </div>
      </div>

      {/* Photo */}
      <div className="relative h-72 overflow-hidden bg-(--color-cloud-100) dark:bg-gray-800">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={alumni.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={`w-28 h-28 rounded-full bg-linear-to-br ${rankConfig.color} flex items-center justify-center shadow-2xl`}>
              <GraduationCap className="w-14 h-14 text-white" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight mb-1">
            {alumni.name}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
            Angkatan {alumni.graduation_year}
            {alumni.class_name && ` · Kelas ${alumni.class_name}`}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {alumni.current_profession && (
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-4 h-4 text-(--color-forest-450) shrink-0" />
            <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {alumni.current_profession}
            </span>
          </div>
        )}
        {alumni.workplace && (
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-(--color-teal-400) shrink-0" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {alumni.workplace}
            </span>
          </div>
        )}

        {alumni.achievement && (
          <div className="bg-(--color-sun-500)/10 dark:bg-(--color-sun-500)/5 rounded-2xl px-4 py-3 mb-4 flex items-start gap-3">
            <Trophy className="w-4 h-4 text-(--color-sun-500) shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
              {alumni.achievement}
            </p>
          </div>
        )}

        {alumni.description && (
          <div className="relative pl-4 border-l-2 border-(--color-forest-450)/30 mb-4">
            <Quote className="absolute -top-1 -left-2 w-4 h-4 text-(--color-forest-450)/30" />
            <p className="text-sm text-gray-500 dark:text-gray-400 italic line-clamp-3 leading-relaxed">
              {alumni.description}
            </p>
          </div>
        )}

        {/* Social links */}
        {(alumni.social_media?.linkedin || alumni.social_media?.instagram || alumni.social_media?.facebook) && (
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mr-1">Terhubung</span>
            {alumni.social_media?.linkedin && (
              <a href={alumni.social_media.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {alumni.social_media?.instagram && (
              <a href={alumni.social_media.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            )}
            {alumni.social_media?.facebook && (
              <a href={alumni.social_media.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────
function EmptyState({ isFiltered }: { isFiltered: boolean }) {
  return (
    <div className="text-center py-24 col-span-full">
      <div className="w-20 h-20 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/5 rounded-full flex items-center justify-center mx-auto mb-6">
        <GraduationCap className="w-10 h-10 text-(--color-forest-450)/40" />
      </div>
      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
        {isFiltered ? 'Tidak Ada Hasil' : 'Belum Ada Data Alumni'}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        {isFiltered
          ? 'Coba ubah kata kunci pencarian atau hilangkan filter yang aktif.'
          : 'Data alumni akan segera ditambahkan.'}
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────
export default function AlumniContent({ initialAlumni }: AlumniContentProps) {
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>(initialAlumni)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortMode, setSortMode] = useState<SortMode>('year_desc')
  const [visibleCount, setVisibleCount] = useState(12)

  const handleFilteredAlumni = useCallback((f: Alumni[]) => setFilteredAlumni(f), [])
  const handleViewMode = useCallback((m: ViewMode) => setViewMode(m), [])
  const handleSortMode = useCallback((m: SortMode) => setSortMode(m), [])

  // Stats derived from ALL alumni, not just filtered
  const stats = useMemo(() => {
    const years = [...new Set(initialAlumni.map((a) => a.graduation_year))]
    const professions = [...new Set(initialAlumni.filter((a) => a.current_profession).map((a) => a.current_profession))]
    const latestYear = Math.max(...years, 0)
    const withAchievement = initialAlumni.filter((a) => a.achievement).length
    return { total: initialAlumni.length, years: years.length, professions: professions.length, latestYear, withAchievement }
  }, [initialAlumni])

  // Top 3 featured — those with achievement, sorted by graduation year desc
  const featuredAlumni = useMemo(
    () =>
      [...initialAlumni]
        .filter((a) => a.achievement || a.current_profession)
        .sort((a, b) => b.graduation_year - a.graduation_year)
        .slice(0, 3),
    [initialAlumni]
  )

  const visibleAlumni = filteredAlumni.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAlumni.length
  const isFiltered = filteredAlumni.length !== initialAlumni.length

  return (
    <div className="min-h-screen bg-(--color-paper-50) dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">

      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-(--color-forest-450)/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-60 right-0 w-96 h-96 bg-(--color-sun-500)/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-60 left-1/3 w-80 h-80 bg-(--color-teal-400)/6 rounded-full blur-[130px] pointer-events-none" />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[420px]">

            {/* Main hero card */}
            <div className="lg:col-span-7 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-end shadow-2xl shadow-(--color-forest-450)/20">
              {/* Texture */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
              {/* Glow orb */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              {/* Decorative graduation cap top-right */}
              <div className="absolute top-8 right-8 opacity-10">
                <GraduationCap className="w-32 h-32 text-white" />
              </div>

              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-0 px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-(--color-sun-500) animate-pulse" />
                  Portal Alumni
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight uppercase">
                  Jejak <br />
                  <span className="text-(--color-sun-200)">Kesuksesan</span>
                </h1>
                <p className="text-white/80 text-base md:text-lg font-medium max-w-lg leading-relaxed">
                  Ribuan kisah inspiratif dari lulusan SD Muhammadiyah 3 Samarinda yang telah menorehkan prestasi di berbagai bidang.
                </p>
              </div>
            </div>

            {/* Stats bento right column */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">

              {/* Total alumni — large */}
              <div className="col-span-2 bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-md flex items-center gap-6 hover:shadow-xl hover:border-(--color-forest-450)/30 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-(--color-forest-450)" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Alumni Terdaftar</p>
                  <p className="text-4xl font-black text-gray-900 dark:text-white leading-none">
                    <AnimatedCounter target={stats.total} />
                    <span className="text-lg text-(--color-forest-450) ml-1">+</span>
                  </p>
                </div>
              </div>

              {/* Angkatan */}
              <div className="bg-(--color-sun-500) rounded-[2rem] p-5 shadow-lg flex flex-col justify-between hover:scale-[1.03] transition-transform group">
                <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <Calendar className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-800 mb-0.5">Angkatan</p>
                  <p className="text-3xl font-black text-gray-900 leading-none">
                    <AnimatedCounter target={stats.years} />
                  </p>
                </div>
              </div>

              {/* Profesi */}
              <div className="bg-(--color-teal-400) rounded-[2rem] p-5 shadow-lg flex flex-col justify-between hover:scale-[1.03] transition-transform group">
                <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <Briefcase className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-800 mb-0.5">Ragam Profesi</p>
                  <p className="text-3xl font-black text-gray-900 leading-none">
                    <AnimatedCounter target={stats.professions} />
                  </p>
                </div>
              </div>

              {/* Berprestasi */}
              <div className="col-span-2 bg-gray-900 dark:bg-gray-800 rounded-[2rem] p-5 border border-gray-800 flex items-center gap-5 hover:shadow-xl hover:border-(--color-forest-450)/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-(--color-forest-450)/20 flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-(--color-forest-450)" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Alumni Berprestasi</p>
                  <p className="text-2xl font-black text-white leading-none">
                    <AnimatedCounter target={stats.withAchievement} />
                    <span className="text-sm text-gray-500 ml-2 font-medium">alumni tercatat</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT / TOURNAMENT CARDS ─────────────────────────────── */}
      {featuredAlumni.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container px-4 mx-auto max-w-7xl">
            {/* Section header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-(--color-sun-500)" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-(--color-forest-450)">Hall of Fame</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
                  Alumni <span className="text-(--color-forest-450)">Terbaik</span>
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <Star className="w-3.5 h-3.5 text-(--color-sun-500)" />
                Top {featuredAlumni.length} Alumni
              </div>
            </div>

            {/* Tournament-style spotlight cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredAlumni.map((a, i) => (
                <SpotlightCard key={a.id ?? a.slug} alumni={a} rank={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SEARCH + FILTER + GRID ────────────────────────────────────── */}
      <section className="pb-24">
        <div className="container px-4 mx-auto max-w-7xl">

          {/* Filter panel */}
          <div className="sticky top-[72px] z-20 -mx-4 px-4 py-4 bg-(--color-paper-50)/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 mb-10">
            <AlumniSearchClient
              alumni={initialAlumni}
              onFilteredAlumni={handleFilteredAlumni}
              onViewMode={handleViewMode}
              onSortMode={handleSortMode}
              viewMode={viewMode}
              sortMode={sortMode}
            />
          </div>

          {/* Grid / List */}
          {filteredAlumni.length === 0 ? (
            <EmptyState isFiltered={isFiltered} />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visibleAlumni.map((a) => (
                <AlumniGridCard key={a.id ?? a.slug} alumni={a} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              {visibleAlumni.map((a, i) => (
                <AlumniListCard key={a.id ?? a.slug} alumni={a} index={i} />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Menampilkan {visibleCount} dari {filteredAlumni.length} alumni
              </p>
              {/* Mini progress bar */}
              <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-(--color-forest-450) to-(--color-teal-400) rounded-full transition-all duration-500"
                  style={{ width: `${(visibleCount / filteredAlumni.length) * 100}%` }}
                />
              </div>
              <Button
                onClick={() => setVisibleCount((c) => c + 12)}
                className="mt-2 bg-(--color-forest-450) hover:bg-(--color-forest-500) text-white rounded-full px-8 h-12 font-black uppercase tracking-widest text-[10px] shadow-xl hover:shadow-(--color-forest-450)/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                Tampilkan Lebih Banyak
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* All loaded badge */}
          {!hasMore && filteredAlumni.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2 px-6 py-2.5 bg-(--color-forest-450)/5 rounded-full border border-(--color-forest-450)/10">
                <span className="w-2 h-2 rounded-full bg-(--color-forest-450)" />
                <span className="text-[10px] font-black uppercase tracking-widest text-(--color-forest-450)">
                  Semua {filteredAlumni.length} Alumni Ditampilkan
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
