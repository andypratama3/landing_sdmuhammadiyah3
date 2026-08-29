export const revalidate = 300

import type { Metadata } from "next"
import { serverGetPublic } from "@/lib/server-api"
import HomeAnimations from "@/components/HomeAnimations"
import { HeroSection } from "@/components/landing/hero-section"
import { StatsSection } from "@/components/landing/stats-section"
import { ProgramsSection } from "@/components/landing/programs-section"
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
  const [countRes, galleryRes, dukunganRes, prestasiRes, kalenderRes, fasilitasRes, prestasiSekolahRes] = await Promise.all([
    serverGetPublic<CountData>("/count-landing"),
    serverGetPublic<Gallery[]>("/gallery-landing"),
    serverGetPublic<Dukungan[]>("/dukungan-kerja-sama"),
    serverGetPublic<PrestasiSiswa[]>("/prestasi-landing"),
    serverGetPublic<KalenderAkademikEvent[]>("/kalender-akademik/upcoming?limit=6"),
    serverGetPublic<Fasilitas[]>("/list/fasilitas"),
    serverGetPublic<PrestasiSekolah[]>("/list/prestasi-sekolah"),
  ])

  return (
    <>
      <HomeAnimations />
      <HeroSection />
      <StatsSection data={countRes.data} />
      <ProgramsSection />
      <AccreditationSection />
      <QuickLinksSection fasilitas={fasilitasRes.data ?? []} prestasiSekolah={prestasiSekolahRes.data ?? []} />
      <GallerySection galleries={galleryRes.data ?? []} />
      <CalendarSection events={kalenderRes.data ?? []} />
      <VideoSection />
      <AboutPreviewSection />
      <AchievementsSection achievements={prestasiRes.data ?? []} />
      <PartnersSection partners={dukunganRes.data ?? []} />
      <AwardsSection />
      <CTASection />
    </>
  )
}
