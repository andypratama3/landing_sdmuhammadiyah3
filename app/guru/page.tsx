import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCachedData, buildCacheKey, getCacheVersion } from "@/lib/redis-cache";
import { GuruFilterClient } from "@/components/guru/GuruFilterClient";
import { GuruGridClient } from "@/components/guru/GuruGridClient";
import type { Guru, Pelajaran } from "@/types";

// In App Router v15+, searchParams is definitively evaluated as a Promise
export default async function GuruPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const unresolvedParams = await searchParams;
  const search = unresolvedParams.search || "";
  const pelajaran = unresolvedParams.pelajaran || "all";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  // Data Fetching Definitions
  const fetchPelajarans = async () => {
    const res = await fetch(`${apiUrl}/guru/pelajaran`, {
      next: { revalidate: 3600 }, // Native Route Caching ISR
    });
    if (!res.ok) throw new Error("Gagal mengambil mata pelajaran");
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : json;
  };

  const fetchGurus = async () => {
    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (pelajaran !== "all") query.append("pelajaran", pelajaran);
    
    // Fallback safe mode if NEXT_PUBLIC_API_URL is undefined
    const validUrl = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;
    const res = await fetch(`${validUrl}/guru?${query.toString()}`, {
      next: { revalidate: 60 }, // Micro-cache caching invalidation
    });
    if (!res.ok) throw new Error("Gagal mengambil data guru");
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
  };

  let pelajarans: Pelajaran[] = [];
  let gurus: Guru[] = [];
  let errorState = false;

  try {
    const listVersion = await getCacheVersion('guru:list');
    
    // Normalize and generate a collision-proof hexadecimal deterministic key
    const cacheKeyPelajaran = 'guru:pelajaran:v1:all'; // Doesn't require deep parametrization 
    const cacheKeyGurus = buildCacheKey('guru:data', listVersion, { search, pelajaran });

    // Await all parallel API requests executing over dual-layer Redis/Next Cache
    // Mitigating potential memory bloat by skipping cache creation on excessive/rare search terms
    const skipCache = search.length > 30; // Protect memory from bot querying infinite keys

    [pelajarans, gurus] = await Promise.all([
      getCachedData(cacheKeyPelajaran, fetchPelajarans, { ttlSeconds: 3600 }),
      getCachedData(cacheKeyGurus, fetchGurus, { ttlSeconds: 60, skipCacheWrite: skipCache }),
    ]);
  } catch (err) {
    errorState = true;
    console.error("Guru Fetching Error:", err);
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Static Server Rendered Block */}
      <section className="w-full py-12 lg:py-20 bg-gray-50/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 bg-[#33b962] dark:bg-[#1a5a32] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[380px] shadow-xl">
              <div className="relative z-10 max-w-2xl">
                <Badge className="bg-white text-[#33b962] border-0 px-4 py-1.5 mb-8 text-xs sm:text-sm font-black uppercase tracking-widest shadow-md inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Eksplorasi Tenaga Pendidik
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight drop-shadow-sm">
                  Guru Kreatif <br /> SD Muhammadiyah 3
                </h1>
                <p className="text-white/95 text-lg font-medium max-w-xl leading-relaxed drop-shadow-sm">
                  Tim pengajar profesional spesialis yang berdedikasi tinggi dalam mendidik dan membentuk generasi cerdas, inovatif, dan berakhlak mulia.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1 transition-colors relative overflow-hidden group hover:border-[#33b962]">
                <GraduationCap className="w-10 h-10 text-[#33b962] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">Tenaga Ahli</h3>
                <p className="text-sm font-medium text-gray-500 mt-2">Berpengalaman di bidangnya</p>
              </div>
              
              <div className="bg-[#ffd166] dark:bg-[#e0b445] rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1 transition-colors relative overflow-hidden group">
                <BookOpen className="w-10 h-10 text-gray-900 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">Kreatif</h3>
                <p className="text-sm font-medium text-gray-800 mt-2">Metode belajar menyenangkan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hydrated Client Components Wrapper */}
      <GuruFilterClient pelajarans={pelajarans} totalGurus={gurus.length} />

      {errorState && (
        <div className="container px-4 mx-auto mt-8 max-w-7xl">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>Terjadi kesalahan saat memuat data dari server.</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Passed statically evaluated data downward blindly into Client View Wrapper */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-950">
        <div className="container px-4 mx-auto max-w-7xl">
           <GuruGridClient gurus={gurus} />
        </div>
      </section>
    </div>
  );
}