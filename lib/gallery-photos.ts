import type { Gallery } from "@/types/gallery.types"

export function getGalleryPhotos(gallery: Gallery | null | undefined): string[] {
  if (!gallery) return []

  if (Array.isArray(gallery.photos)) {
    return gallery.photos.map((p) => p.trim()).filter(Boolean)
  }

  if (typeof gallery.foto === 'string' && gallery.foto) {
    return gallery.foto
      .split(',')
      .map((img) => img.trim())
      .filter(Boolean)
  }

  return []
}

export function getGalleryFirstPhoto(gallery: Gallery | null | undefined): string | null {
  const photos = getGalleryPhotos(gallery)
  return photos[0] ?? null
}
