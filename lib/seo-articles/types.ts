export type SeoArticleSection = {
  id: string
  heading: string
  level: 2 | 3
  paragraphs: string[]
  list?: string[]
}

export type SeoArticleFaq = {
  question: string
  answer: string
}

export type SeoArticle = {
  slug: string
  title: string
  description: string
  keywords: string[]
  category: string
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  sections: SeoArticleSection[]
  faqs?: SeoArticleFaq[]
  relatedSlugs: string[]
}

export const SEO_ARTICLE_SLUGS = [
  'spmb-sd-samarinda-2025-2026',
  'sd-terbaik-di-samarinda',
  'sekolah-muhammadiyah-samarinda',
] as const

export type SeoArticleSlug = (typeof SEO_ARTICLE_SLUGS)[number]
