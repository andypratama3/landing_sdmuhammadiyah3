"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/breadcrumb"
import { Target, Eye, Heart, Users, Building2, Award, BookOpen, Shield, CheckCircle } from "lucide-react"
import { Fotosekolah } from '@/types/fotosekolah.types';
import { useApi } from "@/hooks/useApi"
import { FotoSekolahCard } from '@/components/tentang/fotoSekolahCard'

export default function TentangPage() {
  const timeline = [
    {
      year: "1978",
      event: "Terbit SK Operasional Nomor 220/608/DP.IVB/05/1978 (3 Mei 1978)"
    },
    {
      year: "1979",
      event: "Pendirian SD Muhammadiyah 3 Samarinda pada 24 Juli 1979 dengan SK Nomor 3855/I-13/KTM-57/1979"
    },
    {
      year: "2006",
      event: "Meraih Akreditasi B (SK Nomor 125/BAS-SDM/12/2006)"
    },
    {
      year: "2010",
      event: "Bertransformasi menjadi Sekolah Kreatif SD Muhammadiyah 3 Samarinda dan menerapkan pembelajaran kreatif"
    },
    {
      year: "2015",
      event: "Meraih Akreditasi A (SK Nomor 308/BAP/SM/HK/X/2015)"
    },
    {
      year: "2020",
      event: "Kepemimpinan dilanjutkan oleh Bapak Ansar HS, S.Pd., M.M., Gr."
    },
    {
      year: "2021",
      event: "Meraih Akreditasi A (Unggul) dengan SK Nomor 1347/BAN-SM/SK/2021"
    }
  ];


  const { data: fotosekolah, loading: fotosekolahLoading } = useApi<Fotosekolah[]>(
    '/tentang/foto-sekolah',
    {
      cache: true,
      cacheTTL: 3600000,
      immediate: true,
    }
  );

  const reasons = [
    {
      icon: BookOpen,
      title: "Metode Pembelajaran Kreatif",
      description:
        "Pendekatan pembelajaran yang menyenangkan dan inovatif sesuai perkembangan anak dengan metode edutainment",
    },
    {
      icon: Users,
      title: "Guru Berkualitas & Berpengalaman",
      description: "Tim pengajar profesional dengan latar belakang pendidikan yang mumpuni dan bersertifikat",
    },
    {
      icon: Building2,
      title: "Fasilitas Lengkap & Modern",
      description: "Sarana dan prasarana modern untuk mendukung proses belajar yang optimal",
    },
    {
      icon: Award,
      title: "Prestasi Gemilang",
      description: "Raihan prestasi akademik dan non-akademik tingkat kota, provinsi, hingga nasional",
    },
    {
      icon: Heart,
      title: "Pembentukan Karakter Islami",
      description: "Pembiasaan akhlak mulia dan nilai-nilai Islami sejak dini",
    },
    {
      icon: Shield,
      title: "Lingkungan Aman & Nyaman",
      description: "Suasana sekolah yang kondusif dengan sistem keamanan terpadu",
    },
  ]

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto">
          <Breadcrumb items={[{ label: "Tentang Kami" }]} />
          <div className="max-w-4xl mx-auto mt-12 text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-bold uppercase tracking-widest text-[10px]">
              Eksplorasi Tentang Kami
            </Badge>
            <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md text-balance">
              Sekolah Kreatif SD Muhammadiyah 3 Samarinda
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Mewujudkan generasi kreatif, inovatif, dan berakhlak mulia melalui sistem pendidikan yang menyenangkan.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-emerald-100 text-[#33b962] dark:bg-emerald-950/30 dark:text-emerald-400 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">Filosofi Pendidikan</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Visi & Misi</h2>
            <p className="max-w-2xl mx-auto text-lg font-medium text-gray-600 dark:text-gray-400">Arah dan tujuan utama perjuangan pendidikan kami</p>
          </div>
          <div className="grid max-w-7xl gap-8 mx-auto lg:grid-cols-2">
            <Card className="card-premium p-12 glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-[1.02]">
              <div className="w-24 h-24 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-[2rem] flex items-center justify-center mb-8 shadow-xl group-hover:rotate-6 transition-all duration-500 brightness-110 filter drop-shadow-[0_15px_20px_rgba(51,185,98,0.3)]">
                <Eye className="w-12 h-12 text-white brightness-110" />
              </div>
              <h2 className="mb-6 text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Visi Kami</h2>
              <p className="text-xl leading-relaxed font-medium text-gray-700 dark:text-gray-300">
                Menjadi sekolah dasar Islam terdepan yang menghasilkan generasi kreatif, berakhlak mulia, cerdas, dan
                berprestasi dengan dilandasi nilai-nilai Islami dan kearifan lokal.
              </p>
            </Card>

            <Card className="card-premium p-12 glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-[1.02]">
              <div className="w-24 h-24 bg-linear-to-br from-[#06d6a0] to-[#05b88c] rounded-[2rem] flex items-center justify-center mb-8 shadow-xl group-hover:rotate-6 transition-all duration-500 brightness-110 filter drop-shadow-[0_15px_20px_rgba(6,214,160,0.3)]">
                <Target className="w-12 h-12 text-white brightness-110" />
              </div>
              <h2 className="mb-6 text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Misi Strategis</h2>
              <ul className="space-y-4">
                {[
                  "Menyelenggarakan pendidikan berkualitas berbasis kreativitas dan inovasi",
                  "Membentuk karakter Islami melalui pembiasaan akhlak mulia",
                  "Mengembangkan potensi akademik dan non-akademik siswa secara optimal",
                  "Menciptakan lingkungan belajar yang kondusif, aman, dan menyenangkan",
                  "Menjalin kemitraan dengan orang tua dan masyarakat"
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-5 h-5 text-[#33b962]" />
                    </div>
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>


      {/* Timeline */}
      <section className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-emerald-100 text-[#33b962] dark:bg-emerald-950/30 dark:text-emerald-400 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">Sejarah</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Jarak Langkah Kami</h2>
            <p className="max-w-2xl mx-auto text-lg font-medium text-gray-600 dark:text-gray-400">
              Sejarah panjang pengabdian dalam menciptakan pendidikan berkualitas
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex gap-8 mb-12 group">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-[1.5rem] flex items-center justify-center text-white font-black text-xl shrink-0 shadow-xl group-hover:scale-110 transition-all duration-500 brightness-110 filter drop-shadow-[0_10px_15px_rgba(51,185,98,0.2)]">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && <div className="w-1 h-full bg-linear-to-b from-[#33b962]/40 to-[#33b962]/5 mt-4" />}
                </div>
                <div className="flex-1 pb-12">
                  <Card className="card-premium p-8 glass dark:bg-gray-900/40 border-0 shadow-lg hover:shadow-2xl transition-all">
                    <p className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed">{item.event}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#ffd166] text-gray-900 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-yellow-500/10">Keunggulan</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Mengapa Memilih Kami?</h2>
            <p className="max-w-2xl mx-auto text-lg font-medium text-gray-600 dark:text-gray-400">
              Alasan utama mempercayakan pendidikan masa depan cerah putra-putri Anda kepada kami
            </p>
          </div>
          <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <Card
                key={index}
                className="card-premium p-10 glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-105"
              >
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-[#33b962] transition-all duration-500 shadow-inner">
                  <reason.icon className="w-10 h-10 text-[#33b962] group-hover:text-white transition-colors brightness-110" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">{reason.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-emerald-100 text-[#33b962] dark:bg-emerald-950/30 dark:text-emerald-400 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">Visualisasi</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Dokumentasi Sekolah</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Suasana belajar dan fasilitas unggulan SD Muhammadiyah 3 Samarinda</p>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <FotoSekolahCard
                galleries={fotosekolah}
                loading={fotosekolahLoading}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}