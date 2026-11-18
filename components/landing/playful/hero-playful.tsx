"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Play } from "lucide-react"
import { useState } from "react"
import { PlayfulVideo } from "./playful-video"

const WORD = "BERMAIN".split("")

export function HeroPlayful() {
  const reduce = useReducedMotion()
  const [wave, setWave] = useState(false)

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-(--tpl-cream)"
    >
      <div className="absolute inset-0 overflow-hidden">
        <PlayfulVideo
          srcHd="/assets/video/header-video-1080p.mp4"
          srcSd="/assets/video/header-video-720p.mp4"
          poster="/assets/video/header-video-poster.webp"
          priority
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-(--tpl-paper)/70"
        />
      </div>

      <div className="container relative z-10 mx-auto flex flex-1 flex-col items-center justify-center gap-3 px-4 py-10 text-center sm:gap-5 sm:py-24 [@media(max-height:560px)]:gap-2 [@media(max-height:560px)]:py-6">
        <p className="tpl-sticker-sm rounded-full bg-(--tpl-paper) px-4 py-1.5 font-quicksand text-xs font-bold uppercase tracking-[0.18em] text-(--tpl-green-text) sm:text-sm">
          SEKOLAH KREATIF ISLAM · SAMARINDA SEBERANG
        </p>

        <h1 id="hero-heading" className="font-baloo2 uppercase text-(--tpl-green)">
          <span
            className="block"
            style={{ fontSize: "clamp(24px, 6vw, 58px)", lineHeight: 1.05 }}
          >
            BELAJAR SAMBIL
          </span>
          <span
            className="tpl-hero-word mt-1 flex select-none items-center justify-center"
            style={{ lineHeight: 1, letterSpacing: "-0.04em" }}
            onMouseEnter={() => setWave(true)}
            onMouseLeave={() => setWave(false)}
            onTouchStart={() => setWave(true)}
            onTouchEnd={() => setWave(false)}
          >
            {WORD.map((letter, i) =>
              reduce ? (
                <span key={`${letter}-${i}`}>{letter}</span>
              ) : (
                <motion.span
                  key={`${letter}-${i}`}
                  className="inline-block"
                  animate={wave ? { y: [0, -12, 0] } : { y: 0 }}
                  transition={
                    wave
                      ? { duration: 0.6, ease: "easeInOut", delay: 0.07 * i }
                      : { duration: 0.2, ease: "easeOut" }
                  }
                  whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 6 : -6 }}
                  whileTap={{ scale: 1.1, rotate: i % 2 === 0 ? -6 : 6 }}
                >
                  {letter}
                </motion.span>
              ),
            )}
          </span>
        </h1>

        <p className="max-w-[46ch] rounded-[24px] bg-(--tpl-cream)/85 px-5 py-3 font-quicksand text-sm font-medium text-(--tpl-ink) sm:py-4 sm:text-lg text-pretty">
          SD Muhammadiyah 3 Samarinda — SD Islam berakreditasi Unggul (A) di Samarinda Seberang,
          tempat tahfidz, adab, dan edutainment berjalan bersama.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/profil"
            className="tpl-btn bg-(--tpl-paper) px-6 py-3 text-lg text-(--tpl-ink)"
          >
            LIHAT PROFIL
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center pb-8 [@media(max-height:420px)]:hidden" aria-hidden="true">
        <svg viewBox="0 0 160 60" className="h-16 w-36 overflow-visible fill-none">
          <path id="hero-scroll-path" d="M 20 48 A 60 60 0 0 1 140 48" />
          <text
            className="fill-(--tpl-ink) font-quicksand text-[16px] font-semibold uppercase"
            style={{ letterSpacing: "3px" }}
          >
            <textPath href="#hero-scroll-path" startOffset="50%" textAnchor="middle">
              GULIR KE BAWAH
            </textPath>
          </text>
        </svg>
        {reduce ? (
          <span className="-mt-4 text-xl font-bold text-(--tpl-ink)">↓</span>
        ) : (
          <motion.span
            className="-mt-4 text-xl font-bold text-(--tpl-ink)"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        )}
      </div>
    </section>
  )
}
