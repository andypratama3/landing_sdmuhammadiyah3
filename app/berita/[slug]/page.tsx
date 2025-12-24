import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { HtmlContent } from "@/components/html-content"
import { Berita } from '@/types/berita.types'
/* ======================
   FETCHERS (PUBLIC API)
====================== */

async function getBerita(slug: string): Promise<Berita | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/berita/${slug}`,
    {
      next: { revalidate: 300 }, 
    }
  )

  if (!res.ok) return null

  const json = await res.json()
  
  // Handle response structure
  if (json.data && typeof json.data === 'object') {
    // Jika ada nested data
    if (json.data.data) {
      return json.data.data
    }
    return json.data
  }
  
  return null
}

async function getRelatedBerita(
  category: string,
  currentId: string
): Promise<Berita[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/berita?category=${category}`,
    {
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) return []

  const json = await res.json()

  // Handle response structure
  let data: Berita[] = []
  if (Array.isArray(json.data)) {
    data = json.data
  } else if (json.data?.data && Array.isArray(json.data.data)) {
    data = json.data.data
  }

  return data
    .filter((b: Berita) => b.id !== currentId)
    .slice(0, 4)
}

/* ======================
   SEO (SERVER ONLY)
====================== */

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const berita = await getBerita(params.slug)

  if (!berita) {
    return {
      title: "Berita Tidak Ditemukan",
    }
  }

  const plainDesc = berita.desc.replace(/<[^>]*>/g, "").slice(0, 160)

  return {
    title: `${berita.judul} - SD Muhammadiyah 3 Samarinda`,
    description: plainDesc,
    openGraph: {
      title: berita.judul,
      description: plainDesc,
      images: [
        `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}`,
      ],
    },
  }
}

/* ======================
   PAGE
====================== */

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const berita = await getBerita(slug)

  if (!berita) notFound()

  const related = await getRelatedBerita(berita.category, berita.id)

  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Berita", href: "/berita" },
    { label: berita.judul },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Berita"
        description="Berita SD Muhammadiyah 3 Samarinda"
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12">
        <div className="container grid gap-8 px-4 mx-auto lg:grid-cols-3">
          {/* CONTENT */}
          <article className="lg:col-span-2">
            <Badge className="mb-4 capitalize">
              {berita.category}
            </Badge>

            <h1 className="mb-4 text-4xl font-bold">
              {berita.judul}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(berita.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {berita.desc ? Math.max(1, Math.ceil(berita.desc.length / 500)) : 1} menit baca
              </span>

              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Admin
              </span>
            </div>

            <div className="relative w-full h-[420px] rounded-lg overflow-hidden mb-8">
              <Image
                src={
                  berita.foto
                    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}`
                    : "/placeholder.svg"
                }
                alt={berita.judul}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* ✅ GUNAKAN COMPONENT HTML-CONTENT */}
            <HtmlContent 
              content={berita.desc}
              className="prose-p:leading-relaxed prose-p:my-4 prose-strong:text-foreground prose-em:text-muted-foreground"
            />

            <Separator className="my-8" />

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Bagikan:</span>
              <Button size="icon" variant="outline">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Image
                      src="/SD3_logo1.png"
                      alt="Logo"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Admin</h3>
                    <p className="text-sm text-muted-foreground">Penulis</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Informasi</h3>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>👁️ {berita.views} kali dibaca</p>
                <p className="mt-2 capitalize">📂 {berita.category}</p>
              </CardContent>
            </Card>

            {related.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">Berita Terkait</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {related.map(item => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.slug}`}
                      className="block text-sm transition-colors hover:text-primary"
                    >
                      • {item.judul}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </section>
    </div>
  )
}