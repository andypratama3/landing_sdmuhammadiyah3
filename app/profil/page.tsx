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
import Image from "next/image"

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
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto">
          <Breadcrumb items={[{ label: "Profil Sekolah" }]} />
          <div className="max-w-4xl mx-auto mt-12 text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-bold uppercase tracking-widest text-[10px]">
              Eksplorasi Profil Sekolah
            </Badge>
            <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md">
              Mengenal Sekolah Kreatif SD Muhammadiyah 3 Samarinda Lebih Dekat
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Mengenal lebih dalam identitas, visi-misi, dan semangat kami dalam mencerdaskan generasi bangsa.
            </p>
          </div>
        </div>
      </section>

      {/* School Identity */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] dark:bg-[#33b962]/20 dark:text-[#33b962] border-emerald-500/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Identitas</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Data Resmi Sekolah</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Legalitas dan identitas lengkap SD Muhammadiyah 3</p>
          </div>
          <Card className="max-w-4xl p-10 sm:p-16 mx-auto card-premium glass dark:bg-gray-900/40 border-0">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
              {schoolInfo.map((info, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 gap-1">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400/70">{info.label}</span>
                  <span className="font-bold text-left sm:text-right text-gray-900 dark:text-white text-sm sm:text-base">{info.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Principal Message */}
      {/* Principal Message */}
      <section className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] dark:bg-[#33b962]/20 dark:text-[#33b962] border-emerald-500/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Pesan Kepemimpinan</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Sambutan Kepala Sekolah</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Visi dan harapan untuk masa depan pendidikan</p>
          </div>
          <Card className="max-w-6xl p-8 sm:p-12 mx-auto card-premium glass dark:bg-gray-900/40 border-0 shadow-2xl">
            <div className="grid items-center gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-linear-to-r from-[#33b962] to-[#ffd166] rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <Image
                      src="/kepala-sekolah.jpeg"
                      alt="Ansar HS. S.Pd.,M.M. Gr."
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110 bg-white"
                    />
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Ansar HS. S.Pd.,M.M. Gr.</h3>
                  <div className="inline-flex items-center gap-2 mt-2 px-6 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-[#33b962] font-black rounded-full text-xs uppercase tracking-widest">
                    <Shield className="w-3 h-3" />
                    Kepala Sekolah
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100/50 dark:border-emerald-800/20">
                  <p className="text-xl font-bold italic text-emerald-800 dark:text-emerald-300 leading-relaxed">
                    "Assalamu'alaikum Warahmatullahi Wabarakatuh,"
                  </p>
                </div>
                <div className="space-y-6 text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Puji syukur kehadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya. SD Muhammadiyah 3
                    Samarinda berkomitmen untuk memberikan pendidikan terbaik bagi putra-putri Anda. Kami tidak hanya
                    fokus pada pencapaian akademik, tetapi juga pembentukan karakter Islami yang kuat, kreativitas, dan
                    keterampilan abad 21.
                  </p>
                  <p>
                    Melalui metode pembelajaran yang inovatif berbasis edutainment dan didukung oleh tenaga pengajar
                    profesional, kami yakin dapat menghasilkan generasi yang cerdas, berakhlak mulia, dan siap menghadapi
                    masa depan dengan penuh percaya diri.
                  </p>
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      Wassalamu'alaikum Warahmatullahi Wabarakatuh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] dark:bg-[#33b962]/20 dark:text-[#33b962] border-emerald-500/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Organisasi</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Struktur Manajemen</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Tim penggerak kemajuan sekolah kami</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {/* Kepala Sekolah */}
              <Card className="p-12 text-center rounded-[2.5rem] bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] text-white shadow-2xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="mb-2 text-2xl font-black uppercase tracking-widest">Kepala Sekolah</h3>
                <p className="text-xl font-bold text-white/95">Ansar HS. S.Pd.,M.M. Gr.</p>
              </Card>

              {/* Wakil Kepala */}
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  { title: "Bendahara Sekolah", name: "PRANANDA PRIYANDAN MAHMUD, S.E.", icon: BookOpen },
                  { title: "Waka Bid. Kesiswaan", name: "MISBAHUL JUM'AH, S.Pd.I", icon: Users },
                  { title: "Wakil Kepala Humas", name: "Fadhilaturrahman S.Pd", icon: Heart }
                ].map((item, idx) => (
                  <Card key={idx} className="card-premium p-10 text-center glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-105">
                    <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#33b962] transition-all duration-500 shadow-inner group-hover:shadow-emerald-500/20">
                      <item.icon className="w-10 h-10 text-[#33b962] group-hover:text-white transition-colors brightness-110" />
                    </div>
                    <h3 className="mb-3 text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-tight">{item.name}</p>
                  </Card>
                ))}
              </div>

              <Link href="/tenaga-pendidikan">
                <Card className="p-8 text-center rounded-[2rem] glass dark:bg-gray-900/40 border-2 border-dashed border-emerald-500/20 hover:border-emerald-500 group transition-all">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-6 h-6 text-[#33b962]" />
                    </div>
                    <p className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Lihat Seluruh Tenaga Pendidik</p>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* School Philosophy & Values */}
      <section className="relative py-24 bg-linear-to-b from-gray-50/50 to-white dark:from-gray-950/50 dark:to-gray-950 transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#ffd166] text-gray-900 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-yellow-500/10">Value</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Nilai-Nilai Utama</h2>
            <p className="max-w-2xl mx-auto text-lg font-medium text-gray-600 dark:text-gray-400">
              Prinsip dan filosofi yang menjadi fondasi karakter unggul siswa SDMuh3
            </p>
          </div>
          <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="card-premium p-10 text-center glass-dark dark:bg-gray-900/40 border-0 group transition-all hover:scale-105"
              >
                <div className="w-24 h-24 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:rotate-6 transition-all duration-500 brightness-110 filter drop-shadow-[0_15px_20px_rgba(51,185,98,0.3)]">
                  <value.icon className="w-12 h-12 text-white brightness-110" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">{value.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] dark:bg-[#33b962]/20 dark:text-[#33b962] border-emerald-500/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Kurikulum</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Sistem Pembelajaran</h2>
            <p className="max-w-2xl mx-auto text-lg font-medium text-gray-600 dark:text-gray-400">
              Integrasi kurikulum modern dengan nilai-nilai luhur Islami
            </p>
          </div>
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2">
            {curriculum.map((item, index) => (
              <Card
                key={index}
                className="card-premium p-10 glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-8">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#33b962] transition-all duration-300">
                    <CheckCircle className="w-8 h-8 text-[#33b962] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="mb-3 text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="relative py-32 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto glass dark:bg-gray-950/40 p-16 rounded-[3rem] shadow-2xl border border-white/20 dark:border-white/10 text-center">
            <Badge className="mb-6 bg-[#33b962]/10 text-[#33b962] dark:bg-[#33b962]/20 dark:text-[#33b962] border-emerald-500/20 px-6 py-2 font-bold uppercase tracking-widest text-[10px]">Sarana & Prasarana</Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Lingkungan Belajar Ideal</h2>
            <p className="mb-10 text-lg font-medium text-gray-600 dark:text-gray-400">Jelajahi berbagai fasilitas unggulan yang kami sediakan untuk menunjang kreativitas dan prestasi siswa.</p>
            <Button asChild className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#33b962] dark:hover:bg-[#2a9d52] text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all" size="lg">
              <Link href="/fasilitas" className="flex items-center gap-2">
                Lihat Semua Fasilitas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Academic Documents */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-emerald-100 text-[#33b962] dark:bg-emerald-950/30 dark:text-emerald-400 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">Dokumen Resmi</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Pusat Informasi & Unduhan</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Akses cepat berkas-berkas penting sekolah</p>
          </div>
          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-2">
            {[
              { title: "Kalender Akademik", desc: "Jadwal kegiatan belajar 2025/2026", icon: Calendar, link: "/Kalender Pendidikan-TP-2025-2026.pdf" },
              { title: "Tata Tertib Siswa", desc: "Pedoman perilaku & kedisiplinan", icon: FileText, link: "#" }
            ].map((doc, idx) => (
              <Card key={idx} className="card-premium p-10 glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-[1.02]">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:bg-[#33b962] transition-colors duration-300">
                    <doc.icon className="w-8 h-8 text-[#33b962] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{doc.title}</h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{doc.desc}</p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-14 bg-transparent border-2 border-emerald-500/20 hover:bg-[#33b962] hover:text-white dark:text-gray-300 dark:border-white/10 rounded-2xl font-bold transition-all shadow-sm"
                >
                  <a href={doc.link} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-20 bg-linear-to-br from-[#33b962]/5 to-[#ffd166]/5 dark:from-[#33b962]/10 dark:to-[#ffd166]/10">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">Sertifikasi</Badge>
            <h2 className="mb-4 text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Akreditasi & Penghargaan</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Pengakuan kualitas pendidikan kami</p>
          </div>
          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-[#33b962] mb-3">UNGGUL</h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">Akreditasi BAN-S/M</p>
            </Card>

            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-[#ffd166] to-[#ffca3a] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Sekolah Penggerak</h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">Program Kemendikbud</p>
            </Card>

            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-[#06d6a0] to-[#05b88c] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Adiwiyata</h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">Sekolah Peduli Lingkungan</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
