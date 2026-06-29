import type { Metadata } from 'next'
import { SeoArticlePage } from '@/components/berita/seo-article-page'
import { pageMetadata } from '@/lib/metadata-helpers'
import { sekolahMuhammadiyahArticle } from '@/lib/seo-articles/sekolah-muhammadiyah'

export const metadata: Metadata = pageMetadata({
  title: sekolahMuhammadiyahArticle.title,
  description: sekolahMuhammadiyahArticle.description,
  path: `/berita/${sekolahMuhammadiyahArticle.slug}`,
  keywords: sekolahMuhammadiyahArticle.keywords,
  type: 'article',
})

export default function SekolahMuhammadiyahArtikelPage() {
  return <SeoArticlePage article={sekolahMuhammadiyahArticle} />
}
