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
    content: "(0541) 260066",
    action: "Hubungi",
    link: "tel:0541-260066",
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
    link: "https://wa.me/6285250443151",
  },
]

const departments = [
  {
    name: "Kepala TU",
    pic: "Rusmini S.Pd",
    phone: "85250443151",
  },
  {
    name: "Bagian Keuangan",
    pic: "Admin Keuangan",
    phone: "0822-2524-9993",
  },
  {
    name: "Operator Sekolah",
    pic: "Fadhilaturrahman, S.Pd",
    phone: "0853-9390-2907",
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
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-24 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-48 right-16 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto mt-8">
          <div className="max-w-4xl mx-auto text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-bold uppercase tracking-widest text-[10px]">
              Eksplorasi Kontak & Lokasi
            </Badge>
            <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md">
              Hubungi Kami
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Tim kami siap membantu menjawab pertanyaan dan memberikan informasi yang Anda butuhkan seputar sekolah kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index} className="card-premium p-8 text-center glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-[1.05]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 rounded-3xl bg-white/50 dark:bg-emerald-900/20 group-hover:bg-[#33b962] transition-all duration-500 shadow-xl brightness-110 filter drop-shadow-[0_10px_15px_rgba(51,185,98,0.2)]">
                      <Icon className="w-10 h-10 text-[#33b962] group-hover:text-white transition-colors brightness-125" />
                    </div>
                    <h3 className="mb-4 text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{info.title}</h3>
                    <p className="mb-8 text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{info.content}</p>
                    <Button variant="outline" size="lg" className="w-full rounded-2xl font-bold border-2 border-emerald-500/20 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:text-gray-300 dark:border-white/10 transition-all shadow-sm" asChild>
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        {info.action}
                      </a>
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Office Hours */}
          <Card className="max-w-2xl mx-auto mt-8 dark:bg-gray-900 dark:border-gray-800">
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
      <section className="py-16 bg-muted/30 dark:bg-gray-900/30">
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
      {/* <section className="py-16 bg-background dark:bg-gray-950">
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
      </section> */}

      {/* Department Contacts */}
      <section className="py-16 bg-muted/30 dark:bg-gray-900/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Kontak Admin</h2>
              <p className="text-muted-foreground">Hubungi admin terkait untuk keperluan spesifik</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {departments.map((dept, index) => (
                <Card key={index} className="card-premium p-6 transition-all hover:scale-[1.02] dark:bg-gray-900/60 border-0 glass">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 brightness-110 shadow-inner">
                      <Phone className="w-8 h-8 text-[#33b962] brightness-125" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">{dept.name}</h3>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest text-[10px]">PIC: {dept.pic}</p>
                    <a
                      href={`https://wa.me/+62${dept.phone.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full rounded-2xl font-black bg-[#33b962] hover:bg-[#2a9d52] text-white shadow-xl hover:scale-[1.05] transition-all uppercase tracking-widest text-xs h-12"
                      >
                        {dept.phone}
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 transition-colors duration-300 bg-background dark:bg-gray-950">
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
                    className="card-premium p-8 text-center transition-all cursor-pointer hover:scale-[1.05] group dark:bg-gray-900/60 border-0 glass overflow-hidden relative"
                    onClick={() => window.open(social.link, "_blank")}
                  >
                    <div className="flex flex-col h-full items-center">
                      <div
                        className={`w-20 h-20 rounded-3xl ${social.color} flex items-center justify-center mb-6 transition-all duration-500 shadow-xl brightness-110 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] group-hover:rotate-12`}
                      >
                        <Icon className="w-10 h-10 text-white brightness-125" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">{social.name}</h3>
                      <p className="mb-8 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{social.handle}</p>
                      <Button variant="outline" size="lg" className="mt-auto w-full rounded-2xl font-black border-2 border-emerald-500/10 hover:bg-[#33b962] hover:text-white transition-all uppercase tracking-widest text-[10px] h-11">
                        Kunjungi Profile
                      </Button>
                    </div>
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
