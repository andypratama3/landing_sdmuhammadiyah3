import Image from "next/image"
import Link from "next/link"
import { SCHOOL } from "@/lib/school-info"
import { resolveImageUrl } from "@/lib/image-url"
import type { Dukungan } from "@/types/dukungan.types"

// --- FALLBACK INSTITUTIONAL SVG LOGOS (SHARP, VECTOR & RESPONSIVE) ---

const MuhammadiyahSVG = () => (
  <svg viewBox="0 0 220 60" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 5)">
      {/* Sunburst Rays */}
      <circle cx="25" cy="25" r="16" fill="#1A4D2E" />
      {[...Array(12)].map((_, i) => {
        const angle = (i * 360) / 12
        return (
          <path
            key={i}
            d="M25 2 L28 14 L22 14 Z"
            fill="#E8A33D"
            transform={`rotate(${angle} 25 25)`}
          />
        )
      })}
      <circle cx="25" cy="25" r="10" fill="#1A4D2E" />
      <circle cx="25" cy="25" r="8" fill="white" />
      {/* Center symbol */}
      <polygon points="25,21 27,24 30,25 27,26 25,29 23,26 20,25 23,24" fill="#1A4D2E" />
    </g>
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900">MUHAMMADIYAH</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400">PERSYARIKATAN</text>
  </svg>
)

const KemendikbudSVG = () => (
  <svg viewBox="0 0 220 60" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 5)">
      {/* Shield */}
      <path d="M5 8 C5 8 25 3 25 3 C25 3 45 8 45 8 C45 28 35 40 25 45 C15 40 5 28 5 8 Z" fill="#0284c7" />
      {/* Flame/Book Symbol */}
      <path d="M25 10 L33 24 H17 Z" fill="#E8A33D" />
      <circle cx="25" cy="28" r="6" fill="#0284c7" />
      <path d="M20 30 C20 30 25 34 30 30" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </g>
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900">KEMENDIKBUD</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400">RISTEK - RI</text>
  </svg>
)

const DinasPendidikanSVG = () => (
  <svg viewBox="0 0 220 60" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 5)">
      {/* Shield */}
      <path d="M25 3 L45 12 V30 C45 40 25 46 25 46 C25 46 5 40 5 30 V12 Z" fill="#22663d" />
      {/* Book & Star */}
      <path d="M12 28 H38 V31 H12 Z" fill="#E8A33D" />
      <polygon points="25,10 28,17 35,17 30,21 32,27 25,23 18,27 20,21 15,17 22,17" fill="#E8A33D" />
    </g>
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900">DISDIKBUD</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400">SAMARINDA SEBERANG</text>
  </svg>
)

const LazismuSVG = () => (
  <svg viewBox="0 0 220 60" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 5)">
      <circle cx="25" cy="25" r="11" fill="#E8A33D" />
      <path d="M25 3 L28 15 L22 15 Z" fill="#1A4D2E" />
      <path d="M25 47 L28 35 L22 35 Z" fill="#1A4D2E" />
      <path d="M3 25 L15 28 L15 22 Z" fill="#1A4D2E" />
      <path d="M47 25 L35 28 L35 22 Z" fill="#1A4D2E" />
    </g>
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900">LAZISMU</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400">ZAKAT INFAK SEDEKAH</text>
  </svg>
)

interface PartnersSectionProps {
  partners: Dukungan[]
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  const hasApiPartners = partners && partners.length > 0

  // Fallback items using crisp inline SVGs
  const fallbackPartners = [
    { name: "PP Muhammadiyah", component: <MuhammadiyahSVG /> },
    { name: "Kemendikbudristek", component: <KemendikbudSVG /> },
    { name: "Dinas Pendidikan", component: <DinasPendidikanSVG /> },
    { name: "Lazismu", component: <LazismuSVG /> },
  ]

  // Pre-filled WhatsApp message for collaborations
  const waLink = `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(
    "Halo Humas SD Muhammadiyah 3 Samarinda, saya tertarik untuk menjalin kerja sama / kemitraan program dengan pihak sekolah. Bagaimana prosedur kerja sama lebih lanjut?"
  )}`

  const tileClass =
    "group partner-logo tpl-sticker flex h-24 w-64 shrink-0 items-center justify-center rounded-[24px] bg-white p-4 transition duration-300 motion-safe:hover:-translate-y-1"

  return (
    <section
      id="kemitraan"
      aria-labelledby="kemitraan-heading"
      className="gsap-partners relative overflow-hidden bg-(--tpl-cream) py-20 sm:py-24"
    >
      {/* Editorial Decorative Background Blob */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--tpl-yellow)/25 blur-[140px]" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Typographic Heading Section */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="tpl-sticker-sm mb-4 inline-block rounded-full bg-(--tpl-paper) px-4 py-1.5 font-quicksand text-[11px] font-bold uppercase tracking-widest text-(--tpl-ink)">
            Kemitraan &amp; Sinergi
          </span>
          <h2
            id="kemitraan-heading"
            className="font-baloo2 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium uppercase leading-tight tracking-tight text-(--tpl-green-text)"
          >
            Dukungan &amp; Kerja Sama
          </h2>
          <p className="mt-4 font-quicksand text-sm leading-relaxed text-(--tpl-ink)/80 md:text-base">
            Membangun kolaborasi strategis bersama instansi pemerintah, organisasi kemasyarakatan,
            dan dunia usaha demi menunjang kualitas pendidikan kreatif berbasis nilai Islami.
          </p>
        </div>

        {/* Centered Infinite Scrolling Logo Carousel */}
        <div className="marquee-container relative mx-auto w-full max-w-5xl select-none py-6 xl:max-w-6xl">
          {/* Edge Fades */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-12 bg-gradient-to-r from-(--tpl-cream) to-transparent sm:w-28" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-12 bg-gradient-to-l from-(--tpl-cream) to-transparent sm:w-28" />

          {/* Logo Pause/Play hint */}
          <span className="pointer-events-none absolute -top-4 right-2 z-20 font-quicksand text-[11px] font-bold uppercase tracking-widest text-(--tpl-ink)/70">
            &#9208; scroll otomatis
          </span>

          {/* Scrolling Content Track - Duplicate exactly even times (6 copies) for perfect -50% boundary looping */}
          <div className="marquee-content flex items-center gap-6 whitespace-nowrap">
            {hasApiPartners ? (
              [...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className={tileClass}
                >
                  <Image
                    src={resolveImageUrl(partner.foto, "img/kerjasama")}
                    alt={partner.name}
                    width={160}
                    height={90}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))
            ) : (
              [...fallbackPartners, ...fallbackPartners, ...fallbackPartners, ...fallbackPartners, ...fallbackPartners, ...fallbackPartners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className={tileClass}
                >
                  <div className="transition duration-300 motion-safe:group-hover:scale-105">
                    {partner.component}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic CTA Block */}
        <div className="tpl-sticker relative mx-auto mt-16 flex max-w-4xl flex-col items-center justify-between gap-8 overflow-hidden rounded-[24px] bg-white p-8 text-center md:flex-row md:p-12 md:text-left">
          <div className="flex-1">
            <h3 className="font-baloo2 text-xl uppercase tracking-tight text-(--tpl-ink) md:text-2xl">
              Ingin Menjalin Kemitraan?
            </h3>
            <p className="mt-3 font-quicksand text-sm leading-relaxed text-(--tpl-ink)/80 md:text-base">
              Kami membuka peluang kolaborasi seluas-luasnya untuk sponsorship kegiatan,
              kunjungan edukatif, program sosial kemasyarakatan, maupun kemitraan strategis lainnya.
            </p>
          </div>

          <div className="flex w-full flex-shrink-0 flex-col gap-4 sm:flex-row md:w-auto">
            {SCHOOL.whatsapp && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tpl-btn px-6 py-3 text-base"
              >
                Hubungi Humas
              </a>
            )}
            <Link href="/kontak" className="tpl-btn bg-white px-6 py-3 text-base text-(--tpl-ink)">
              Halaman Kontak
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
