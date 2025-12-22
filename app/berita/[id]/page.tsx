import type { Metadata } from "next"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Share2, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"

type NewsItem = {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  readTime: string
  image: string
}

const allNews: NewsItem[] = [
  {
    id: 1,
    title: "SD Muhammadiyah 3 Samarinda Raih Akreditasi UNGGUL",
    excerpt:
      "Sekolah kami berhasil meraih akreditasi UNGGUL dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) untuk periode 2024-2029.",
    content: `
      <p>SD Muhammadiyah 3 Samarinda dengan bangga mengumumkan pencapaian akreditasi UNGGUL dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) untuk periode 2024-2029. Pencapaian ini merupakan hasil kerja keras seluruh civitas akademika sekolah.</p>
      
      <p>Proses akreditasi yang berlangsung selama beberapa bulan ini melibatkan evaluasi menyeluruh terhadap 8 standar nasional pendidikan, termasuk standar isi, proses, kompetensi lulusan, pendidik dan tenaga kependidikan, sarana dan prasarana, pengelolaan, pembiayaan, dan penilaian pendidikan.</p>
      
      <p>Kepala Sekolah, Bapak Dr. Muhammad Ridwan, S.Pd., M.Pd., menyampaikan rasa syukur dan terima kasih kepada seluruh guru, staf, siswa, dan orang tua yang telah mendukung pencapaian ini. "Akreditasi UNGGUL ini adalah bukti komitmen kami dalam memberikan pendidikan berkualitas dengan nilai-nilai Islami," ujarnya.</p>
      
      <p>Dengan pencapaian ini, SD Muhammadiyah 3 Samarinda semakin mantap dalam memberikan layanan pendidikan terbaik bagi generasi muda Indonesia.</p>
    `,
    category: "Pengumuman",
    date: "15 Januari 2025",
    author: "Admin",
    readTime: "3 menit",
    image: "/school-award-accreditation.jpg",
  },
  {
    id: 2,
    title: "Siswa Kelas 6 Juara 1 Kompetisi Matematika Tingkat Kota",
    excerpt:
      "Tim matematika dari SD Muhammadiyah 3 Samarinda berhasil meraih juara 1 pada Olimpiade Matematika tingkat Kota Samarinda.",
    content: `
      <p>Tim matematika SD Muhammadiyah 3 Samarinda yang terdiri dari Ahmad Fauzan (Kelas 6A), Siti Nurhaliza (Kelas 6B), dan Muhammad Rizky (Kelas 6A) berhasil meraih juara 1 pada Olimpiade Matematika Tingkat Kota Samarinda yang diselenggarakan pada tanggal 12 Januari 2025.</p>
      
      <p>Kompetisi yang diikuti oleh 45 sekolah dasar dari seluruh Kota Samarinda ini menguji kemampuan siswa dalam menyelesaikan soal-soal matematika tingkat lanjut, logika, dan pemecahan masalah.</p>
      
      <p>Ibu Diana Putri, S.Pd., selaku pembina tim olimpiade matematika, mengungkapkan kebanggaannya atas prestasi siswa-siswa ini. "Mereka telah berlatih dengan tekun selama 6 bulan terakhir. Dedikasi dan semangat belajar mereka patut diapresiasi," katanya.</p>
      
      <p>Prestasi ini sekaligus menjadi motivasi bagi siswa-siswa lain untuk terus berprestasi dan mengharumkan nama sekolah.</p>
    `,
    category: "Prestasi",
    date: "12 Januari 2025",
    author: "Ibu Diana Putri",
    readTime: "4 menit",
    image: "/children-celebrating-math-competition.jpg",
  },
  // Add more news items here...
]

const relatedNews: NewsItem[] = [
  {
    id: 1,
    title: "Pendaftaran PPDB Tahun Ajaran 2025/2026 Dibuka",
    excerpt: "Penerimaan Peserta Didik Baru untuk tahun ajaran 2025/2026 telah dibuka.",
    content: "",
    category: "Pengumuman",
    date: "10 Januari 2025",
    author: "Panitia PPDB",
    readTime: "2 menit",
    image: "/students-morning-assembly.jpg",
  },
  {
    id: 2,
    title: "Kegiatan Field Trip ke Museum Mulawarman",
    excerpt: "Siswa kelas 4 dan 5 melaksanakan kegiatan field trip edukatif.",
    content: "",
    category: "Kegiatan",
    date: "8 Januari 2025",
    author: "Bapak Ahmad Fauzi",
    readTime: "5 menit",
    image: "/math-competition-kids.jpg",
  },
]

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const newsId = Number.parseInt(resolvedParams.id)
  const news = allNews.find((n) => n.id === newsId)

  if (!news) {
    return {
      title: "Berita Tidak Ditemukan",
    }
  }

  return {
    title: `${news.title} - SD Muhammadiyah 3 Samarinda`,
    description: news.excerpt,
  }
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const newsId = Number.parseInt(resolvedParams.id)
  const news = allNews.find((n) => n.id === newsId)

  if (!news) {
    notFound()
  }

  // BreadCrumbs
 const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Galeri", href: "/galeri" },
    { label: news.title },
  ]
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader title="Berita" description="Berita SD Muhammadiyah 3 Samarinda"  breadcrumbs={breadcrumbs} />
    
      {/* Main Content */}
      <section className="py-12 mt-1">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <article>
                {/* Article Header */}
                <div className="mb-8">
                  <Badge className="mb-4">{news.category}</Badge>
                  <h1 className="mb-4 text-4xl font-bold">{news.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{news.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{news.author}</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Article Body */}
                <div 
                  className="mb-8 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />

                <Separator className="my-8" />

                {/* Share Buttons */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Bagikan:</span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{news.author}</h3>
                      <p className="text-sm text-muted-foreground">Penulis</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Related News */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">Berita Terkait</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge className="mb-2 text-xs">{item.category}</Badge>
                          <h4 className="text-sm font-semibold transition-colors line-clamp-2 group-hover:text-primary">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}