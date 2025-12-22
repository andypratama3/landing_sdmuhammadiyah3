import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, BookOpen, Users, Calendar, Clock, UserCircle, Target } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Ekstrakurikuler - SD Muhammadiyah 3 Samarinda",
  description:
    "Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa di bidang olahraga, seni, sains, dan keislaman.",
}

const extracurricular = [
  {
    id: 1,
    category: "sports",
    name: "Futsal",
    day: "Senin & Rabu",
    time: "15:00 - 17:00",
    instructor: "Bapak Ahmad Fauzi, S.Pd",
    ageGroup: "Kelas 3-6",
    description: "Melatih kerjasama tim, koordinasi, dan keterampilan bermain futsal.",
    image: "/gallery-futsal-match.jpg",
  },
  {
    id: 2,
    category: "sports",
    name: "Panahan",
    day: "Selasa & Kamis",
    time: "15:00 - 17:00",
    instructor: "Bapak Rizki Hamdani, S.Pd",
    ageGroup: "Kelas 2-6",
    description: "Mengembangkan fokus, konsentrasi, dan ketepatan melalui olahraga panahan.",
    image: "/gallery-archery-practice.jpg",
  },
  {
    id: 3,
    category: "sports",
    name: "Karate",
    day: "Rabu & Jumat",
    time: "15:30 - 17:30",
    instructor: "Bapak Dedi Kurniawan, S.Pd",
    ageGroup: "Kelas 1-6",
    description: "Melatih disiplin, kepercayaan diri, dan kemampuan bela diri.",
    image: "/kids-sports-activities.jpg",
  },
  {
    id: 4,
    category: "arts",
    name: "Melukis & Mewarnai",
    day: "Senin & Kamis",
    time: "14:00 - 16:00",
    instructor: "Ibu Sarah Amelia, S.Pd",
    ageGroup: "Kelas 1-6",
    description: "Mengekspresikan kreativitas melalui seni lukis dan mewarnai.",
    image: "/gallery-painting-workshop.jpg",
  },
  {
    id: 5,
    category: "arts",
    name: "Tari Tradisional",
    day: "Selasa",
    time: "14:30 - 16:30",
    instructor: "Ibu Nur Azizah, S.Sn",
    ageGroup: "Kelas 2-6",
    description: "Melestarikan budaya Indonesia melalui tarian tradisional.",
    image: "/kids-traditional-dance.jpg",
  },
  {
    id: 6,
    category: "arts",
    name: "Musik & Hadroh",
    day: "Kamis",
    time: "15:00 - 17:00",
    instructor: "Bapak Yusuf Rahman, S.Pd",
    ageGroup: "Kelas 3-6",
    description: "Belajar musik Islami dan hadroh untuk acara keagamaan.",
    image: "/islamic-studies-class.jpg",
  },
  {
    id: 7,
    category: "science",
    name: "Robotika",
    day: "Rabu",
    time: "14:00 - 16:00",
    instructor: "Bapak Fahmi Hidayat, S.Kom",
    ageGroup: "Kelas 4-6",
    description: "Belajar dasar-dasar robotika dan pemrograman untuk anak.",
    image: "/science-experiment-kids.jpg",
  },
  {
    id: 8,
    category: "science",
    name: "Sains Club",
    day: "Jumat",
    time: "14:00 - 16:00",
    instructor: "Ibu Diana Putri, S.Pd",
    ageGroup: "Kelas 3-6",
    description: "Eksperimen sains sederhana untuk memahami fenomena alam.",
    image: "/kids-outdoor-science-learning.jpg",
  },
  {
    id: 9,
    category: "islamic",
    name: "Tahfidz Al-Qur'an",
    day: "Senin - Jumat",
    time: "13:00 - 14:30",
    instructor: "Ustadz Abdullah, S.Pd.I",
    ageGroup: "Kelas 1-6",
    description: "Program menghafal Al-Qur'an dengan target 2 juz (juz 29 dan 30).",
    image: "/kids-reading-quran.jpg",
  },
  {
    id: 10,
    category: "islamic",
    name: "Kaligrafi",
    day: "Selasa",
    time: "14:00 - 16:00",
    instructor: "Ustadz Hamzah, S.Pd.I",
    ageGroup: "Kelas 3-6",
    description: "Belajar seni kaligrafi Arab untuk menulis ayat-ayat Al-Qur'an dengan indah.",
    image: "/islamic-studies-class.jpg",
  },
  {
    id: 11,
    category: "others",
    name: "Pramuka",
    day: "Sabtu",
    time: "08:00 - 11:00",
    instructor: "Bapak Hendra Wijaya, S.Pd",
    ageGroup: "Kelas 3-6",
    description: "Kegiatan kepramukaan untuk melatih kemandirian dan kepemimpinan.",
    image: "/gallery-scouts-outdoor.jpg",
  },
  {
    id: 12,
    category: "others",
    name: "English Club",
    day: "Rabu",
    time: "14:30 - 16:00",
    instructor: "Mrs. Linda Sari, S.Pd",
    ageGroup: "Kelas 4-6",
    description: "Meningkatkan kemampuan berbahasa Inggris melalui games dan conversation.",
    image: "/happy-children-classroom-learning.jpg",
  },
]

const benefits = [
  {
    title: "Mengembangkan Bakat",
    description: "Membantu siswa menemukan dan mengembangkan bakat sesuai minat mereka.",
    icon: Target,
  },
  {
    title: "Meningkatkan Keterampilan",
    description: "Melatih soft skills seperti kerjasama, komunikasi, dan kepemimpinan.",
    icon: Users,
  },
  {
    title: "Prestasi Akademik",
    description: "Keseimbangan antara akademik dan non-akademik meningkatkan prestasi.",
    icon: Trophy,
  },
  {
    title: "Karakter Positif",
    description: "Membentuk karakter disiplin, tanggung jawab, dan sportivitas.",
    icon: BookOpen,
  },
]

const requirements = [
  "Formulir pendaftaran yang telah diisi dan ditandatangani orang tua",
  "Foto copy rapor semester terakhir",
  "Surat pernyataan kesehatan dari orang tua",
  "Pas foto ukuran 3x4 sebanyak 2 lembar",
  "Biaya pendaftaran sesuai jenis kegiatan",
]

export default function EkstrakurikulerPage() {
  return (
    <div className="min-h-screen mt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white bg-linear-to-br from-primary via-primary/90 to-primary/80">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-white bg-white/20 border-white/30">Ekstrakurikuler</Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Kegiatan Ekstrakurikuler</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90">
              Berbagai pilihan kegiatan untuk mengembangkan bakat, minat, dan karakter siswa di luar jam pelajaran
              regular
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Manfaat Mengikuti Ekstrakurikuler</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Kegiatan ekstrakurikuler memberikan banyak manfaat untuk perkembangan anak
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Pilihan Kegiatan Ekstrakurikuler</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Temukan kegiatan yang sesuai dengan minat dan bakat anak Anda
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-4xl grid-cols-2 mx-auto mb-8 md:grid-cols-6">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="sports">Olahraga</TabsTrigger>
              <TabsTrigger value="arts">Seni</TabsTrigger>
              <TabsTrigger value="science">Sains</TabsTrigger>
              <TabsTrigger value="islamic">Islami</TabsTrigger>
              <TabsTrigger value="others">Lainnya</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {extracurricular.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </TabsContent>

            {["sports", "arts", "science", "islamic", "others"].map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {extracurricular
                    .filter((activity) => activity.category === category)
                    .map((activity) => (
                      <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Registration Requirements */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Syarat Pendaftaran</h2>
              <p className="text-muted-foreground">Dokumen yang diperlukan untuk mendaftar ekstrakurikuler</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-foreground">{requirement}</p>
                    </li>
                  ))}
                </ul>

                <div className="p-4 mt-8 rounded-lg bg-muted">
                  <p className="mb-4 text-sm text-muted-foreground">
                    <strong>Catatan:</strong> Pendaftaran dapat dilakukan di kantor tata usaha atau melalui wali kelas.
                    Kegiatan dimulai setelah pembayaran lunas.
                  </p>
                  <Button size="lg" className="w-full md:w-auto">
                    Daftar Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

function ActivityCard({ activity }: { activity: (typeof extracurricular)[0] }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={activity.image || "/placeholder.svg"}
          alt={activity.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge className="border-white bg-white/90 text-primary">{activity.ageGroup}</Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{activity.name}</CardTitle>
        <CardDescription>{activity.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>{activity.day}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{activity.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <UserCircle className="w-4 h-4 text-muted-foreground" />
          <span>{activity.instructor}</span>
        </div>
        <Button className="w-full mt-4">Daftar</Button>
      </CardContent>
    </Card>
  )
}
