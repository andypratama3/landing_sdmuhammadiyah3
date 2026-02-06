'use client';

import React from 'react';
import Image from 'next/image';
import { GalleryCardSkeleton } from '../gallery/skeletons/GalleryCardSkeleton';
import { Fotosekolah } from '@/types/fotosekolah.types';

interface FotoSekolahCardProps {
  galleries?: Fotosekolah[] | null;
  loading?: boolean;
}

export const FotoSekolahCard: React.FC<FotoSekolahCardProps> = ({
  galleries = [],
  loading = false
}) => {
  const galleryData = galleries ?? [];
  return (
    <>
      {loading ? (
        // Loading State
        Array.from({ length: 6 }).map((_, index) => (
          <GalleryCardSkeleton key={`skeleton-${index}`} />
        ))
      ) : galleryData.length > 0 ? (
        // Gallery Items
        galleryData.map((gallery) => (
          <div
            key={`gallery-${gallery.id}`}
            className="relative overflow-hidden transition-all duration-500 shadow-xl cursor-pointer group rounded-[2rem] hover:shadow-2xl hover:-translate-y-2 dark:bg-gray-900/40 border border-white/10 glass"
          >
            <div className="relative overflow-hidden aspect-square">
              <Image
                src={gallery.foto
                  ? (gallery.foto.startsWith("http")
                    ? gallery.foto
                    : `${process.env.NEXT_PUBLIC_STORAGE_URL}/${gallery.foto}`)
                  : "/placeholder.svg"
                }
                alt={gallery.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
            </div>

            {/* Overlay dengan Caption Premium */}
            <div className="absolute inset-0 flex items-end transition-all duration-500 opacity-0 bg-linear-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100 p-8 translate-y-4 group-hover:translate-y-0">
              <div className="space-y-2">
                <div className="w-12 h-1 bg-[#33b962] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-left" />
                <p className="font-black text-white text-lg uppercase tracking-tight leading-tight">
                  {gallery.name}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  <span>SDMUH3 MOMEN</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        // Empty State
        <div className="py-12 text-center text-gray-500 col-span-full">
          <p className="text-lg">Tidak ada galeri tersedia</p>
        </div>
      )}
    </>
  );
};

export default FotoSekolahCard;