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
import PageAnimations from "@/components/PageAnimations"

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
    <div className="pt-24 pb-16 min-h-screen bg-(--color-paper-50) dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      <PageAnimations />
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Editorial Bento Grid Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-(--color-cloud-100)/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Main Typographic Card (Spans 8 cols) */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <Badge className="page-hero-badge bg-white text-(--color-forest-600) hover:bg-white border-0 px-4 py-1.5 mb-8 text-xs sm:text-sm font-black uppercase tracking-widest shadow-md inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-(--color-sun-500) animate-pulse"></span>
                  Eksplorasi Profil Sekolah
                </Badge>
                <h1 className="page-hero-title text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm uppercase">
                  Sekolah Dasar <br /> <span className="text-(--color-sun-200)">Muhammadiyah 3</span>
                </h1>
                <p className="page-hero-description text-white/95 text-xl font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
                  Mengenal lebih dalam identitas, visi-misi, dan semangat kami dalam mencerdaskan generasi bangsa melalui pendidikan yang kreatif dan inovatif.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="page-button bg-white text-(--color-forest-450) hover:bg-white/90 rounded-full px-8 h-12 font-black uppercase tracking-widest text-xs shadow-xl">
                    <Link href="/tentang">Visi & Misi</Link>
                  </Button>
                  <Button asChild variant="outline" className="page-button rounded-full px-8 h-12 font-black uppercase tracking-widest text-xs border-white text-white hover:bg-white hover:text-(--color-forest-450)">
                    <Link href="#identitas">Data Resmi</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Side Highlights (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="page-card page-tilt-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1 transition-colors relative overflow-hidden group hover:border-(--color-forest-450)">
                 <div className="w-14 h-14 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/20 rounded-2xl flex items-center justify-center mb-6 text-(--color-forest-450) group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8" />
                  </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">Integritas</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Menjunjung tinggi kejujuran & nilai moral</p>
              </div>

              <div className="page-card bg-(--color-sun-500) dark:bg-(--color-sun-400) rounded-[2.5rem] p-8 shadow-md flex flex-col justify-center flex-1 transition-transform relative overflow-hidden group hover:scale-[1.02]">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-gray-900 group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-8 h-8" />
                  </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">Kreativitas</h3>
                <p className="text-sm font-medium text-gray-800 mt-2">Mendorong inovasi tanpa batas</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* School Identity */}
      <section className="relative py-24 bg-(--color-paper-50)/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-(--color-forest-450)/10 text-(--color-forest-450) dark:bg-(--color-forest-450)/20 dark:text-(--color-forest-450) border-(--color-forest-450)/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Identitas</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Data Resmi Sekolah</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Legalitas dan identitas lengkap SD Muhammadiyah 3</p>
          </div>
          <Card className="max-w-4xl p-10 sm:p-16 mx-auto card-premium glass dark:bg-gray-900/40 border-0">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
              {schoolInfo.map((info, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 gap-1">
                  <span className="text-xs font-black uppercase tracking-widest text-(--color-forest-450) dark:text-(--color-forest-400)/70">{info.label}</span>
                  <span className="font-bold text-left sm:text-right text-gray-900 dark:text-white text-sm sm:text-base">{info.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Principal Message */}
      {/* Principal Message */}
      <section className="relative py-24 bg-(--color-cloud-100)/50 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-(--color-forest-450)/10 text-(--color-forest-450) dark:bg-(--color-forest-450)/20 dark:text-(--color-forest-450) border-(--color-forest-450)/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Pesan Kepemimpinan</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Sambutan Kepala Sekolah</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Visi dan harapan untuk masa depan pendidikan</p>
          </div>
          <Card className="max-w-6xl p-8 sm:p-12 mx-auto card-premium glass dark:bg-gray-900/40 border-0 shadow-2xl">
            <div className="grid items-center gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-linear-to-r from-(--color-forest-450) to-(--color-sun-500) rounded-[1.75rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
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
                  <div className="inline-flex items-center gap-2 mt-2 px-6 py-2 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/30 text-(--color-forest-450) font-black rounded-full text-xs uppercase tracking-widest">
                    <Shield className="w-3 h-3" />
                    Kepala Sekolah
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/10 rounded-3xl border border-(--color-forest-450)/10 dark:border-(--color-forest-450)/20">
                  <p className="text-xl font-bold italic text-(--color-forest-800) dark:text-(--color-forest-300) leading-relaxed">
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
                    <p className="font-bold text-(--color-forest-450) dark:text-(--color-forest-400)">
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
      <section className="relative py-24 bg-(--color-paper-50)/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-(--color-forest-450)/10 text-(--color-forest-450) dark:bg-(--color-forest-450)/20 dark:text-(--color-forest-450) border-(--color-forest-450)/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Organisasi</Badge>
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Struktur Manajemen</h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Tim penggerak kemajuan sekolah kami</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {/* Kepala Sekolah */}
              <Card className="p-12 text-center rounded-[2.5rem] bg-linear-to-br from-(--color-forest-450) via-(--color-forest-500) to-(--color-forest-800) text-white shadow-2xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="mb-2 text-2xl font-black uppercase tracking-widest">Kepala Sekolah</h3>
                <p className="text-xl font-bold text-white/95">Ansar HS. S.Pd.,M.M. Gr.</p>
              </Card>

              {/* Wakil Kepala */}
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  { title: "Wakil Kurikulum", name: "Wiwik Kurniasih S.Pd", icon: BookOpen },
                  { title: "Waka Bid. Kesiswaan", name: "MISBAHUL JUM'AH, S.Pd.I", icon: Users },
                  { title: "Wakil Kepala Humas", name: "Fadhilaturrahman S.Pd", icon: Heart }
                ].map((item, idx) => (
                  <Card key={idx} className="card-premium p-10 text-center glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-105">
                    <div className="w-20 h-20 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/30 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-(--color-forest-450) transition-all duration-500 shadow-inner group-hover:shadow-(--color-forest-450)/20">
                      <item.icon className="w-10 h-10 text-(--color-forest-450) group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="mb-3 text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-tight">{item.name}</p>
                  </Card>
                ))}
              </div>

              <Link href="/tenaga-pendidikan">
                <Card className="p-8 text-center rounded-[1.25rem] glass dark:bg-gray-900/40 border-2 border-dashed border-(--color-forest-450)/20 hover:border-(--color-forest-450) group transition-all">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-6 h-6 text-(--color-forest-450)" />
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
      <section className="relative py-24 bg-linear-to-b from-(--color-cloud-100)/50 to-(--color-paper-50) dark:from-gray-950/50 dark:to-gray-950 transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-(--color-sun-500) text-gray-900 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-(--color-sun-500)/10">Value</Badge>
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
                <div className="w-24 h-24 bg-linear-to-br from-(--color-forest-450) to-(--color-forest-500) rounded-[1.25rem] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:rotate-6 transition-all duration-500 filter drop-shadow-[0_15px_20px_rgba(var(--color-forest-450-rgb),0.3)]">
                  <value.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">{value.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="relative py-24 bg-(--color-paper-50)/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-(--color-forest-450)/10 text-(--color-forest-450) dark:bg-(--color-forest-450)/20 dark:text-(--color-forest-450) border-(--color-forest-450)/20 px-4 py-2 font-bold uppercase tracking-widest text-[10px]">Kurikulum</Badge>
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
                  <div className="w-16 h-16 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-(--color-forest-450) transition-all duration-300">
                    <CheckCircle className="w-8 h-8 text-(--color-forest-450) group-hover:text-white transition-colors" />
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
      <section className="relative py-32 bg-(--color-cloud-100)/50 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto glass dark:bg-gray-950/40 p-16 rounded-[1.75rem] shadow-2xl border border-white/20 dark:border-white/10 text-center">
            <Badge className="mb-6 bg-(--color-forest-450)/10 text-(--color-forest-450) dark:bg-(--color-forest-450)/20 dark:text-(--color-forest-450) border-(--color-forest-450)/20 px-6 py-2 font-bold uppercase tracking-widest text-[10px]">Sarana & Prasarana</Badge>
            <h2 className="mb-6 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">Lingkungan Belajar Ideal</h2>
            <p className="mb-10 text-lg font-medium text-gray-600 dark:text-gray-400">Jelajahi berbagai fasilitas unggulan yang kami sediakan untuk menunjang kreativitas dan prestasi siswa.</p>
            <Button asChild className="bg-(--color-forest-450) hover:bg-(--color-forest-500) dark:bg-(--color-forest-450) dark:hover:bg-(--color-forest-500) text-white rounded-full px-12 py-8 text-lg font-bold shadow-xl hover:scale-105 transition-all" size="lg">
              <Link href="/fasilitas" className="flex items-center gap-2">
                Lihat Semua Fasilitas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Academic Documents */}
      <section className="relative py-24 bg-(--color-paper-50)/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-(--color-forest-450)/10 text-(--color-forest-450) dark:bg-(--color-forest-450)/30 dark:text-(--color-forest-400) px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">Dokumen Resmi</Badge>
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
                  <div className="w-16 h-16 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/30 rounded-2xl flex items-center justify-center group-hover:bg-(--color-forest-450) transition-colors duration-300">
                    <doc.icon className="w-8 h-8 text-(--color-forest-450) group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{doc.title}</h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{doc.desc}</p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-14 rounded-2xl font-bold transition-all shadow-sm border-(--color-forest-450) text-(--color-forest-450) hover:bg-(--color-forest-450) hover:text-white"
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
      <section className="py-20 bg-linear-to-br from-(--color-forest-450)/5 to-(--color-sun-500)/5 dark:from-(--color-forest-450)/10 dark:to-(--color-sun-500)/10">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <Badge className="mb-4 bg-(--color-forest-450)/10 text-(--color-forest-450) border-(--color-forest-450)/20 px-4 py-2">Sertifikasi</Badge>
            <h2 className="mb-4 text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Akreditasi & Penghargaan</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Pengakuan kualitas pendidikan kami</p>
          </div>
          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-(--color-forest-450) to-(--color-forest-500) rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-(--color-forest-450) mb-3">UNGGUL</h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">Akreditasi BAN-S/M</p>
            </Card>

            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-(--color-sun-500) to-(--color-sun-400) rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Sekolah Penggerak</h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">Program Kemendikbud</p>
            </Card>

            <Card className="p-10 text-center transition-all border-0 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-(--color-teal-400) to-(--color-teal-500) rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
