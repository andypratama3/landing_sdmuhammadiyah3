import { Suspense } from "react";
import { getCachedData } from "@/lib/redis-cache";
import { serverGetPublic } from "@/lib/server-api";
import RapotClient from "@/components/rapot/RapotClient";
import type { TahunResponse } from "@/types/rapot.types";

export const revalidate = 120;

export default async function RapotPage() {
  const fetchTahun = async () => (await serverGetPublic<TahunResponse[]>('/rapot/tahun')).data ?? [];
  const initialTahun = await getCachedData('rapot:tahun', fetchTahun, { ttlSeconds: 120 });

  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">Loading rapot...</div>}>
      <RapotClient initialTahun={initialTahun ?? []} />
    </Suspense>
  );
}
