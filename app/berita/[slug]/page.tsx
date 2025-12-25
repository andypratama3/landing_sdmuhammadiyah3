'use client';

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react"

import { HtmlContent } from "@/components/html-content"
import { Berita } from '@/types/berita.types'
import { useApi } from "@/hooks/useApi"
import Head from "next/head"

export default function BeritaDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''

  // ✅ Fetch berita detail
  const { 
    data: beritaResponse,
    loading: beritaLoading, 
    error: beritaError,
    refetch: refetchBerita
  } = useApi<{ data: Berita }>(`/berita/${slug}`, {
    cache: true,
    cacheTTL: 300000,
    immediate: !!slug
  })

  // Extract berita from nested response
  const berita = useMemo(() => {
    if (!beritaResponse) return null
    if (beritaResponse.data) {
      return beritaResponse.data
    }
    return beritaResponse as unknown as Berita
  }, [beritaResponse])

  // ✅ Build query string untuk related berita
  const relatedQueryString = useMemo(() => {
    if (!berita?.category) return ''
    return `category=${berita.category}`
  }, [berita?.category])

  // ✅ Fetch related berita
  const { 
    data: relatedResponse,
    loading: relatedLoading 
  } = useApi<Berita[]>(
    `/berita?${relatedQueryString}`,
    {
      cache: true,
      cacheTTL: 300000,
      immediate: !!relatedQueryString && relatedQueryString !== ''
    }
  )

  // ✅ Filter related berita (exclude current berita)
  const relatedBerita = useMemo(() => {
    if (!relatedResponse || !berita) return []
    
    let dataArray: Berita[] = []
    if (Array.isArray(relatedResponse)) {
      dataArray = relatedResponse
    } else if ((relatedResponse as any).data && Array.isArray((relatedResponse as any).data)) {
      dataArray = (relatedResponse as any).data
    }
    
    const filtered = dataArray.filter((item) => item.id !== berita.id)
    return filtered.slice(0, 3)
  }, [relatedResponse, berita])

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

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!berita?.desc) return 1
    return Math.max(1, Math.ceil(berita.desc.length / 500))
  }, [berita?.desc])

  // Meta info
  const pageTitle = berita 
    ? `${berita.judul} - SD Muhammadiyah 3 Samarinda`
    : "Berita - SD Muhammadiyah 3 Samarinda"
  
  const pageDescription = useMemo(() => {
    if (!berita?.desc) return ""
    try {
      return berita.desc.replace(/<[^>]*>/g, "").slice(0, 160)
    } catch {
      return ""
    }
  }, [berita?.desc])

  // Share handlers
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'native') => {
    if (typeof window === 'undefined') return

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(berita?.judul || '')

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    if (platform === 'native') {
      if (navigator.share) {
        navigator.share({
          title: berita?.judul || '',
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
  if (beritaLoading) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <section className="relative py-12 text-white bg-gradient-to-br from-primary via-primary/90 to-primary/80">
            <div className="container px-4 mx-auto">
              <Skeleton className="w-40 h-10 bg-white/20" />
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Skeleton className="w-24 h-6 mb-4" />
                  <Skeleton className="w-full h-12 mb-4" />
                  <div className="flex gap-4 mb-6">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-20 h-4" />
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
      </>
    )
  }

  // Error state
  if (beritaError || !berita) {
    return (
      <>
        <Head>
          <title>Berita Tidak Ditemukan</title>
        </Head>
        <div className="min-h-screen bg-background">
          <section className="relative py-12 text-white bg-gradient-to-br from-primary via-primary/90 to-primary/80">
            <div className="container px-4 mx-auto">
              <Link href="/berita">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Berita
                </Button>
              </Link>
            </div>
          </section>

          <section className="py-12">
            <div className="container px-4 mx-auto">
              <Alert variant="destructive" className="max-w-2xl mx-auto">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>
                    {beritaError 
                      ? "Terjadi kesalahan saat memuat berita." 
                      : "Berita tidak ditemukan."}
                  </span>
                  {beritaError && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => refetchBerita()}
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
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={berita.judul} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        {berita.foto && (
          <meta 
            property="og:image" 
            content={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}`} 
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={berita.judul} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="relative py-12 text-white bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          <div className="container px-4 mx-auto">
            <Link href="/berita">
              <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Berita
              </Button>
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Article Content */}
              <div className="lg:col-span-2">
                <article>
                  {/* Article Header */}
                  <div className="mb-8">
                    <Badge className="mb-4 capitalize">{berita.category}</Badge>
                    <h1 className="mb-4 text-4xl font-bold">{berita.judul}</h1>
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(berita.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{readingTime} menit</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>Admin</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="relative w-full mb-8 overflow-hidden rounded-lg h-150">
                    <Image
                      src={
                        berita.foto
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}`
                          : "/placeholder.svg"
                      }
                      alt={berita.judul}
                      fill                      
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Article Body */}
                  {berita.desc && (
                    <div className="mb-8">
                      <HtmlContent 
                        content={berita.desc}
                        className="prose prose-lg max-w-none"
                      />
                    </div>
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
                {/* Author Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Admin</h3>
                        <p className="text-sm text-muted-foreground">Penulis</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Related News */}
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
                ) : relatedBerita.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">Berita Terkait</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedBerita.map((item) => (
                        <Link
                          key={item.id}
                          href={`/berita/${item.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                              <Image
                                src={
                                  item.foto
                                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${item.foto}`
                                    : "/placeholder.svg"
                                }
                                
                                alt={item.judul}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Badge className="mb-2 text-xs capitalize">{item.category}</Badge>
                              <h4 className="text-sm font-semibold transition-colors line-clamp-2 group-hover:text-primary">
                                {item.judul}
                              </h4>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {formatDate(item.created_at)}
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
    </>
  )
}