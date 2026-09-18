'use client';

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cleanRichText } from "@/lib/html-sanitizer"
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
    const name = (categoryName ?? '').toLowerCase()
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
        }).catch(() => { })
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
        <section className="relative py-12 text-white bg-gradient-to-br from-(--color-forest-700) via-(--color-forest-500) to-(--color-forest-600)">
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

  const IconComponent = prestasi.kategori && prestasi.kategori.length > 0
    ? getCategoryIcon(prestasi.kategori[0].name)
    : Award

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-700)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Main Content */}
      <PageHeader
        title={prestasi?.name || "Prestasi Sekolah"}
        description="Pengakuan atas Dedikasi Pendidikan Berkualitas"
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Prestasi Sekolah", href: "/prestasi-sekolah" }, { label: prestasi?.name }]}
      />

      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <article>
                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prestasi.kategori && prestasi.kategori.length > 0 && prestasi.kategori.map((kat) => (
                      <Badge key={kat.id} className="bg-(--color-forest-700)/10 text-(--color-forest-700) border-(--color-forest-700)/20 font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-lg">
                        {kat.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-(--color-forest-700)">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(prestasi.tanggal)}</span>
                    </div>
                    {prestasi.views !== undefined && (
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{prestasi.views} views</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Featured Image */}
                {prestasi.foto && (
                  <div className="relative w-full mb-12 overflow-hidden shadow-2xl rounded-[2.5rem] border border-gray-100 dark:border-white/5 group">
                    <Image
                      src={prestasi.foto || "/placeholder.svg"}
                      alt={prestasi.name}
                      width={1200}
                      height={800}
                      className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                )}

                {/* Achievement Info Card */}
                <Card className="mb-12 border-0 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900/40 card-premium glass">
                  <div className="bg-(--color-forest-700) p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="flex items-center gap-4 relative z-10">
                      <Award className="w-8 h-8 text-(--color-sun-500) brightness-125" />
                      <h2 className="text-xl font-black uppercase tracking-tight">Informasi Prestasi</h2>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-(--color-forest-700)">Nama Prestasi</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{prestasi.name}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-(--color-forest-700)">Tanggal Prestasi</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{formatDate(prestasi.tanggal)}</p>
                      </div>

                      {prestasi.kategori && prestasi.kategori.length > 0 && (
                        <div className="sm:col-span-2 space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-(--color-forest-700)">Kategori</p>
                          <div className="flex flex-wrap gap-2">
                            {prestasi.kategori.map((kat) => (
                              <Badge key={kat.id} className="bg-(--color-forest-700)/10 text-(--color-forest-700) border-(--color-forest-700)/10 px-4 py-1.5 font-black uppercase tracking-widest text-[9px] rounded-lg">
                                {kat.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                {prestasi.description && (
                  <Card className="mb-8 border-0 shadow-xl rounded-[2rem] overflow-hidden bg-white dark:bg-gray-900/40 glass">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-(--color-forest-700)" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Deskripsi</h3>
                      </div>
                      <div
                        className="prose prose-lg max-w-none dark:prose-invert [&_img]:max-w-full [&_img]:h-auto [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_pre]:overflow-x-auto [&_iframe]:max-w-full"
                        dangerouslySetInnerHTML={{ __html: cleanRichText(prestasi.description) }}
                      />
                    </CardContent>
                  </Card>
                )}

                <Separator className="my-8" />

                {/* Share Buttons */}
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Bagikan:</span>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                      onClick={() => handleShare('facebook')}
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                      onClick={() => handleShare('linkedin')}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-(--color-forest-700) hover:text-white hover:border-(--color-forest-700) transition-all"
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
              <Card className="overflow-hidden border-0 shadow-2xl rounded-[2.5rem] card-premium glass">
                <div className="bg-linear-to-br from-(--color-forest-700) to-(--color-forest-500) p-10 text-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <div className="flex flex-col items-center justify-center relative z-10">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[1.25rem] flex items-center justify-center mb-6 shadow-2xl border border-white/30 rotate-6 group-hover:rotate-12 transition-transform duration-500">
                      <IconComponent className="w-12 h-12 text-(--color-sun-500) brightness-125 drop-shadow-[0_4px_10px_rgba(232,163,61,0.5)]" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-center leading-tight mb-2">{prestasi.name}</h3>
                    {prestasi.kategori && prestasi.kategori.length > 0 && (
                      <Badge className="bg-white/20 border-white/30 text-white font-black uppercase tracking-widest text-[10px] px-4 py-1.5">{prestasi.kategori[0].name}</Badge>
                    )}
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <h3 className="text-lg font-bold dark:text-white">Statistik</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Dilihat</span>
                    <span className="font-semibold dark:text-white">{prestasi.views || 0}x</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tanggal</span>
                    <span className="text-sm font-semibold dark:text-white">{formatDate(prestasi.tanggal)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Related Prestasi */}
              {relatedLoading ? (
                <Card className="dark:bg-gray-800 dark:border-gray-700">
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
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <h3 className="text-xl font-bold dark:text-white">Prestasi Terkait</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedPrestasi.map((item) => {
                      const RelatedIcon = item.kategori && item.kategori.length > 0
                        ? getCategoryIcon(item.kategori[0].name)
                        : Award

                      return (
                        <Link
                          key={item.id}
                          href={`/prestasi-sekolah/${item.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-linear-to-br from-(--color-forest-700) to-(--color-forest-500)">
                              {item.foto ? (
                                <Image
                                  src={item.foto}
                                  alt={item.name}
                                  fill
                                  sizes="96px"
                                  className="object-cover object-center transition-transform group-hover:scale-110"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                  <RelatedIcon className="w-12 h-12 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              {item.kategori && item.kategori.length > 0 && (
                                <Badge className="mb-2 text-[9px] bg-(--color-forest-700)/10 text-(--color-forest-700) font-black uppercase tracking-widest">
                                  {item.kategori[0].name}
                                </Badge>
                              )}
                              <h4 className="text-sm font-semibold transition-colors line-clamp-2 group-hover:text-(--color-forest-700) dark:group-hover:text-(--color-teal-400)">
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