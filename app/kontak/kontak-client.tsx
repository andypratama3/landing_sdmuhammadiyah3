"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Send,
  User,
  MessageSquare,
  BookOpen,
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242",
    action: "Buka di Google Maps",
    link: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9477.659215305792!2d117.12429426373527!3d-0.5122169736669224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67fb245dc458f%3A0xa8ef3e4834a26bd!2sSekolah%20Kreatif%20SD%20Muhammadiyah%203%20Samarinda!5e0!3m2!1sid!2sid!4v1722696990256!5m2!1sid!2sid",
  },
  {
    icon: Phone,
    title: "Telepon",
    content: "(0541) 123-456",
    action: "Hubungi",
    link: "tel:+62541123456",
  },
  {
    icon: Mail,
    title: "Email",
    content: "sekolahkreatifmuh3@gmail.com",
    action: "Kirim Email",
    link: "mailto:sekolahkreatifmuh3@gmail.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    content: "+62 812-3456-7890",
    action: "Chat WhatsApp",
    link: "https://wa.me/6281234567890",
  },
]

const departments = [
  {
    name: "Bagian Akademik",
    pic: "Ibu Diana Putri, S.Pd",
    phone: "0812-3456-7891",
    email: "akademik@sdmuh3smd.sch.id",
  },
  {
    name: "Bagian Keuangan",
    pic: "Bapak Ahmad Fauzi, S.E",
    phone: "0812-3456-7892",
    email: "keuangan@sdmuh3smd.sch.id",
  },
  {
    name: "PPDB (Penerimaan Siswa Baru)",
    pic: "Ibu Sarah Amelia, S.Pd",
    phone: "0812-3456-7893",
    email: "ppdb@sdmuh3smd.sch.id",
  },
]

const socialMedia = [
  {
    name: "Instagram",
    icon: Instagram,
    handle: "@SekolahKreatifSamarinda",
    link: "https://www.instagram.com/SekolahKreatifSamarinda",
    color: "bg-pink-500",
  },
  {
    name: "Facebook",
    icon: Facebook,
    handle: "Sekolah Kreatif Muhammadiyah Samarinda ",
    link: "https://www.facebook.com/sekolahkreatif.muhammadiyahsamarinda/",
    color: "bg-blue-600",
  },
  {
    name: "YouTube",
    icon: Youtube,
    handle: "Sekolah Kreatif SD Muhammadiyah 3 Samarinda",
    link: "https://www.youtube.com/@sekolahkreatifsdmuhammadiy2812",
    color: "bg-red-600",
  },
  {
    name: "Wikipedia",
    icon: BookOpen,
    handle: "SD Muhammadiyah 3 Samarinda",
    link: "https://id.wikipedia.org/wiki/Sd_Muhammadiyah_3_Samarinda",
    color: "bg-gray-800",
  },
]

export default function KontakClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 text-white bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container px-4 mx-auto mt-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-white bg-white/20 border-white/30">Kontak Kami</Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Hubungi Kami</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90">
              Ada pertanyaan? Tim kami siap membantu Anda. Hubungi kami melalui telepon, email, WhatsApp, atau kunjungi
              langsung sekolah kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index} className="text-center transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">{info.content}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        {info.action}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Office Hours */}
          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Jam Operasional</CardTitle>
                  <CardDescription>Waktu layanan kantor sekolah</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">Senin - Jumat</span>
                  <span className="text-muted-foreground">07:00 - 15:00 WIB</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">Sabtu</span>
                  <span className="text-muted-foreground">07:00 - 12:00 WIB</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10">
                  <span className="font-medium">Minggu & Hari Libur</span>
                  <span className="font-semibold text-red-600">Tutup</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Lokasi Sekolah</h2>
              <p className="text-muted-foreground">Temukan kami di Google Maps</p>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9477.659215305792!2d117.12429426373527!3d-0.5122169736669224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67fb245dc458f%3A0xa8ef3e4834a26bd!2sSekolah%20Kreatif%20SD%20Muhammadiyah%203%20Samarinda!5e0!3m2!1sid!2sid!4v1722696990256!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 text-center">
              <Button size="lg" asChild>
                <a href="https://maps.app.goo.gl/NAi8mFKdwBbPFgV87" target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-5 h-5 mr-2" />
                  Buka di Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Kirim Pesan</h2>
              <p className="text-muted-foreground">
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda kembali
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                        <Input id="name" placeholder="Nama Anda" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="email@contoh.com" className="pl-10" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      No. Telepon <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subjek <span className="text-red-500">*</span>
                    </Label>
                    <Select required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Pilih subjek pesan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="umum">Pertanyaan Umum</SelectItem>
                        <SelectItem value="pendaftaran">Pendaftaran</SelectItem>
                        <SelectItem value="pembayaran">Pembayaran</SelectItem>
                        <SelectItem value="pengaduan">Pengaduan</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Pesan <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                      <Textarea
                        id="message"
                        placeholder="Tulis pesan Anda di sini..."
                        className="pl-10 min-h-[150px]"
                        maxLength={500}
                        required
                      />
                    </div>
                    <p className="text-xs text-right text-muted-foreground">Maksimal 500 karakter</p>
                  </div>

                  <Button size="lg" className="w-full" type="submit">
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Pesan
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Dengan mengirim pesan, Anda menyetujui kebijakan privasi kami
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Kontak Departemen</h2>
              <p className="text-muted-foreground">Hubungi departemen terkait untuk keperluan spesifik</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {departments.map((dept, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{dept.name}</CardTitle>
                    <CardDescription>PIC: {dept.pic}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="flex-shrink-0 w-4 h-4 text-muted-foreground" />
                      <a href={`tel:+62${dept.phone.substring(1)}`} className="transition-colors hover:text-primary">
                        {dept.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="flex-shrink-0 w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${dept.email}`} className="break-all transition-colors hover:text-primary">
                        {dept.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ikuti Media Sosial Kami</h2>
              <p className="text-muted-foreground">Dapatkan update terkini tentang kegiatan sekolah</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {socialMedia.map((social, index) => {
                const Icon = social.icon
                return (
                  <Card
                    key={index}
                    className="text-center transition-all cursor-pointer hover:shadow-lg group"
                    onClick={() => window.open(social.link, "_blank")}
                  >
                    <CardHeader>
                      <div
                        className={`mx-auto w-16 h-16 rounded-full ${social.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{social.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">{social.handle}</p>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Kunjungi
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
