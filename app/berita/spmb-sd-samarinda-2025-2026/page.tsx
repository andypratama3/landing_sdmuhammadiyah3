import type { Metadata } from 'next'
import { SeoArticlePage } from '@/components/berita/seo-article-page'
import { pageMetadata } from '@/lib/metadata-helpers'
import { spmbArticle } from '@/lib/seo-articles/spmb'

export const metadata: Metadata = pageMetadata({
  title: spmbArticle.title,
  description: spmbArticle.description,
  path: `/berita/${spmbArticle.slug}`,
  keywords: spmbArticle.keywords,
  type: 'article',
})

export default function SpmbArtikelPage() {
  return <SeoArticlePage article={spmbArticle} />
}
