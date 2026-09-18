const STORAGE_BASE =
  process.env.NEXT_PUBLIC_STORAGE_URL || 'https://app.sdmuhammadiyah3smd.com/storage'

function normalizeUrl(url: string): string {
  return url.replace(/\/{2,}/g, '/')
}

/**
 * Resolve an image URL from the CMS storage.
 * Absolute URLs (http/https) are returned as-is so external/dummy
 * images are never double-prefixed with NEXT_PUBLIC_STORAGE_URL.
 *
 * Safety rules:
 * - empty / whitespace / slash-only names fall back to `/placeholder.svg`
 * - trailing slashes are stripped so no URL ever ends with a bare `/` (-> 404)
 * - leading slashes and already-prefixed paths (img/** , storage/**, employees/**)
 *   are never double-prefixed
 * - duplicated slashes are collapsed
 */
export function resolveImageUrl(
  file: string | null | undefined,
  path: string
): string {
  if (!file) return '/placeholder.svg'

  const clean = String(file).trim().replace(/\/+$/, '')
  if (!clean || clean === '/') return '/placeholder.svg'

  const base = STORAGE_BASE.replace(/\/+$/, '')
  const folder = String(path || '').trim().replace(/^\/+|\/+$/g, '')

  if (/^https?:\/\//i.test(clean)) return normalizeUrl(clean)

  if (clean.startsWith('/')) {
    return normalizeUrl(`${base}${clean}`)
  }

  if (/^(img|storage|employees|public|uploads)\//.test(clean)) {
    return normalizeUrl(`${base}/${clean}`)
  }

  const url = folder ? `${base}/${folder}/${clean}` : `${base}/${clean}`
  return normalizeUrl(url)
}