export const revalidate = 300

import type { Metadata } from "next"
import { serverGetPublic } from "@/lib/server-api"
import { HeroPlayful } from "@/components/landing/playful/hero-playful"
import { StoryAbout } from "@/components/landing/playful/story-about"
import { LearningCards } from "@/components/landing/playful/learning-cards"
import { StepsSection } from "@/components/landing/playful/steps-section"
import { TrustCards } from "@/components/landing/playful/trust-cards"
import { TestimonialCards } from "@/components/landing/playful/testimonial-cards"
import { FaqAccordion } from "@/components/landing/playful/faq-accordion"
import { CtaPlayful } from "@/components/landing/playful/cta-playful"
import { getCachedData } from "@/lib/redis-cache"
import HomeAnimationsLazy from "@/components/HomeAnimationsLazy"
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
import type { Gallery } from "@/types/gallery.types"
import type { Dukungan } from "@/types/dukungan.types"
import type { PrestasiSiswa } from "@/types/prestasi.types"
import type { PrestasiSekolah } from "@/types/prestasi.types"
import type { KalenderAkademikEvent } from "@/types/kalender.types"
import type { Fasilitas } from "@/types/fasilitas.types"
import { pageMetadata } from "@/lib/metadata-helpers"

export const metadata: Metadata = pageMetadata({
  title: "SD Terbaik di Samarinda | SD Muhammadiyah 3 Samarinda",
  description:
    "SD Islam terbaik di Samarinda Seberang — akreditasi A, program tahfidz, dan prestasi siswa. Sekolah kreatif di Jl. Dato Iba. Daftar SPMB sekarang.",
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
      {/* Section template (bahasa visual Playora) — Hero, About/Story, Learning,
          HowItWorks, Why, Testimonial, FAQ, CTA, berurutan seperti aslinya. */}
      <HeroPlayful />
      <StatsSection data={countRes ?? { siswa: 0, guru: 0, fasilitas: 0, prestasis_siswa: 0, prestasis_sekolah: 0 }} />
      <StoryAbout />
      <ProgramsSection />
      <LearningCards />
      <StepsSection />
      <KepalaSekolahSection />
      <AccreditationSection />
      <TrustCards />
      <TestimonialCards />
      <AboutPreviewSection data={countRes ?? undefined} />
      <GallerySection galleries={galleryRes ?? []} />
      <QuickLinksSection fasilitas={fasilitasRes ?? []} prestasiSekolah={prestasiSekolahRes ?? []} />
      <AchievementsSection achievements={prestasiRes ?? []} />
      <VideoSection />
      <CalendarSection events={kalenderRes ?? []} />
      <AwardsSection />
      <PartnersSection partners={dukunganRes ?? []} />
      <FaqAccordion />
      <CtaPlayful />
    </>
  )
}
