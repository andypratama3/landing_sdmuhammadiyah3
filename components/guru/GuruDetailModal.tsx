"use client";

import { X, Star, BookOpen, Award, Mail, Phone, GraduationCap, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/useApi";
import { useMemo, useEffect } from "react";
import type { Guru, Pelajaran } from "@/types";

export default function GuruDetailModal({ slug, onClose }: { slug: string, onClose: () => void }) {
  const { data: guruDetailResponse, loading: detailLoading } = useApi(
    `/guru/${slug}`,
    { cache: true, cacheTTL: 300000, immediate: true }
  );

  const guruDetail = useMemo<Guru | null>(() => {
    if (!guruDetailResponse) return null;
    const data = (guruDetailResponse as any)?.data;
    if (Array.isArray(data)) return data.length > 0 ? data[0] : null;
    if (data && typeof data === 'object' && Object.keys(data).length > 0) return data;
    if (guruDetailResponse && typeof guruDetailResponse === 'object' && Object.keys(guruDetailResponse).length > 0) {
      return guruDetailResponse as Guru;
    }
    return null;
  }, [guruDetailResponse]);

  // Handle modal scroll css inject (From original code)
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .modal-scroll::-webkit-scrollbar { width: 0; height: 0; }
      .modal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="modal-scroll mt-35 relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute z-20 p-2 text-gray-400 dark:text-gray-500 transition-all bg-white dark:bg-gray-800 rounded-full top-6 right-6 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        {detailLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="w-full h-96 rounded-t-3xl" />
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-full h-6" />
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </div>
        ) : guruDetail ? (
          <div>
            <div className="relative h-96 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#1a6d3b] rounded-t-3xl">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-white/20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-white/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="relative flex items-center justify-center w-full h-full">
                <div className="relative overflow-hidden border-4 shadow-2xl w-72 h-72 sm:w-80 sm:h-80 rounded-3xl border-white/30 backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={
                      guruDetail.foto
                        ? (guruDetail.foto.startsWith("http") ? guruDetail.foto : `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/guru/${guruDetail.foto}`)
                        : (guruDetail.karyawan?.foto ? (guruDetail.karyawan.foto.startsWith("http") ? guruDetail.karyawan.foto : `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/guru/${guruDetail.karyawan.foto}`) : "/placeholder.svg")
                    }
                    alt={guruDetail.name}
                    fill
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="px-8 pt-8 pb-8">
              <div className="relative z-10 mb-8 -mt-16 sm:-mt-20">
                <div className="border shadow-xl bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-8 border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">{guruDetail.name}</h2>
                        <div className="w-fit p-1.5 sm:p-2 bg-[#33b962]/10 rounded-xl">
                          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#33b962] fill-[#33b962]" />
                        </div>
                      </div>
                      {guruDetail.lulusan && (
                        <p className="text-[#33b962] text-sm sm:text-base font-bold mb-3">{guruDetail.lulusan}</p>
                      )}
                      {guruDetail.description && (
                        <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">{guruDetail.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {guruDetail.pelajarans && Array.isArray(guruDetail.pelajarans) && guruDetail.pelajarans.length > 0 && (
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="bg-linear-to-br from-[#33b962]/10 to-transparent dark:from-[#33b962]/20 rounded-xl p-4 border border-[#33b962]/20 dark:border-[#33b962]/30">
                    <p className="text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-400 uppercase">Pelajaran</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#33b962]">{guruDetail.pelajarans.length} Mata Pelajaran</p>
                  </div>
                </div>
              )}

              {guruDetail.pelajarans && Array.isArray(guruDetail.pelajarans) && guruDetail.pelajarans.length > 0 && (
                <div className="mb-8">
                  <h3 className="flex items-center gap-3 mb-5 text-lg font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#33b962]/20">
                      <BookOpen className="w-5 h-5 text-[#33b962]" />
                    </div>
                    Mengajar {guruDetail.pelajarans.length} Pelajaran
                  </h3>
                  <div className="grid gap-3">
                    {guruDetail.pelajarans.map((p: Pelajaran) => (
                      <div
                        key={p.slug}
                        className="group flex items-center gap-4 p-4 bg-linear-to-r from-[#33b962]/8 to-transparent rounded-xl border-l-4 border-[#33b962] hover:shadow-lg hover:bg-linear-to-r hover:from-[#33b962]/12 transition-all"
                      >
                        <div className="shrink-0 w-3 h-3 rounded-full bg-[#33b962] group-hover:scale-150 transition-transform"></div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#33b962] transition-colors">{p.name}</span>
                        <ChevronRight className="ml-auto w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#33b962] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guruDetail.karyawan && (
                <div>
                  <h3 className="flex items-center gap-3 mb-5 text-lg font-bold text-gray-900">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#33b962]/20">
                      <Award className="w-5 h-5 text-[#33b962]" />
                    </div>
                    Informasi Kontak
                  </h3>
                  <div className="space-y-3">
                    {guruDetail.karyawan.email && (
                      <a href={`mailto:${guruDetail.karyawan.email}`} className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-linear-to-r from-[#33b962]/8 to-transparent dark:from-[#33b962]/10 border-2 border-[#33b962]/20 dark:border-gray-700 hover:border-[#33b962] hover:shadow-lg transition-all">
                        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#33b962]/10 rounded-xl flex items-center justify-center group-hover:bg-[#33b962]/20 transition-colors">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#33b962]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Email</p>
                          <p className="text-gray-800 dark:text-gray-200 font-semibold truncate group-hover:text-[#33b962] transition-colors">{guruDetail.karyawan.email}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#33b962] transition-colors" />
                      </a>
                    )}
                    {guruDetail.karyawan.phone && (
                      <a href={`tel:${guruDetail.karyawan.phone}`} className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-linear-to-r from-[#33b962]/8 to-transparent dark:from-[#33b962]/10 border-2 border-[#33b962]/20 dark:border-gray-700 hover:border-[#33b962] hover:shadow-lg transition-all">
                        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#33b962]/10 rounded-xl flex items-center justify-center group-hover:bg-[#33b962]/20 transition-colors">
                          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#33b962]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Telepon</p>
                          <p className="text-gray-800 dark:text-gray-200 font-semibold group-hover:text-[#33b962] transition-colors">{guruDetail.karyawan.phone}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#33b962] transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">Guru tidak ditemukan</div>
        )}
      </div>
    </div>
  );
}
