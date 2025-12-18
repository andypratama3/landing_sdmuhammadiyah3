import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
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
  title: "PPDB - Penerimaan Peserta Didik Baru - SD Muhammadiyah 3 Samarinda",
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
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">PPDB 2025/2026</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pendaftaran Peserta Didik Baru</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">Tahun Ajaran 2025/2026</p>
            <Badge className="bg-green-500 text-white text-lg px-6 py-2 mb-8">
              <CheckCircle2 className="w-5 h-5 mr-2 inline" />
              Pendaftaran Dibuka
            </Badge>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white/20"
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jadwal Penerimaan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      {index < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                    </div>
                    <Card className="flex-1 hover:shadow-lg transition-all">
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Persyaratan Pendaftaran</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dokumen dan persyaratan yang harus dipenuhi untuk mendaftar
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Formulir Pendaftaran</h2>
              <p className="text-muted-foreground">Isi formulir berikut untuk mendaftar sebagai siswa baru</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Data Calon Siswa</CardTitle>
                <CardDescription>Lengkapi semua informasi dengan benar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap *</Label>
                    <Input id="nama" placeholder="Nama lengkap sesuai akta" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nik">NIK *</Label>
                    <Input id="nik" placeholder="Nomor Induk Kependudukan" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tempat-lahir">Tempat Lahir *</Label>
                    <Input id="tempat-lahir" placeholder="Kota kelahiran" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tanggal-lahir">Tanggal Lahir *</Label>
                    <Input id="tanggal-lahir" type="date" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jenis-kelamin">Jenis Kelamin *</Label>
                    <Select>
                      <SelectTrigger id="jenis-kelamin">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asal-tk">Asal TK</Label>
                    <Input id="asal-tk" placeholder="Nama TK (jika ada)" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat Lengkap *</Label>
                  <Textarea id="alamat" placeholder="Alamat lengkap tempat tinggal" rows={3} />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Data Orang Tua</h3>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama-ayah">Nama Ayah *</Label>
                        <Input id="nama-ayah" placeholder="Nama lengkap ayah" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pekerjaan-ayah">Pekerjaan Ayah *</Label>
                        <Input id="pekerjaan-ayah" placeholder="Pekerjaan ayah" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama-ibu">Nama Ibu *</Label>
                        <Input id="nama-ibu" placeholder="Nama lengkap ibu" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pekerjaan-ibu">Pekerjaan Ibu *</Label>
                        <Input id="pekerjaan-ibu" placeholder="Pekerjaan ibu" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="no-hp">No. WhatsApp Orang Tua *</Label>
                      <Input id="no-hp" placeholder="08xxxxxxxxxx" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Upload Dokumen</h3>

                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">Akta Kelahiran</p>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max. 2MB)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Saya menyetujui syarat dan ketentuan yang berlaku serta bersedia mengikuti seluruh program sekolah
                  </label>
                </div>

                <Button size="lg" className="w-full">
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Dengan mendaftar, data Anda akan diproses sesuai kebijakan privasi kami
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Biaya Pendaftaran</h2>
              <p className="text-muted-foreground">Rincian biaya untuk tahun ajaran 2025/2026</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {fees.map((fee, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
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
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>
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
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Butuh Bantuan?</h2>
            <p className="text-lg text-white/90 mb-8">Tim kami siap membantu Anda dalam proses pendaftaran</p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all">
                <CardHeader>
                  <Phone className="w-8 h-8 mx-auto mb-2" />
                  <CardTitle>Telepon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">(0541) 123-456</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all">
                <CardHeader>
                  <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                  <CardTitle>WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">0812-3456-7890</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all">
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
