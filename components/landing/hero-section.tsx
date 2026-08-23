import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Play } from "lucide-react"
import { HeroCampusVideo } from "@/components/landing/HeroCampusVideo"

const PPDB_URL = "https://ppdb.sdmuh3smd.com"

export function HeroSection() {
  return (
    <section className="gsap-hero relative min-h-[100dvh] overflow-hidden bg-(--color-paper-50) dark:bg-(--color-forest-950)">
      <div className="absolute inset-0 z-0">
        <HeroCampusVideo
          src="/video/SEKOTIF_BND.mp4"
          poster="/foto_sekolah.jpeg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-(--color-paper-50)/95 via-(--color-paper-50)/80 to-transparent dark:from-black/95 dark:via-black/85" />
      </div>
      <div className="container relative z-10 mx-auto grid min-h-[100dvh] items-center gap-10 px-4 py-24 lg:grid-cols-1 lg:gap-16 lg:py-28">
        <div className="max-w-2xl">
          <div className="hero-logo hero-logo mb-8 size-16 sm:size-[4.5rem]">
            <Image
              src="/SD3_logo1.png"
              alt="Logo SD Muhammadiyah 3 Samarinda"
              width={72}
              height={72}
              priority
              className="size-full object-contain"
            />
          </div>

          <p className="hero-badge hero-badge mb-4 text-sm font-semibold text-(--color-forest-600) dark:text-white drop-shadow-lg font-quicksand">
            SD Islam kreatif di Samarinda Seberang
          </p>

          <h1 className="hero-title hero-title text-balance font-outfit text-4xl font-extrabold leading-[1.08] tracking-tight text-(--color-forest-900) dark:text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Mendidik dengan hati, sejak kelas satu.
          </h1>

          <p className="hero-description hero-description mt-5 max-w-[38ch] text-pretty text-base leading-relaxed text-(--color-ink-800) dark:text-white drop-shadow-md sm:text-lg font-quicksand">
            Akreditasi A, tahfidz, dan tiga ijazah. Rumah belajar yang menanam akhlak Islami tanpa menekan rasa ingin tahu anak.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="hero-button hero-button h-12 rounded-full bg-(--color-sun-500) px-7 text-base font-bold text-(--color-ink-950) shadow-[0_16px_40px_-18px_rgba(232,163,61,0.7)] hover:bg-(--color-sun-400) dark:text-white dark:shadow-[0_16px_40px_-18px_rgba(232,163,61,0.5)]"
            >
              <Link href={PPDB_URL} className="inline-flex items-center gap-2">
                Daftar SPMB
                <span className="flex size-8 items-center justify-center rounded-full bg-(--color-ink-950)/10 dark:bg-white/20">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline-brand"
              className="hero-button hero-button h-12 rounded-full px-7 text-base font-semibold text-(--color-forest-900) dark:text-white dark:border-white/30 dark:hover:bg-white/10"
            >
              <Link href="/profil#video" className="inline-flex items-center gap-2">
                <Play className="size-4 fill-current" aria-hidden />
                Lihat profil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
