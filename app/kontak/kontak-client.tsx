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
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Jl. Pendidikan No. 123, Samarinda Ulu, Kota Samarinda, Kalimantan Timur 75124",
    action: "Buka di Google Maps",
    link: "#",
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
    content: "info@sdmuh3smd.sch.id",
    action: "Kirim Email",
    link: "mailto:info@sdmuh3smd.sch.id",
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
    handle: "@sdmuh3samarinda",
    link: "https://instagram.com/sdmuh3samarinda",
    color: "bg-pink-500",
  },
  {
    name: "Facebook",
    icon: Facebook,
    handle: "SD Muhammadiyah 3 Samarinda",
    link: "https://facebook.com/sdmuh3samarinda",
    color: "bg-blue-600",
  },
  {
    name: "YouTube",
    icon: Youtube,
    handle: "SD Muhammadiyah 3 Samarinda",
    link: "https://youtube.com/@sdmuh3samarinda",
    color: "bg-red-600",
  },
]

export default function KontakClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Kontak Kami</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Ada pertanyaan? Tim kami siap membantu Anda. Hubungi kami melalui telepon, email, WhatsApp, atau kunjungi
              langsung sekolah kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{info.content}</p>
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
          <Card className="mt-8 max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Senin - Jumat</span>
                  <span className="text-muted-foreground">07:00 - 15:00 WIB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Sabtu</span>
                  <span className="text-muted-foreground">07:00 - 12:00 WIB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                  <span className="font-medium">Minggu & Hari Libur</span>
                  <span className="text-red-600 font-semibold">Tutup</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Lokasi Sekolah</h2>
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
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Kirim Pesan</h2>
              <p className="text-muted-foreground">
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda kembali
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input id="name" placeholder="Nama Anda" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input id="email" type="email" placeholder="email@contoh.com" className="pl-10" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      No. Telepon <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
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
                      <MessageSquare className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                      <Textarea
                        id="message"
                        placeholder="Tulis pesan Anda di sini..."
                        className="pl-10 min-h-[150px]"
                        maxLength={500}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-right">Maksimal 500 karakter</p>
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
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Kontak Departemen</h2>
              <p className="text-muted-foreground">Hubungi departemen terkait untuk keperluan spesifik</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">{dept.name}</CardTitle>
                    <CardDescription>PIC: {dept.pic}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <a href={`tel:+62${dept.phone.substring(1)}`} className="hover:text-primary transition-colors">
                        {dept.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <a href={`mailto:${dept.email}`} className="hover:text-primary transition-colors break-all">
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ikuti Media Sosial Kami</h2>
              <p className="text-muted-foreground">Dapatkan update terkini tentang kegiatan sekolah</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {socialMedia.map((social, index) => {
                const Icon = social.icon
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all group cursor-pointer"
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
                      <p className="text-sm text-muted-foreground mb-4">{social.handle}</p>
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
