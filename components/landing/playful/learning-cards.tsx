"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

const subjects = [
  {
    fill: "var(--tpl-pink)",
    frame: "#85E3FF",
    src: "/assets/img/quran-halaqah.webp",
    alt: "Anak-anak duduk melingkar membaca Al-Qur'an di ruang kelas sekolah",
    title: "HAFALAN & TILAWATI",
    top: "top-[72px] sm:top-[96px]",
    rotate: "-rotate-4",
    z: "z-10",
  },
  {
    fill: "var(--tpl-green)",
    frame: "#FFC8E8",
    src: "/assets/img/image_276.webp",
    alt: "Anak belajar angka dan berhitung",
    title: "BERHITUNG & SAINS",
    top: "top-[112px] sm:top-[148px]",
    rotate: "rotate-3",
    z: "z-20",
  },
  {
    fill: "var(--tpl-purple)",
    frame: "#BAF77B",
    src: "/assets/img/image_278.webp",
    alt: "Anak menyusun puzzle logika",
    title: "LOGIKA & KREATIVITAS",
    top: "top-[152px] sm:top-[200px]",
    rotate: "-rotate-3",
    z: "z-30",
  },
]

/** Kedip mata maskot: dua lingkaran dipipihkan sebentar lalu kembali. */
function useBlink(reduce: boolean) {
  const [blink, setBlink] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    if (reduce) return
    let alive = true
    const schedule = () => {
      timers.current.push(
        window.setTimeout(() => {
          if (!alive) return
          setBlink(true)
          timers.current.push(window.setTimeout(() => setBlink(false), 140))
          schedule()
        }, 2500 + Math.random() * 3500)
      )
    }
    schedule()
    return () => {
      alive = false
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [reduce])

  return blink
}

function MascotBand({ reduce }: { reduce: boolean }) {
  const bandRef = useRef<SVGSVGElement>(null)
  const blink = useBlink(reduce)
  const [nudge, setNudge] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !bandRef.current) return
    const box = bandRef.current.getBoundingClientRect()
    const dx = e.clientX - (box.left + box.width / 2)
    const dy = e.clientY - (box.top + box.height * (170 / 230))
    const dist = Math.min(Math.hypot(dx, dy) / 500, 1)
    const angle = Math.atan2(dy, dx)
    setNudge({ x: 16 * Math.cos(angle) * dist, y: 16 * Math.sin(angle) * dist })
  }

  return (
    <div
      className="relative z-0 mb-2 w-full select-none overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={() => setNudge({ x: 0, y: 0 })}
      aria-hidden="true"
    >
      <svg
        ref={bandRef}
        viewBox="0 0 1000 230"
        className="block h-auto w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="1000" height="230" fill="#FFC2D5" />
        <rect x="0" y="0" width="150" height="230" fill="#7FE092" />
        <rect x="850" y="0" width="150" height="230" fill="#7FE092" />
        <path d="M -80 230 A 115 150 0 0 1 150 230 Z" fill="var(--tpl-cyan)" />
        <path d="M 850 230 A 115 150 0 0 1 1080 230 Z" fill="var(--tpl-cyan)" />
        <path d="M 100 230 C 100 10, 900 10, 900 230 Z" fill="var(--tpl-cyan)" />
        <g>
          <circle
            cx="455"
            cy="135"
            r="28"
            fill="var(--tpl-green)"
            style={{
              transform: `translate(${nudge.x}px, ${nudge.y}px) scaleY(${blink ? 0.08 : 1})`,
              transformOrigin: "455px 135px",
              transition: blink ? "transform 0.08s ease-in-out" : "transform 0.15s ease-out",
            }}
          />
          <circle
            cx="545"
            cy="135"
            r="28"
            fill="var(--tpl-green)"
            style={{
              transform: `translate(${nudge.x}px, ${nudge.y}px) scaleY(${blink ? 0.08 : 1})`,
              transformOrigin: "545px 135px",
              transition: blink ? "transform 0.08s ease-in-out" : "transform 0.15s ease-out",
            }}
          />
          <path
            d="M 470 165 A 30 30 0 0 0 530 165 Z"
            fill="var(--tpl-green)"
            style={{
              transform: `translate(${nudge.x * 0.375}px, ${nudge.y * 0.375}px)`,
              transformOrigin: "500px 165px",
              transition: "transform 0.2s ease-out",
            }}
          />
        </g>
      </svg>
    </div>
  )
}

export function LearningCards() {
  const reduce = useReducedMotion() ?? false

  return (
    <section
      id="belajar"
      aria-labelledby="belajar-heading"
      className="relative flex w-full flex-col items-start justify-start overflow-x-clip pb-24 pt-0 md:pb-36"
      style={{ background: "var(--tpl-cyan)" }}
    >
      <MascotBand reduce={reduce} />

      <div className="relative z-10 mb-10 w-full px-4">
        <h2
          id="belajar-heading"
          className="mx-auto max-w-[955px] text-center font-baloo2 uppercase"
          style={{
            color: "var(--tpl-green)",
            fontSize: "clamp(42px, 7.5vw, 104px)",
            lineHeight: 1.1,
          }}
        >
          BELAJAR JADI
          <br />
          MENYENANGKAN
        </h2>
      </div>

      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="cloudFrameClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.1 0.95 C 0.03 0.95, 0 0.85, 0 0.72 C 0 0.58, 0.05 0.48, 0.12 0.42 C 0.1 0.30, 0.18 0.12, 0.32 0.06 C 0.42 0, 0.58 0, 0.68 0.06 C 0.82 0.12, 0.9 0.30, 0.88 0.42 C 0.95 0.48, 1 0.58, 1 0.72 C 1 0.85, 0.97 0.95, 0.9 0.95 Z" />
          </clipPath>
          <clipPath id="paperCardClip1" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.16 C 0.25 0.11, 0.60 0.05, 0.94 0.01 C 0.97 0.32, 0.99 0.62, 1 0.91 C 0.75 0.94, 0.45 0.97, 0.05 0.99 C 0.03 0.70, 0.01 0.42, 0 0.16 Z" />
          </clipPath>
          <clipPath id="paperCardClip2" clipPathUnits="objectBoundingBox">
            <path d="M 0.02 0.14 C 0.30 0.08, 0.65 0.03, 0.97 0 C 0.99 0.30, 1 0.60, 0.98 0.92 C 0.72 0.95, 0.38 0.97, 0.04 0.98 C 0.02 0.68, 0.01 0.40, 0.02 0.14 Z" />
          </clipPath>
          <clipPath id="paperCardClip3" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.18 C 0.28 0.10, 0.62 0.04, 0.95 0 C 0.98 0.32, 1 0.62, 0.97 0.93 C 0.68 0.96, 0.34 0.98, 0.05 0.97 C 0.03 0.68, 0.01 0.42, 0 0.18 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-[60px] pb-32 md:pb-48">
        {subjects.map((subject, i) => (
          <div key={subject.title} className={`sticky ${subject.top} ${subject.z} w-full px-4`}>
            <div
              className={`w-full max-w-xl ${subject.rotate} transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none`}
              style={{
                background: subject.fill,
                clipPath: `url(#paperCardClip${i + 1})`,
                WebkitClipPath: `url(#paperCardClip${i + 1})`,
              }}
            >
              <div
                className="relative mb-5 flex h-60 w-full items-center justify-center overflow-hidden sm:h-72"
                style={{
                  background: subject.frame,
                  clipPath: "url(#cloudFrameClip)",
                  WebkitClipPath: "url(#cloudFrameClip)",
                }}
              >
                <Image
                  src={subject.src}
                  alt={subject.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 576px"
                  className="object-cover object-center"
                />
              </div>
              <h3
                className="px-6 pb-8 text-center font-baloo2 uppercase text-white"
                style={{
                  fontSize: "clamp(30px, 5vw, 56px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                {subject.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
