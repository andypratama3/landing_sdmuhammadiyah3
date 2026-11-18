"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { PlayfulVideo } from "./playful-video"

gsap.registerPlugin(ScrollTrigger)

const MASK_ID = "story-mask"

export function StoryAbout() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const holeRef = useRef<SVGRectElement>(null)
  const ceRef = useRef<HTMLSpanElement>(null)
  const taRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, ctaRef.current], { opacity: 0, y: 32 })
      gsap.set(overlayRef.current, { opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(ceRef.current, { xPercent: -150, opacity: 0, ease: "power2.inOut", duration: 0.45 }, 0.05)
        .to(taRef.current, { xPercent: 150, opacity: 0, ease: "power2.inOut", duration: 0.45 }, 0.05)
        // Jendela mask 30x30 di tengah viewBox 100x100; skala 4x = 120 unit
        // melewati tepi layar. Linear supaya kurtain terangkat bertahap di
        // sepanjang pin, bukan langsung terbuka di awal scroll.
        .to(holeRef.current, { scale: 4, svgOrigin: "50 50", ease: "none", duration: 0.7 }, 0)
        // Huruf raksasa dilepas setelah kurtain terbuka penuh dan sebelum
        // statement muncul, supaya teks tidak pernah tertimpa glyph.
        .to(overlayRef.current, { opacity: 0, duration: 0.12, ease: "power1.out" }, 0.7)
        .to(headingRef.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 }, 0.82)
        .to(ctaRef.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 }, 0.94)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <section
      ref={sectionRef}
      id="tentang"
      aria-labelledby="tentang-heading"
      className="relative min-h-[80vh] w-full overflow-hidden bg-(--tpl-yellow) md:h-screen"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <PlayfulVideo
          srcHd="/assets/video/story-bg-1080p.mp4"
          srcSd="/assets/video/story-bg-720p.mp4"
          poster="/assets/video/story-bg-poster.webp"
          sizes="100vw"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-(--tpl-cream)/55" />
      </div>

      <div className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 pt-24 text-center sm:pt-28">
        <h2
          ref={headingRef}
          id="tentang-heading"
          className="font-quicksand text-[clamp(22px,3.2vw,40px)] font-bold uppercase leading-snug tracking-tight text-(--tpl-ink)"
        >
          DI SD MUHAMMADIYAH 3 SAMARINDA, ANAK BELAJAR PALING BAIK SAAT MEREKA SENANG.
          <br className="hidden sm:inline" /> KAMI MENGUBAH HARI BELAJAR JADI PERMAINAN DAN
          PETUALANGAN <br className="hidden sm:inline" /> YANG INTERAKTIF.
        </h2>
        <div ref={ctaRef}>
          <Link href="/profil" className="tpl-btn px-6 py-3 text-base sm:text-lg">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--tpl-red) text-(--tpl-paper)"
            >
              <ArrowRight className="size-4" strokeWidth={3} />
            </span>
            KENALI SEKOLAH KAMI
          </Link>
        </div>
      </div>

      <div ref={overlayRef} className="pointer-events-none absolute inset-0 z-10 select-none">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full motion-reduce:hidden"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id={MASK_ID}>
              <rect width="100" height="100" fill="white" />
              <rect ref={holeRef} x="35" y="35" width="30" height="30" rx="4" fill="black" />
            </mask>
          </defs>
          <rect
            width="100"
            height="100"
            className="fill-(--tpl-yellow)"
            mask={`url(#${MASK_ID})`}
          />
        </svg>

        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <p
            className="font-baloo2 uppercase text-(--tpl-green)"
            style={{ fontSize: "clamp(88px, 20vw, 380px)", lineHeight: 1, letterSpacing: "-0.01em" }}
          >
            <span ref={ceRef} className="inline-block will-change-transform">
              CE
            </span>
            <span className="inline-block will-change-transform">
              RI
            </span>
            <span ref={taRef} className="inline-block will-change-transform">
              TA
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}