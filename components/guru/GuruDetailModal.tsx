"use client";

import { X, Star, BookOpen, Award, Mail, Phone, GraduationCap, ChevronRight } from "lucide-react";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/image-url";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/useApi";
import { useMemo, useEffect, useRef } from "react";
import type { Guru, Pelajaran } from "@/types";

export default function GuruDetailModal({ slug, onClose }: { slug: string, onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const { data: guruDetailResponse, loading: detailLoading, error: detailError } = useApi(
    `/guru/${slug}`,
    { cache: true, cacheTTL: 300000, immediate: true }
  );

  // Derive guruDetail BEFORE any useEffect that references it to avoid TDZ
  const guruDetail = useMemo<Guru | null>(() => {
    if (!guruDetailResponse) return null;
    
    // Handle both response formats: { data: Guru } or direct Guru object
    const data = (guruDetailResponse as any)?.data;
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data as Guru;
    }
    
    // If response is directly the Guru object
    if (guruDetailResponse && typeof guruDetailResponse === 'object' && !Array.isArray(guruDetailResponse) && 'name' in guruDetailResponse) {
      return guruDetailResponse as Guru;
    }
    
    // Handle case where response might be wrapped in other properties
    if (typeof guruDetailResponse === 'object' && guruDetailResponse !== null) {
      const possibleData = (guruDetailResponse as any).guru || (guruDetailResponse as any).item;
      if (possibleData && typeof possibleData === 'object' && !Array.isArray(possibleData) && 'name' in possibleData) {
        return possibleData as Guru;
      }
    }
    
    return null;
  }, [guruDetailResponse]);

  // Handle keyboard navigation (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    return () => {
      document.body.style.overflow = '';
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, []);

  // Focus trap within modal — re-runs when guruDetail loads so new focusable elements are captured
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    
    // Focus the first focusable element when modal opens
    if (firstFocusable) {
      firstFocusable.focus();
    }

    return () => {
      modal.removeEventListener('keydown', handleTab);
    };
  }, [guruDetail]);

  // Handle modal scroll css inject (From original code)
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .modal-scroll::-webkit-scrollbar { width: 0; height: 0; }
      .modal-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => { 
      if (document.head.contains(style)) {
        document.head.removeChild(style); 
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`guru-modal-title-${slug}`}
    >
      <div
        ref={modalRef}
        className="modal-scroll relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto group"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute z-20 p-1.5 sm:p-2 text-gray-400 dark:text-gray-500 transition-all bg-white dark:bg-gray-800 rounded-full top-4 right-4 sm:top-6 sm:right-6 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 shadow-lg"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {detailLoading ? (
          <div className="p-4 sm:p-8 space-y-4">
            <Skeleton className="w-full h-64 sm:h-96 rounded-t-2xl sm:rounded-t-3xl" />
            <Skeleton className="w-24 sm:w-32 h-6 sm:h-8" />
            <Skeleton className="w-full h-4 sm:h-6" />
            <div className="space-y-2">
              <Skeleton className="w-full h-3 sm:h-4" />
              <Skeleton className="w-full h-3 sm:h-4" />
            </div>
          </div>
        ) : guruDetail ? (
          <div>
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#1a6d3b] rounded-t-2xl sm:rounded-t-3xl">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-white/20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-white/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="relative flex items-center justify-center w-full h-full">
                <div className="relative overflow-hidden border-3 sm:border-4 shadow-2xl w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl sm:rounded-3xl border-white/30 backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={
                      guruDetail.foto && guruDetail.foto.trim() !== ''
                        ? resolveImageUrl(guruDetail.foto, guruDetail.foto.trim().startsWith("T_Pendidikan_") ? "img/tenagapendidikan" : "img/guru")
                        : guruDetail.karyawan?.foto && guruDetail.karyawan.foto.trim() !== ''
                          ? resolveImageUrl(guruDetail.karyawan.foto, guruDetail.karyawan.foto.trim().startsWith("T_Pendidikan_") ? "img/tenagapendidikan" : "img/guru")
                          : "/placeholder.svg"
                    }
                    alt={guruDetail.name || 'Foto guru'}
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                    className="object-cover object-center w-full h-full"
                    priority
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">
              <div className="relative z-10 mb-6 sm:mb-8 -mt-12 sm:-mt-16 md:-mt-20">
                <div className="border shadow-xl bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-8 border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h2 id={`guru-modal-title-${slug}`} className="break-words text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">{guruDetail.name}</h2>
                        <div className="w-fit shrink-0 p-1 sm:p-1.5 sm:p-2 bg-[#33b962]/10 rounded-xl">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#33b962] fill-[#33b962]" />
                        </div>
                      </div>
                      {guruDetail.lulusan && (
                        <p className="break-words text-(--color-forest-600) dark:text-(--color-forest-400) text-xs sm:text-sm md:text-base font-bold mb-2 sm:mb-3">{guruDetail.lulusan}</p>
                      )}
                      {guruDetail.description && (
                        <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">{guruDetail.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {(!guruDetail.pelajarans || !Array.isArray(guruDetail.pelajarans) || guruDetail.pelajarans.length === 0) && !guruDetail.karyawan && (
                <div className="mb-6 sm:mb-8 flex flex-col items-center justify-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-8 md:p-10 text-center">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-[#33b962]/10">
                    <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-[#33b962]" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Profil Lengkap Belum Tersedia</p>
                    <p className="mt-1 max-w-xs sm:max-w-sm text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Data mata pelajaran dan kontak untuk {guruDetail.name} belum diinput. Silakan hubungi sekolah untuk informasi lebih lanjut.
                    </p>
                  </div>
                </div>
              )}

              {guruDetail.pelajarans && Array.isArray(guruDetail.pelajarans) && guruDetail.pelajarans.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-[#33b962]/10 to-transparent dark:from-[#33b962]/20 rounded-xl p-3 sm:p-4 border border-[#33b962]/20 dark:border-[#33b962]/30">
                    <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-400 uppercase">Pelajaran</p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-(--color-forest-600) dark:text-(--color-forest-400)">{guruDetail.pelajarans.length} Mata Pelajaran</p>
                  </div>
                </div>
              )}

              {guruDetail.pelajarans && Array.isArray(guruDetail.pelajarans) && guruDetail.pelajarans.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#33b962]/20">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#33b962]" />
                    </div>
                    Mengajar {guruDetail.pelajarans.length} Pelajaran
                  </h3>
                  <div className="grid gap-2 sm:gap-3">
                    {guruDetail.pelajarans.map((p: Pelajaran, index: number) => (
                      <div
                        key={p.slug || `pelajaran-${index}`}
                        className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[#33b962]/8 to-transparent rounded-xl border-l-4 border-[#33b962] hover:shadow-lg hover:bg-gradient-to-r hover:from-[#33b962]/12 transition-all"
                      >
                        <div className="flex flex-1 min-w-0 items-start gap-3 sm:gap-4">
                          <div className="shrink-0 mt-1 sm:mt-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#33b962] group-hover:scale-150 transition-transform"></div>
                          <span className="break-words text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-(--color-forest-600) dark:group-hover:text-(--color-forest-400) transition-colors">{p.name || 'Pelajaran tanpa nama'}</span>
                        </div>
                        <ChevronRight className="shrink-0 ml-1 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#33b962] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guruDetail.karyawan && (
                <div>
                  <h3 className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#33b962]/20">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#33b962]" />
                    </div>
                    Informasi Kontak
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {guruDetail.karyawan.email && guruDetail.karyawan.email.trim() !== '' && (
                      <a href={`mailto:${guruDetail.karyawan.email.trim()}`} className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-r from-[#33b962]/8 to-transparent dark:from-[#33b962]/10 border-2 border-[#33b962]/20 dark:border-gray-700 hover:border-[#33b962] hover:shadow-lg transition-all">
                        <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#33b962]/10 rounded-xl flex items-center justify-center group-hover:bg-[#33b962]/20 transition-colors">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#33b962]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] sm:text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">Email</p>
                          <p className="text-sm sm:text-base font-semibold truncate group-hover:text-(--color-forest-600) dark:group-hover:text-(--color-forest-400) transition-colors text-gray-800 dark:text-gray-200">{guruDetail.karyawan.email}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-[#33b962] transition-colors" />
                      </a>
                    )}
                    {guruDetail.karyawan.phone && guruDetail.karyawan.phone.trim() !== '' && (
                      <a href={`tel:${guruDetail.karyawan.phone.trim()}`} className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-r from-[#33b962]/8 to-transparent dark:from-[#33b962]/10 border-2 border-[#33b962]/20 dark:border-gray-700 hover:border-[#33b962] hover:shadow-lg transition-all">
                        <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#33b962]/10 rounded-xl flex items-center justify-center group-hover:bg-[#33b962]/20 transition-colors">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#33b962]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] sm:text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">Telepon</p>
                          <p className="text-sm sm:text-base font-semibold group-hover:text-(--color-forest-600) dark:group-hover:text-(--color-forest-400) transition-colors text-gray-800 dark:text-gray-200">{guruDetail.karyawan.phone}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-[#33b962] transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : detailError ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Gagal memuat data</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{detailError}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Guru tidak ditemukan</div>
        )}
      </div>
    </div>
  );
}
