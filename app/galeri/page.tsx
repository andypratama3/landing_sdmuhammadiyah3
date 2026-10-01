import { Suspense } from "react";
import { getCachedData } from "@/lib/redis-cache";
import { serverGetPublic } from "@/lib/server-api";
import GaleriClient from "@/components/galeri/GaleriClient";
import type { Gallery, GalleryKategori } from "@/types/gallery.types";

export const revalidate = 60;

export default async function GaleriPage() {
  const fetchGalleries = async () => (await serverGetPublic<Gallery[]>('/gallery')).data ?? [];
  const fetchCategories = async () => (await serverGetPublic<GalleryKategori[]>('/kategori-gallery')).data ?? [];

  const [initialGalleries, initialCategories] = await Promise.all([
    getCachedData('galeri:list', fetchGalleries, { ttlSeconds: 60 }),
    getCachedData('galeri:categories', fetchCategories, { ttlSeconds: 120 }),
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-16 bg-(--color-paper-50) dark:bg-gray-950">Loading gallery...</div>}>
      <GaleriClient initialGalleries={initialGalleries ?? []} initialCategories={initialCategories ?? []} />
    </Suspense>
  );
}
