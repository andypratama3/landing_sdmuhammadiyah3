"use client"

import { useReveal } from "./use-reveal"

interface Quote {
  id: number
  quote: string
  attribution: string
  fill: string
}

const QUOTES: Quote[] = [
  {
    id: 0,
    quote:
      '"Anak saya jadi lebih percaya diri dan rajin menghafal Al-Qur\'an sejak bersekolah di SD Muhammadiyah 3. Guru-gurunya perhatian dan komunikasinya dengan orang tua sangat baik."',
    attribution: "Ibu Rina, orang tua siswa Kelas 3",
    fill: "#9EB2F6",
  },
  {
    id: 1,
    quote:
      '"Kami pilih sekolah ini karena prestasi olahraga dan akhlak anak. Alhamdulillah anak kami juara panahan tingkat kota."',
    attribution: "Bapak Ahmad, orang tua siswa Kelas 5",
    fill: "#EA9C00",
  },
  {
    id: 2,
    quote: '"SD swasta terbaik menurut kami — biaya terjangkau, lokasi dekat, dan programnya lengkap."',
    attribution: "Ibu Siti, orang tua siswa Kelas 1",
    fill: "#FE6263",
  },
]


function QuoteCard({ item }: { item: Quote }) {
  const { ref, revealed } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ backgroundColor: item.fill }}
      className={`tpl-sticker flex flex-col justify-between gap-8 rounded-[20px] p-7 transition-[opacity,translate] duration-500 ease-out md:p-8 ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <blockquote className="font-quicksand text-[clamp(22px,2.2vw,26px)] leading-snug font-medium text-(--tpl-ink) uppercase">
        {item.quote}
      </blockquote>
      <p className="font-quicksand text-base font-bold text-(--tpl-ink)">{item.attribution}</p>
    </div>
  )
}

export function TestimonialCards() {
  return (
    <section
      id="testimoni"
      aria-labelledby="testimoni-heading"
      className="w-full overflow-hidden px-4 py-24 sm:px-6 md:px-8"
      style={{ backgroundColor: "var(--tpl-coral)" }}
    >
      <h2
        id="testimoni-heading"
        className="mx-auto max-w-[1027px] text-center font-baloo2 text-(--tpl-green) uppercase leading-[0.95] select-none"
        style={{ fontSize: "clamp(34px, 6vw, 100px)" }}
      >
        DIPERCAYA ORANG TUA &amp; WALI MURID
      </h2>

      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {QUOTES.map((item) => (
          <QuoteCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}