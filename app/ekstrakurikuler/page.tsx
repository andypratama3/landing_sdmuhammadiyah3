"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Trophy, BookOpen, Users, Calendar, Clock, UserCircle, Target, 
  X, AlertCircle, RefreshCw 
} from "lucide-react"
import Image from "next/image"
import { useState, useMemo } from "react"
import { useApi } from "@/hooks/useApi"
import { Ekstrakurikuler } from "@/types/ekstrakurikuler.types"

// Extended type with parsed foto array
interface EkstrakurikulerWithPhotos extends Ekstrakurikuler {
  fotoArray: string[]
  fotoFirst: string | null
}

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

// Category mapping
const categoryMap: { [key: string]: string } = {
  olahraga: "Olahraga",
  seni: "Seni",
  sains: "Sains",
  islami: "Islami",
  lainnya: "Lainnya",
}

export default function EkstrakurikulerPage() {
  const [selectedActivity, setSelectedActivity] = useState<EkstrakurikulerWithPhotos | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Fetch ekstrakurikuler data
  const { 
    data: ekstrakurikulerData, 
    loading, 
    error,
    refetch 
  } = useApi<Ekstrakurikuler[]>('/ekstrakurikuler', {
    cache: true,
    cacheTTL: 300000,
    immediate: true,
  })

  // Process ekstrakurikuler data - parse foto array
  const ekstrakurikuler = useMemo((): EkstrakurikulerWithPhotos[] => {
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || ''
    
    return (ekstrakurikulerData || []).map(item => {
      // Parse foto array and prepend storage URL
      const fotoArray = item.foto 
        ? item.foto.split(',').map(f => {
            const trimmed = f.trim()
            // Check if already has http/https, if not prepend storage URL
            return trimmed.startsWith('http') ? trimmed : `${storageUrl}/img/ekstrakurikuler/${trimmed}`
          })
        : []
      
      return {
        ...item,
        fotoArray,
        fotoFirst: fotoArray[0] || null,
      }
    })
  }, [ekstrakurikulerData])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(ekstrakurikuler.map(item => item.kategori.toLowerCase()))
    return Array.from(cats).sort((a, b) => a === 'Lainnya' ? -1 : b === 'Lainnya' ? 1 : a.localeCompare(b))
  }, [ekstrakurikuler])

  // Filter ekstrakurikuler by category
  const filteredEkstrakurikuler = useMemo(() => {
    if (selectedCategory === "all") return ekstrakurikuler
    return ekstrakurikuler.filter(item => item.kategori.toLowerCase() === selectedCategory)
  }, [ekstrakurikuler, selectedCategory])

  return (
    <div className="min-h-screen pt-16 pb-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 text-white bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#1a4d2e] dark:via-[#2a7a4a] dark:to-[#1f5c3a]">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-white sm:mb-6 bg-white/20 border-white/30">Ekstrakurikuler</Badge>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Kegiatan Ekstrakurikuler</h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90">
              Berbagai pilihan kegiatan untuk mengembangkan bakat, minat, dan karakter siswa di luar jam pelajaran regular
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl dark:text-white">
              Manfaat Mengikuti Ekstrakurikuler
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-gray-600 sm:text-base dark:text-gray-400">
              Kegiatan ekstrakurikuler memberikan banyak manfaat untuk perkembangan anak
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center transition-all hover:shadow-lg dark:bg-gray-700 dark:border-gray-600">
                  <CardHeader>
                    <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#33b962]/10 dark:bg-[#33b962]/20">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#33b962]" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 sm:text-xl dark:text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="py-12 bg-white sm:py-16 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl dark:text-white">
              Pilihan Kegiatan Ekstrakurikuler
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-gray-600 sm:text-base dark:text-gray-400">
              Temukan kegiatan yang sesuai dengan minat dan bakat anak Anda
            </p>
          </div>

          {loading ? (
            // Loading State
            <div className="space-y-6">
              <div className="grid max-w-4xl grid-cols-2 gap-2 mx-auto sm:grid-cols-3 md:grid-cols-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="dark:bg-gray-700">
                    <Skeleton className="w-full h-48" />
                    <CardHeader>
                      <Skeleton className="w-3/4 h-6" />
                      <Skeleton className="w-full h-4 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Skeleton className="w-2/3 h-4" />
                      <Skeleton className="w-1/2 h-4" />
                      <Skeleton className="w-full h-10 mt-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : error ? (
            // Error State
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => refetch?.()}
                  className="ml-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Coba Lagi
                </Button>
              </AlertDescription>
            </Alert>
          ) : ekstrakurikuler.length === 0 ? (
            // Empty State
            <div className="py-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Belum Ada Data Ekstrakurikuler
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Data kegiatan ekstrakurikuler akan segera ditambahkan.
              </p>
            </div>
          ) : (
            // Data Loaded
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full h-auto max-w-4xl grid-cols-2 gap-2 p-2 mx-auto mb-6 bg-gray-100 sm:mb-8 sm:grid-cols-3 md:grid-cols-6 dark:bg-gray-800">
                <TabsTrigger value="all" className="text-xs sm:text-sm">Semua</TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="text-xs sm:text-sm">
                    {categoryMap[cat] || cat}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                  {filteredEkstrakurikuler.map((activity) => (
                    <ActivityCard 
                      key={activity.id} 
                      activity={activity} 
                      onClick={() => setSelectedActivity(activity)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Registration Requirements */}
      {/* <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center sm:mb-12">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl dark:text-white">
                Syarat Pendaftaran
              </h2>
              <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                Dokumen yang diperlukan untuk mendaftar ekstrakurikuler
              </p>
            </div>

            <Card className="dark:bg-gray-700 dark:border-gray-600">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#33b962]/10 dark:bg-[#33b962]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-[#33b962]">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-900 sm:text-base dark:text-white">{requirement}</p>
                    </li>
                  ))}
                </ul>

                <div className="p-4 mt-8 bg-gray-100 rounded-lg dark:bg-gray-600">
                  <p className="mb-4 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                    <strong>Catatan:</strong> Pendaftaran dapat dilakukan di kantor tata usaha atau melalui wali kelas.
                    Kegiatan dimulai setelah pembayaran lunas.
                  </p>
                  <Button size="lg" className="w-full sm:w-auto bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962]">
                    Daftar Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Detail Modal */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedActivity?.name}
            </DialogTitle>
            <DialogDescription>
              <Badge className="mt-2 bg-[#33b962] text-white border-0">
                {selectedActivity?.kategori && (categoryMap[selectedActivity.kategori.toLowerCase()] || selectedActivity.kategori)}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          {selectedActivity && (
            <div className="space-y-6">
              {/* Image Gallery */}
              {selectedActivity.fotoArray && selectedActivity.fotoArray.length > 0 && (
                <div className="space-y-3">
                  {/* Main Image */}
                  <div className="relative h-full overflow-hidden rounded-lg sm:h-80">
                    <Image
                      src={selectedActivity.fotoArray[0]}
                      alt={selectedActivity.name}
                      fill
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Thumbnail Gallery - Only show if more than 1 image */}
                  {selectedActivity.fotoArray.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedActivity.fotoArray.slice(1, 5).map((foto, index) => (
                        <div key={index} className="relative h-20 overflow-hidden rounded-lg">
                          <Image
                            src={foto}
                            alt={`${selectedActivity.name} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {selectedActivity.fotoArray.length > 5 && (
                        <div className="relative flex items-center justify-center h-20 overflow-hidden rounded-lg bg-gray-900/50">
                          <span className="font-semibold text-white">
                            +{selectedActivity.fotoArray.length - 5}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Deskripsi</h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
                  {selectedActivity.desc}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {selectedActivity.kelas && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Users className="w-5 h-5 text-[#33b962] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Kelas</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedActivity.kelas}</p>
                    </div>
                  </div>
                )}

                {selectedActivity.jam && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Clock className="w-5 h-5 text-[#33b962] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Jadwal</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedActivity.jam} - Selesai</p>
                    </div>
                  </div>
                )}

                {selectedActivity.guru && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 sm:col-span-2">
                    <UserCircle className="w-5 h-5 text-[#33b962] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Pembimbing</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedActivity.guru}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ActivityCard({ 
  activity, 
  onClick 
}: { 
  activity: EkstrakurikulerWithPhotos
  onClick: () => void 
}) {
  return (
    <Card className="overflow-hidden transition-all cursor-pointer hover:shadow-lg group dark:bg-gray-700 dark:border-gray-600" onClick={onClick}>
      <div className="relative overflow-hidden bg-gray-100 h- dark:bg-gray-600 h-100 w-100">
        {activity.fotoFirst ? (
          <Image
            src={activity.fotoFirst}
            alt={activity.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className="border-white bg-white/90 text-[#33b962]">
            {categoryMap[activity.kategori.toLowerCase()] || activity.kategori}
          </Badge>
        </div>
        {/* Photo count badge if multiple photos */}
        {activity.fotoArray.length > 1 && (
          <div className="absolute bottom-4 right-4">
            <Badge className="text-xs text-white border-white bg-black/60">
              {activity.fotoArray.length} foto
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 sm:text-xl dark:text-white line-clamp-1">
          {activity.name}
        </CardTitle>
        <CardDescription className="text-xs text-gray-600 sm:text-sm dark:text-gray-400 line-clamp-2">
          {activity.desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {activity.jam && (
          <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="truncate">{activity.jam} - Selesai </span>
          </div>
        )}
        {activity.kelas && (
          <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
            <Users className="w-4 h-4 shrink-0" />
            <span className="truncate">{activity.kelas}</span>
          </div>
        )}
        {activity.guru && (
          <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
            <UserCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">{activity.guru}</span>
          </div>
        )}
        <Button className="w-full mt-4 bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-sm">
          Lihat Detail
        </Button>
      </CardContent>
    </Card>
  )
}