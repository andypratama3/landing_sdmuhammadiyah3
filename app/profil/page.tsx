import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/breadcrumb"
import {
  Award,
  Users,
  Shield,
  Sparkles,
  BookOpen,
  Heart,
  CheckCircle,
  FileText,
  Download,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfilPage() {
  const schoolInfo = [
    { label: "Nama Sekolah", value: "SD Muhammadiyah 3 Samarinda" },
    { label: "NPSN", value: "30400890" },
    { label: "Akreditasi", value: "UNGGUL (A)" },
    { label: "Alamat", value: "Jl. Pendidikan No. 123, Samarinda" },
    { label: "Kota", value: "Samarinda" },
    { label: "Provinsi", value: "Kalimantan Timur" },
    { label: "Kode Pos", value: "75117" },
    { label: "Telepon", value: "(0541) 123-4567" },
    { label: "Email", value: "info@sdmuhammadiyah3smd.com" },
    { label: "Website", value: "www.sdmuhammadiyah3smd.com" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Integritas",
      description: "Menjunjung tinggi kejujuran, amanah, dan nilai-nilai moral dalam setiap tindakan",
    },
    {
      icon: Sparkles,
      title: "Kreativitas",
      description: "Mendorong inovasi, pemikiran kreatif, dan pembelajaran yang menyenangkan",
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Membangun kerjasama solid antara guru, siswa, orang tua, dan masyarakat",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Komitmen terhadap kualitas, prestasi terbaik, dan peningkatan berkelanjutan",
    },
  ]

  const curriculum = [
    {
      title: "Kurikulum Merdeka",
      description: "Mengadopsi kurikulum terbaru dari Kemendikbud dengan fokus pada pengembangan kompetensi",
    },
    {
      title: "Kurikulum Muhammadiyah",
      description: "Integrasi nilai-nilai ke-Islaman dan ke-Muhammadiyahan dalam setiap mata pelajaran",
    },
    { title: "Program Tahfidz", description: "Target hafalan 2 juz (29-30) dengan metode yang mudah dan menyenangkan" },
    {
      title: "Pembelajaran Berbasis IT",
      description: "Pemanfaatan teknologi dalam proses pembelajaran untuk kesiapan era digital",
    },
  ]

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Profil Sekolah" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Profil Sekolah</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Profil Lengkap Sekolah</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Mengenal lebih dalam tentang identitas, struktur, dan sistem pendidikan kami
            </p>
          </div>
        </div>
      </section>

      {/* School Identity */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Identitas</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Identitas Sekolah</h2>
            <p className="text-gray-600 text-lg">Data lengkap sekolah kami</p>
          </div>
          <Card className="max-w-4xl mx-auto p-10 rounded-3xl border-2">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {schoolInfo.map((info, index) => (
                <div key={index} className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <span className="text-gray-600 font-medium">{info.label}</span>
                  <span className="text-gray-900 font-semibold text-right">{info.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Principal Message */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Kepala Sekolah</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sambutan Kepala Sekolah</h2>
          </div>
          <Card className="max-w-5xl mx-auto p-10 md:p-12 rounded-3xl border-0 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-[#33b962] shadow-xl mb-4">
                  <img
                    src="/kepala-sekolah.jpeg"
                    alt="Kepala Sekolah"
                    className="w-full h-full object-contain "
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">Ansar HS. S.Pd.,M.M. Gr.</h3>
                <p className="text-[#33b962] font-semibold">Kepala Sekolah</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <span className="font-semibold">Assalamu'alaikum Warahmatullahi Wabarakatuh,</span>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Puji syukur kehadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya. SD Muhammadiyah 3
                  Samarinda berkomitmen untuk memberikan pendidikan terbaik bagi putra-putri Anda. Kami tidak hanya
                  fokus pada pencapaian akademik, tetapi juga pembentukan karakter Islami yang kuat, kreativitas, dan
                  keterampilan abad 21.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Melalui metode pembelajaran yang inovatif berbasis edutainment dan didukung oleh tenaga pengajar
                  profesional, kami yakin dapat menghasilkan generasi yang cerdas, berakhlak mulia, dan siap menghadapi
                  masa depan dengan penuh percaya diri.
                </p>
                <p className="text-gray-700 leading-relaxed italic">
                  <span className="font-semibold">Wassalamu'alaikum Warahmatullahi Wabarakatuh</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Organisasi</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Struktur Organisasi</h2>
            <p className="text-gray-600 text-lg">Tim manajemen sekolah kami</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-6">
              {/* Kepala Sekolah */}
              <Card className="p-8 text-center rounded-3xl bg-gradient-to-br from-[#33b962] to-[#2a9d52] text-white shadow-xl">
                <h3 className="font-bold text-2xl mb-2">Kepala Sekolah</h3>
                <p className="text-lg text-white/90">Ansar HS. S.Pd.,M.M. Gr.</p>
              </Card>

              {/* Wakil Kepala */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-8 text-center rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-[#33b962]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Wakil Kepala Kurikulum</h3>
                  <p className="text-sm text-gray-600">Siti Nurhaliza, S.Pd</p>
                </Card>

                <Card className="p-8 text-center rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#33b962]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Wakil Kepala Kesiswaan</h3>
                  <p className="text-sm text-gray-600">Budi Santoso, M.Pd</p>
                </Card>

                <Card className="p-8 text-center rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#33b962]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Wakil Kepala Humas</h3>
                  <p className="text-sm text-gray-600">Rina Kusuma, S.Pd</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Philosophy & Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#ffd166] text-gray-900 px-4 py-2">Nilai</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nilai-Nilai Sekolah</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Prinsip dan filosofi yang menjadi fondasi pendidikan kami
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Kurikulum</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kurikulum Pembelajaran</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sistem pendidikan yang komprehensif dan terintegrasi
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {curriculum.map((item, index) => (
              <Card
                key={index}
                className="p-8 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#33b962]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#33b962]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Fasilitas</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fasilitas Sekolah</h2>
            <p className="text-gray-600 text-lg mb-8">Sarana dan prasarana lengkap untuk mendukung pembelajaran</p>
            <Button asChild className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full px-8" size="lg">
              <Link href="/fasilitas">Lihat Semua Fasilitas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Academic Calendar & Regulations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dokumen & Informasi</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-8 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
              <Calendar className="w-12 h-12 text-[#33b962] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kalender Akademik</h3>
              <p className="text-gray-600 mb-4">Jadwal kegiatan akademik tahun ajaran 2025/2026</p>
              <Button variant="outline" className="rounded-full bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </Card>

            <Card className="p-8 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
              <FileText className="w-12 h-12 text-[#33b962] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tata Tertib Sekolah</h3>
              <p className="text-gray-600 mb-4">Peraturan dan tata tertib siswa</p>
              <Button variant="outline" className="rounded-full bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-20 bg-gradient-to-br from-[#33b962]/5 to-[#ffd166]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Sertifikasi</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Akreditasi & Penghargaan</h2>
            <p className="text-gray-600 text-lg">Pengakuan kualitas pendidikan kami</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-10 text-center rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-[#33b962] mb-3">UNGGUL</h3>
              <p className="text-gray-600 font-medium">Akreditasi BAN-S/M</p>
            </Card>

            <Card className="p-10 text-center rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ffd166] to-[#ffca3a] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sekolah Penggerak</h3>
              <p className="text-gray-600 font-medium">Program Kemendikbud</p>
            </Card>

            <Card className="p-10 text-center rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-[#06d6a0] to-[#05b88c] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Adiwiyata</h3>
              <p className="text-gray-600 font-medium">Sekolah Peduli Lingkungan</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
