"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Guru } from "@/types";

// Lazy load the detailed Modal with its heavy markup and fetching logic
const GuruDetailModal = dynamic(() => import('@/components/guru/GuruDetailModal'), {
  ssr: false, 
});

export function GuruGridClient({ gurus }: { gurus: Guru[] }) {
  const searchParams = useSearchParams();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  
  const currentSearch = searchParams.get("search") || "";
  const currentFilter = searchParams.get("pelajaran") || "all";

  // Client-side filtering based on URL params
  const filteredGurus = useMemo(() => {
    return gurus.filter((guru) => {
      // Filter by search term
      if (currentSearch && !guru.name.toLowerCase().includes(currentSearch.toLowerCase())) {
        return false;
      }
      
      // Filter by pelajaran - check both slug and name for robustness
      if (currentFilter !== "all") {
        const hasMatchingPelajaran = guru.pelajarans?.some(
          (pelajaran) => {
            const pelajaranSlug = pelajaran.slug?.toLowerCase();
            const pelajaranName = pelajaran.name?.toLowerCase();
            const filterValue = currentFilter.toLowerCase();
            return pelajaranSlug === filterValue || pelajaranName === filterValue;
          }
        );
        if (!hasMatchingPelajaran) {
          return false;
        }
      }
      
      return true;
    });
  }, [gurus, currentSearch, currentFilter]);

  if (filteredGurus.length === 0) {
    return (
      <div className="py-16 sm:py-20 text-center">
        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-[#33b962]/10 rounded-2xl sm:rounded-3xl">
          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#33b962]" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">Tidak ada guru yang ditemukan</h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xs sm:max-w-md mx-auto">
          Coba ubah filter atau kata kunci pencarian Anda untuk melihat hasil yang berbeda.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredGurus.map((guru) => {
          const fotoUrl = guru?.foto 
            ? (guru.foto.startsWith("http") ? guru.foto
              : guru.foto.includes("/") ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${guru.foto}`
              : `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/guru/${guru.foto}`)
            : "/placeholder.svg";

          return (
            <div key={guru.slug} className="h-full cursor-pointer group" onClick={() => setSelectedSlug(guru.slug)}>
              <div className="relative flex flex-col h-full overflow-hidden transition-all duration-500 bg-white dark:bg-gray-900/40 border-0 shadow-xl rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-3 glass group card-premium">
                <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-[#33b962]/5 to-[#ffd166]/5">
                  <Image
                    src={fotoUrl}
                    alt={guru?.name || "Guru"}
                    fill
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:opacity-100"></div>
                  
                  <div className="absolute z-10 top-4 sm:top-6 right-4 sm:right-6 left-4 sm:left-6">
                    <Badge className="max-w-[150px] sm:max-w-[200px] md:max-w-[250px] truncate bg-[#33b962] backdrop-blur-md text-white border-white/30 shadow-2xl font-black px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-widest rounded-full">
                      {guru.pelajarans && guru.pelajarans.length > 0 ? guru.pelajarans[0].name : "Guru"}
                    </Badge>
                  </div>

                  <div className="absolute transition-all duration-500 opacity-0 translate-y-4 bottom-6 right-6 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="w-14 h-14 bg-[#33b962] rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform">
                      <ChevronRight className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-8">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="mb-2 break-words text-xl sm:text-2xl md:text-2xl font-black leading-tight text-gray-900 dark:text-white group-hover:text-(--color-forest-600) dark:group-hover:text-(--color-forest-400) transition-colors uppercase tracking-tight">{guru.name}</h3>
                    {guru.lulusan && (
                      <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                        <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#33b962] brightness-125" />
                        <p className="max-w-full truncate text-(--color-forest-600) dark:text-(--color-forest-400) text-[10px] sm:text-[11px] font-black uppercase tracking-wider">{guru.lulusan}</p>
                      </div>
                    )}
                  </div>

                  {guru.description && (
                    <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 grow line-clamp-2">{guru.description}</p>
                  )}

                  <div className="pt-4 sm:pt-6 border-t border-gray-100 dark:border-white/5 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {guru.pelajarans && guru.pelajarans.length > 0 && (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-[#33b962]/10 dark:bg-emerald-900/20 rounded-xl shadow-inner">
                              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-[#33b962]" />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{guru.pelajarans.length} Pelajaran</span>
                          </div>
                        )}
                      </div>
                      <div className="transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-(--color-forest-600) dark:text-(--color-forest-400)">Profil Detail</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Heavy Modal is rendered lazily ONLY if a slug gets selected */}
      {selectedSlug && <GuruDetailModal slug={selectedSlug} onClose={() => setSelectedSlug(null)} />}
    </>
  );
}
