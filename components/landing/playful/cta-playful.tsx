"use client"

import type { ComponentType } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { Reveal } from "./use-reveal"
import { TikTok } from "@/components/icons/tiktok-icon"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { SCHOOL } from "@/lib/school-info"

const WHATSAPP_URL = `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(SCHOOL.whatsappMessage)}`

type SocialLink = {
  label: string
  href: string
  color: string
  Icon: ComponentType<{ className?: string }>
}

const SOCIALS: readonly SocialLink[] = [
  { label: "Facebook SD Muhammadiyah 3 Samarinda", href: SCHOOL.social.facebook, Icon: Facebook, color: "#8C97FE" },
  { label: "Instagram SD Muhammadiyah 3 Samarinda", href: SCHOOL.social.instagram, Icon: Instagram, color: "#F043B0" },
  { label: "YouTube SD Muhammadiyah 3 Samarinda", href: SCHOOL.social.youtube, Icon: Youtube, color: "#FF4349" },
  { label: "TikTok SD Muhammadiyah 3 Samarinda", href: SCHOOL.social.tiktok, Icon: TikTok, color: "#21FE9F" },
]

const JELAJAHI = [
  { label: "Profil Sekolah", href: "/profil" },
  { label: "Galeri", href: "/galeri" },
  { label: "Prestasi Siswa", href: "/prestasi-siswa" },
  { label: "Berita", href: "/berita" },
  { label: "Alumni", href: "/alumni" },
] as const

const UNTUK_ORANG_TUA = [
  { label: "Jadwal Pelajaran", href: "/jadwal" },
  { label: "Pembayaran", href: "/pembayaran" },
  { label: "Kalender Akademik", href: "/kalender-akademik" },
  { label: "Rapot", href: "/rapot" },
  { label: "Sarana & Prasarana", href: "/fasilitas" },
  { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
] as const

const COLUMN_HEADING =
  "font-baloo2 text-[clamp(20px,2.2vw,28px)] leading-tight font-normal text-(--tpl-green-text) uppercase"

export function CtaPlayful() {

  return (
    <section
      id="daftar"
      aria-labelledby="daftar-heading"
      className="w-full bg-(--tpl-cyan) px-4 pt-20 pb-16 sm:px-6 md:px-8"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-16">
        <Reveal className="flex flex-col items-center justify-between gap-8 rounded-[32px] border-[3px] border-[#191717] bg-(--tpl-green) p-8 shadow-[0_8px_0_0_#191717] lg:flex-row lg:p-12">
          <div className="flex min-w-0 max-w-[640px] flex-col gap-3 text-center lg:text-left">
            <span className="inline-block w-fit rounded-full border-2 border-[#191717] bg-(--tpl-paper) px-4 py-1.5 font-quicksand text-sm font-bold tracking-wider text-(--tpl-ink) uppercase">
              SIAP BELAJAR SAMBIL BERMAIN?
            </span>
            <h2
              id="daftar-heading"
              className="font-baloo2 text-[clamp(28px,4.5vw,52px)] leading-[1.1] font-normal text-white uppercase"
            >
              MULAI BERSAMA SD MUHAMMADIYAH 3 HARI INI!
            </h2>
            <p className="font-quicksand text-[clamp(17px,2vw,20px)] font-medium leading-snug tracking-wide text-(--tpl-ink) uppercase">
              GABUNG BERSAMA RATUSAN SISWA DAN WALI MURID YANG BELAJAR SETIAP HARI BERSAMA KAMI.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-wrap justify-center gap-4 sm:flex-row lg:w-auto">
            <Link
              href="/kontak"
              className="tpl-sticker-sm flex items-center justify-center gap-3 rounded-[20px] bg-[#8C97FE] px-8 py-4 font-baloo2 text-xl font-normal text-(--tpl-ink) uppercase transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95"
            >
              HUBUNGI KAMI
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/SD3_logo1.png"
                alt="Logo SD Muhammadiyah 3 Samarinda"
                width={56}
                height={56}
              />
              <span className="font-baloo2 text-[clamp(24px,3vw,34px)] leading-none font-normal text-(--tpl-green-text) uppercase">
                SD MUHAMMADIYAH 3
              </span>
            </div>
            <p className="max-w-[360px] font-quicksand text-lg leading-relaxed tracking-wide text-(--tpl-ink) uppercase">
              SEKOLAH KREATIF ISLAM DI SAMARINDA SEBERANG. AKREDITASI UNGGUL (A), SEJAK 1985.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {SOCIALS.map(({ label, href, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-12 items-center justify-center rounded-[16px] border-2 border-[#191717] text-(--tpl-ink) shadow-[2px_3px_0_0_#191717] transition-transform motion-safe:hover:scale-110 motion-safe:active:scale-95"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="size-6 stroke-[2.2]" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="flex flex-col gap-4 lg:col-span-2">
            <h3 className={COLUMN_HEADING}>Jelajahi</h3>
            <ul className="flex flex-col gap-2.5 font-quicksand text-lg tracking-wide text-(--tpl-ink)">
              {JELAJAHI.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 uppercase transition-colors hover:text-(--tpl-green-text)"
                  >
                    <span className="size-2 rounded-full bg-(--tpl-green) opacity-0 transition-opacity group-hover:opacity-100" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex flex-col gap-4 lg:col-span-3">
            <h3 className={COLUMN_HEADING}>Untuk Orang Tua</h3>
            <ul className="flex flex-col gap-2.5 font-quicksand text-lg tracking-wide text-(--tpl-ink)">
              {UNTUK_ORANG_TUA.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 uppercase transition-colors hover:text-(--tpl-green-text)"
                  >
                    <span className="size-2 rounded-full bg-(--tpl-green) opacity-0 transition-opacity group-hover:opacity-100" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3">
            <div className="tpl-sticker flex flex-col gap-3 rounded-[24px] bg-white p-6">
              <h3 className={COLUMN_HEADING}>Hubungi Kami</h3>
              <p className="font-quicksand text-base leading-relaxed tracking-wide text-(--tpl-ink)">
                {SCHOOL.address.full}
              </p>
              <a
                href={`tel:${SCHOOL.phoneTel}`}
                className="font-quicksand text-base font-bold tracking-wide text-(--tpl-green-text) uppercase transition-colors hover:text-(--tpl-green)"
              >
                {SCHOOL.phone}
              </a>
              <a
                href={`mailto:${SCHOOL.email}`}
                className="font-quicksand text-sm font-bold tracking-wide break-words text-(--tpl-green-text) transition-colors hover:text-(--tpl-green)"
              >
                {SCHOOL.email}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tpl-sticker-sm mt-1 flex items-center justify-center gap-2 rounded-[20px] bg-(--tpl-mint) px-5 py-3 font-baloo2 text-base font-normal text-(--tpl-ink) uppercase transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95"
              >
                <WhatsAppIcon className="size-5" aria-hidden="true" />
                Chat WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
