import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900 dark:fill-white">MUHAMMADIYAH</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400 dark:fill-gray-500">PERSYARIKATAN</text>
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
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900 dark:fill-white">KEMENDIKBUD</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400 dark:fill-gray-500">RISTEK - RI</text>
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
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900 dark:fill-white">DISDIKBUD</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400 dark:fill-gray-500">SAMARINDA SEBERANG</text>
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
    <text x="68" y="28" className="font-outfit text-xs font-black tracking-wider fill-gray-900 dark:fill-white">LAZISMU</text>
    <text x="68" y="42" className="font-sans text-[8px] font-extrabold tracking-widest fill-gray-400 dark:fill-gray-500">ZAKAT INFAK SEDEKAH</text>
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

  return (
    <section className="gsap-partners relative border-t border-(--color-forest-700)/10 bg-linear-to-b from-(--color-paper-50) to-(--color-cloud-100)/30 py-20 sm:py-24 dark:border-white/5 dark:from-(--color-forest-950) dark:to-(--color-forest-900)/30 overflow-hidden">
      {/* Editorial Decorative Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-(--color-forest-450)/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Typographic Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-(--color-forest-700) bg-(--color-forest-450)/10 dark:text-gray-900 dark:bg-(--color-sun-500) inline-block mb-4">
            Kemitraan & Sinergi
          </span>
          <h2 className="font-outfit text-3xl md:text-4xl font-black text-(--color-forest-900) dark:text-white uppercase tracking-tight leading-tight">
            Dukungan & Kerja Sama
          </h2>
          <p className="mt-4 text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
            Membangun kolaborasi strategis bersama instansi pemerintah, organisasi kemasyarakatan, 
            dan dunia usaha demi menunjang kualitas pendidikan kreatif berbasis nilai Islami.
          </p>
        </div>

        {/* Centered Infinite Scrolling Logo Carousel */}
        <div className="marquee-container relative w-full max-w-5xl xl:max-w-6xl mx-auto py-6 select-none">
          
          {/* Glassmorphic Edge Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-(--color-paper-50) to-transparent dark:from-(--color-forest-950) z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-(--color-paper-50) to-transparent dark:from-(--color-forest-950) z-20 pointer-events-none" />

          {/* Logo Pause/Play hint */}
          <span className="absolute -top-4 right-2 text-[10px] font-semibold uppercase tracking-widest text-(--color-forest-600)/50 dark:text-gray-500 z-20 pointer-events-none">
            &#9208; scroll otomatis
          </span>

          {/* Scrolling Content Track - Duplicate exactly even times (6 copies) for perfect -50% boundary looping */}
          <div className="marquee-content flex gap-6 items-center whitespace-nowrap">
            {hasApiPartners ? (
              [...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="w-64 h-24 flex-shrink-0 flex items-center justify-center bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border border-gray-150/80 dark:border-white/10 shadow-xs p-4 hover:shadow-md hover:border-(--color-sun-500) dark:hover:border-(--color-sun-500) dark:hover:shadow-[0_0_20px_rgba(232,163,61,0.15)] hover:-translate-y-1.5 transition-all duration-500 group"
                >
                  <Image
                    src={resolveImageUrl(partner.foto, "img/kerjasama")}
                    alt={partner.name}
                    width={160}
                    height={90}
                    className="max-h-16 w-auto object-contain transition duration-500 group-hover:scale-105 dark:brightness-90 dark:contrast-125"
                  />
                </div>
              ))
            ) : (
              [...fallbackPartners, ...fallbackPartners, ...fallbackPartners, ...fallbackPartners, ...fallbackPartners, ...fallbackPartners].map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="w-64 h-24 flex-shrink-0 flex items-center justify-center bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border border-gray-150/80 dark:border-white/10 shadow-xs p-4 hover:shadow-md hover:border-(--color-sun-500) dark:hover:border-(--color-sun-500) dark:hover:shadow-[0_0_20px_rgba(232,163,61,0.15)] hover:-translate-y-1.5 transition-all duration-500 group"
                >
                  <div className="transition duration-500 group-hover:scale-105">
                    {partner.component}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic CTA Block with Glowing Effects */}
        <div className="mt-16 bg-linear-to-br from-white to-(--color-cloud-100)/30 dark:from-(--color-forest-900)/35 dark:to-(--color-forest-950)/70 rounded-[2.5rem] border border-(--color-forest-700)/10 dark:border-white/5 p-8 md:p-12 max-w-4xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-lg transition-all duration-500 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group/cta">
          {/* Internal Glow Effects */}
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-(--color-sun-500)/5 dark:bg-(--color-sun-500)/10 rounded-full blur-3xl group-hover/cta:scale-125 transition-transform duration-700 pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-48 h-48 bg-(--color-forest-450)/5 dark:bg-(--color-forest-450)/10 rounded-full blur-3xl group-hover/cta:scale-125 transition-transform duration-700 pointer-events-none" />
          
          <div className="flex-1 relative z-10">
            <h3 className="text-xl md:text-2xl font-black text-(--color-forest-900) dark:text-white uppercase tracking-tight">
              Ingin Menjalin Kemitraan?
            </h3>
            <p className="mt-3 text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
              Kami membuka peluang kolaborasi seluas-luasnya untuk sponsorship kegiatan, 
              kunjungan edukatif, program sosial kemasyarakatan, maupun kemitraan strategis lainnya.
            </p>
          </div>
          
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            <Button 
              asChild
              className="bg-(--color-sun-500) hover:bg-(--color-sun-400) text-(--color-ink-950) dark:text-(--color-ink-950) font-black uppercase tracking-widest text-[10px] px-8 h-12 rounded-2xl shadow-lg shadow-(--color-sun-500)/15 hover:shadow-(--color-sun-500)/25 hover:scale-[1.03] active:scale-[0.97] transition-all w-full sm:w-auto cursor-pointer"
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                Hubungi Humas
              </a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-(--color-forest-900) dark:text-white font-black uppercase tracking-widest text-[10px] px-8 h-12 rounded-2xl shadow-xs hover:scale-[1.03] active:scale-[0.97] transition-all w-full sm:w-auto cursor-pointer"
            >
              <Link href="/kontak">
                Halaman Kontak
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
