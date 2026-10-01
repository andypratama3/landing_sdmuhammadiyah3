import { Suspense } from "react";
import { getCachedData } from "@/lib/redis-cache";
import { serverGetPublic } from "@/lib/server-api";
import BeritaClient from "@/components/berita/BeritaClient";
import type { Berita } from "@/types";

export const revalidate = 60;

export default async function BeritaPage() {
  const fetchNews = async () => (await serverGetPublic<Berita[]>("/berita?page=1")).data ?? [];
  const fetchCategories = async () => {
    const res = await serverGetPublic<{ category: string; total: number }[]>('/berita-count-data');
    return res.data ?? [];
  };
  const fetchPopular = async () => (await serverGetPublic<Berita[]>('/berita-popular')).data ?? [];

  const [initialNews, initialCategories, initialPopular] = await Promise.all([
    getCachedData('berita:list:page1', fetchNews, { ttlSeconds: 30 }),
    getCachedData('berita:categories', fetchCategories, { ttlSeconds: 60 }),
    getCachedData('berita:popular', fetchPopular, { ttlSeconds: 60 }),
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-16 bg-(--color-paper-50) dark:bg-gray-950">Loading...</div>}>
      <BeritaClient
        initialNews={initialNews ?? []}
        initialCategories={initialCategories ?? []}
        initialPopular={initialPopular ?? []}
      />
    </Suspense>
  );
}
