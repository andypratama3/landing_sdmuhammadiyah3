import {
  organizationSchema,
  websiteSchema,
  faqSchema,
  spmbEventSchema,
  breadcrumbSchema,
  articleSchema,
  achievementSchema,
  type BreadcrumbItem,
} from '@/lib/structured-data'

type JsonLdData =
  | ReturnType<typeof organizationSchema>
  | ReturnType<typeof websiteSchema>
  | ReturnType<typeof faqSchema>
  | ReturnType<typeof spmbEventSchema>
  | ReturnType<typeof breadcrumbSchema>
  | ReturnType<typeof articleSchema>
  | ReturnType<typeof achievementSchema>
  | Record<string, unknown>

interface JsonLdProps {
  data: JsonLdData | JsonLdData[]
  nonce?: string
}

export function JsonLd({ data, nonce }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export function GlobalStructuredData({ nonce }: { nonce?: string }) {
  return (
    <JsonLd
      nonce={nonce}
      data={[
        organizationSchema(),
        websiteSchema(),
        faqSchema(),
        spmbEventSchema(),
        breadcrumbSchema([{ name: 'Beranda', url: 'https://sdmuhammadiyah3smd.com' }]),
      ]}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
  nonce,
}: {
  items: BreadcrumbItem[]
  nonce?: string
}) {
  return <JsonLd nonce={nonce} data={breadcrumbSchema(items)} />
}

export function ArticleJsonLd({
  article,
  nonce,
}: {
  article: Parameters<typeof articleSchema>[0]
  nonce?: string
}) {
  return <JsonLd nonce={nonce} data={articleSchema(article)} />
}

export function AchievementJsonLd({
  prestasi,
  nonce,
}: {
  prestasi: Parameters<typeof achievementSchema>[0]
  nonce?: string
}) {
  return <JsonLd nonce={nonce} data={achievementSchema(prestasi)} />
}
