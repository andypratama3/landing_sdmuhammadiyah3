'use client'

import { useMemo, useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  ImageIcon,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { useApi } from "@/hooks/useApi"
import { Gallery } from "@/types/gallery.types"
import Head from "next/head"
import { PageHeader } from "@/components/page-header"

export default function GaleriDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const touchThreshold = 50

  // ✅ Fetch gallery detail
  const { 
    data: galleryResponse,
    loading: galleryLoading, 
    error: galleryError,
    refetch: refetchGallery
  } = useApi<{ data: Gallery }>(`/gallery/${slug}`, {
    cache: true,
    cacheTTL: 300000,
    immediate: !!slug
  })

  // Extract gallery from nested response
  const gallery = useMemo(() => {
    if (!galleryResponse) return null
    if (galleryResponse.data) {
      return galleryResponse.data
    }
    return galleryResponse as unknown as Gallery
  }, [galleryResponse])

  // Parse comma-separated images
  const images = useMemo(() => {
    if (!gallery?.foto) return []
    return gallery.foto.split(',').map(img => img.trim()).filter(Boolean)
  }, [gallery?.foto])

  // Use cover as first image if available dengan tracking path
  const allImages = useMemo(() => {
    if (!gallery) return []
    const imgs: Array<{ src: string; isCover: boolean }> = []
    
    if (gallery.cover) {
      imgs.push({ src: gallery.cover, isCover: true })
    }
    
    images.forEach(img => {
      imgs.push({ src: img, isCover: false })
    })
    
    return imgs
  }, [gallery, images])

  // Helper untuk mendapatkan path image yang benar
  const getImagePath = (img: { src: string; isCover: boolean }) => {
    if (img.isCover) {
      return `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/gallery/cover/${img.src}`
    } else {
      return `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/gallery/${img.src}`
    }
  }

  // ✅ Build query string untuk related galleries (same category)
  const relatedQueryString = useMemo(() => {
    if (!gallery?.gallery_kategori || gallery.gallery_kategori.length === 0) return ''
    const categoryName = gallery.gallery_kategori[0].name
    return `category=${categoryName.toLowerCase()}`
  }, [gallery?.gallery_kategori])

  // ✅ Fetch related galleries
  const { 
    data: relatedResponse,
    loading: relatedLoading 
  } = useApi<Gallery[]>(
    `/gallery${relatedQueryString ? `?${relatedQueryString}` : ''}`,
    {
      cache: true,
      cacheTTL: 300000,
      immediate: !!relatedQueryString && relatedQueryString !== ''
    }
  )

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

  // Navigation handlers
  const goToPrevious = () => {
    setSelectedImage((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setSelectedImage((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    )
  }

  // Touch handlers untuk swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > touchThreshold
    const isRightSwipe = distance < -touchThreshold

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [allImages.length])

  // Get first image for preview
  const getFirstImage = (foto: string | null, cover: string | null) => {
    if (cover) return cover
    if (!foto) return null
    const images = foto.split(',')
    return images[0]?.trim() || null
  }

  // Meta info
  const pageTitle = gallery 
    ? `${gallery.name} - Gallery SD Muhammadiyah 3 Samarinda`
    : "Gallery - SD Muhammadiyah 3 Samarinda"
  
  const pageDescription = gallery
    ? `Dokumentasi kegiatan ${gallery.name} di SD Muhammadiyah 3 Samarinda`
    : ""

  // Share handlers
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'native') => {
    if (typeof window === 'undefined') return

    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(gallery?.name || '')

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    if (platform === 'native') {
      if (navigator.share) {
        navigator.share({
          title: gallery?.name || '',
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
  if (galleryLoading) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <section className="relative py-12 text-white bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45]">
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
                  </div>
                  <Skeleton className="w-full h-[400px] mb-8 rounded-lg" />
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="w-full aspect-square" />
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <Skeleton className="w-full h-32" />
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
  if (galleryError || !gallery) {
    return (
      <>
        <Head>
          <title>Gallery Tidak Ditemukan</title>
        </Head>
        <div className="min-h-screen bg-background">
          <section className="relative py-12 text-white bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45]">
            <div className="container px-4 mx-auto">
              <Link href="/galeri">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Gallery
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
                    {galleryError 
                      ? "Terjadi kesalahan saat memuat gallery." 
                      : "Gallery tidak ditemukan."}
                  </span>
                  {galleryError && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => refetchGallery()}
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
        <meta property="og:title" content={gallery.name} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        {allImages.length > 0 && (
          <meta 
            property="og:image" 
            content={getImagePath(allImages[0])}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={gallery.name} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>

      <div className="min-h-screen mt-20 bg-background">
        <PageHeader
          title={gallery.name}
          description="Galeri SD Muhammadiyah 3 Samarinda"
          breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Galeri", href: "/galeri" }, { label: gallery.name }]}
        />

        {/* Main Content */}
        <section className="container px-4 py-8 mx-auto sm:px-6 sm:py-10 lg:px-8">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Gallery Content */}
              <div className="lg:col-span-2">
                <article>
                  {/* Gallery Header */}
                  <div className="mb-8">
                    {gallery.gallery_kategori && gallery.gallery_kategori.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {gallery.gallery_kategori.map((cat) => (
                          <Badge key={cat.id} className="capitalize">
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {/* <h1 className="mb-4 text-4xl font-bold">{gallery.name}</h1> */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-end text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(gallery.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        <span>{allImages.length} Foto</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Image */}
                  {allImages.length > 0 ? (
                    <div className="relative w-full mb-6 overflow-hidden bg-gray-100 rounded-lg group h-150">
                      {/* Image Container */}
                      <div 
                        className="relative w-full h-full cursor-grab active:cursor-grabbing"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      >
                        <Image
                          src={getImagePath(allImages[selectedImage])}
                          alt={gallery.name}
                          fill
                          className="object-contain rounded-2xl"
                          priority
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg"
                          }}
                        />
                      </div>

                      {/* Navigation Buttons - Show on hover */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={goToPrevious}
                            className="absolute p-2 text-white transition-all -translate-y-1/2 rounded-full opacity-0 left-4 top-1/2 bg-black/50 hover:bg-black/70 group-hover:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={goToNext}
                            className="absolute p-2 text-white transition-all -translate-y-1/2 rounded-full opacity-0 right-4 top-1/2 bg-black/50 hover:bg-black/70 group-hover:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      {allImages.length > 1 && (
                        <div className="absolute px-3 py-1 text-sm text-white rounded-full bg-black/70 top-4 right-4">
                          {selectedImage + 1} / {allImages.length}
                        </div>
                      )}

                      {/* Mobile Swipe Hint
                      {allImages.length > 1 && (
                        <div className="absolute w-full p-2 py-2 text-xs text-center text-white -translate-x-1/2 rounded-full opacity-75 md:mt-[10px] md:mb-[20px] md:bottom-4 md:left-1/2 md:bg-black/50">
                          👆 Geser ke kiri/kanan atau gunakan tombol navigasi
                        </div>
                      )} */}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full mb-6 bg-gray-100 rounded-lg aspect-video">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Thumbnails */}
                  {allImages.length > 1 && (
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-semibold">Foto Lainnya</h3>
                      <div className="grid gap-3 sm:grid-cols-4 md:grid-cols-5">
                        {allImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative overflow-hidden rounded-lg aspect-square group ${
                              selectedImage === index 
                                ? 'ring-2 ring-primary ring-offset-2' 
                                : ''
                            }`}
                          >
                            <Image
                              src={getImagePath(img)}
                              alt={`${gallery.name} - ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg"
                              }}
                            />
                            {selectedImage === index && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Embedded Video */}
                  {gallery.link && (
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-semibold">Video Kegiatan</h3>
                      <div className="overflow-hidden rounded-lg aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${gallery.link.match(/([a-zA-Z0-9_-]{11})/)?.[1]}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`Video ${gallery.name}`}
                        />
                      </div>
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
                {/* Info Card */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-bold">Informasi Gallery</h3>
                  </CardHeader>
                  <CardContent className="space-y-4 ">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
                        <p className="text-base font-semibold">{formatDate(gallery.created_at)}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start gap-3">
                      <ImageIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Jumlah Foto</p>
                        <p className="text-base font-semibold">{allImages.length} Foto</p>
                      </div>
                    </div>

                    {gallery.link && (
                      <>
                        <Separator />
                        <div className="flex items-start gap-3">
                          <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Media</p>
                            <p className="text-base font-semibold">Video Tersedia</p>
                          </div>
                        </div>
                      </>
                    )}

                    {gallery.gallery_kategori && gallery.gallery_kategori.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <p className="mb-2 text-sm font-medium text-muted-foreground">Kategori</p>
                          <div className="flex flex-wrap gap-2">
                            {gallery.gallery_kategori.map((cat) => (
                              <Badge key={cat.id} variant="secondary">
                                {cat.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}