export const revalidate = 300

import type { Metadata } from 'next'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { serverGetPublic } from '@/lib/server-api';
import { GalleryCard } from "@/components/landing/gallery-component"
import { Gallery } from '@/types/gallery.types'
import { Dukungan } from '@/types/dukungan.types'
import HomeAnimations from "@/components/HomeAnimations"
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
  ChevronRight,
  Info,
  Wallet,
  MessageCircle,
  CheckCircle,
} from "lucide-react"

import { PrestasiSiswa } from "@/types/prestasi.types";
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'SD Muhammadiyah 3 Samarinda | Sekolah Kreatif Islam Terbaik di Samarinda',
  description:
    'SD Muhammadiyah 3 Samarinda di Jl. Dato Iba — sekolah kreatif Islam terbaik, akreditasi A, 400+ siswa, prestasi juara. Daftar SPMB 2025/2026 sekarang!',
  path: '/',
  keywords: ['homepage', 'sekolah penggerak', 'tahfidz samarinda'],
})

interface CountData {
  siswa: number;
  guru: number;
  fasilitas: number;
  prestasis_siswa: number;
  prestasis_sekolah: number;
}

export default async function Home() {
  // Parallel fetching in Server Component
  const [countRes, galleryRes, dukunganRes, prestasiRes] = await Promise.all([
    serverGetPublic<CountData>('/count-landing'),
    serverGetPublic<Gallery[]>('/gallery-landing'),
    serverGetPublic<Dukungan[]>('/dukungan-kerja-sama'),
    serverGetPublic<PrestasiSiswa[]>('/prestasi-landing'),
  ]);

  const data = countRes.data as CountData;
  const galleries = galleryRes.data as Gallery[];
  const dukungan = dukunganRes.data as Dukungan[];
  const achievements = prestasiRes.data as PrestasiSiswa[];

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

  const truncateWords = (text: string, limit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="pt-20">
      <HomeAnimations />
      {/* Hero Section */}
      <section className="gsap-hero relative min-h-[100dvh] sm:min-h-[95vh] flex items-center bg-gradient-to-br from-(--color-forest-900) via-(--color-forest-450) to-(--color-forest-800) py-20 overflow-hidden islamic-pattern blob-bg">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-(--color-forest-500)/20 rounded-full blur-3xl animate-float-slow hero-blob-1" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-(--color-sun-500)/15 rounded-full blur-3xl animate-float hero-blob-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--color-teal-400)/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="mb-8 flex flex-wrap justify-center gap-3 animate-fade-in-up">
              <div className="ribbon-badge ribbon-badge-gold shadow-2xl">
                AKREDITASI A
              </div>
              <div className="ribbon-badge ribbon-badge-forest shadow-2xl">
                SEKOLAH PENGGERAK
              </div>
            </div>

            <div className="mb-12 inline-block relative text-center hero-logo animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-white/30 blur-[100px] rounded-full scale-150 animate-pulse" />
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-(--color-sun-500)/30 to-(--color-forest-500)/30 rounded-full blur-2xl animate-pulse" />
                <Image
                  src="/SD3_logo1.png"
                  alt="Logo SD Muhammadiyah 3 Samarinda"
                  width={160}
                  height={160}
                  priority
                  className="relative object-contain w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] filter brightness-110"
                />
              </div>
            </div>

            <Badge className="hero-badge px-8 py-3 mb-8 text-white bg-white/15 border-white/40 backdrop-blur-xl font-black uppercase tracking-widest text-[11px] rounded-full shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Eksplorasi Bakat & Kreativitas
            </Badge>

            <h1 className="hero-title mb-8 font-black text-white text-fluid-h1 leading-[1.05] text-balance drop-shadow-2xl font-outfit animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              SD MUHAMMADIYAH 3 <br className="hidden sm:block" /> SAMARINDA
            </h1>

            <p className="hero-description max-w-3xl mx-auto mb-12 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/95 text-balance font-medium font-quicksand animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Sekolah Kreatif yang membentuk karakter Islami, <br className="hidden sm:block" /> inovatif, dan berprestasi menuju masa depan gemilang.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button
                asChild
                size="lg"
                className="hero-button w-full sm:w-auto bg-(--color-sun-500) hover:bg-(--color-sun-400) text-gray-900 rounded-full px-12 py-8 text-xl shadow-[0_25px_60px_rgba(232,163,61,0.4)] hover:shadow-[0_30px_70px_rgba(232,163,61,0.5)] hover:scale-105 transition-all font-black group"
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
                className="hero-button w-full sm:w-auto px-12 py-8 text-xl font-bold border-2 border-white/30 text-white hover:bg-white/15 rounded-full backdrop-blur-xl transition-all shadow-xl uppercase tracking-widest hover:scale-105"
              >
                <Link href="/profil#video" className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                    <Play className="w-6 h-6 text-(--color-forest-450) fill-(--color-forest-450) ml-1" />
                  </div>
                  VIDEO PROFIL
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div> */}
      </section>

      {/* Quick Stats Section */}
      <section className="gsap-stats relative py-24 -mt-12 bg-(--color-paper-50) dark:bg-gray-900 z-20 islamic-pattern">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card medal-counter">
                <stat.icon className="w-8 h-8 text-(--color-sun-500) mb-4" />
                <span className="stat-number medal-counter-number">{stat.value}</span>
                <span className="medal-counter-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section className="gsap-programs py-24 bg-gradient-to-b from-(--color-cloud-100) to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container px-4 mx-auto">
          <div className="mb-20 text-center">
            <Badge className="badge-primary mb-6">
              PROFIL LULUSAN & PROGRAM
            </Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white text-balance leading-tight font-outfit">
              Program Unggulan Kami
            </h2>
            <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-400 text-balance font-quicksand">
              Kurikulum yang dirancang khusus untuk membangun fondasi karakter, intelegensi, dan spiritualitas anak sejak dini.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(200px,auto)]">
            {programs.map((program, index) => {
              const isFeatured = index < 3;
              return (
                <Card
                  key={index}
                  className="program-card p-8 card-bento group bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-(--color-forest-450)/10 to-(--color-teal-400)/10 dark:from-(--color-forest-450)/20 dark:to-(--color-teal-400)/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-(--color-forest-450) group-hover:to-(--color-forest-500) transition-all duration-300 ${isFeatured ? 'w-24 h-24' : ''}`}>
                    <program.icon className={`text-(--color-forest-450) group-hover:text-white transition-colors ${isFeatured ? 'w-14 h-14' : 'w-8 h-8'}`} />
                  </div>
                  <h3 className={`font-black mb-4 text-gray-900 dark:text-white group-hover:text-gradient-forest transition-colors leading-tight font-outfit ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
                    {program.title}
                  </h3>
                  <p className={`leading-relaxed text-gray-600 dark:text-gray-400 font-quicksand ${isFeatured ? 'text-base' : 'text-sm'}`}>{program.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sekolah Penggerak & Akreditasi */}
      <section className="gsap-accreditation py-24 bg-(--color-forest-450) dark:bg-(--color-forest-900) relative overflow-hidden islamic-pattern">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid gap-16 sm:grid-cols-2 lg:max-w-4xl mx-auto">
            <div className="accreditation-card text-center group">
              <div className="relative flex items-center justify-center w-48 h-48 mx-auto mb-6 transition-all duration-700">
                <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full scale-150 animate-pulse" />
                <div className="relative z-10 w-32 h-32 animate-float">
                  <Star className="w-full h-full text-(--color-sun-500) fill-(--color-sun-500) brightness-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl sm:text-3xl font-black text-white font-outfit">Sekolah Penggerak</h3>
              <p className="text-white/80 text-base font-medium tracking-wide font-quicksand">Program Unggulan Kemendikbudristek</p>
            </div>
            <div className="accreditation-card text-center group">
              <div className="relative flex items-center justify-center w-48 h-48 mx-auto mb-6 transition-all duration-700">
                <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full scale-150 animate-pulse" />
                <div className="relative z-10 w-32 h-32 animate-float">
                  <Award className="w-full h-full text-white brightness-125 drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl sm:text-3xl font-black text-white font-outfit">AKREDITASI A</h3>
              <p className="text-white/80 text-base font-medium tracking-wide font-quicksand">Predikat Unggul (BAN-S/M)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-32 bg-(--color-paper-50) dark:bg-gray-950 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => (
              <Link
                key={index}
                href={facility.link}
                className="quick-link-card relative overflow-hidden shadow-2xl group rounded-[1.75rem] h-[400px] sm:h-[500px] lg:h-[600px] block card-premium border-0"
              >
                <div className="relative overflow-hidden h-full w-full">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-12 transform group-hover:-translate-y-4 transition-transform duration-700">
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 font-black uppercase tracking-widest text-[10px] mb-6 px-4 py-1.5 h-auto">
                      Jelajahi Fasilitas
                    </Badge>
                    <h3 className="mb-8 text-3xl sm:text-4xl font-black text-white leading-tight uppercase tracking-tight font-outfit">{facility.title}</h3>
                    <div className="flex items-center gap-4 text-white transition-all group-hover:gap-6">
                      <span className="text-lg font-black uppercase tracking-widest font-quicksand">LIHAT DETAIL</span>
                      <div className="w-14 h-14 rounded-2xl bg-(--color-forest-450) flex items-center justify-center shadow-2xl brightness-110 group-hover:scale-110 transition-transform">
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
      <section className="gsap-gallery py-24 bg-(--color-paper-50) dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-6 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/20 text-(--color-forest-450) dark:text-(--color-teal-400) border-(--color-forest-450)/20 px-6 py-3 text-sm font-bold rounded-full">
              GALERI AKTIVITAS
            </Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">
              Aktivitas Kami
            </h2>
            <p className="max-w-2xl mx-auto text-base text-gray-600 dark:text-gray-400 font-quicksand">
              Kegiatan seru dan edukatif yang dilakukan siswa di sekolah
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {galleries?.map((gallery) => (
              <div key={gallery.id} className="gallery-card card-premium">
                <GalleryCard gallery={gallery} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              className="bg-(--color-forest-450) hover:bg-(--color-forest-500) text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all"
              size="lg"
            >
              <Link href="/galeri">Lihat Semua Aktivitas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="gsap-video">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-14 text-center">
            <h2 className="text-fluid-h2 font-black leading-tight text-gray-900 dark:text-white text-balance px-4 font-outfit">
              Pendidikan Modern <br className="hidden sm:block" /> Berbasis Teknologi & Karakter
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden bg-gray-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] rounded-[2.5rem] aspect-video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/lb14Dy0uwI4?si=a0KsgpTUgzBOxyD_"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Preview Section */}
      <section className="gsap-about py-24 bg-(--color-paper-50) dark:bg-gray-900 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative group">
              <div className="relative overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.3)] rounded-[1.75rem] h-[300px] sm:h-[400px] lg:h-[500px]">
                <Image
                  src="/foto_sekolah.jpeg"
                  alt="Suasana Sekolah Kreatif"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 p-8 glass rounded-[2.5rem] shadow-2xl hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-(--color-forest-450) rounded-2xl flex items-center justify-center shadow-lg">
                    <Smile className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-2xl text-gray-900 dark:text-white font-outfit">100%</p>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter font-quicksand">Siswa Ceria</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-content">
              <Badge className="mb-6 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/20 text-(--color-forest-450) dark:text-(--color-teal-400) border-(--color-forest-450)/20 px-6 py-3 text-sm font-bold rounded-full">
                TENTANG KAMI
              </Badge>
              <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">Mendidik dengan Hati, <br />Melayani dengan Kreativitas</h2>
              <p className="mb-10 text-lg sm:text-xl leading-relaxed text-gray-600 dark:text-gray-400 font-medium font-quicksand">
                SD Muhammadiyah 3 Samarinda hadir bukan sekadar memberi pengetahuan, tetapi membentuk karakter Islami yang tangguh, adaptif, dan penuh inovasi melalui metode <strong>Edutainment </strong> yang menyenangkan.
              </p>
              <Button
                asChild
                className="bg-(--color-forest-450) hover:bg-(--color-forest-500) text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all"
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

      {/* Prestasi Terakhir Section */}
      <section className="gsap-achievements relative py-24 overflow-hidden bg-(--color-paper-50) dark:bg-gray-900">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-20 text-center">
            <Badge className="mb-6 bg-(--color-sun-500) text-gray-900 px-6 py-3 text-sm font-bold rounded-full">SANG JUARA</Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">Prestasi Terbaru</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium font-quicksand">Perwujudan dedikasi dan kerja keras seluruh civitas akademika</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {achievements?.map((achievement, index) => {
              const getBadgeClass = (juara: string) => {
                const j = (juara ?? '').toLowerCase();
                if (j.includes('juara 1')) return 'ribbon-badge-gold';
                if (j.includes('juara 2')) return 'ribbon-badge-silver';
                if (j.includes('juara 3')) return 'ribbon-badge-bronze';
                return 'ribbon-badge-teal';
              };
              return (
                <Card key={index} className="achievement-card card-premium h-[350px] sm:h-[400px] lg:h-[450px] group bg-white dark:bg-gray-800 border-0 shadow-2xl rounded-[2.5rem] overflow-hidden">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/prestasi/${achievement.foto}`}
                      alt={achievement.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-10 transform group-hover:-translate-y-4 transition-transform duration-700">
                      <div className="mb-4">
                        <div className={`ribbon-badge ${getBadgeClass(achievement.juara)} text-[10px]`}>
                          {achievement.juara}
                        </div>
                      </div>
                      <h3 className="mb-2 text-xl font-black text-white leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-(--color-sun-500) transition-colors font-outfit">
                        {truncateWords(achievement.name, 10)}
                      </h3>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild variant="outline-brand" className="rounded-full px-12 py-8 text-lg font-bold shadow-xl" size="lg">
              <Link href="/prestasi-sekolah">Prestasi Sekolah</Link>
            </Button>
            <Button asChild className="bg-(--color-forest-450) hover:bg-(--color-forest-500) text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all" size="lg">
              <Link href="/prestasi-siswa">Prestasi Siswa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dukungan Section */}
      <section className="gsap-partners relative py-24 overflow-hidden bg-(--color-cloud-100) border-t border-gray-100 dark:bg-gray-950 dark:border-gray-800">
        <div className="container relative z-10 px-4 mx-auto text-center">
          <Badge className="badge-primary mb-6">
            PARTNER KAMI
          </Badge>
          <h2 className="mb-16 text-3xl font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] font-outfit">Dukungan & Kerja Sama</h2>

          <div className="marquee-container">
            <div className="marquee-content">
              {dukungan?.map((partner, index) => (
                <div key={index} className="partner-logo group relative flex flex-col items-center mx-8 lg:mx-12">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/cooperation/${partner.foto}`}
                      alt={partner.name}
                      width={160}
                      height={160}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest font-quicksand">{partner.name}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {dukungan?.map((partner, index) => (
                <div key={`dup-${index}`} className="partner-logo group relative flex flex-col items-center mx-8 lg:mx-12">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/cooperation/${partner.foto}`}
                      alt={partner.name}
                      width={160}
                      height={160}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest font-quicksand">{partner.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Penghargaan Section */}
      <section className="gsap-awards relative py-24 overflow-hidden bg-(--color-paper-50) dark:bg-gray-900 blob-bg">
        <div className="container relative z-10 px-4 mx-auto text-center">
          <Badge className="badge-gold mb-6">
            PENGHARGAAN
          </Badge>
          <h2 className="mb-8 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">Penghargaan Nasional</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-16 lg:gap-32">
            <div className="group flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-(--color-forest-450)/30 to-(--color-teal-400)/20 blur-[50px] rounded-full scale-125 animate-pulse" />
                <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-(--color-forest-450) to-(--color-forest-500) rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="ribbon-badge ribbon-badge-forest mb-4 shadow-xl">SRA</div>
              <p className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tight font-outfit">Sekolah Ramah Anak</p>
            </div>
            <div className="group flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-(--color-sun-500)/30 to-(--color-sun-300)/20 blur-[50px] rounded-full scale-125 animate-pulse" />
                <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-(--color-sun-500) to-(--color-sun-400) rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="ribbon-badge ribbon-badge-gold mb-4 shadow-xl">ADIWIYATA</div>
              <p className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tight font-outfit">Sekolah Adiwiyata</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gsap-cta py-32 bg-gradient-to-br from-(--color-forest-900) via-(--color-forest-450) to-(--color-forest-800) text-white relative overflow-hidden islamic-pattern blob-bg">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-(--color-sun-500)/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-(--color-teal-400)/15 rounded-full blur-3xl animate-float" />
        </div>

        <div className="cta-content container relative z-10 px-4 mx-auto text-center">
          <h2 className="mb-8 text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-balance leading-tight font-outfit animate-fade-in-up">
            Mulai Perjalanan <br />Kreatif Anak Anda!
          </h2>
          <p className="max-w-2xl mx-auto mb-16 text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 font-medium font-quicksand animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Pendaftaran peserta didik baru telah dibuka. Kuota terbatas, amankan kursi putra-putri Anda segera.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="bg-(--color-sun-500) hover:bg-(--color-sun-400) text-gray-900 rounded-full px-16 py-10 text-2xl shadow-[0_30px_70px_rgba(232,163,61,0.5)] hover:shadow-[0_35px_80px_rgba(232,163,61,0.6)] hover:scale-105 transition-all font-black">
              <Link href="https://ppdb.sdmuh3smd.com">Daftar Online <ChevronRight className="w-8 h-8 ml-2 inline" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-16 py-10 text-2xl font-bold border-4 border-white/30 text-white hover:bg-white/15 rounded-full backdrop-blur-xl transition-all hover:scale-105">
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
