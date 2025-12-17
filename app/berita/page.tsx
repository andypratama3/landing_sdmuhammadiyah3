import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Search, ArrowRight, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Berita & Pengumuman - SD Muhammadiyah 3 Samarinda",
  description: "Berita terkini, pengumuman, dan informasi kegiatan SD Muhammadiyah 3 Samarinda.",
}

// Type definition for news item
type NewsItem = {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  readTime: string
  image: string
  content?: string
}

const featuredNews: NewsItem = {
  id: 1,
  title: "SD Muhammadiyah 3 Samarinda Raih Akreditasi UNGGUL",
  excerpt:
    "Sekolah kami berhasil meraih akreditasi UNGGUL dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) untuk periode 2024-2029.",
  content: "",
  category: "Pengumuman",
  date: "15 Januari 2025",
  author: "Admin",
  readTime: "3 menit",
  image: "/school-award-accreditation.jpg",
}

const news: NewsItem[] = [
  {
    id: 2,
    title: "Siswa Kelas 6 Juara 1 Kompetisi Matematika Tingkat Kota",
    excerpt:
      "Tim matematika dari SD Muhammadiyah 3 Samarinda berhasil meraih juara 1 pada Olimpiade Matematika tingkat Kota Samarinda.",
    category: "Prestasi",
    date: "12 Januari 2025",
    author: "Ibu Diana Putri",
    readTime: "4 menit",
    image: "/children-celebrating-math-competition.jpg",
  },
  {
    id: 3,
    title: "Pendaftaran PPDB Tahun Ajaran 2025/2026 Dibuka",
    excerpt:
      "Penerimaan Peserta Didik Baru untuk tahun ajaran 2025/2026 telah dibuka. Daftar sekarang dan dapatkan diskon early bird!",
    category: "Pengumuman",
    date: "10 Januari 2025",
    author: "Panitia PPDB",
    readTime: "2 menit",
    image: "/students-morning-assembly.jpg",
  },
  {
    id: 4,
    title: "Kegiatan Field Trip ke Museum Mulawarman",
    excerpt:
      "Siswa kelas 4 dan 5 melaksanakan kegiatan field trip edukatif ke Museum Mulawarman untuk belajar sejarah dan budaya Kalimantan Timur.",
    category: "Kegiatan",
    date: "8 Januari 2025",
    author: "Bapak Ahmad Fauzi",
    readTime: "5 menit",
    image: "/gallery-museum-visit.jpg",
  },
  {
    id: 5,
    title: "Pelatihan Guru: Implementasi Kurikulum Merdeka",
    excerpt:
      "Seluruh guru SD Muhammadiyah 3 Samarinda mengikuti pelatihan intensif tentang implementasi Kurikulum Merdeka dari Kemendikbud.",
    category: "Akademik",
    date: "5 Januari 2025",
    author: "Kepala Sekolah",
    readTime: "3 menit",
    image: "/happy-children-classroom-learning.jpg",
  },
  {
    id: 6,
    title: "Siswa Juara Harapan III Lomba Tahfidz Tingkat Provinsi",
    excerpt:
      "Maryam, siswi kelas 5, berhasil meraih juara harapan III pada lomba Tahfidz Al-Qur'an tingkat Provinsi Kalimantan Timur.",
    category: "Prestasi",
    date: "3 Januari 2025",
    author: "Ustadz Abdullah",
    readTime: "3 menit",
    image: "/girl-quran-competition.jpg",
  },
  {
    id: 7,
    title: "Libur Semester Genap dan Jadwal Masuk Kembali",
    excerpt:
      "Informasi jadwal libur semester genap tahun ajaran 2024/2025 dan tanggal masuk kembali untuk semester ganjil.",
    category: "Pengumuman",
    date: "28 Desember 2024",
    author: "Admin",
    readTime: "2 menit",
    image: "/classroom-interactive-learning.jpg",
  },
  {
    id: 8,
    title: "Pembagian Rapor Semester Ganjil 2024/2025",
    excerpt: "Pengumuman jadwal pembagian rapor semester ganjil untuk seluruh kelas. Orang tua diharapkan hadir.",
    category: "Pengumuman",
    date: "20 Desember 2024",
    author: "Admin",
    readTime: "2 menit",
    image: "/modern-school-classroom.png",
  },
  {
    id: 9,
    title: "Festival Seni dan Budaya SD Muhammadiyah 3",
    excerpt:
      "Sekolah mengadakan festival seni dan budaya dengan menampilkan berbagai penampilan dari siswa-siswi berbakat.",
    category: "Kegiatan",
    date: "15 Desember 2024",
    author: "Ibu Nur Azizah",
    readTime: "4 menit",
    image: "/gallery-cultural-festival.jpg",
  },
]

const popularPosts = [
  { id: 1, title: "Cara Mendaftar PPDB Online 2025/2026", views: 1250 },
  { id: 2, title: "Syarat dan Ketentuan Beasiswa Siswa Berprestasi", views: 980 },
  { id: 3, title: "Jadwal Kegiatan Ekstrakurikuler Semester Genap", views: 856 },
  { id: 4, title: "Tips Membantu Anak Belajar di Rumah", views: 745 },
  { id: 5, title: "Program Tahfidz Al-Qur'an: Target dan Metode", views: 623 },
]

const categories = [
  { name: "Semua", count: 9 },
  { name: "Akademik", count: 1 },
  { name: "Kegiatan", count: 2 },
  { name: "Pengumuman", count: 4 },
  { name: "Prestasi", count: 2 },
]

export default function BeritaPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Berita & Pengumuman</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita Terkini</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Informasi terbaru tentang kegiatan, prestasi, dan pengumuman penting
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cari berita atau pengumuman..."
                  className="pl-12 pr-4 py-6 text-lg bg-white text-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden hover:shadow-xl transition-all">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{featuredNews.category}</Badge>
                <h2 className="text-3xl font-bold mb-4">{featuredNews.title}</h2>
                <p className="text-muted-foreground mb-6 text-lg">{featuredNews.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredNews.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredNews.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{featuredNews.author}</span>
                  </div>
                </div>
                <Button size="lg" className="w-fit">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* News List */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  {categories.map((category) => (
                    <TabsTrigger key={category.name} value={category.name.toLowerCase()}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {news.map((item) => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </TabsContent>

                {["akademik", "kegiatan", "pengumuman", "prestasi"].map((category) => (
                  <TabsContent key={category} value={category} className="space-y-6">
                    {news
                      .filter((item) => item.category.toLowerCase() === category)
                      .map((item) => (
                        <NewsCard key={item.id} news={item} />
                      ))}
                  </TabsContent>
                ))}
              </Tabs>

              {/* Pagination */}
              <div className="flex justify-center mt-8 gap-2">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">1</Button>
                <Button>2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Berita Populer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <li key={post.id}>
                        <Link
                          href={`/berita/${post.id}`}
                          className="group flex items-start gap-3 hover:text-primary transition-colors"
                        >
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{post.views} views</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Link
                          href={`/berita?category=${category.name.toLowerCase()}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {category.name}
                          </span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group">
      <div className="grid md:grid-cols-3 gap-0">
        <div className="relative h-48 md:h-auto">
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="md:col-span-2 p-6">
          <Badge className="mb-3">{news.category}</Badge>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{news.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{news.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{news.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{news.readTime}</span>
            </div>
          </div>
          <Link href={`/berita/${news.id}`}>
            <Button variant="outline" size="sm">
              Baca Selengkapnya
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}