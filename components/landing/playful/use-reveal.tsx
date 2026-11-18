"use client"

import type { ReactNode } from "react"

import { useEffect, useState } from "react"

interface Reveal<T extends HTMLElement> {
  /** Callback ref untuk elemen yang dianimasikan saat masuk viewport. */
  ref: (el: T | null) => void
  /** true = konten terlihat. */
  revealed: boolean
}

/**
 * Reveal saat elemen masuk viewport, aman untuk SSR.
 *
 * framer-motion `whileInView` menulis `opacity:0` ke HTML saat SSR, sehingga
 * pengguna prefers-reduced-motion (yang melewati animasi) dan pengguna tanpa
 * JS melihat konten kosong. Hook ini membalik urutannya: default terlihat,
 * klien hanya menyembunyikan elemen yang belum terjangkau, lalu
 * menampilkannya lewat IntersectionObserver.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2): Reveal<T> {
  const [el, setEl] = useState<T | null>(null)
  const [revealed, setRevealed] = useState(true)

  useEffect(() => {
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * (1 - threshold) && rect.bottom > 0
    if (inView) return

    // Masih di luar viewport: aman disembunyikan (belum terlihat pengguna),
    // lalu ditampilkan saat IntersectionObserver menyala.
    setRevealed(false)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.disconnect()
          }
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [el, threshold])

  return { ref: setEl, revealed }
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Threshold IntersectionObserver untuk mulai menampilkan isi. */
  threshold?: number
}

/** Pembungkus reveal berbasis CSS — aman untuk SSR (HTML selalu terlihat). */
export function Reveal({ children, className = "", threshold = 0.15 }: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>(threshold)

  return (
    <div
      ref={ref}
      className={`transition-[opacity,translate] duration-500 ease-out ${className} ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  )
}