export const revalidate = 60

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
import { getSystemAuthToken } from "@/lib/server-api";
import { generateBeritaMetadata, generateArticleJsonLd } from "@/lib/metadata-helpers";
import { JsonLd } from "@/components/JsonLd";
import type { Berita } from "@/types/berita.types";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js 16 Native Dynamic SEO Generation replacing fatal App Router <Head> bugs
export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const berita = await fetchBeritaBySlug(slug);
  if (!berita?.judul) return { title: "Berita Tidak Ditemukan" };
  return generateBeritaMetadata(berita);
}

function unwrapBeritaDetail(json: unknown): Berita | null {
  const data = (json as { data?: unknown })?.data;
  // Kontrak lama detail: data dibungkus GANDA -> { data: { data: { judul, ... } } }.
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const inner = (data as { data?: unknown }).data;
    if (inner && typeof inner === "object" && !Array.isArray(inner)) {
      return inner as Berita;
    }
    return data as Berita;
  }
  // Not-found & error kontrak mengembalikan data: [] atau tak berisi objek.
  return null;
}

async function fetchBeritaBySlug(slug: string): Promise<Berita | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://app.sdmuhammadiyah3smd.com/api/v2";
  try {
    const token = await getSystemAuthToken();
    const res = await fetch(`${apiUrl}/berita/${slug}`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const responseData = await res.json();
    return unwrapBeritaDetail(responseData);
  } catch {
    return null;
  }
}

export default async function BeritaDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://app.sdmuhammadiyah3smd.com/api/v2";

  // Double layered Redis caching architecture guaranteeing safety
  const fetchBeritaDetail = async () => {
    const token = await getSystemAuthToken();
    const res = await fetch(`${apiUrl}/berita/${slug}`, { 
      headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
      next: { revalidate: 60 } 
    });
    if (!res.ok) throw new Error("Gagal mengambil berita detail");
    const json = await res.json();
    return unwrapBeritaDetail(json);
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
    const token = await getSystemAuthToken();
    const res = await fetch(`${apiUrl}/berita?category=${encodeURIComponent(berita!.category || '')}`, {
      headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
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
  
  // Safely intercept Laravel WYSIWYG Editor outputs overriding wrong frontend domains with the correct Storage bucket URL
  const processedDesc = berita.desc
    ? berita.desc.replace(/https?:\/\/sdmuhammadiyah3smd\.com\/storage/g, process.env.NEXT_PUBLIC_STORAGE_URL || 'https://app.sdmuhammadiyah3smd.com/storage')
    : "";
  
  const pageDescription = processedDesc ? processedDesc.replace(/<[^>]*>/g, "").slice(0, 160) : "";
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      <JsonLd data={generateArticleJsonLd(berita)} />
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-700)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

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
              <article className="bg-white dark:bg-gray-900/40 rounded-[1.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-white/5 card-premium glass">
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-(--color-forest-700)/10 text-(--color-forest-700) border-(--color-forest-700)/20 px-4 py-1.5 font-black uppercase tracking-widest text-[10px] rounded-full shadow-sm">
                      {berita.category}
                    </Badge>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-(--color-sun-500)/10 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-(--color-sun-500) animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-(--color-sun-600)">Terbaru</span>
                    </div>
                  </div>
                  <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                    {berita.judul}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <Calendar className="w-4 h-4 text-(--color-forest-700)" />
                      <span>{formatDate(berita.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <Clock className="w-4 h-4 text-(--color-forest-700)" />
                      <span>{readingTime} MENIT BACA</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <User className="w-4 h-4 text-(--color-forest-700)" />
                      <span>ADMIN SDMUH3</span>
                    </div>
                  </div>
                </div>

                <div className="relative w-full mb-12 overflow-hidden rounded-[1.5rem] shadow-2xl border-0 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-(--color-forest-700)/20 to-(--color-sun-500)/20 z-10 pointer-events-none"></div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${berita.foto}`}
                    alt={berita.judul}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                  <div className="absolute bottom-6 left-6 right-6 z-30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="px-6 py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl">
                      <p className="text-xs font-black uppercase tracking-widest text-(--color-forest-700)">Klik untuk zoom</p>
                    </div>
                  </div>
                </div>

                {processedDesc && (
                  <div className="mb-8">
                    <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-(--color-forest-700) dark:prose-a:text-(--color-forest-400) prose-strong:text-gray-900 dark:prose-strong:text-white">
                      <HtmlContent
                        content={processedDesc}
                        className=""
                      />
                    </div>
                  </div>
                )}

                <Separator className="my-8" />
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">Bagikan Artikel</p>
                  <BeritaShareClient judul={berita.judul} deskripsi={pageDescription} />
                </div>
              </article>
            </div>

            {/* Reusable Sidebar Server Layer */}
            <div className="space-y-6">
              <Card className="border-0 shadow-2xl rounded-[1.5rem] bg-white dark:bg-gray-900/40 card-premium glass overflow-hidden">
                <div className="bg-(--color-forest-700) p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <h3 className="text-xl font-black uppercase tracking-tight relative z-10">Penulis</h3>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-(--color-forest-700)/10 dark:bg-(--color-forest-700)/20 border border-(--color-forest-700)/10">
                      <Image src="/SD3_logo1.png" className="rounded-xl w-10 h-10" alt="Logo Sekolah" width={40} height={40} />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white">Admin SD Muhammadiyah 3</h3>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tim Redaksi Sekolah</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {relatedBerita.length > 0 && (
                <Card className="border-0 shadow-2xl rounded-[1.5rem] bg-white dark:bg-gray-900/40 card-premium glass overflow-hidden">
                  <div className="bg-(--color-sun-500) p-8 text-gray-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <h3 className="text-xl font-black uppercase tracking-tight relative z-10">Berita Terkait</h3>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    {relatedBerita.map((item) => (
                      <Link key={item.id} href={`/berita/${item.slug}`} className="block group">
                        <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-(--color-forest-700)/5 dark:hover:bg-(--color-forest-700)/10 transition-all duration-300">
                          <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-xl shadow-lg">
                            <Image
                              src={item.foto ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${item.foto}` : "/placeholder.svg"}
                              alt={item.judul}
                              fill
                              sizes="96px"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <Badge className="mb-2 text-[9px] font-black uppercase tracking-widest w-fit bg-(--color-forest-700)/10 text-(--color-forest-700) border-(--color-forest-700)/10">{item.category}</Badge>
                            <h4 className="text-sm font-black text-gray-900 dark:text-white transition-colors line-clamp-2 group-hover:text-(--color-forest-700) leading-tight">
                              {item.judul}
                            </h4>
                            <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
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