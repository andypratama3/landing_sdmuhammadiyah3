'use client';

import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock, CloudCog } from "lucide-react"
import Image from 'next/image'
import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';

interface VisitorData {
  visitor_by_day: number;
  visitor_by_month: number;
  visitor_by_year: number;
  visitor_all_year: number;
}

export default function Footer() {
  const { data, loading, error, refetch } = useApi<VisitorData>('/views', {
    cache: true,
    immediate: true,
  });

  useEffect(() => {
    const handler = () => refetch();

    window.addEventListener('visitor-updated', handler);
    return () => window.removeEventListener('visitor-updated', handler);
  }, [refetch]);



  return (
    <footer className="relative mt-20 pt-24 pb-12 bg-gray-950 text-gray-400 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#33b962] to-transparent opacity-30" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#33b962]/5 rounded-full blur-[100px]" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-12 h-12 group-hover:rotate-12 transition-transform duration-500 brightness-110 filter drop-shadow-[0_4px_10px_rgba(51,185,98,0.3)]">
                  <Image src="/SD3_logo1.png" fill alt="Logo Sekolah" className="object-contain" />
                </div>
                <div>
                  <h3 className="font-black text-white text-xl tracking-tighter leading-none uppercase">Sekolah Kreatif</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#33b962]">SD Muhammadiyah 3</p>
                </div>
              </Link>
              <p className="text-base leading-relaxed font-medium">
                Membentuk generasi kreatif, berakhlak mulia, dan berprestasi melalui pendidikan inovatif berbasis karakter Islami.
              </p>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/sekolahkreatif.muhammadiyahsamarinda/", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/SekolahKreatifSamarinda/", label: "Instagram" },
                { icon: Youtube, href: "https://www.youtube.com/@sekolahkreatifsdmuhammadiy2812", label: "YouTube" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 hover:bg-[#33b962] hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#33b962] hover:-translate-y-1 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="mb-8 font-black text-white uppercase tracking-widest text-sm">Navigasi Cepat</h4>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Beranda" },
                { href: "/profil", label: "Profil Sekolah" },
                { href: "/pembayaran", label: "Sistem Pembayaran" },
                { href: "/rapot", label: "Rapot Digital" },
                { href: "/kontak", label: "Hubungi Kami" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-white transition-colors font-bold uppercase tracking-wider text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33b962] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi Column */}
          <div>
            <h4 className="mb-8 font-black text-white uppercase tracking-widest text-sm">Informasi & Berita</h4>
            <ul className="space-y-4">
              {[
                { href: "/jadwal", label: "Jadwal Pelajaran" },
                { href: "/galeri", label: "Kalender Akademik" },
                { href: "/berita", label: "Berita Terbaru" },
                { href: "/prestasi-siswa", label: "Achievement Siswa" },
                { href: "/prestasi-sekolah", label: "Prestasi Institusi" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-white transition-colors font-bold uppercase tracking-wider text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-8 font-black text-white uppercase tracking-widest text-sm">Hubungi Kami</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#33b962]/20 transition-all duration-300 shadow-inner">
                  <MapPin className="w-5 h-5 text-[#33b962] brightness-125" />
                </div>
                <span className="text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                  Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, 75242
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#33b962]/20 transition-all duration-300 shadow-inner">
                  <Phone className="w-5 h-5 text-[#33b962] brightness-125" />
                </div>
                <a href="tel:+0541260066" className="text-sm font-bold hover:text-white transition-colors tracking-widest uppercase">
                  (0541) 260-066
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-[#33b962]/20 transition-all duration-300 shadow-inner">
                  <Mail className="w-5 h-5 text-[#33b962] brightness-125" />
                </div>
                <a href="mailto:info@sdmuhammadiyah3smd.com" className="text-sm font-bold hover:text-white transition-colors lowercase tracking-wider">
                  sdmuhammadiyah3smd@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Visitor Stats Glass Card */}
        <div className="mt-20 p-8 glass rounded-3xl border-white/5 bg-white/5 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#33b962]/20 flex items-center justify-center">
              <CloudCog className="w-6 h-6 text-[#33b962]" />
            </div>
            <div>
              <p className="font-black text-white uppercase tracking-widest text-xs">Statistik Pengunjung</p>
              <p className="text-[10px] font-bold text-white uppercase">Data Real-time</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-12">
            {loading ? (
              <span className="text-xs uppercase tracking-widest animate-pulse">Sinkronisasi data...</span>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-xl font-black text-white">{data?.visitor_by_day.toLocaleString()}</p>
                  <p className="text-[10px] font-black uppercase text-white tracking-tighter">Hari Ini</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-white">{data?.visitor_by_month.toLocaleString()}</p>
                  <p className="text-[10px] font-black uppercase text-white tracking-tighter">Bulan Ini</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-white">{data?.visitor_by_year.toLocaleString()}</p>
                  <p className="text-[10px] font-black uppercase text-white tracking-tighter">Tahun Ini</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-[#33b962]">{data?.visitor_all_year.toLocaleString()}</p>
                  <p className="text-[10px] font-black uppercase text-white tracking-tighter">Total</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 pt-12 mt-12 text-xs font-bold uppercase tracking-[0.2em] border-t border-white/5 md:flex-row">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Sekolah Kreatif SD Muhammadiyah 3 Samarinda</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>

  )
}
