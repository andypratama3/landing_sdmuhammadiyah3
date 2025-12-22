import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"

const galleryDetails: Record<string, any> = {
  "1": {
    id: 1,
    title: "Pembelajaran Outdoor",
    description:
      "Kegiatan belajar di luar kelas untuk meningkatkan pemahaman siswa melalui pengalaman langsung dengan alam dan lingkungan sekitar.",
    image: "/elementary-school-outdoor-learning.jpg",
    date: "15 Januari 2025",
    location: "Taman Kota Samarinda",
    participants: "45 Siswa",
    category: "Pembelajaran",
    fullDescription: `
      Kegiatan pembelajaran outdoor ini merupakan bagian dari program pendidikan berbasis alam yang bertujuan untuk memberikan pengalaman belajar yang lebih konkret dan menyenangkan bagi siswa.
      
      Dalam kegiatan ini, siswa kelas 4 dan 5 melakukan eksplorasi alam di Taman Kota Samarinda. Mereka belajar tentang berbagai jenis tanaman, ekosistem, dan pentingnya menjaga kelestarian lingkungan.
      
      Kegiatan ini mendapat respon sangat positif dari para siswa karena mereka bisa belajar sambil bermain dan berinteraksi langsung dengan alam.
    `,
    images: ["/elementary-school-outdoor-learning.jpg", "/kids-art-activities.jpg", "/science-experiment-kids.jpg"],
  },
  "2": {
    id: 2,
    title: "Kegiatan Seni & Budaya",
    description: "Siswa mengekspresikan kreativitas melalui berbagai kegiatan seni dan budaya",
    image: "/kids-art-activities.jpg",
    date: "10 Januari 2025",
    location: "Aula SD Muhammadiyah 3",
    participants: "60 Siswa",
    category: "Ekstrakurikuler",
    fullDescription: `
      Program seni dan budaya dirancang untuk mengembangkan kreativitas dan apresiasi siswa terhadap seni. Kegiatan meliputi melukis, menggambar, dan kerajinan tangan.
      
      Siswa diajarkan berbagai teknik seni dan diberikan kebebasan untuk mengekspresikan ide kreatif mereka. Hasil karya siswa dipamerkan di koridor sekolah.
      
      Program ini membantu siswa mengembangkan kepercayaan diri dan kemampuan berpikir kreatif yang akan berguna untuk masa depan mereka.
    `,
    images: ["/kids-art-activities.jpg", "/kids-traditional-dance.jpg", "/elementary-school-outdoor-learning.jpg"],
  },
  "3": {
    id: 3,
    title: "Kompetisi Matematika",
    description: "Siswa mengikuti kompetisi matematika tingkat kota dengan antusiasme tinggi",
    image: "/math-competition-kids.jpg",
    date: "5 Januari 2025",
    location: "Gedung Serbaguna Samarinda",
    participants: "30 Siswa",
    category: "Kompetisi",
    fullDescription: `
      Kompetisi matematika tingkat kota merupakan ajang bergengsi yang diikuti oleh siswa-siswa terbaik dari berbagai sekolah di Samarinda.
      
      Tim SD Muhammadiyah 3 mengirimkan 30 siswa pilihan yang telah melalui seleksi ketat. Mereka telah berlatih intensif selama 3 bulan sebelum kompetisi.
      
      Kompetisi ini meliputi soal-soal logika, geometri, dan aljabar yang menantang. Siswa kami menunjukkan performa yang membanggakan dan berhasil meraih beberapa penghargaan.
    `,
    images: ["/math-competition-kids.jpg", "/kids-art-activities.jpg", "/science-experiment-kids.jpg"],
  },
}

export default async function GaleriDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const detail = galleryDetails[id]

  if (!detail) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Galeri", href: "/galeri" },
    { label: detail.title },
  ]

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <PageHeader title={detail.title} description={detail.description} breadcrumbs={breadcrumbs} />

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <Card className="mb-6 overflow-hidden transition-all hover:shadow-lg">
                <div className="relative w-full aspect-video">
                  <Image
                    src={detail.image || "/placeholder.svg"}
                    alt={detail.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>

              {/* Description Card */}
              <Card className="mb-6">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold">Deskripsi Kegiatan</h2>
                  <div className="space-y-4">
                    {detail.fullDescription.split("\n").map(
                      (paragraph: string, index: number) =>
                        paragraph.trim() && (
                          <p key={index} className="leading-relaxed text-muted-foreground">
                            {paragraph.trim()}
                          </p>
                        ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Gallery Grid */}
              {detail.images && detail.images.length > 1 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="mb-6 text-2xl font-bold">Foto Kegiatan Lainnya</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {detail.images.slice(1).map((img: string, index: number) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-lg aspect-square group"
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`${detail.title} - ${index + 2}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Info Card */}
              <Card>
                <CardContent className="p-6">
                  <Badge className="mb-4">{detail.category}</Badge>
                  <h3 className="mb-6 text-lg font-semibold">Informasi Kegiatan</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
                        <p className="text-base font-semibold text-foreground">{detail.date}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t" />
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Lokasi</p>
                        <p className="text-base font-semibold text-foreground">{detail.location}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t" />
                    <div className="flex items-start gap-4">
                      <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Peserta</p>
                        <p className="text-base font-semibold text-foreground">{detail.participants}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6">
                  <h3 className="mb-3 font-semibold">Tertarik Mengetahui Lebih Lanjut?</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Hubungi kami untuk informasi lebih detail tentang kegiatan ini.
                  </p>
                  <Button className="w-full" size="sm">
                    Hubungi Kami
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}