import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User } from "lucide-react";
import { HtmlContent } from "@/components/html-content";
import { PageHeader } from "@/components/page-header";
import { BeritaShareClient } from "@/components/berita/BeritaShareClient";
import { getCachedData } from "@/lib/redis-cache";
import type { Berita } from "@/types/berita.types";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js 16 Native Dynamic SEO Generation replacing fatal App Router <Head> bugs
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://dashboard.sdmuhammadiyah3smd.com/api/v2";

  try {
    const res = await fetch(`${apiUrl}/berita/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { title: "Berita Tidak Ditemukan" };
    
    const responseData = await res.json();
    const berita: Berita = responseData?.data || responseData;

    if (!berita || !berita.judul) return { title: "Berita Tidak Ditemukan" };

    const pageDescription = berita.desc ? berita.desc.replace(/<[^>]*>/g, "").slice(0, 160) : "";
    const imageUrl = berita.foto ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}` : "";

    return {
      title: `${berita.judul} - SD Muhammadiyah 3 Samarinda`,
      description: pageDescription,
      openGraph: {
        title: berita.judul,
        description: pageDescription,
        type: "article",
        images: imageUrl ? [imageUrl] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: berita.judul,
        description: pageDescription,
      },
    };
  } catch (err) {
    return { title: "Berita - SD Muhammadiyah 3 Samarinda" };
  }
}

export default async function BeritaDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://dashboard.sdmuhammadiyah3smd.com/api/v2";

  // Double layered Redis caching architecture guaranteeing safety
  const fetchBeritaDetail = async () => {
    const res = await fetch(`${apiUrl}/berita/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Gagal mengambil berita detail");
    const json = await res.json();
    return json?.data || json;
  };

  let berita: Berita | null = null;
  try {
    berita = await getCachedData(`berita:detail:${slug}`, fetchBeritaDetail, { ttlSeconds: 60 });
  } catch (err) {}

  if (!berita || !berita.judul) {
    notFound(); // Natively triggers Next.js fallback boundary gracefully instead of 500 error
  }

  // Fetch related articles utilizing same category safely caching over DB strain
  const fetchRelatedBerita = async () => {
    const res = await fetch(`${apiUrl}/berita?category=${encodeURIComponent(berita!.category || '')}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    const arr = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    // Filter self off natively
    return arr.filter((b: Berita) => b.id !== berita!.id).slice(0, 3);
  };

  let relatedBerita: Berita[] = [];
  try {
    if (berita.category) {
      relatedBerita = await getCachedData(`berita:related:${berita.category}`, fetchRelatedBerita, { ttlSeconds: 60 });
    }
  } catch (err) {}

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const readingTime = Math.max(1, Math.ceil((berita.desc?.length || 0) / 500));
  const pageDescription = berita.desc ? berita.desc.replace(/<[^>]*>/g, "").slice(0, 160) : "";

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      <section className="py-12">
        <PageHeader
          title={"Berita Sekolah"}
          description="Informasi terbaru dan terpercaya Seputar Sekolah Kreatif SD Muhammadiyah 3 Samarinda"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Berita", href: "/berita" },
            { label: berita.judul }
          ]}
        />

        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Core Server Managed Article Content */}
            <div className="lg:col-span-2">
              <article>
                <div className="mb-10">
                  <Badge className="mb-6 bg-[#33b962]/10 text-[#33b962] border-emerald-500/20 px-4 py-1.5 font-black uppercase tracking-widest text-[10px] rounded-full">
                    {berita.category}
                  </Badge>
                  <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                    {berita.judul}
                  </h1>
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

                <div className="relative w-full mb-12 overflow-hidden rounded-[2.5rem] shadow-2xl border-0 group">
                  <Image
                    src={berita.foto ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}` : "/placeholder.svg"}
                    alt={berita.judul}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {berita.desc && (
                  <div className="mb-8">
                    <HtmlContent
                      content={berita.desc}
                      className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert"
                    />
                  </div>
                )}

                <Separator className="my-8" />
                <BeritaShareClient judul={berita.judul} deskripsi={pageDescription} />
              </article>
            </div>

            {/* Reusable Sidebar Server Layer */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      <Image src="/SD3_logo1.png" className="rounded-full" alt="Logo Sekolah" width={40} height={40} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Admin</h3>
                      <p className="text-sm text-muted-foreground">Penulis</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {relatedBerita.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold">Berita Terkait</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedBerita.map((item) => (
                      <Link key={item.id} href={`/berita/${item.slug}`} className="block group">
                        <div className="flex gap-4">
                          <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                            <Image
                              src={item.foto ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${item.foto}` : "/placeholder.svg"}
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
  );
}