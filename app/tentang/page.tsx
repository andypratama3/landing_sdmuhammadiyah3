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
    { year: "2010", event: "Pendirian SD Muhammadiyah 3 Samarinda" },
    { year: "2012", event: "Pembukaan program Tahfidz Al-Qur'an" },
    { year: "2015", event: "Akreditasi A pertama kali diraih" },
    { year: "2018", event: "Perluasan fasilitas dan gedung baru" },
    { year: "2020", event: "Implementasi sistem pembelajaran digital" },
    { year: "2022", event: "Menjadi Sekolah Penggerak" },
    { year: "2023", event: "Meraih Akreditasi Unggul" },
  ]

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
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <Breadcrumb items={[{ label: "Tentang Kami" }]} />
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Tentang Kami</Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">SD Muhammadiyah 3 Samarinda</h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Sekolah Kreatif dengan Pembelajaran Inovatif dan Berkarakter
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container px-4 py-20 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Visi & Misi</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">Arah dan tujuan pendidikan kami</p>
        </div>
        <div className="grid max-w-6xl gap-8 mx-auto lg:grid-cols-2">
          <Card className="p-10 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all bg-linear-to-br from-white to-gray-50">
            <div className="w-20 h-20 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Visi</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Menjadi sekolah dasar Islam terdepan yang menghasilkan generasi kreatif, berakhlak mulia, cerdas, dan
              berprestasi dengan dilandasi nilai-nilai Islami dan kearifan lokal.
            </p>
          </Card>

          <Card className="p-10 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all bg-linear-to-br from-white to-gray-50">
            <div className="w-20 h-20 bg-linear-to-br from-[#06d6a0] to-[#05b88c] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Misi</h2>
            <ul className="space-y-3 text-lg leading-relaxed text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] shrink-0 mt-1" />
                <span>Menyelenggarakan pendidikan berkualitas berbasis kreativitas dan inovasi</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] shrink-0 mt-1" />
                <span>Membentuk karakter Islami melalui pembiasaan akhlak mulia</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] shrink-0 mt-1" />
                <span>Mengembangkan potensi akademik dan non-akademik siswa secara optimal</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] shrink-0 mt-1" />
                <span>Menciptakan lingkungan belajar yang kondusif, aman, dan menyenangkan</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] shrink-0 mt-1" />
                <span>Menjalin kemitraan dengan orang tua dan masyarakat</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>  

      {/* Timeline */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Sejarah</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Sejarah Perjalanan Kami</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Jejak langkah kami dalam menciptakan pendidikan berkualitas
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex gap-8 mb-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && <div className="w-1 h-full bg-[#33b962]/20 mt-4" />}
                </div>
                <div className="flex-1 pb-10">
                  <Card className="p-6 rounded-2xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                    <p className="text-lg font-semibold text-gray-900">{item.event}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#ffd166] text-gray-900 px-4 py-2">Keunggulan</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Mengapa Memilih Kami?</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Alasan orang tua mempercayakan pendidikan putra-putrinya kepada kami
            </p>
          </div>
          <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <Card
                key={index}
                className="p-8 transition-all duration-300 border-0 shadow-lg rounded-3xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mb-6">
                  <reason.icon className="w-8 h-8 text-[#33b962]" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{reason.title}</h3>
                <p className="leading-relaxed text-gray-600">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Gallery</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Foto Sekolah</h2>
            <p className="text-lg text-gray-600">Suasana dan kegiatan di SD Muhammadiyah 3 Samarinda</p>
          </div>
          <div className="grid max-w-6xl grid-cols-2 gap-6 mx-auto md:grid-cols-3">
            <FotoSekolahCard
              galleries={fotosekolah} 
              loading={fotosekolahLoading} 
            />  
          </div>
        </div>
      </section>
    </div>
  )
}