'use client';

import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock, CloudCog } from "lucide-react"
import Image from 'next/image'
import { useApi } from '@/hooks/useApi';


interface VisitorData {
  visitor_by_day: number;
  visitor_by_month: number;
  visitor_by_year: number;
}

export default function Footer() {
  const { data, loading, error, refetch } = useApi<VisitorData>('/views', {
    cache: true,
    cacheTTL: 3600000,
    immediate: true,
  });

  
  return (
    <footer className="mt-20 text-gray-300 bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full">
                <Image src="/SD3_logo1.png" width={100} height={100} alt="Logo Sekolah" />
              </div>
              <div>
                <h3 className="font-bold text-white">Sekolah Kreatif</h3>
                <p className="text-xs">SD Muhammadiyah 3</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Sekolah Dasar Islam yang menghasilkan generasi kreatif, berakhlak mulia, dan berprestasi.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/sekolahkreatif.muhammadiyahsamarinda/"
                target="_blank"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#33b962] transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/SekolahKreatifSamarinda/"
                target="_blank"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#33b962] transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@sekolahkreatifsdmuhammadiy2812"
                target="_blank"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#33b962] transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              {/* <a
                href="https://id.wikipedia.org/wiki/Sd_Muhammadiyah_3_Samarinda"
                target="_blank"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#33b962] transition"
                aria-label="YouTube"
              >
                <Wikipedia className="w-4 h-4" />
              </a> */}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Link Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#33b962] transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-[#33b962] transition">
                  Profil Sekolah
                </Link>
              </li>
              <li>
                <Link href="/spmb" className="hover:text-[#33b962] transition">
                  SPMB
                </Link>
              </li>
              <li>
                <Link href="/pembayaran" className="hover:text-[#33b962] transition">
                  Pembayaran
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#33b962] transition">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Informasi Column */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Informasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jadwal" className="hover:text-[#33b962] transition">
                  Jadwal Pelajaran
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-[#33b962] transition">
                  Kalender Akademik
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-[#33b962] transition">
                  Berita Terbaru
                </Link>
              </li>
              <li>
                <Link href="/prestasi-siswa" className="hover:text-[#33b962] transition">
                  Prestasi Siswa
                </Link>
              </li>
              <li>
                <Link href="/prestasi-sekolah" className="hover:text-[#33b962] transition">
                  Prestasi Sekolah
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#33b962]" />
                <span>
                    Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-[#33b962]" />
                <a href="tel:+6254112345678" className="hover:text-[#33b962] transition">
                  (0541) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-[#33b962]" />
                <a href="mailto:info@sdmuhammadiyah3smd.com" className="hover:text-[#33b962] transition">
                  sdmuhammadiyah3smd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 shrink-0 text-[#33b962]" />
                <div>
                  <p>Senin-Jumat: 07:00-15:00</p>
                  <p>Sabtu: 07:00-12:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 text-sm border-t border-gray-800 md:flex-row">
          <p>&copy; 2025 SD Muhammadiyah 3 Samarinda. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            {loading ? (
              <span>Memuat data pengunjung...</span>
            ) : error ? (
              <span>Gagal memuat data</span>
            ) : (
              <>
                <span>Hari Ini: {data?.visitor_by_day.toLocaleString()}</span>
                <span className="text-gray-700">|</span>
                <span>Bulan Ini: {data?.visitor_by_month.toLocaleString()}</span>
                <span className="text-gray-700">|</span>
                <span>Tahun Ini: {data?.visitor_by_year.toLocaleString()}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
