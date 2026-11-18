"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import { useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

const BUBBLE_PATH = "M 10 28 L 290 0 L 268 278 L 196 278 L 212 358 L 116 278 L 28 278 Z"

interface Reason {
  id: number
  title: string
  desc: string
  fill: string
}

const REASONS: Reason[] = [
  {
    id: 0,
    title: "BELAJAR DENGAN TUJUAN",
    desc: "Setiap kegiatan dirancang membangun kemampuan berpikir, literasi awal, dan adab — tanpa membuat anak bosan.",
    fill: "var(--tpl-mint)",
  },
  {
    id: 1,
    title: "AMAN & RAMAH ANAK",
    desc: "Lingkungan terawasi, pembiasaan ibadah harian, dan pendampingan wali kelas yang rutin melapor ke orang tua.",
    fill: "var(--tpl-green)",
  },
  {
    id: 2,
    title: "AKTIVITAS BERBASIS KETERAMPILAN",
    desc: "Tahfidz 2 juz (29-30), Tilawati, edutainment, dan lulus dengan 3 ijazah: nasional, Muhammadiyah, dan Tahfidz.",
    fill: "var(--tpl-lavender)",
  },
]

function ArrowRight({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`size-8 fill-current ${flip ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  )
}

function Bubble({ fill, children }: { fill: string; children: ReactNode }) {
  return (
    <>
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 300 360"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={BUBBLE_PATH} fill={fill} stroke="#191717" strokeWidth="4" />
      </svg>
      <span className="relative z-10 flex h-[77%] w-full flex-col items-center justify-center gap-6 p-6 text-center md:p-8">
        {children}
      </span>
    </>
  )
}

function FrontFace({ reason }: { reason: Reason }) {
  return (
    <Bubble fill={reason.fill}>
      <span className="font-quicksand text-[clamp(24px,3.4vw,36px)] leading-[1.15] font-bold tracking-wide text-(--tpl-ink) uppercase select-none">
        {reason.title}
      </span>
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-full border-2 border-(--tpl-ink) bg-(--tpl-red) text-white shadow-[3px_4px_0_0_var(--tpl-ink)]"
      >
        <ArrowRight />
      </span>
    </Bubble>
  )
}

function BackFace({ reason }: { reason: Reason }) {
  return (
    <Bubble fill={reason.fill}>
      <span className="font-quicksand text-[clamp(18px,2.3vw,24px)] leading-snug font-bold text-(--tpl-ink) select-none">
        {reason.desc}
      </span>
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-full border-2 border-white bg-(--tpl-ink) text-white"
      >
        <ArrowRight flip />
      </span>
    </Bubble>
  )
}

export function TrustCards() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const trainRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trainRef, offset: ["start end", "end start"] })
  const trainX = useTransform(scrollYProgress, [0, 0.75], ["-60%", "0%"])

  return (
    <section
      id="alasan"
      aria-labelledby="alasan-heading"
      className="relative overflow-hidden pt-20 pb-0"
      style={{ backgroundColor: "var(--tpl-purple)" }}
    >
      <h2
        id="alasan-heading"
        className="mx-auto max-w-[901px] px-4 text-center font-baloo2 uppercase leading-[0.95] text-white select-none"
        style={{ fontSize: "clamp(40px, 9vw, 104px)" }}
      >
        MENGAPA ORANG TUA
        <br />
        MEMILIH KAMI
      </h2>

      <div className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-8 px-4 md:mt-16 md:grid-cols-3">
        {REASONS.map((reason) => {
          const activeId = hovered ?? pinned
          const flipped = activeId === reason.id
          return (
            <button
              key={reason.id}
              aria-expanded={flipped}
              onClick={() => {
                // Klik keyboard: fokus sudah menampilkan sisi belakang, jadi klik
                // pertama harus menutupnya — bukan membuka lagi (terasa "tidak
                // berfungsi" kalau pinned dibalik dari hover).
                setPinned((current) => (current === reason.id ? null : reason.id))
                setHovered(null)
              }}
              onFocus={() => setHovered(reason.id)}
              onBlur={() => setHovered(null)}
              onMouseEnter={() => setHovered(reason.id)}
              onMouseLeave={() => setHovered((current) => (current === reason.id ? null : current))}
              className="relative block aspect-[300/360] w-full max-w-[410px] [perspective:1000px]"
            >
              {reduce ? (
                <span className="relative block size-full">
                  <span
                    aria-hidden={flipped}
                    className={`absolute inset-0 block transition-opacity duration-300 ${flipped ? "opacity-0" : "opacity-100"}`}
                  >
                    <FrontFace reason={reason} />
                  </span>
                  <span
                    aria-hidden={!flipped}
                    className={`absolute inset-0 block transition-opacity duration-300 ${flipped ? "opacity-100" : "opacity-0"}`}
                  >
                    <BackFace reason={reason} />
                  </span>
                </span>
              ) : (
                <motion.span
                  className="relative block size-full [transform-style:preserve-3d]"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span
                    aria-hidden={flipped}
                    className="absolute inset-0 block [backface-visibility:hidden]"
                  >
                    <FrontFace reason={reason} />
                  </span>
                  <span
                    aria-hidden={!flipped}
                    className="absolute inset-0 block [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  >
                    <BackFace reason={reason} />
                  </span>
                </motion.span>
              )}
            </button>
          )
        })}
      </div>

      <div ref={trainRef} className="mt-auto w-full pt-16">
        <div className="w-full overflow-hidden">
          <motion.div style={{ x: reduce ? 0 : trainX }} className="w-full">
            <Image
              src="/assets/img/traine.svg"
              alt="Ilustrasi kereta sekolah"
              width={1100}
              height={260}
              className="h-auto w-full min-w-[100%] object-contain object-left-bottom md:min-w-[1100px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
