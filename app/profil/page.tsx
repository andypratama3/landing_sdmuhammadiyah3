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
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfilPage() {
  const schoolInfo = [
    { label: "Nama Sekolah", value: "SD Muhammadiyah 3 Samarinda" },
    { label: "NPSN", value: "30404112" },
    { label: "Akreditasi", value: "UNGGUL (A)" },
    { label: "Alamat", value: "Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang " },
    { label: "Kota", value: "Samarinda" },
    { label: "Provinsi", value: "Kalimantan Timur" },
    { label: "Kode Pos", value: "75242" },
    { label: "Telepon", value: "(054) 1260066" },
    { label: "Email", value: "sekolahkreatifmuh3@gmail.com" },
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
      <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <Breadcrumb items={[{ label: "Profil Sekolah" }]} />
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Profil Sekolah</Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Profil Lengkap Sekolah</h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Mengenal lebih dalam tentang identitas, struktur, dan sistem pendidikan kami
            </p>
          </div>
        </div>
      </section>

      {/* School Identity */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Identitas</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Identitas Sekolah</h2>
            <p className="text-lg text-gray-600">Data lengkap sekolah kami</p>
          </div>
          <Card className="max-w-4xl p-10 mx-auto border-2 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {schoolInfo.map((info, index) => (
                <div key={index} className="flex items-start justify-between pb-4 border-b border-gray-100">
                  <span className="font-medium text-gray-600">{info.label}</span>
                  <span className="font-semibold text-right text-gray-900">{info.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Principal Message */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Kepala Sekolah</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Sambutan Kepala Sekolah</h2>
          </div>
          <Card className="max-w-5xl p-10 mx-auto border-0 shadow-xl md:p-12 rounded-3xl">
            <div className="grid items-center gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-[#33b962] shadow-xl mb-4">
                  <img
                    src="/kepala-sekolah.jpeg"
                    alt="Kepala Sekolah"
                    className="object-contain w-full h-full "
                  />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900">Ansar HS. S.Pd.,M.M. Gr.</h3>
                <p className="text-[#33b962] font-semibold">Kepala Sekolah</p>
              </div>
              <div className="md:col-span-2">
                <p className="mb-4 leading-relaxed text-gray-700">
                  <span className="font-semibold">Assalamu'alaikum Warahmatullahi Wabarakatuh,</span>
                </p>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Puji syukur kehadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya. SD Muhammadiyah 3
                  Samarinda berkomitmen untuk memberikan pendidikan terbaik bagi putra-putri Anda. Kami tidak hanya
                  fokus pada pencapaian akademik, tetapi juga pembentukan karakter Islami yang kuat, kreativitas, dan
                  keterampilan abad 21.
                </p>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Melalui metode pembelajaran yang inovatif berbasis edutainment dan didukung oleh tenaga pengajar
                  profesional, kami yakin dapat menghasilkan generasi yang cerdas, berakhlak mulia, dan siap menghadapi
                  masa depan dengan penuh percaya diri.
                </p>
                <p className="italic leading-relaxed text-gray-700">
                  <span className="font-semibold">Wassalamu'alaikum Warahmatullahi Wabarakatuh</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Organisasi</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Struktur Organisasi</h2>
            <p className="text-lg text-gray-600">Tim manajemen sekolah kami</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-6">
              {/* Kepala Sekolah */}
              <Card className="p-8 text-center rounded-3xl bg-linear-to-br from-[#33b962] to-[#2a9d52] text-white shadow-xl">
                <h3 className="mb-2 text-2xl font-bold">Kepala Sekolah</h3>
                <p className="text-lg text-white/90">Ansar HS. S.Pd.,M.M. Gr.</p>
              </Card>

              {/* Wakil Kepala */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="p-8 text-center rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-[#33b962]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Bendahara Sekolah</h3>
                  <p className="text-sm text-gray-600">PRANANDA PRIYANDAN MAHMUD, S.E.</p>
                </Card>

                <Card className="p-8 text-center rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#33b962]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Wakil Kepala Bidang Kesiswaan</h3>
                  <p className="text-sm text-gray-600">MISBAHUL JUM'AH, S.Pd.I</p>
                </Card>

                <Card className="p-8 text-center rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
                  <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#33b962]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">Wakil Kepala Humas</h3>
                  <p className="text-sm text-gray-600">Fadhilaturrahman S.Pd</p>
                </Card>
              </div>
              <Link href="/tenaga-pendidikan">
                <Card className="p-8 text-center rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">                
                  <div className="w-16 h-16 bg-[#33b962]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-[#33b962]" />
                  </div>
                  <p className="text-sm text-gray-600">Lihat Selengkapnya</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* School Philosophy & Values */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#ffd166] text-gray-900 px-4 py-2">Nilai</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Nilai-Nilai Sekolah</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Prinsip dan filosofi yang menjadi fondasi pendidikan kami
            </p>
          </div>
          <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center transition-all duration-300 border-0 shadow-lg rounded-3xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Kurikulum</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Kurikulum Pembelajaran</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Sistem pendidikan yang komprehensif dan terintegrasi
            </p>
          </div>
          <div className="grid max-w-5xl gap-6 mx-auto md:grid-cols-2">
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
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Fasilitas</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Fasilitas Sekolah</h2>
            <p className="mb-8 text-lg text-gray-600">Sarana dan prasarana lengkap untuk mendukung pembelajaran</p>
            <Button asChild className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full px-8" size="lg">
              <Link href="/fasilitas">Lihat Semua Fasilitas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Academic Calendar & Regulations */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Dokumen & Informasi</h2>
          </div>
          <div className="grid max-w-4xl gap-6 mx-auto md:grid-cols-2">
            <Card className="p-8 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
              <Calendar className="w-12 h-12 text-[#33b962] mb-4" />
              <h3 className="mb-2 text-xl font-bold text-gray-900">Kalender Akademik</h3>
              <p className="mb-4 text-gray-600">Jadwal kegiatan akademik tahun ajaran 2025/2026</p>
             <Button
                  asChild
                  variant="outline"
                  className="flex items-center bg-transparent rounded-full"
                >
                  <a href="/Kalender Pendidikan-TP-2025-2026.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    <span className="text-sm">Download PDF</span>
                  </a>
                </Button>
            </Card>

            <Card className="p-8 rounded-3xl border-2 hover:border-[#33b962]/30 transition-all hover:shadow-lg">
              <FileText className="w-12 h-12 text-[#33b962] mb-4" />
              <h3 className="mb-2 text-xl font-bold text-gray-900">Tata Tertib Sekolah</h3>
              <p className="mb-4 text-gray-600">Peraturan dan tata tertib siswa</p>
              <Button variant="outline" className="bg-transparent rounded-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-20 bg-linear-to-br from-[#33b962]/5 to-[#ffd166]/5">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Sertifikasi</Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Akreditasi & Penghargaan</h2>
            <p className="text-lg text-gray-600">Pengakuan kualitas pendidikan kami</p>
          </div>
          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-[#33b962] mb-3">UNGGUL</h3>
              <p className="font-medium text-gray-600">Akreditasi BAN-S/M</p>
            </Card>

            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-[#ffd166] to-[#ffca3a] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Sekolah Penggerak</h3>
              <p className="font-medium text-gray-600">Program Kemendikbud</p>
            </Card>

            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-[#06d6a0] to-[#05b88c] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Adiwiyata</h3>
              <p className="font-medium text-gray-600">Sekolah Peduli Lingkungan</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
