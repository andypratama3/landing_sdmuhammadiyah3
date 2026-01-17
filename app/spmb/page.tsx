
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SpmbPage } from '@/components/spmb/spmb'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Calendar,
  CheckCircle2,
  FileText,
  Users,
  DollarSign,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Upload,
  ArrowRight,
  CheckCheck,
} from "lucide-react"

export const metadata: Metadata = {
  title: "SPMB - Sistem Penerimaan Murid Baru - SD Muhammadiyah 3 Samarinda",
  description:
    "Pendaftaran siswa baru SD Muhammadiyah 3 Samarinda untuk tahun ajaran 2025/2026. Daftar sekarang dan bergabung dengan Sekolah Kreatif!",
}

const timeline = [
  {
    title: "Pengumuman Pendaftaran",
    date: "1 Januari 2025",
    description: "Pengumuman resmi dibuka pendaftaran PPDB 2025/2026",
    icon: FileText,
  },
  {
    title: "Periode Pendaftaran Online",
    date: "10 Januari - 10 Maret 2025",
    description: "Pendaftaran online dibuka melalui website",
    icon: Calendar,
  },
  {
    title: "Verifikasi Dokumen",
    date: "11 - 20 Maret 2025",
    description: "Verifikasi kelengkapan dokumen pendaftaran",
    icon: CheckCircle2,
  },
  {
    title: "Tes Masuk & Wawancara",
    date: "25 - 30 Maret 2025",
    description: "Tes kemampuan dasar dan wawancara calon siswa",
    icon: Users,
  },
  {
    title: "Pengumuman Hasil",
    date: "5 April 2025",
    description: "Pengumuman hasil seleksi penerimaan",
    icon: CheckCheck,
  },
  {
    title: "Daftar Ulang",
    date: "10 - 20 April 2025",
    description: "Daftar ulang dan pembayaran biaya masuk",
    icon: DollarSign,
  },
]

const requirements = [
  {
    category: "Persyaratan Umum",
    items: [
      "Berusia minimal 6 tahun pada tanggal 1 Juli 2025",
      "Sehat jasmani dan rohani",
      "Beragama Islam",
      "Bersedia mengikuti seluruh program sekolah",
    ],
  },
  {
    category: "Dokumen yang Dibutuhkan",
    items: [
      "Fotocopy Akta Kelahiran (2 lembar)",
      "Fotocopy Kartu Keluarga (2 lembar)",
      "Pas foto ukuran 3x4 (4 lembar, background merah)",
      "Fotocopy Ijazah/STTB TK (bagi yang sudah lulus TK)",
      "Fotocopy KTP orang tua (Ayah dan Ibu, masing-masing 2 lembar)",
      "Fotocopy Kartu Vaksinasi",
      "Surat keterangan sehat dari dokter",
    ],
  },
]


const fees = [
  { item: "Biaya Pendaftaran SPMB", amount: "Rp 300.000" },
]

const faqs = [
  {
    question: "Berapa biaya pendaftaran PPDB?",
    answer:
      "Biaya pendaftaran adalah Rp 200.000. Biaya ini non-refundable dan digunakan untuk proses administrasi pendaftaran.",
  },
  {
    question: "Apakah ada tes masuk?",
    answer:
      "Ya, ada tes kemampuan dasar yang meliputi membaca, menulis, berhitung sederhana, dan wawancara untuk mengetahui kesiapan anak masuk sekolah dasar.",
  },
  {
    question: "Bagaimana sistem pembelajaran di SD Muhammadiyah 3 Samarinda?",
    answer:
      "Kami menerapkan pembelajaran berbasis edutainment (belajar menyenangkan) dengan mengintegrasikan nilai-nilai Islami, kurikulum nasional, dan program unggulan tahfidz serta pembinaan karakter.",
  },
  {
    question: "Apa saja program unggulan sekolah?",
    answer:
      "Program unggulan kami meliputi Tahfidz Al-Qur'an 2 Juz (29-30), pembiasaan akhlak Islami, pembelajaran berbasis edutainment, dan lulus dengan 3 ijazah (Nasional, Muhammadiyah, dan Tahfidz).",
  },
  {
    question: "Kapan pengumuman hasil seleksi?",
    answer:
      "Pengumuman hasil seleksi akan diumumkan pada tanggal 5 April 2025 melalui website dan akan diinformasikan via WhatsApp kepada orang tua/wali.",
  },
  {
    question: "Apakah bisa daftar langsung di sekolah?",
    answer:
      "Ya, pendaftaran juga dapat dilakukan secara langsung di kantor tata usaha sekolah pada hari Senin-Sabtu, pukul 07:00-15:00 WIB.",
  },
]

export default function SPMBPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 mt-20 text-white bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-white bg-white/20 border-white/30">PPDB 2025/2026</Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Pendaftaran Peserta Didik Baru</h1>
            <p className="max-w-2xl mx-auto mb-6 text-lg md:text-xl text-white/90">Tahun Ajaran 2025/2026</p>
            <Badge className="px-6 py-2 mb-8 text-lg text-white bg-green-500">
              <CheckCircle2 className="inline w-5 h-5 mr-2" />
              Pendaftaran Dibuka
            </Badge>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="px-8 text-lg">
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-lg text-white border-white bg-white/10 hover:bg-white/20"
              >
                <Phone className="w-5 h-5 mr-2" />
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Jadwal Penerimaan</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Timeline lengkap proses penerimaan peserta didik baru
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 transition-all rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      {index < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                    </div>
                    <Card className="flex-1 transition-all hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-base">
                          <Clock className="w-4 h-4" />
                          {item.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Persyaratan Pendaftaran</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Dokumen dan persyaratan yang harus dipenuhi untuk mendaftar
            </p>
          </div>

          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-2">
            {requirements.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-2xl">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Preview */}
      <section className="py-16 bg-background" id="RegisterForm">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Formulir Pendaftaran</h2>
              <p className="text-muted-foreground">Isi formulir berikut untuk mendaftar sebagai siswa baru</p>
            </div>

            <SpmbPage />
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Biaya Pendaftaran</h2>
              <p className="text-muted-foreground">Rincian biaya untuk tahun ajaran 2025/2026</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {fees.map((fee, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <span className="font-medium">{fee.item}</span>
                      <span className="text-lg font-bold text-primary">{fee.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-muted-foreground">Temukan jawaban untuk pertanyaan umum seputar PPDB</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 text-white bg-primary">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Butuh Bantuan?</h2>
            <p className="mb-8 text-lg text-white/90">Tim kami siap membantu Anda dalam proses pendaftaran</p>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-white transition-all bg-white/10 border-white/20 hover:bg-white/20">
                <CardHeader>
                  <Phone className="w-8 h-8 mx-auto mb-2" />
                  <CardTitle>Telepon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">(0541) 123-456</p>
                </CardContent>
              </Card>

              <Card className="text-white transition-all bg-white/10 border-white/20 hover:bg-white/20">
                <CardHeader>
                  <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                  <CardTitle>WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">0812-3456-7890</p>
                </CardContent>
              </Card>

              <Card className="text-white transition-all bg-white/10 border-white/20 hover:bg-white/20">
                <CardHeader>
                  <Mail className="w-8 h-8 mx-auto mb-2" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">ppdb@sdmuh3smd.sch.id</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
