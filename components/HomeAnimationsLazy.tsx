"use client"

import dynamic from "next/dynamic"

// GSAP hanya untuk animasi non-kritis: muat malas di klien agar tidak
// memblokir FCP/LCP dan TBT (temuan Lighthouse: forced reflow,
// JS execution 2,1 dtk, main thread 4,3 dtk).
// File ini adalah Client Component karena `ssr: false` tidak diizinkan
// pada `next/dynamic` di dalam Server Component.
const HomeAnimations = dynamic(() => import("./HomeAnimations"), {
  ssr: false,
})

export default function HomeAnimationsLazy() {
  return <HomeAnimations />
}
