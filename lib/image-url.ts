/**
 * Resolve an image URL from the CMS storage.
 * Absolute URLs (http/https) are returned as-is so external/dummy
 * images are never double-prefixed with NEXT_PUBLIC_STORAGE_URL.
 */
export function resolveImageUrl(
  file: string | null | undefined,
  path: string
): string {
  if (!file) return "/placeholder.svg"
  if (/^https?:\/\//i.test(file)) return file
  return `${process.env.NEXT_PUBLIC_STORAGE_URL || ""}/${path}/${file}`
}
