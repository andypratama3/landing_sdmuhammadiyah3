"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { useApi } from '@/hooks/useApi';
import { GalleryCard } from "@/components/landing/gallery-component"
import { Gallery } from '@/types/gallery.types'
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
  Info,
  Wallet,
  MessageCircle,
  ChevronRight,
} from "lucide-react"


interface CountData {
  siswa: number;
  guru: number;
  fasilitas: number;
  prestasis_siswa: number;
  prestasis_sekolah: number;
}


export default function Home() {

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
    { title: "FASILITAS", image: "/placeholder.svg?height=300&width=400", link: "/fasilitas" },
    { title: "PRESTASI SISWA", image: "/placeholder.svg?height=300&width=400", link: "/prestasi-siswa" },
    { title: "PRESTASI SEKOLAH", image: "/placeholder.svg?height=300&width=400", link: "/prestasi-sekolah" },
  ]

  const { data: galleries, loading: galleryLoading, error: galleryError } = useApi<Gallery[]>('/gallery-landing', {
      cache: true,
      cacheTTL: 3600000,
      immediate: true,
  });

  const systemInfo = [
    {
      icon: Info,
      title: "Informasi Lengkap Sekolah",
      description: "Akses informasi sekolah kapan saja dan dimana saja melalui website",
    },
    {
      icon: Wallet,
      title: "Pembayaran Digital",
      description: "Sistem pembayaran online yang mudah, aman, dan terpercaya",
    },
    {
      icon: MessageCircle,
      title: "Pemberitahuan Pembayaran via WhatsApp",
      description: "Notifikasi otomatis status pembayaran langsung ke WhatsApp orang tua",
    },
  ]

  const achievements = [
    {
      name: "Alivna Hilya Zia",
      title: "Juara 2 Panahan",
      image: "/girl-archery-trophy.jpg",
    },
    {
      name: "Salsabil Raihanah & Andi Alfan",
      title: "O2SN Karate",
      image: "/kids-karate-medal.jpg",
    },
    {
      name: "Maryam",
      title: "Juara Harapan III Tahfidz",
      image: "/girl-quran-competition.jpg",
    },
    {
      name: "Naura Jasmine",
      title: "Juara 1 FLS3N Mendongeng",
      image: "/girl-storytelling-trophy.jpg",
    },
  ]

  const partners = [
    "Muhammadiyah",
    "KB Bank Syariah",
    "Majelis Pendidikan",
    "UMKT",
    "UKS",
    "Biro Psikologi",
    "Dinas Kesehatan",
    "Tilawati",
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#1a4d2e] dark:via-[#2a7a4a] dark:to-[#1f5c3a] py-24 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#ffd166]/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-[#ffd166]/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute w-3 h-3 rounded-full top-1/2 left-1/4 bg-white/40 animate-bounce-slow" />
        <div
          className="absolute w-2 h-2 rounded-full bottom-1/3 right-1/3 bg-white/30 animate-bounce-slow"
          style={{ animationDelay: "1s" }}
        />

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
            <div className="mb-8">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-transparent rounded-full shadow-2xl animate-bounce-slow">
                <Image src="/SD3_logo1.png" alt="Logo" width={100} height={100} className="object-contain" />
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl text-balance">
              SD MUHAMMADIYAH 3 SAMARINDA
            </h1>
            <p className="mb-4 text-2xl font-semibold md:text-3xl text-white/90">Sekolah Kreatif</p>
            <p className="max-w-3xl mx-auto mb-10 text-xl leading-relaxed text-white/80 text-balance">
              Pembelajaran Inovatif dan Berkarakter
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[#ffd166] hover:bg-[#ffca3a] text-gray-900 rounded-full px-10 py-6 text-lg shadow-2xl hover:scale-105 transition-all font-bold"
              >
                <Link href="/spmb">Daftar Sekarang</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-10 py-6 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-full hover:bg-white/10"
              >
                <Link href="#video" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Lihat Video Profil
                </Link>
              </Button>
            </div>
            <div className="mt-8 animate-bounce">
              <ChevronRight className="w-6 h-6 mx-auto rotate-90 text-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-8 text-center transition-all duration-300 border-0 hover:shadow-2xl hover:-translate-y-2 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#33b962] mb-2">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 dark:bg-[#33b962]/20 text-[#33b962] dark:text-[#4ade80] border-[#33b962]/20 px-4 py-2 text-sm">
              Program Unggulan
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white text-balance">Program Unggulan Kami</h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-400 text-balance">
              Program-program terbaik yang dirancang untuk mengembangkan potensi anak secara maksimal
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all group border-2 hover:border-[#33b962]/30 rounded-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-[#33b962]/10 dark:bg-[#33b962]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <program.icon className="w-8 h-8 text-[#33b962]" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white group-hover:text-[#33b962] dark:group-hover:text-[#4ade80] transition-colors leading-snug">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{program.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sekolah Penggerak & Akreditasi */}
      <section className="py-16 bg-[#33b962] dark:bg-[#1a4d2e]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
            <div className="text-center">
              <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl">
                <Star className="w-16 h-16 text-[#ffd166] fill-[#ffd166]" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Sekolah Penggerak</h3>
              <p className="text-white/80">Program Kemendikbud</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl">
                <Award className="w-16 h-16 text-[#33b962]" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">AKREDITASI UNGGUL</h3>
              <p className="text-white/80">Terakreditasi A</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {facilities.map((facility, index) => (
              <Link
                key={index}
                href={facility.link}
                className="relative overflow-hidden transition-all shadow-lg group rounded-3xl hover:shadow-2xl"
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="mb-2 text-3xl font-bold text-white">{facility.title}</h3>
                    <div className="flex items-center gap-2 text-white transition-all group-hover:gap-4">
                      <span className="text-sm font-medium">Lihat Detail</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Aktivitas Kami Section */}
     <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 dark:bg-[#33b962]/20 text-[#33b962] dark:text-[#4ade80] border-[#33b962]/20 px-4 py-2 text-sm">
              Gallery
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
              Aktivitas Kami
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 text-balance">
              Berbagai kegiatan menarik yang dilakukan siswa setiap harinya
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
            {galleryLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <GalleryCardSkeleton key={index} />
              ))}

            {!galleryLoading && galleryError && (
              <p className="text-center text-red-500 col-span-full">
                Gagal memuat galeri
              </p>
            )}

            {!galleryLoading &&
              galleries?.map((gallery) => (
                <GalleryCard key={gallery.id} gallery={gallery} />
              ))}
          </div>


          <div className="text-center">
            <Button
              asChild
              className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full px-8 shadow-lg"
              size="lg"
            >
              <Link href="/galeri">Lihat Semua Aktivitas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-gradient-to-br from-[#33b962]/5 to-[#ffd166]/5 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl dark:text-white text-balance">
              SD Muhammadiyah 3 Samarinda terus berinovasi mengikuti perkembangan teknologi
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden bg-gray-900 shadow-2xl rounded-3xl aspect-video dark:bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full w-20 h-20 p-0 shadow-2xl hover:scale-110 transition-all"
                >
                  <Play className="w-10 h-10 ml-1" />
                </Button>
              </div>
              <img
                src="/modern-school-classroom.png"
                alt="Video Preview"
                className="object-cover w-full h-full opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Informasi Sistem Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">Informasi Sistem</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Kemudahan akses informasi untuk orang tua dan siswa</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-12">
            {systemInfo.map((info, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className="w-20 h-20 bg-[#33b962]/10 dark:bg-[#33b962]/20 rounded-2xl flex items-center justify-center mb-6">
                    <info.icon className="w-10 h-10 text-[#33b962]" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{info.title}</h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">{info.description}</p>
                </div>
                <div className="flex-1">
                  <div className="aspect-video bg-gradient-to-br from-[#33b962]/10 to-[#ffd166]/10 dark:from-[#33b962]/20 dark:to-[#ffd166]/20 rounded-3xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#ffd166]/30 dark:bg-[#ffd166]/10 rounded-3xl blur-2xl" />
              <div className="relative overflow-hidden shadow-2xl rounded-3xl">
                <img src="/happy-children-classroom-learning.jpg" alt="Classroom" className="object-cover w-full h-full" />
              </div>
            </div>
            <div>
              <Badge className="mb-4 bg-[#33b962]/10 dark:bg-[#33b962]/20 text-[#33b962] dark:text-[#4ade80] border-[#33b962]/20 px-4 py-2 text-sm">
                Tentang Kami
              </Badge>
              <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">TENTANG SD MUHAMMADIYAH 3 SAMARINDA</h2>
              <h3 className="text-2xl font-semibold text-[#33b962] dark:text-[#4ade80] mb-6">
                Pembelajaran Inovatif dan Pengembangan Karakter
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
                SD Muhammadiyah 3 Samarinda adalah sekolah dasar Islam yang berkomitmen untuk menghasilkan generasi yang
                kreatif, berakhlak mulia, cerdas, dan berprestasi. Dengan metode pembelajaran inovatif berbasis
                edutainment, kami memastikan setiap anak berkembang secara optimal.
              </p>
              <Button
                asChild
                className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full px-8 shadow-lg"
                size="lg"
              >
                <Link href="/tentang">Profil Selengkapnya</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kepala Sekolah Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Kepala Sekolah SD Muhammadiyah 3 Samarinda</h2>
            <div className="relative inline-block mb-6">
              <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-[#33b962] shadow-xl mx-auto">
                <img src="/kepala-sekolah.jpeg" alt="Kepala Sekolah" className="object-contain w-full h-full dark" />
              </div>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Ansar HS. S.Pd.,M.M. Gr.</h3>
            <p className="text-[#33b962] dark:text-[#4ade80] font-medium mb-6">Kepala Sekolah</p>
            <div className="relative">
              <div className="absolute top-0 left-8 text-6xl text-[#33b962]/20 dark:text-[#33b962]/10">"</div>
              <p className="px-12 italic leading-relaxed text-gray-600 dark:text-gray-400">
                Kami berkomitmen untuk memberikan pendidikan terbaik yang menggabungkan ilmu pengetahuan, teknologi, dan
                nilai-nilai Islami untuk membentuk generasi yang unggul dan berakhlak mulia.
              </p>
              <div className="absolute bottom-0 right-8 text-6xl text-[#33b962]/20 dark:text-[#33b962]/10">"</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prestasi Terakhir Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#ffd166] dark:bg-[#ffd166]/20 text-gray-900 dark:text-[#ffd166] px-4 py-2 text-sm">Prestasi</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">Prestasi Terakhir Sang Juara</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Kebanggaan sekolah kami yang berprestasi</p>
          </div>
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className="overflow-hidden transition-all bg-white border-0 hover:shadow-xl group rounded-3xl dark:bg-gray-800">
                <div className="relative overflow-hidden h-72">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Trophy className="w-8 h-8 text-[#ffd166] mb-2" />
                    <h3 className="mb-1 text-lg font-bold">{achievement.name}</h3>
                    <p className="text-sm text-white/80">{achievement.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 border-2 border-[#33b962] text-[#33b962] dark:text-[#4ade80] dark:border-[#4ade80] hover:bg-[#33b962]/5 dark:hover:bg-[#33b962]/10 bg-transparent"
              size="lg"
            >
              <Link href="/prestasi-sekolah">Lihat Prestasi Sekolah</Link>
            </Button>
            <Button
              asChild
              className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full px-8 shadow-lg"
              size="lg"
            >
              <Link href="/prestasi-siswa">Lihat Prestasi Siswa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dukungan & Kerja Sama Section */}
      <section className="py-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-white">Dukungan & Kerja Sama</h2>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="px-6 py-4 transition-all bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 grayscale hover:grayscale-0"
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  <img src={partner} alt={partner} className="object-contain w-32 h-32" />
                  {partner}
                  </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penghargaan Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-white">Penghargaan</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#33b962] dark:bg-[#2a7a4a] rounded-3xl flex items-center justify-center mb-3 shadow-lg">
                <Check className="w-12 h-12 text-white" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Sekolah Ramah Anak</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#33b962] dark:bg-[#2a7a4a] rounded-3xl flex items-center justify-center mb-3 shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Adiwiyata</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#33b962] to-[#2a9d52] dark:from-[#1a4d2e] dark:to-[#2a7a4a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-white/10 blur-3xl" />

        <div className="container relative z-10 px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-6xl text-balance">Bergabunglah dengan Keluarga Besar Kami!</h2>
          <p className="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-white/90 text-balance">
            Daftarkan anak Anda sekarang dan berikan pendidikan terbaik untuk masa depan yang cerah
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#33b962] hover:bg-gray-100 rounded-full px-10 py-6 text-lg shadow-2xl hover:scale-105 transition-all font-bold"
            >
              <Link href="/spmb">Pendaftaran Online</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-10 py-6 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-full hover:bg-white/10"
            >
              <Link href="/kontak">Kunjungi Sekolah</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}