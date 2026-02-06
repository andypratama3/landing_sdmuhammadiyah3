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
import { PageHeader } from "@/components/page-header";

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
  if (beritaLoading) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <section className="relative py-12 text-white bg-linear-to-br from-primary via-primary/90 to-primary/80">
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
          <section className="relative py-12 text-white bg-linear-to-br from-primary via-primary/90 to-primary/80">
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

      <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

        {/* Header */}

        {/* Main Content */}
        <section className="py-12">
          <PageHeader
            title={"Berita Sekolah"}
            description="Informasi terbaru dan terpercaya Seputar Sekolah Kreatif SD Muhammadiyah 3 Samarinda"
            breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Berita", href: "/berita" }, { label: berita?.judul }]}
          />

          <div className="container px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Article Content */}
              <div className="lg:col-span-2">
                <article>
                  {/* Article Header */}
                  <div className="mb-10">
                    <Badge className="mb-6 bg-[#33b962]/10 text-[#33b962] border-emerald-500/20 px-4 py-1.5 font-black uppercase tracking-widest text-[10px] rounded-full">
                      {berita.category}
                    </Badge>
                    <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">{berita.judul}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#33b962]" />
                        <span>{formatDate(berita.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#33b962]" />
                        <span>{readingTime} MENIT BACA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#33b962]" />
                        <span>ADMIN SDMUH3</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="relative w-full mb-12 overflow-hidden rounded-[2.5rem] shadow-2xl border-0 group">
                    <Image
                      src={
                        berita.foto
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}`
                          : "/placeholder.svg"
                      }
                      alt={berita.judul}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Article Body */}
                  {berita.desc && (
                    <div className="mb-8">
                      <HtmlContent
                        content={berita.desc}
                        className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert"
                      />
                    </div>
                  )}

                  <Separator className="my-8" />

                  {/* Share Buttons */}
                  <div className="flex items-center gap-4 py-8 border-t border-gray-100 dark:border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">BAGIKAN ARTIKEL:</span>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#1877F2] hover:text-white transition-all"
                        onClick={() => handleShare('facebook')}
                      >
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#1DA1F2] hover:text-white transition-all"
                        onClick={() => handleShare('twitter')}
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#0A66C2] hover:text-white transition-all"
                        onClick={() => handleShare('linkedin')}
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#33b962] hover:text-white transition-all"
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
                        <Image src="/SD3_logo1.png"
                          className="rounded-full"
                          alt="Logo Sekolah"
                          width={40}
                          height={40}
                        />
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