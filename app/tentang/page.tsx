import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/breadcrumb"
import { Target, Eye, Heart, Users, Building2, Award, BookOpen, Shield, CheckCircle } from "lucide-react"

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

  const galleries = [
    { image: "/school-building-front-view.jpg", caption: "Gedung Sekolah" },
    { image: "/students-morning-assembly.jpg", caption: "Upacara Bendera" },
    { image: "/classroom-interactive-learning.jpg", caption: "Ruang Kelas Modern" },
    { image: "/students-outdoor-activities.jpg", caption: "Kegiatan Outdoor" },
    { image: "/islamic-studies-class.jpg", caption: "Pembelajaran Agama" },
    { image: "/school-library-kids-reading.jpg", caption: "Perpustakaan" },
  ]

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Tentang Kami" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Tentang Kami</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">SD Muhammadiyah 3 Samarinda</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Sekolah Kreatif dengan Pembelajaran Inovatif dan Berkarakter
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Arah dan tujuan pendidikan kami</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-10 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all bg-gradient-to-br from-white to-gray-50">
            <div className="w-20 h-20 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi sekolah dasar Islam terdepan yang menghasilkan generasi kreatif, berakhlak mulia, cerdas, dan
              berprestasi dengan dilandasi nilai-nilai Islami dan kearifan lokal.
            </p>
          </Card>

          <Card className="p-10 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all bg-gradient-to-br from-white to-gray-50">
            <div className="w-20 h-20 bg-gradient-to-br from-[#06d6a0] to-[#05b88c] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi</h2>
            <ul className="text-gray-700 text-lg leading-relaxed space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] flex-shrink-0 mt-1" />
                <span>Menyelenggarakan pendidikan berkualitas berbasis kreativitas dan inovasi</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] flex-shrink-0 mt-1" />
                <span>Membentuk karakter Islami melalui pembiasaan akhlak mulia</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] flex-shrink-0 mt-1" />
                <span>Mengembangkan potensi akademik dan non-akademik siswa secara optimal</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] flex-shrink-0 mt-1" />
                <span>Menciptakan lingkungan belajar yang kondusif, aman, dan menyenangkan</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#33b962] flex-shrink-0 mt-1" />
                <span>Menjalin kemitraan dengan orang tua dan masyarakat</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Sejarah</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sejarah Perjalanan Kami</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Jejak langkah kami dalam menciptakan pendidikan berkualitas
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-8 mb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && <div className="w-1 h-full bg-[#33b962]/20 mt-4" />}
                </div>
                <div className="pb-10 flex-1">
                  <Card className="p-6 rounded-2xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                    <p className="text-gray-900 text-lg font-semibold">{item.event}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#ffd166] text-gray-900 px-4 py-2">Keunggulan</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Alasan orang tua mempercayakan pendidikan putra-putrinya kepada kami
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reasons.map((reason, index) => (
              <Card
                key={index}
                className="p-8 rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300"
              >
                <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mb-6">
                  <reason.icon className="w-8 h-8 text-[#33b962]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Gallery</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Galeri Foto Sekolah</h2>
            <p className="text-gray-600 text-lg">Suasana dan kegiatan di SD Muhammadiyah 3 Samarinda</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleries.map((gallery, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={gallery.image || "/placeholder.svg"}
                    alt={gallery.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white font-semibold p-6">{gallery.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
