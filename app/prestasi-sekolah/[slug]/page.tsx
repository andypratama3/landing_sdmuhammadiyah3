'use client';

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Award,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Star,
  Shield,
  CheckCircle,
  Eye,
} from "lucide-react"

import { PrestasiSekolah } from '@/types'
import { useApi } from "@/hooks/useApi"

export default function PrestasiSekolahDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''

  // Fetch prestasi detail
  const { 
    data: prestasiResponse,
    loading: prestasiLoading, 
    error: prestasiError,
    refetch: refetchPrestasi
  } = useApi<{ data: PrestasiSekolah }>(`/prestasi/sekolah/${slug}`, {
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
    return prestasiResponse as unknown as PrestasiSekolah
  }, [prestasiResponse])

  // Build query string for related prestasi (random)
  const relatedQueryString = useMemo(() => {
    if (!prestasi) return ''
    return `per_page=4`
  }, [prestasi])

  // Fetch related prestasi
  const { 
    data: relatedResponse,
    loading: relatedLoading 
  } = useApi<PrestasiSekolah[]>(
    `/prestasi/sekolah?${relatedQueryString}`,
    {
      cache: true,
      cacheTTL: 300000,
      immediate: !!relatedQueryString
    }
  )

  // Filter related prestasi (exclude current)
  const relatedPrestasi = useMemo(() => {
    if (!relatedResponse || !prestasi) return []
    
    let dataArray: PrestasiSekolah[] = []
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

  // Get category icon
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    if (name.includes('akreditasi')) return Award
    if (name.includes('penghargaan') || name.includes('award')) return Star
    if (name.includes('sertifikat') || name.includes('ramah')) return Shield
    return CheckCircle
  }

  // Meta info
  const pageTitle = prestasi 
    ? `${prestasi.name} - Prestasi Sekolah - SD Muhammadiyah 3 Samarinda`
    : "Prestasi Sekolah - SD Muhammadiyah 3 Samarinda"
  
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
              title={prestasi?.name || "Prestasi Sekolah"}
              description="Prestasi Sekolah - SD Muhammadiyah 3 Samarinda"
              breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Prestasi", href: "/prestasi-sekolah" }, { label: prestasi?.name} ]}
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

  const IconComponent = prestasi.kategori && prestasi.kategori.length > 0 
    ? getCategoryIcon(prestasi.kategori[0].name)
    : Award

  return (
    <div className="min-h-screen bg-background">
    
      {/* Main Content */}
      <section className="py-12">
         <PageHeader
              title={prestasi?.name || "Prestasi Sekolah"}
              description="Galeri SD Muhammadiyah 3 Samarinda"
              breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Galeri", href: "/galeri" }, { label: prestasi?.name }]}
            />
    
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <article>
                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prestasi.kategori && prestasi.kategori.length > 0 && prestasi.kategori.map((kat) => (
                      <Badge key={kat.id} className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20">
                        {kat.name}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* <h1 className="mb-4 text-4xl font-bold">{prestasi.name}</h1> */}
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(prestasi.tanggal)}</span>
                    </div>
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
                      src={prestasi.foto || "/placeholder.svg"}
                      alt={prestasi.name}
                      fill                      
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#33b962]/60 to-transparent flex items-end p-6">
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                  </div>
                )}

                {/* Achievement Info Card */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-6 h-6 text-[#33b962]" />
                      <h2 className="text-2xl font-bold">Informasi Prestasi</h2>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Nama Prestasi</p>
                        <p className="text-base font-semibold">{prestasi.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tanggal Prestasi</p>
                        <p className="text-base font-semibold">{formatDate(prestasi.tanggal)}</p>
                      </div>
                      
                      {prestasi.kategori && prestasi.kategori.length > 0 && (
                        <div className="md:col-span-2">
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
                        <Star className="w-5 h-5 text-[#33b962]" />
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
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center">{prestasi.name}</h3>
                  {prestasi.kategori && prestasi.kategori.length > 0 && (
                    <p className="mt-2 text-sm text-center text-white/90">{prestasi.kategori[0].name}</p>
                  )}
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedPrestasi.map((item) => {
                      const RelatedIcon = item.kategori && item.kategori.length > 0 
                        ? getCategoryIcon(item.kategori[0].name)
                        : Award

                      return (
                        <Link
                          key={item.id}
                          href={`/prestasi/sekolah/${item.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-gradient-to-br from-[#33b962] to-[#2a9d52]">
                              {item.foto ? (
                                <Image
                                  src={item.foto}
                                  alt={item.name}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-110"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                  <RelatedIcon className="w-12 h-12 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              {item.kategori && item.kategori.length > 0 && (
                                <Badge className="mb-2 text-xs bg-[#33b962]/10 text-[#33b962]">
                                  {item.kategori[0].name}
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
                      )
                    })}
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