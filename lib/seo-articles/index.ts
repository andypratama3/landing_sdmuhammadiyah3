import type { SeoArticle, SeoArticleSlug } from './types'
import { spmbArticle } from './spmb'
import { sdTerbaikArticle } from './sd-terbaik'
import { sekolahMuhammadiyahArticle } from './sekolah-muhammadiyah'

export const SEO_ARTICLES: Record<SeoArticleSlug, SeoArticle> = {
  'spmb-sd-samarinda-2025-2026': spmbArticle,
  'sd-terbaik-di-samarinda': sdTerbaikArticle,
  'sekolah-muhammadiyah-samarinda': sekolahMuhammadiyahArticle,
}

export function getSeoArticle(slug: string): SeoArticle | null {
  return SEO_ARTICLES[slug as SeoArticleSlug] ?? null
}

export function getAllSeoArticles(): SeoArticle[] {
  return Object.values(SEO_ARTICLES)
}

export { SEO_ARTICLE_SLUGS } from './types'
