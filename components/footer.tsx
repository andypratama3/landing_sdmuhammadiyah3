'use client';

import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, CloudCog, TrendingUp, Activity, Users, BarChart3, ChevronRight } from "lucide-react"
import Image from 'next/image'
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

interface VisitorData {
  visitor_by_day: number;
  visitor_by_month: number;
  visitor_by_year: number;
  visitor_all_year: number;
  trend?: 'up' | 'down' | 'neutral';
  trend_percentage?: number;
  peak_hour?: string;
}

export default function FooterAdvanced() {
  const { data, loading, error, refetch } = useApi<VisitorData>('/views', {
    cache: false,
    immediate: true,
  });

  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Auto-refresh setiap 30 detik (hanya untuk data statistik)
  useEffect(() => {
    const REFRESH_INTERVAL = 30000; // 30 detik

    const intervalId = setInterval(() => {
      refetch();
      setLastUpdate(new Date());
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [refetch]);

  useEffect(() => {
    setMounted(true);
    const handler = () => {
      refetch();
      setLastUpdate(new Date());
    };
    window.addEventListener('visitor-updated', handler);
    return () => window.removeEventListener('visitor-updated', handler);
  }, [refetch]);

  // Detect system dark mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);

      const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  if (!mounted) return null;

  const stats = [
    {
      id: 'day',
      label: 'Hari Ini',
      value: data?.visitor_by_day,
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      darkBg: 'dark:bg-blue-400/20',
    },
    {
      id: 'month',
      label: 'Bulan Ini',
      value: data?.visitor_by_month,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
      darkBg: 'dark:bg-purple-400/20',
    },
    {
      id: 'year',
      label: 'Tahun Ini',
      value: data?.visitor_by_year,
      icon: TrendingUp,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/20',
      darkBg: 'dark:bg-pink-400/20',
    },
    {
      id: 'total',
      label: 'Total',
      value: data?.visitor_all_year,
      icon: BarChart3,
      color: 'text-[#33b962]',
      bgColor: 'bg-[#33b962]/20',
      darkBg: 'dark:bg-[#33b962]/20',
      highlight: true,
    },
  ];

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil Sekolah" },
    { href: "/pembayaran", label: "Sistem Pembayaran" },
    { href: "/rapot", label: "Rapot Digital" },
    { href: "/kontak", label: "Hubungi Kami" }
  ];

  const infoLinks = [
    { href: "/jadwal", label: "Jadwal Pelajaran" },
    { href: "/galeri", label: "Kalender Akademik" },
    { href: "/berita", label: "Berita Terbaru" },
    { href: "/prestasi-siswa", label: "Prestasi Siswa" },
    { href: "/prestasi-sekolah", label: "Prestasi Sekolah" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/sekolahkreatif.muhammadiyahsamarinda/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/SekolahKreatifSamarinda/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@sekolahkreatifsdmuhammadiy2812", label: "YouTube" }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Alamat",
      value: "Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, 75242"
    },
    {
      icon: Phone,
      label: "Telepon",
      value: "(0541) 260-066",
      href: "tel:+0541260066"
    },
    {
      icon: Mail,
      label: "Email",
      value: "sdmuhammadiyah3smd@gmail.com",
      href: "mailto:sdmuhammadiyah3smd@gmail.com"
    }
  ];

  // Format waktu update terakhir
  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);
    
    if (diff < 60) return `${diff} detik yang lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    return lastUpdate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <footer className="relative mt-20 pt-24 pb-12 overflow-hidden transition-colors duration-300 dark:bg-gray-950 dark:text-gray-400 bg-white text-gray-600">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#33b962] to-transparent opacity-30" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-[100px] transition-colors duration-300 dark:bg-[#33b962]/5 bg-[#33b962]/3" />
      
      {/* Light mode background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl opacity-0 dark:opacity-0" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-50/50 rounded-full blur-3xl opacity-0 dark:opacity-0" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Main Grid */}
        <div className="grid gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-12 h-12 group-hover:rotate-12 transition-transform duration-500 brightness-110 filter drop-shadow-[0_4px_10px_rgba(51,185,98,0.3)]">
                  <Image src="/SD3_logo1.png" fill alt="Logo Sekolah" className="object-contain" />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tighter leading-none uppercase transition-colors dark:text-white text-gray-900">
                    Sekolah Kreatif
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#33b962]">
                    SD Muhammadiyah 3
                  </p>
                </div>
              </Link>
              <p className="text-base leading-relaxed font-medium dark:text-gray-400 text-gray-600">
                Membentuk generasi kreatif, berakhlak mulia, dan berprestasi melalui pendidikan inovatif berbasis karakter Islami.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-lg hover:-translate-y-1 dark:bg-white/5 dark:border-white/10 dark:hover:bg-[#33b962] dark:hover:text-white dark:hover:border-[#33b962] bg-gray-100 border-gray-200 hover:bg-[#33b962] hover:text-white hover:border-[#33b962]"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="mb-8 font-black uppercase tracking-widest text-sm transition-colors dark:text-white text-gray-900">
              Navigasi Cepat
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center gap-2 transition-colors font-bold uppercase tracking-wider text-xs dark:hover:text-white hover:text-gray-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33b962] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h4 className="mb-8 font-black uppercase tracking-widest text-sm transition-colors dark:text-white text-gray-900">
              Informasi & Berita
            </h4>
            <ul className="space-y-4">
              {infoLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center gap-2 transition-colors font-bold uppercase tracking-wider text-xs dark:hover:text-white hover:text-gray-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-8 font-black uppercase tracking-widest text-sm transition-colors dark:text-white text-gray-900">
              Hubungi Kami
            </h4>
            <ul className="space-y-6">
              {contactInfo.map((contact, i) => {
                const Icon = contact.icon;
                const content = (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-inner transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:group-hover:bg-[#33b962]/20 bg-gray-100 border-gray-200 group-hover:bg-[#33b962]/20">
                      <Icon className="w-5 h-5 text-[#33b962] brightness-125" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase text-[#33b962] mb-1">{contact.label}</p>
                      <p className={`text-sm font-medium leading-relaxed transition-colors dark:group-hover:text-white group-hover:text-gray-900`}>
                        {contact.value}
                      </p>
                    </div>
                  </li>
                );

                return contact.href ? (
                  <a key={i} href={contact.href} className="block">
                    {content}
                  </a>
                ) : (
                  content
                );
              })}
            </ul>
          </div>
        </div>

        {/* ===== VISITOR STATS SECTION ===== */}
        <div className="mt-20 p-8 glass glass-neon-border rounded-3xl transition-all duration-300 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/8 border-gray-200/5 bg-gray-50/50 hover:bg-gray-100/50">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b dark:border-white/10 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center dark:bg-[#33b962]/20 bg-[#33b962]/15">
                <div className="absolute w-12 h-12 rounded-2xl animate-pulse dark:bg-[#33b962]/10 bg-[#33b962]/5" />
                <CloudCog className="w-6 h-6 text-[#33b962] relative z-10" />
              </div>
              <div>
                <p className="font-black uppercase tracking-widest text-xs dark:text-white text-gray-900">
                  Statistik Pengunjung
                </p>
                <p className="text-[10px] font-bold uppercase dark:text-white/70 text-gray-600">
                  Data Real-time • Update otomatis setiap 30 detik
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Last Update Time */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg dark:bg-white/5 dark:border-white/10 bg-gray-100 border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-[#33b962] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider dark:text-white/70 text-gray-600">
                  {formatLastUpdate()}
                </span>
              </div>

              {/* Trend Indicator */}
              {!loading && data?.trend_percentage && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg dark:bg-white/5 dark:border-white/10 bg-gray-100 border border-gray-200">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    data.trend === 'up' ? 'bg-[#33b962]' : 'bg-red-400'
                  }`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    data.trend === 'up' ? 'text-[#33b962]' : 'text-red-400'
                  }`}>
                    {data.trend === 'up' ? '+' : '-'}{data.trend_percentage}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {loading ? (
              <div className="col-span-2 sm:col-span-4 flex items-center justify-center py-8 gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#33b962] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#33b962] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#33b962] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs uppercase tracking-widest animate-pulse dark:text-white/50 text-gray-400">
                  Memperbarui data...
                </span>
              </div>
            ) : (
              stats.map((stat) => {
                const Icon = stat.icon;
                const isHovered = hoveredStat === stat.id;

                return (
                  <div
                    key={stat.id}
                    className={`relative p-4 rounded-xl transition-all duration-300 cursor-pointer group border ${
                      isDarkMode
                        ? `dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/8`
                        : `bg-white border-gray-200 hover:bg-gray-50`
                    }`}
                    onMouseEnter={() => setHoveredStat(stat.id)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    {/* Hover Glow Effect */}
                    {isHovered && (
                      <div className={`absolute -inset-3 rounded-xl blur-lg opacity-20 pointer-events-none ${
                        stat.highlight ? 'bg-[#33b962]/30' : 'bg-current'
                      }`} />
                    )}

                    {/* Icon Container */}
                    <div className={`relative w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ${
                      stat.bgColor
                    } ${isHovered ? 'scale-110 shadow-lg' : 'scale-100'}`}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>

                    {/* Value */}
                    <p className={`font-black transition-all duration-300 ${
                      stat.highlight ? stat.color : 'dark:text-white text-gray-900'
                    } ${isHovered ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
                      {stat.value?.toLocaleString()}
                    </p>

                    {/* Label */}
                    <p className={`text-[10px] font-black uppercase tracking-tighter transition-colors mt-1 ${
                      isDarkMode
                        ? 'dark:text-white/60 dark:group-hover:text-white/80'
                        : 'text-gray-600 group-hover:text-gray-900'
                    }`}>
                      {stat.label}
                    </p>

                    {/* Bottom Accent Line */}
                    <div className={`h-0.5 rounded-full mt-2 transition-all duration-300 ${
                      stat.highlight
                        ? 'bg-gradient-to-r from-[#33b962] to-[#33b962]/30'
                        : `bg-gradient-to-r from-current to-current/30`
                    } ${isHovered ? 'w-full' : 'w-1/2'}`} />
                  </div>
                );
              })
            )}
          </div>

          {/* Peak Hour Info */}
          {!loading && data?.peak_hour && (
            <div className="mt-6 pt-6 border-t dark:border-white/10 border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest dark:text-white/60 text-gray-600">
                Jam Puncak
              </span>
              <span className="text-sm font-black text-[#33b962]">{data.peak_hour}</span>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 pt-12 mt-12 text-xs font-bold uppercase tracking-[0.2em] border-t dark:border-white/5 border-gray-200 md:flex-row">
          <p className="text-center text-neon-walking md:text-left font-bold dark:text-gray-400 text-gray-600">
            &copy; {new Date().getFullYear()} Sekolah Kreatif SD Muhammadiyah 3 Samarinda
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="transition-colors dark:hover:text-white hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors dark:hover:text-white hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer> 
  )
}