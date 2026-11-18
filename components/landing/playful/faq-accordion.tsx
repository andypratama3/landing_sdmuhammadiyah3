"use client"

import { useState } from "react"
import { useReveal } from "./use-reveal"

const FAQS = [
  {
    question: "Apakah ada tes masuk?",
    answer:
      "Ya, ada tes kemampuan dasar yang meliputi membaca, menulis, berhitung sederhana, dan wawancara untuk mengetahui kesiapan anak masuk sekolah dasar.",
    badge: "var(--tpl-mint)",
    dot: "#0B3D22",
  },
  {
    question: "Bagaimana sistem pembelajaran di SD Muhammadiyah 3 Samarinda?",
    answer:
      "Kami menerapkan pembelajaran berbasis edutainment (belajar menyenangkan) dengan mengintegrasikan nilai-nilai Islami, kurikulum nasional, dan program unggulan tahfidz serta pembinaan karakter.",
    badge: "var(--tpl-yellow)",
    dot: "#6B2D00",
  },
  {
    question: "Apa saja program unggulan sekolah?",
    answer:
      "Program unggulan kami meliputi Tahfidz Al-Qur'an 2 Juz (29-30), pembiasaan akhlak Islami, pembelajaran berbasis edutainment, dan lulus dengan 3 ijazah (Nasional, Muhammadiyah, dan Tahfidz).",
    badge: "var(--tpl-lavender)",
    dot: "#A800D6",
  },
  {
    question: "Kapan pengumuman hasil seleksi?",
    answer:
      "Pengumuman hasil seleksi akan diumumkan pada tanggal 5 April 2025 melalui website dan akan diinformasikan via WhatsApp kepada orang tua/wali.",
    badge: "var(--tpl-terracotta)",
    dot: "#823700",
  },
  {
    question: "Apakah bisa daftar langsung di sekolah?",
    answer:
      "Ya, pendaftaran juga dapat dilakukan secara langsung di kantor tata usaha sekolah pada hari Senin-Sabtu, pukul 07:00-15:00 WIB.",
    badge: "var(--tpl-green-hi)",
    dot: "#0B3D22",
  },
] as const

function FaqRow({ item, index }: { item: (typeof FAQS)[number]; index: number }) {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.15)
  const [open, setOpen] = useState(index === 0)
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div
      ref={ref}
      className={`flex overflow-hidden rounded-[24px] border-2 border-[#191717] bg-[#F0EEEF] shadow-[4px_5px_0_0_#191717] transition-[opacity,translate] duration-500 ease-out ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="flex w-20 shrink-0 items-center justify-center"
        style={{ backgroundColor: item.badge }}
      >
        <span className="size-5 rounded-full" style={{ backgroundColor: item.dot }} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="m-0">
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((prev) => !prev)}
            className="flex w-full cursor-pointer items-center text-left transition-transform duration-200 motion-safe:hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-(--tpl-ring)"
          >
            <span className="flex-1 px-6 py-5 font-baloo2 text-[clamp(19px,2.4vw,36px)] leading-tight font-normal text-(--tpl-green-text) uppercase md:px-8">
              {item.question}
            </span>
            {/* ponytail: glyph is a span (nested <button> invalid); header button toggles */}
            <span className="mr-6 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#191717] bg-(--tpl-red) text-white shadow-sm md:mr-8 md:size-12">
              {open ? (
                <svg className="size-6" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg className="size-6" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
                </svg>
              )}
            </span>
          </button>
        </h3>

        <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="px-6 pb-6 md:px-8">
          <p className="max-w-[780px] font-quicksand text-[clamp(15px,1.6vw,18px)] leading-relaxed text-(--tpl-ink)">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqAccordion() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full bg-(--tpl-red) px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto mb-12 max-w-[1027px] text-center md:mb-16">
        <h2
          id="faq-heading"
          className="font-baloo2 text-[clamp(36px,6vw,104px)] leading-[1.08] font-normal text-white uppercase"
        >
          ORANG TUA BERTANYA. KAMI MENJAWAB.
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-[1027px] flex-col gap-4 md:gap-5">
        {FAQS.map((item, i) => (
          <FaqRow key={item.question} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

