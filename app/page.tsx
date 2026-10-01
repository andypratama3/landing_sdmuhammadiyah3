export const revalidate = 300

import type { Metadata } from "next"
import { serverGetPublic } from "@/lib/server-api"
import { getCachedData, buildCacheKey, getCacheVersion } from "@/lib/redis-cache"
import HomeAnimationsLazy from "@/components/HomeAnimationsLazy"
import { HeroSection } from "@/components/landing/hero-section"
import { StatsSection } from "@/components/landing/stats-section"
import { ProgramsSection } from "@/components/landing/programs-section"
import { KepalaSekolahSection } from "@/components/landing/kepala-sekolah-section"
import { AccreditationSection } from "@/components/landing/accreditation-section"
import { QuickLinksSection } from "@/components/landing/quick-links-section"
import { GallerySection } from "@/components/landing/gallery-section"
import { VideoSection } from "@/components/landing/video-section"
import { AboutPreviewSection } from "@/components/landing/about-preview-section"
import { AchievementsSection } from "@/components/landing/achievements-section"
import { CalendarSection } from "@/components/landing/calendar-section"
import { PartnersSection } from "@/components/landing/partners-section"
import { AwardsSection } from "@/components/landing/awards-section"
import { CTASection } from "@/components/landing/cta-section"
import type { Gallery } from "@/types/gallery.types"
import type { Dukungan } from "@/types/dukungan.types"
import type { PrestasiSiswa } from "@/types/prestasi.types"
import type { PrestasiSekolah } from "@/types/prestasi.types"
import type { KalenderAkademikEvent } from "@/types/kalender.types"
import type { Fasilitas } from "@/types/fasilitas.types"
import { pageMetadata } from "@/lib/metadata-helpers"

export const metadata: Metadata = pageMetadata({
  title: "SD Terbaik di Samarinda | SD Muhammadiyah 3 Samarinda - Sekolah Kreatif Islam",
  description:
    "SD Muhammadiyah 3 Samarinda - SD Islam terbaik di Samarinda Seberang dengan akreditasi A, program tahfidz, dan prestasi siswa. Sekolah kreatif berbasis nilai Islami di Jl. Dato Iba. Daftar SPMB 2025/2026.",
  path: "/",
  keywords: ["sd terbaik di samarinda", "sd islam terbaik di samarinda", "sd samarinda", "sd di samarinda", "sd swasta samarinda", "sekolah penggerak", "tahfidz samarinda"],
})

interface CountData {
  siswa: number
  guru: number
  fasilitas: number
  prestasis_siswa: number
  prestasis_sekolah: number
}

export default async function Home() {
  // Realtime Redis cache dengan TTL pendek (60-300 detik) agar data tetap segar
  const fetchCount = async () => (await serverGetPublic<CountData>("/count-landing")).data ?? { siswa: 0, guru: 0, fasilitas: 0, prestasis_siswa: 0, prestasis_sekolah: 0 };
  const fetchGallery = async () => (await serverGetPublic<Gallery[]>("/gallery-landing")).data ?? [];
  const fetchDukungan = async () => (await serverGetPublic<Dukungan[]>("/dukungan-kerja-sama")).data ?? [];
  const fetchPrestasiSiswa = async () => (await serverGetPublic<PrestasiSiswa[]>("/prestasi-landing")).data ?? [];
  const fetchKalender = async () => (await serverGetPublic<KalenderAkademikEvent[]>("/kalender-akademik/upcoming?limit=6")).data ?? [];
  const fetchFasilitas = async () => (await serverGetPublic<Fasilitas[]>("/list/fasilitas")).data ?? [];
  const fetchPrestasiSekolah = async () => (await serverGetPublic<PrestasiSekolah[]>("/list/prestasi-sekolah")).data ?? [];

  const [countRes, galleryRes, dukunganRes, prestasiRes, kalenderRes, fasilitasRes, prestasiSekolahRes] = await Promise.all([
    getCachedData('landing:count', fetchCount, { ttlSeconds: 60 }),
    getCachedData('landing:gallery', fetchGallery, { ttlSeconds: 120 }),
    getCachedData('landing:dukungan', fetchDukungan, { ttlSeconds: 300 }),
    getCachedData('landing:prestasi-siswa', fetchPrestasiSiswa, { ttlSeconds: 120 }),
    getCachedData('landing:kalender', fetchKalender, { ttlSeconds: 60 }),
    getCachedData('landing:fasilitas', fetchFasilitas, { ttlSeconds: 300 }),
    getCachedData('landing:prestasi-sekolah', fetchPrestasiSekolah, { ttlSeconds: 300 }),
  ])

  return (
    <>
      <HomeAnimationsLazy />
      <HeroSection />
      <StatsSection data={countRes ?? { siswa: 0, guru: 0, fasilitas: 0, prestasis_siswa: 0, prestasis_sekolah: 0 }} />
      <ProgramsSection />
      <KepalaSekolahSection />
      <AccreditationSection />
      <QuickLinksSection fasilitas={fasilitasRes ?? []} prestasiSekolah={prestasiSekolahRes ?? []} />
      <GallerySection galleries={galleryRes ?? []} />
      <CalendarSection events={kalenderRes ?? []} />
      <VideoSection />
      <AboutPreviewSection />
      <AchievementsSection achievements={prestasiRes ?? []} />
      <PartnersSection partners={dukunganRes ?? []} />
      <AwardsSection />
      <CTASection />
    </>
  )
}
