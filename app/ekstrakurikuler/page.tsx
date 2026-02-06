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
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto mt-8">
          <div className="max-w-4xl mx-auto text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
              Eksplorasi Bakat & Minat
            </Badge>
            <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md text-balance">
              Ekstrakurikuler Kreatif
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Temukan keseruanmu melaui berbagai pilihan kegiatan ekstrakurikuler yang inspiratif dan menyenangkan.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] animate-blob pointer-events-none" />
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">
              Kenapa Ikut Ekstra?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-medium">
              Ayo kembangkan dirimu jadi lebih hebat melalui beragam manfaat positif
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="card-premium p-10 text-center glass dark:bg-gray-900/40 border-0 group transition-all hover:scale-105">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 rounded-3xl bg-white/50 dark:bg-emerald-900/20 group-hover:bg-[#33b962] transition-all duration-500 shadow-xl brightness-110 filter drop-shadow-[0_10px_15px_rgba(51,185,98,0.2)]">
                    <Icon className="w-10 h-10 text-[#33b962] group-hover:text-white transition-colors brightness-125" />
                  </div>
                  <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white group-hover:text-[#33b962] transition-colors uppercase tracking-tight leading-tight">{benefit.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-500">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">
              Pilih Kegiatan Favoritmu!
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-medium">
              Ada banyak pilihan seru yang bisa kamu ikuti setiap harinya
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
              <TabsList className="grid w-full h-auto max-w-4xl grid-cols-2 gap-2 p-2 mx-auto mb-8 bg-gray-100 dark:bg-gray-950/40 dark:backdrop-blur-xl dark:border-white/10 sm:grid-cols-3 md:grid-cols-6 rounded-2xl">
                <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-md">Semua</TabsTrigger>
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-md">
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

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#33b962]/10 dark:bg-[#33b962]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-[#33b962]">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-gray-200 sm:text-base">{requirement}</p>
                    </li>
                  ))}
                </ul>

                <div className="p-4 mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="mb-4 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-950/80 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-2xl rounded-[2.5rem]">
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
                        <div key={index} className="relative w-full h-full overflow-hidden rounded-lg">
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
    <Card className="card-premium h-full dark:bg-gray-900/40 dark:backdrop-blur-xl border-0 shadow-lg group flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-[2.5rem] glass" onClick={onClick}>
      <div className="relative overflow-hidden h-72 w-full bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
        {activity.fotoFirst ? (
          <Image
            src={activity.fotoFirst}
            alt={activity.name}
            fill
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BookOpen className="w-16 h-16 text-gray-400 opacity-30" />
          </div>
        )}
        <div className="absolute top-6 left-6 z-20">
          <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 font-black uppercase tracking-widest text-[10px] rounded-full px-4 py-1.5 shadow-xl">
            {categoryMap[activity.kategori.toLowerCase()] || activity.kategori}
          </Badge>
        </div>
        {/* Photo count badge if multiple photos */}
        {activity.fotoArray.length > 1 && (
          <div className="absolute bottom-6 right-6 z-20">
            <Badge className="text-[10px] font-black uppercase tracking-widest text-white border-white/20 bg-black/40 backdrop-blur-md rounded-full px-4 py-1">
              {activity.fotoArray.length} PANORAMA
            </Badge>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-8">
        <h3 className="text-2xl font-black text-gray-900 sm:text-2xl dark:text-white line-clamp-1 group-hover:text-[#33b962] transition-colors uppercase tracking-tight mb-3">
          {activity.name}
        </h3>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-6">
          {activity.desc}
        </p>

        <div className="mt-auto space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
          {activity.jam && (
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
              <div className="w-8 h-8 bg-[#33b962]/10 rounded-xl flex items-center justify-center brightness-110 shadow-inner">
                <Clock className="w-4 h-4 text-[#33b962] brightness-125" />
              </div>
              <span className="truncate">{activity.jam} - Selesai </span>
            </div>
          )}
          {activity.guru && (
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
              <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center brightness-110 shadow-inner">
                <UserCircle className="w-4 h-4 text-blue-500 brightness-125" />
              </div>
              <span className="truncate">{activity.guru}</span>
            </div>
          )}
          <Button className="w-full mt-4 bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] h-12 shadow-xl hover:scale-[1.05] transition-all">
            LIHAT DETAIL AKTIVITAS
          </Button>
        </div>
      </div>
    </Card>
  )
}