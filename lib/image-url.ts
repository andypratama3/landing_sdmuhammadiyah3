const STORAGE_BASE =
  process.env.NEXT_PUBLIC_STORAGE_URL || 'https://app.sdmuhammadiyah3smd.com/storage'

function normalizeUrl(url: string): string {
  // Collapse duplicated slashes without breaking the URL scheme (https:// )
  return url.replace(/([^:])\/{2,}/g, '$1/')
}

/**
 * Resolve an image URL from the CMS storage.
 * Absolute URLs (http/https) are returned as-is so external/dummy
 * images are never double-prefixed with NEXT_PUBLIC_STORAGE_URL.
 *
 * Safety rules:
 * - empty / whitespace / slash-only names fall back to `/placeholder.svg`
 * - trailing slashes are stripped so no URL ever ends with a bare `/` (-> 404)
 * - leading slashes and already-foldered paths (img/**, storage/**, posts/<uuid>/**)
 *   are never double-prefixed with the feature folder
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

  // Relative path that already contains a folder segment
  // (e.g. img/berita/x.png, posts/<uuid>/file.png from the CMS)
  // is returned as-is under the storage base — never double-prefixed.
  if (clean.includes('/')) {
    return normalizeUrl(`${base}/${clean}`)
  }

  const url = folder ? `${base}/${folder}/${clean}` : `${base}/${clean}`
  return normalizeUrl(url)
}