'use client';

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Trophy,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  MapPin,
  Award,
  Target,
  Eye,
  CloudCog,
} from "lucide-react"

import { PrestasiSiswa } from '@/types'
import { useApi } from "@/hooks/useApi"

export default function PrestasiSiswaDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''

  // Fetch prestasi detail
  const { 
    data: prestasiResponse,
    loading: prestasiLoading, 
    error: prestasiError,
    refetch: refetchPrestasi
  } = useApi<{ data: PrestasiSiswa }>(`/prestasi/siswa/${slug}`, {
    cache: true,
    cacheTTL: 300000,
    immediate: !!slug
  })


  // Extract prestasi from nested response
  const prestasi = useMemo(() => {
    if (!prestasiResponse) return null
    if (prestasiResponse.data) {
      return prestasiResponse.data
    }
    return prestasiResponse as unknown as PrestasiSiswa
  }, [prestasiResponse])

  // Build query string for related prestasi (same tingkat)
  const relatedQueryString = useMemo(() => {
    if (!prestasi?.tingkat) return ''
    return `tingkat=${prestasi.tingkat}&per_page=4`
  }, [prestasi?.tingkat])

  // Fetch related prestasi
  const { 
    data: relatedResponse,
    loading: relatedLoading 
  } = useApi<PrestasiSiswa[]>(
    `/prestasi/siswa?${relatedQueryString}`,
    {
      cache: true,
      cacheTTL: 300000,
      immediate: !!relatedQueryString && relatedQueryString !== ''
    }
  )

  // Filter related prestasi (exclude current)
  const relatedPrestasi = useMemo(() => {
    if (!relatedResponse || !prestasi) return []
    
    let dataArray: PrestasiSiswa[] = []
    if (Array.isArray(relatedResponse)) {
      dataArray = relatedResponse
    } else if ((relatedResponse as any).data && Array.isArray((relatedResponse as any).data)) {
      dataArray = (relatedResponse as any).data
    }
    
    const filtered = dataArray.filter((item) => item.id !== prestasi.id)
    return filtered.slice(0, 3)
  }, [relatedResponse, prestasi])

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // Get award color
  const getAwardColor = (award: string | null | undefined) => {
    if (!award) return "bg-[#33b962] text-white"
    const awardStr = String(award).toLowerCase()
    if (awardStr.includes("1") || awardStr.includes("pertama")) return "bg-[#ffd700] text-gray-900"
    if (awardStr.includes("2") || awardStr.includes("kedua")) return "bg-[#c0c0c0] text-gray-900"
    if (awardStr.includes("3") || awardStr.includes("ketiga")) return "bg-[#cd7f32] text-white"
    return "bg-[#33b962] text-white"
  }

  // Meta info
  const pageTitle = prestasi 
    ? `${prestasi.name} - Prestasi Siswa - SD Muhammadiyah 3 Samarinda`
    : "Prestasi Siswa - SD Muhammadiyah 3 Samarinda"
  
  const pageDescription = useMemo(() => {
    if (!prestasi?.description) return prestasi?.name || ""
    try {
      return prestasi.description.replace(/<[^>]*>/g, "").slice(0, 160)
    } catch {
      return prestasi.name || ""
    }
  }, [prestasi?.description, prestasi?.name])

  // Share handlers
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'native') => {
    if (typeof window === 'undefined') return

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(prestasi?.name || '')

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    if (platform === 'native') {
      if (navigator.share) {
        navigator.share({
          title: prestasi?.name || '',
          text: pageDescription,
          url: window.location.href,
        }).catch(() => {})
      } else {
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('Link berhasil disalin!'))
          .catch(() => alert('Gagal menyalin link'))
      }
    } else {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer')
    }
  }

  // Loading state
  if (prestasiLoading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative py-12 text-white bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45]">
          <div className="container px-4 mx-auto">
            <Skeleton className="w-40 h-10 bg-white/20" />
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Skeleton className="w-24 h-6 mb-4" />
                <Skeleton className="w-full h-12 mb-4" />
                <div className="flex gap-4 mb-6">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <Skeleton className="w-full h-[400px] mb-8 rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                </div>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <Skeleton className="w-full h-16" />
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Error state
  if (prestasiError || !prestasi) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-12">
            <PageHeader
              title={prestasi?.name || "Prestasi Siswa"}
              description="Prestasi Siswa - SD Muhammadiyah 3 Samarinda"
              breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Prestasi", href: "/prestasi-sekolah" }, { label: prestasi?.name }]}
            />
          <div className="container px-4 mx-auto">
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>
                  {prestasiError 
                    ? "Terjadi kesalahan saat memuat prestasi." 
                    : "Prestasi tidak ditemukan."}
                </span>
                {prestasiError && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => refetchPrestasi()}
                    className="ml-4"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Coba Lagi
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
        {/* Main Content */}
        <section className="py-12">
           <PageHeader
              title={prestasi?.name || "Prestasi Siswa"}
              description="Prestasi Siswa - SD Muhammadiyah 3 Samarinda"
              breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Prestasi", href: "/prestasi-sekolah" }, { label: prestasi?.name }]}
            />
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Article Content */}
              <div className="lg:col-span-2">
                <article>
                  {/* Article Header */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prestasi.juara && (
                        <Badge className={`${getAwardColor(prestasi.juara)} border-0 font-bold`}>
                          {prestasi.juara}
                        </Badge>
                      )}
                      {prestasi.tingkat && (
                        <Badge variant="secondary">{prestasi.tingkat}</Badge>
                      )}
                      {prestasi.kategori && prestasi.kategori.length > 0 && prestasi.kategori.map((kat) => (
                        <Badge key={kat.id} variant="outline">{kat.name}</Badge>
                      ))}
                    </div>
                    
                    {/* <h1 className="mb-4 text-4xl font-bold">{prestasi.name}</h1> */}
                    
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(prestasi.tanggal)}</span>
                      </div>
                      {prestasi.penyelenggara && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{prestasi.penyelenggara}</span>
                        </div>
                      )}
                      {prestasi.views !== undefined && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{prestasi.views} views</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Featured Image */}
                  {prestasi.foto && (
                    <div className="relative w-full mb-8 overflow-hidden rounded-lg h-96">
                      <Image
                        src={  prestasi.foto
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/prestasi/${prestasi.foto}`
                          : "/placeholder.svg"}
                        alt={prestasi.name}
                        fill                      
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  {/* Achievement Info Card */}
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-6 h-6 text-[#ffd700]" />
                        <h2 className="text-2xl font-bold">Informasi Prestasi</h2>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Nama Siswa</p>
                          <p className="text-base font-semibold">{prestasi.name}</p>
                        </div>
                        
                        {prestasi.tingkat && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Tingkat Kompetisi</p>
                            <p className="text-base font-semibold">{prestasi.tingkat}</p>
                          </div>
                        )}
                        
                        {prestasi.juara && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Juara</p>
                            <p className="text-base font-semibold">{prestasi.juara}</p>
                          </div>
                        )}
                        
                        {prestasi.penyelenggara && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Penyelenggara</p>
                            <p className="text-base font-semibold">{prestasi.penyelenggara}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Tanggal Prestasi</p>
                          <p className="text-base font-semibold">{formatDate(prestasi.tanggal)}</p>
                        </div>
                        
                        {prestasi.kategori && prestasi.kategori.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Kategori</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {prestasi.kategori.map((kat) => (
                                <Badge key={kat.id} variant="secondary">{kat.name}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  {prestasi.description && (
                    <Card className="mb-8">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Award className="w-5 h-5 text-[#33b962]" />
                          <h3 className="text-xl font-semibold">Deskripsi</h3>
                        </div>
                        <div 
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{ __html: prestasi.description }}
                        />
                      </CardContent>
                    </Card>
                  )}

                  <Separator className="my-8" />

                  {/* Share Buttons */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Bagikan:</span>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => handleShare('facebook')}
                      >
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => handleShare('twitter')}
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => handleShare('linkedin')}
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => handleShare('native')}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Achievement Badge */}
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-br from-[#33b962] to-[#2a9d52] p-6 text-white">
                    <div className="flex items-center justify-center mb-4">
                      <Trophy className="w-16 h-16 text-[#ffd700]" />
                    </div>
                    <h3 className="text-xl font-bold text-center">{prestasi.juara || "Prestasi"}</h3>
                    <p className="mt-2 text-sm text-center text-white/90">{prestasi.tingkat}</p>
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-bold">Statistik</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Dilihat</span>
                      <span className="font-semibold">{prestasi.views || 0}x</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tanggal</span>
                      <span className="text-sm font-semibold">{formatDate(prestasi.tanggal)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Prestasi */}
                {relatedLoading ? (
                  <Card>
                    <CardHeader>
                      <Skeleton className="w-32 h-6" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-4">
                          <Skeleton className="flex-shrink-0 w-24 h-24 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="w-16 h-4" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-20 h-3" />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : relatedPrestasi.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">Prestasi Terkait</h3>
                      <p className="text-sm text-muted-foreground">Tingkat {prestasi.tingkat}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedPrestasi.map((item) => (
                        <Link
                          key={item.id}
                          href={`/prestasi/siswa/${item.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                              <Image
                                src={item.foto || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              {item.juara && (
                                <Badge className={`mb-2 text-xs ${getAwardColor(item.juara)}`}>
                                  {item.juara}
                                </Badge>
                              )}
                              <h4 className="text-sm font-semibold transition-colors line-clamp-2 group-hover:text-[#33b962]">
                                {item.name}
                              </h4>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {formatDate(item.tanggal)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </div> 
  )
}