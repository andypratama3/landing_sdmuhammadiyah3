import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/page-header'
import { BeritaShareClient } from '@/components/berita/BeritaShareClient'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema } from '@/lib/structured-data'
import { BASE_URL, SCHOOL } from '@/lib/school-info'
import { getSeoArticle } from '@/lib/seo-articles'
import type { SeoArticle } from '@/lib/seo-articles/types'

function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function enrichParagraph(text: string) {
  return text
    .replace(
      /halaman SPMB/gi,
      '<a href="/spmb" class="text-(--color-forest-600) dark:text-(--color-forest-400) font-semibold hover:underline">halaman SPMB</a>'
    )
    .replace(
      /halaman prestasi siswa/gi,
      '<a href="/prestasi-siswa" class="text-(--color-forest-600) dark:text-(--color-forest-400) font-semibold hover:underline">halaman prestasi siswa</a>'
    )
    .replace(
      /halaman kontak/gi,
      '<a href="/kontak" class="text-(--color-forest-600) dark:text-(--color-forest-400) font-semibold hover:underline">halaman kontak</a>'
    )
    .replace(
      /halaman tenaga pendidik/gi,
      '<a href="/guru" class="text-(--color-forest-600) dark:text-(--color-forest-400) font-semibold hover:underline">halaman tenaga pendidik</a>'
    )
    .replace(
      /profil lengkap sekolah/gi,
      '<a href="/profil" class="text-(--color-forest-600) dark:text-(--color-forest-400) font-semibold hover:underline">profil lengkap sekolah</a>'
    )
    .replace(
      /SPMB 2025\/2026/g,
      '<a href="/spmb" class="text-(--color-forest-600) dark:text-(--color-forest-400) font-semibold hover:underline">SPMB 2025/2026</a>'
    )
}

function ArticleBody({ article }: { article: SeoArticle }) {
  return (
    <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert">
      {article.sections.map((section) => {
        const Tag = section.level === 2 ? 'h2' : 'h3'
        return (
          <section key={section.id} id={section.id} className="mb-10 scroll-mt-28">
            <Tag className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              {section.heading}
            </Tag>
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: enrichParagraph(p) }}
              />
            ))}
            {section.list && (
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        )
      })}

      {article.faqs && article.faqs.length > 0 && (
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4 not-prose">
            {article.faqs.map((faq, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export function SeoArticlePage({ article }: { article: SeoArticle }) {
  const jsonLd = [
    articleSchema({
      title: article.title,
      description: article.description,
      image: `${BASE_URL}/SD3_logo1.png`,
      slug: article.slug,
      publishedAt: article.publishedAt,
      modifiedAt: article.updatedAt,
    }),
    ...(article.faqs ? [faqSchema(article.faqs)] : []),
  ]

  const related = article.relatedSlugs
    .map((slug) => getSeoArticle(slug))
    .filter(Boolean) as SeoArticle[]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500">
      <JsonLd data={jsonLd} />

      <section className="py-12">
        <PageHeader
          title="Berita & Artikel"
          description="Informasi pendidikan dan panduan untuk orang tua calon siswa SD Muhammadiyah 3 Samarinda"
          breadcrumbs={[
            { label: 'Beranda', href: '/' },
            { label: 'Berita', href: '/berita' },
            { label: article.title },
          ]}
        />

        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <article>
                <Badge className="mb-4 bg-(--color-forest-600)/10 text-(--color-forest-600) dark:text-(--color-forest-400) border-emerald-500/20 px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
                  {article.category}
                </Badge>
                <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#33b962]" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#33b962]" />
                    <span>{article.readingMinutes} MENIT BACA</span>
                  </div>
                </div>

                <div className="relative w-full mb-10 overflow-hidden rounded-[2rem] shadow-xl">
                  <Image
                    src="/SD3_logo1.png"
                    alt={article.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover bg-[#33b962]/10 p-12"
                    priority
                  />
                </div>

                <ArticleBody article={article} />

                <Separator className="my-10" />

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button asChild className="bg-[#33b962] hover:bg-[#2a9d52] rounded-full px-8">
                    <Link href="/spmb">
                      Daftar SPMB Sekarang
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline-brand" className="rounded-full px-8">
                    <Link href="/kontak">Hubungi Kami</Link>
                  </Button>
                </div>

                <BeritaShareClient judul={article.title} deskripsi={article.description} />
              </article>
            </div>

            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/SD3_logo1.png"
                      alt={SCHOOL.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{SCHOOL.name}</h3>
                      <p className="text-sm text-muted-foreground">Artikel Resmi</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {related.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold">Baca Juga</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {related.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/berita/${item.slug}`}
                        className="block group"
                      >
                        <Badge className="mb-2 text-xs">{item.category}</Badge>
                        <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-(--color-forest-600) dark:group-hover:text-(--color-forest-400) transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Card className="bg-[#33b962]/5 border-[#33b962]/20">
                <CardContent className="pt-6">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Tertarik mendaftarkan putra/putri Anda?
                  </p>
                  <Button asChild className="w-full bg-[#33b962] hover:bg-[#2a9d52]">
                    <Link href="/spmb">Info Pendaftaran</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
