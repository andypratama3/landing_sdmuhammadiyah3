import type { Metadata } from 'next'
import { SeoArticlePage } from '@/components/berita/seo-article-page'
import { pageMetadata } from '@/lib/metadata-helpers'
import { sdTerbaikArticle } from '@/lib/seo-articles/sd-terbaik'

export const metadata: Metadata = pageMetadata({
  title: sdTerbaikArticle.title,
  description: sdTerbaikArticle.description,
  path: `/berita/${sdTerbaikArticle.slug}`,
  keywords: sdTerbaikArticle.keywords,
  type: 'article',
})

export default function SdTerbaikArtikelPage() {
  return <SeoArticlePage article={sdTerbaikArticle} />
}
