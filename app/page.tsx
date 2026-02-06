"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { useApi } from '@/hooks/useApi';
import { GalleryCard } from "@/components/landing/gallery-component"
import { Gallery } from '@/types/gallery.types'
import { Dukungan } from '@/types/dukungan.types'
import { GalleryCardSkeleton } from "@/components/gallery/skeletons/GalleryCardSkeleton"
import {
  Users,
  Award,
  Building,
  Trophy,
  BookOpen,
  Heart,
  Smile,
  Pencil,
  Brain,
  Gamepad2,
  GraduationCap,
  Target,
  Sparkles,
  Star,
  Play,
  Check,
  CheckCircle,
  Info,
  Wallet,
  MessageCircle,
  ChevronRight,
} from "lucide-react"

import { PrestasiSiswa } from "@/types/prestasi.types";
import { access } from "node:fs";

interface CountData {
  siswa: number;
  guru: number;
  fasilitas: number;
  prestasis_siswa: number;
  prestasis_sekolah: number;
}



export default function Home() {
  // sessionStorage.setItem('visitor_logged', 'true')
  // console.log('visitor_logged',sessionStorage);

  const { data, loading, error, refetch } = useApi<CountData>('/count-landing', {
    cache: true,
    cacheTTL: 3600000,
    immediate: true,
  });

  const formatCount = (num?: number) => (num !== undefined ? num.toLocaleString() + "+" : "-");
  const stats = [
    { icon: Users, value: formatCount(data?.siswa), label: "Siswa" },
    { icon: Trophy, value: formatCount(data?.guru), label: "Guru" },
    { icon: Award, value: formatCount(data?.prestasis_siswa), label: "Prestasi Siswa" },
    { icon: Building, value: formatCount(data?.fasilitas), label: "Sarana & Prasarana" },
  ]

  const programs = [
    {
      icon: BookOpen,
      title: "Tahfidz Al-Qur'an 2 Juz (29-30)",
      description: "Program menghafal Al-Qur'an dengan metode yang mudah dan menyenangkan",
    },
    {
      icon: Heart,
      title: "Pembiasaan Akhlak Islami Sejak Dini",
      description: "Pembentukan karakter islami melalui pembiasaan sehari-hari",
    },
    {
      icon: Smile,
      title: "Pembiasaan Sholat Wajib dan Sunnah",
      description: "Melatih kedisiplinan ibadah sejak dini",
    },
    {
      icon: Sparkles,
      title: "Pembiasaan Ngaji Morning Metode Tilawati",
      description: "Mengaji dengan metode tilawati setiap pagi",
    },
    {
      icon: Pencil,
      title: "Pembiasaan Menulis Al-Qur'an Dengan Metode IMLA",
      description: "Melatih menulis ayat Al-Qur'an dengan metode IMLA",
    },
    {
      icon: Brain,
      title: "Pembinaan Psikologi Untuk Mengetahui Minat & Bakat Anak",
      description: "Identifikasi potensi anak melalui tes psikologi",
    },
    {
      icon: Gamepad2,
      title: "Pembelajaran Berbasis Edutainment",
      description: "Belajar sambil bermain dengan metode yang menyenangkan",
    },
    {
      icon: Target,
      title: "Menyeimbangkan Otak Kanan Dan Kiri",
      description: "Pembelajaran holistik untuk perkembangan optimal",
    },
    {
      icon: GraduationCap,
      title: "Lulus Dengan 3 Ijazah",
      description: "Siswa lulus dengan ijazah sekolah, Muhammadiyah, dan Tilawati",
    },
  ]

  const facilities = [
    { title: "FASILITAS", image: "/fasilitas.png", link: "/fasilitas" },
    { title: "PRESTASI SISWA", image: "/prestasi-siswa.png", link: "/prestasi-siswa" },
    { title: "PRESTASI SEKOLAH", image: "/prestasi-sekolah.png", link: "/prestasi-sekolah" },
  ]

  const { data: galleries, loading: galleryLoading, error: galleryError } = useApi<Gallery[]>('/gallery-landing', {
    cache: true,
    cacheTTL: 3600000,
    immediate: true,
  });

  const { data: dukungan, loading: dukunganLoading, error: dukunganError } = useApi<Dukungan[]>('/dukungan-kerja-sama', {
    cache: true,
    cacheTTL: 3600000,
    immediate: true,
  })

  const systemInfo = [
    {
      icon: Info,
      title: "Informasi Lengkap Sekolah",
      description: "Akses informasi sekolah kapan saja dan dimana saja melalui website",
      image: "/1.png"
    },
    {
      icon: Wallet,
      title: "Pembayaran Digital",
      description: "Sistem pembayaran online yang mudah, aman, dan terpercaya",
      image: "/2.png"
    },
    {
      icon: MessageCircle,
      title: "Pemberitahuan Pembayaran via WhatsApp",
      description: "Notifikasi otomatis status pembayaran langsung ke WhatsApp orang tua",
      image: "/3.png"
    },
  ]

  const { data: achievements, loading: prestasiLoading, error: prestasiError } = useApi<PrestasiSiswa[]>('/prestasi-landing', {
    cache: true,
    cacheTTL: 3600000,
    immediate: true,
  });

  const formatPartnerName = (name: string) => {
    const words = name.split(" ");

    if (words.length <= 2) {
      return name;
    }

    return (
      <>
        {words.slice(0, 2).join(" ")}
        <br />
        {words.slice(2).join(" ")}
      </>
    );
  };

  const truncateWords = (text: string, limit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] py-20 overflow-hidden">
        {/* Playful background elements */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-white/10 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-[#ffd166]/10 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[150px] animate-spin-slow pointer-events-none" />

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center animate-fade-in-up">
            <div className="mb-12 inline-block relative text-center animate-float">
              <div className="absolute inset-0 bg-white/40 blur-[80px] rounded-full scale-150 animate-pulse" />
              <div className="relative w-28 h-28 sm:w-38 sm:h-38 transition-all duration-700 hover:scale-110 cursor-pointer">
                <Image
                  src="/SD3_logo1.png"
                  alt="Logo SD Muhammadiyah 3 Samarinda"
                  fill
                  className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)] filter brightness-110"
                />
              </div>
            </div>

            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
              Eksplorasi Bakat & Kreativitas
            </Badge>

            <h1 className="mb-8 font-black text-white text-fluid-h1 leading-[1.05] text-balance drop-shadow-2xl">
              SD MUHAMMADIYAH 3 <br className="hidden sm:block" /> SAMARINDA
            </h1>

            <p className="max-w-3xl mx-auto mb-12 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/95 text-balance font-medium">
              Sekolah Kreatif yang membentuk karakter Islami, <br className="hidden sm:block" /> inovatif, dan berprestasi menuju masa depan gemilang.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#ffd166] hover:bg-[#ffca3a] text-gray-900 rounded-2xl px-12 py-8 text-xl shadow-[0_20px_50px_rgba(255,209,102,0.3)] hover:scale-105 transition-all font-black group"
              >
                <Link href="https://ppdb.sdmuh3smd.com" className="flex items-center justify-center gap-3">
                  DAFTAR SEKARANG
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-12 py-8 text-xl font-black text-white bg-white/10 border-2 border-white/30 rounded-2xl hover:bg-white/20 backdrop-blur-md transition-all shadow-xl uppercase tracking-widest"
              >
                <Link href="/profil#video" className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg">
                    <Play className="w-5 h-5 text-[#33b962] fill-[#33b962]" />
                  </div>
                  VIDEO PROFIL
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="relative py-24 -mt-12 bg-white dark:bg-gray-900 z-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="card-premium p-6 sm:p-10 text-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-300 brightness-110 filter drop-shadow-[0_10px_10px_rgba(51,185,98,0.3)]">
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white brightness-110" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#33b962] mb-2">{stat.value}</h3>
                <p className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container px-4 mx-auto">
          <div className="mb-20 text-center">
            <Badge className="mb-6 bg-[#33b962]/10 dark:bg-[#33b962]/20 text-[#33b962] dark:text-[#4ade80] border-[#33b962]/20 px-6 py-3 text-sm font-bold rounded-full">
              PROFIL LULUSAN & PROGRAM
            </Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white text-balance leading-tight">
              Program Unggulan Kami
            </h2>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-400 text-balance">
              Kurikulum yang dirancang khusus untuk membangun fondasi karakter, intelegensi, dan spiritualitas anak sejak dini.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="p-8 card-premium group bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-[#33b962]/50"
              >
                <div className="w-16 h-16 bg-[#33b962]/10 dark:bg-[#33b962]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#33b962] transition-all duration-300 shadow-emerald-500/10 hover:shadow-emerald-500/30">
                  <program.icon className="w-8 h-8 text-[#33b962] group-hover:text-white brightness-110" />
                </div>
                <h3 className="font-black text-lg mb-4 text-gray-900 dark:text-white group-hover:text-[#33b962] transition-colors leading-tight">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{program.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sekolah Penggerak & Akreditasi */}
      <section className="py-24 bg-[#33b962] dark:bg-[#1a4d2e] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid gap-16 sm:grid-cols-2 lg:max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="relative flex items-center justify-center w-48 h-48 mx-auto mb-6 transition-all duration-700">
                {/* Subtle halo glow */}
                <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full scale-150 animate-pulse" />
                <div className="relative z-10 w-32 h-32 animate-float" style={{ animationDelay: '0s' }}>
                  <Star className="w-full h-full text-[#ffd166] fill-[#ffd166] brightness-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-110" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl sm:text-3xl font-black text-white">Sekolah Penggerak</h3>
              <p className="text-white/80 text-base font-medium tracking-wide">Program Unggulan Kemendikbudristek</p>
            </div>
            <div className="text-center group">
              <div className="relative flex items-center justify-center w-48 h-48 mx-auto mb-6 transition-all duration-700">
                {/* Subtle halo glow */}
                <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full scale-150 animate-pulse" />
                <div className="relative z-10 w-32 h-32 animate-float" style={{ animationDelay: '0.5s' }}>
                  <Award className="w-full h-full text-white brightness-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-110" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl sm:text-3xl font-black text-white">AKREDITASI A</h3>
              <p className="text-white/80 text-base font-medium tracking-wide">Predikat Unggul (BAN-S/M)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="container px-4 mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => (
              <Link
                key={index}
                href={facility.link}
                className="relative overflow-hidden shadow-2xl group rounded-[3rem] h-[400px] sm:h-[500px] lg:h-[600px] block card-premium border-0"
              >
                <div className="relative overflow-hidden h-full w-full">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-12 transform group-hover:-translate-y-4 transition-transform duration-700">
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 font-black uppercase tracking-widest text-[10px] mb-6 px-4 py-1.5 h-auto">
                      Jelajahi Fasilitas
                    </Badge>
                    <h3 className="mb-8 text-3xl sm:text-4xl font-black text-white leading-tight uppercase tracking-tight">{facility.title}</h3>
                    <div className="flex items-center gap-4 text-white transition-all group-hover:gap-6">
                      <span className="text-lg font-black uppercase tracking-widest">LIHAT DETAIL</span>
                      <div className="w-14 h-14 rounded-2xl bg-[#33b962] flex items-center justify-center shadow-2xl brightness-110 group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Aktivitas Kami Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-6 bg-[#33b962]/10 dark:bg-[#33b962]/20 text-[#33b962] dark:text-[#4ade80] border-[#33b962]/20 px-6 py-3 text-sm font-bold rounded-full">
              GALERI AKTIVITAS
            </Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">
              Aktivitas Kami
            </h2>
            <p className="max-w-2xl mx-auto text-base text-gray-600 dark:text-gray-400">
              Kegiatan seru dan edukatif yang dilakukan siswa di sekolah
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {galleryLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <GalleryCardSkeleton key={index} />
              ))}

            {!galleryLoading && galleryError && (
              <div className="col-span-full glass p-10 text-center rounded-3xl">
                <p className="text-red-500 font-bold">Gagal memuat galeri aktivitas</p>
              </div>
            )}

            {!galleryLoading &&
              galleries?.map((gallery) => (
                <div key={gallery.id} className="card-premium">
                  <GalleryCard gallery={gallery} />
                </div>
              ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all"
              size="lg"
            >
              <Link href="/galeri">Lihat Semua Aktivitas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-24 bg-white dark:bg-gray-900 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#33b962]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-fluid-h2 font-black leading-tight text-gray-900 dark:text-white text-balance px-4">
              Pendidikan Modern <br className="hidden sm:block" /> Berbasis Teknologi & Karakter
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden bg-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] aspect-video group">
              <div className="absolute inset-0 z-20 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <Button
                  size="lg"
                  className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full w-24 h-24 p-0 shadow-2xl hover:scale-110 transition-all border-8 border-white/20"
                >
                  <Play className="w-10 h-10 ml-1 fill-white" />
                </Button>
              </div>
              <Image
                src="/modern-school-classroom.png"
                alt="Video Preview SD Muhammadiyah 3 Samarinda"
                fill
                className="object-cover opacity-60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Informasi Sistem Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white">Ekosistem Digital</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Transparansi dan kemudahan akses untuk seluruh wali murid</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-16">
            {systemInfo.map((info, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl flex items-center justify-center mb-8 mx-auto lg:mx-0 rotate-6 hover:rotate-0 transition-transform">
                    <info.icon className="w-12 h-12 text-[#33b962]" />
                  </div>
                  <h3 className="mb-6 text-2xl font-black text-gray-900 dark:text-white leading-tight">{info.title}</h3>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-medium">{info.description}</p>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-video glass rounded-[3rem] p-4 shadow-2xl overflow-hidden relative group">
                    <div className="w-full h-full rounded-[2.5rem] relative overflow-hidden">
                      <Image
                        src={info.image}
                        alt={info.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Preview Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative group">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ffd166] rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.3)] rounded-[3rem] h-[300px] sm:h-[400px] lg:h-[500px]">
                <Image
                  src="/foto_sekolah.jpeg"
                  alt="Suasana Sekolah Kreatif"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 p-8 glass rounded-[2.5rem] shadow-2xl hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#33b962] rounded-2xl flex items-center justify-center shadow-lg">
                    <Smile className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-2xl text-gray-900 dark:text-white">100%</p>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Siswa Ceria</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Badge className="mb-6 bg-[#33b962]/10 dark:bg-[#33b962]/20 text-[#33b962] dark:text-[#4ade80] border-[#33b962]/20 px-6 py-3 text-sm font-bold rounded-full">
                TENTANG KAMI
              </Badge>
              <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Mendidik dengan Hati, <br />Melayani dengan Kreativitas</h2>
              <p className="mb-10 text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                SD Muhammadiyah 3 Samarinda hadir bukan sekadar memberi pengetahuan, tetapi membentuk karakter Islami yang tangguh, adaptif, dan penuh inovasi melalui metode <strong>Edutainment </strong> yang menyenangkan.
              </p>
              <Button
                asChild
                className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#33b962] dark:hover:bg-[#2a9d52] text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all"
                size="lg"
              >
                <Link href="/profil" className="flex items-center gap-2">
                  Selengkapnya
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kepala Sekolah Section */}
      <section className="relative py-24 overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px] animate-blob pointer-events-none" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto glass dark:bg-gray-900/40 dark:backdrop-blur-2xl p-10 sm:p-16 rounded-[4rem] shadow-2xl relative border border-white/20 dark:border-white/10">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl transition-transform duration-500 hover:scale-105">
                <Image
                  src="/kepala-sekolah.jpeg"
                  alt="Ansar HS. S.Pd.,M.M. Gr. - Kepala Sekolah"
                  fill
                  className="object-contain bg-white"
                />
              </div>
            </div>

            <div className="mt-40 text-center">
              <h3 className="mb-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Ansar HS. S.Pd.,M.M. Gr.</h3>
              <p className="text-[#33b962] dark:text-[#4ade80] font-black text-base sm:text-lg mb-10 uppercase tracking-widest">Kepala Sekolah</p>

              <div className="relative">
                <div className="absolute -top-6 left-0 text-7xl text-[#33b962]/10 select-none">"</div>
                <p className="px-6 text-lg sm:text-xl italic leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                  "Sinergi antara Iman, Ilmu, dan Akhlak adalah fondasi utama kami dalam melahirkan generasi masa depan yang siap menghadapi tantangan zaman dengan integritas dan kreativitas."
                </p>
                <div className="absolute -bottom-10 right-0 text-7xl text-[#33b962]/10 select-none rotate-180">"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prestasi Terakhir Section */}
      <section className="relative py-24 overflow-hidden bg-white dark:bg-gray-900">
        {/* Playful blobs for About section */}
        <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-[#playful-yellow]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 bg-[#playful-purple]/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-20 text-center">
            <Badge className="mb-6 bg-[#ffd166] text-gray-900 px-6 py-3 text-sm font-bold rounded-full">SANG JUARA</Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Prestasi Terbaru</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Perwujudan dedikasi dan kerja keras seluruh civitas akademika</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {prestasiLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <GalleryCardSkeleton key={index} />
              ))}

            {!prestasiLoading && prestasiError && (
              <div className="col-span-full p-10 glass text-center rounded-3xl">
                <p className="text-red-500 font-bold">Gagal memuat data prestasi</p>
              </div>
            )}

            {!prestasiLoading && achievements?.map((achievement, index) => (
              <Card key={index} className="card-premium h-[350px] sm:h-[400px] lg:h-[450px] group bg-white dark:bg-gray-800 border-0 shadow-2xl rounded-[2.5rem] overflow-hidden">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/prestasi/` + achievement.foto || "/placeholder.svg"}
                    alt={achievement.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 transform group-hover:-translate-y-4 transition-transform duration-700">
                    <div className="w-14 h-14 bg-[#ffd166] rounded-[1.25rem] flex items-center justify-center mb-6 shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 brightness-110">
                      <Trophy className="w-8 h-8 text-gray-900" />
                    </div>
                    <Badge className="bg-[#ffd166]/20 backdrop-blur-md text-[#ffd166] border-[#ffd166]/30 font-black uppercase tracking-widest text-[9px] mb-4 px-3 py-1">
                      {achievement.juara}
                    </Badge>
                    <h3 className="mb-2 text-xl font-black text-white leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-[#ffd166] transition-colors">
                      {truncateWords(achievement.name, 10)}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-12 py-8 text-lg font-bold border-2 border-[#33b962] text-[#33b962] dark:text-[#4ade80] dark:border-[#4ade80] hover:bg-[#33b962] hover:text-white transition-all shadow-xl"
              size="lg"
            >
              <Link href="/prestasi-sekolah">Prestasi Sekolah</Link>
            </Button>
            <Button
              asChild
              className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#33b962] dark:hover:bg-[#2a9d52] text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all"
              size="lg"
            >
              <Link href="/prestasi-siswa">Prestasi Siswa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dukungan & Kerja Sama Section */}
      <section className="relative py-24 overflow-hidden bg-gray-50 border-t border-gray-100 dark:bg-gray-950 dark:border-gray-800">
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-[#playful-pink]/10 rounded-full blur-3xl animate-blob" />
        <div className="container relative z-10 px-4 mx-auto text-center">
          <Badge className="mb-8 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-6 py-2 text-sm font-bold rounded-full">PARTNER KAMI</Badge>
          <h2 className="mb-16 text-3xl font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Dukungan & Kerja Sama</h2>

          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {dukunganLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
              ))}

            {!dukunganLoading && dukunganError && (
              <p className="text-gray-500 font-medium">Gagal memuat mitra kerja sama</p>
            )}

            {!dukunganLoading && !dukunganError && (dukungan ?? []).map((partner, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <Image
                    src={partner.foto ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/cooperation/${partner.foto}` : "/placeholder.svg"}
                    alt={partner.name}
                    width={160}
                    height={160}
                    className="object-contain transition-transform"
                  />
                </div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penghargaan Section */}
      <section className="relative py-24 overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 bg-[#playful-blue]/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h2 className="mb-16 text-2xl font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] opacity-40">Penghargaan Nasional</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-16 lg:gap-32">
            <div className="group flex flex-col items-center">
              <div className="relative w-40 h-40 flex items-center justify-center mb-6 overflow-visible transition-all duration-700">
                {/* Subtle halo glow */}
                <div className="absolute inset-0 bg-[#33b962]/20 blur-[40px] rounded-full scale-125 group-hover:bg-[#33b962]/30 group-hover:scale-150 transition-all duration-700" />
                <div className="relative z-10 w-24 h-24 flex items-center justify-center animate-float" style={{ animationDelay: '0s' }}>
                  <CheckCircle className="w-full h-full text-[#33b962] drop-shadow-[0_15px_30px_rgba(51,185,98,0.4)]" />
                </div>
              </div>
              <p className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tight">Sekolah Ramah Anak</p>
            </div>

            <div className="group flex flex-col items-center">
              <div className="relative w-40 h-40 flex items-center justify-center mb-6 overflow-visible transition-all duration-700">
                {/* Subtle halo glow */}
                <div className="absolute inset-0 bg-[#ffd166]/20 blur-[40px] rounded-full scale-125 group-hover:bg-[#ffd166]/30 group-hover:scale-150 transition-all duration-700" />
                <div className="relative z-10 w-24 h-24 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Sparkles className="w-full h-full text-[#ffd166] drop-shadow-[0_15px_30px_rgba(255,209,102,0.4)]" />
                </div>
              </div>
              <p className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tight">Sekolah Adiwiyata</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#1a4d2e] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#1a4d2e] text-white relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 rounded-full w-[600px] h-[600px] bg-white/5 blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 rounded-full w-[600px] h-[600px] bg-white/5 blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10 px-4 mx-auto text-center">
          <h2 className="mb-8 text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-balance leading-tight">Mulai Perjalanan <br />Kreatif Anak Anda!</h2>
          <p className="max-w-2xl mx-auto mb-16 text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 text-balance font-medium">
            Pendaftaran peserta didik baru telah dibuka. Kuota terbatas, amankan kursi putra-putri Anda segera.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#33b962] hover:bg-gray-100 dark:bg-white dark:text-[#33b962] dark:hover:bg-gray-100 rounded-full px-16 py-10 text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all font-black flex items-center gap-3"
            >
              <Link href="https://ppdb.sdmuh3smd.com">
                Daftar Online
                <ChevronRight className="w-8 h-8" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-16 py-10 text-2xl font-bold text-white bg-transparent border-4 border-white/20 dark:border-white/20 rounded-full hover:bg-white/10 dark:hover:bg-white/10 backdrop-blur-md transition-all"
            >
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>

  )
}