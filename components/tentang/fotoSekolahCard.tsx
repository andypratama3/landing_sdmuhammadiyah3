'use client';

import React from 'react';
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
            className="relative overflow-hidden transition-all shadow-lg cursor-pointer group rounded-2xl hover:shadow-2xl"
          >
            <div className="overflow-hidden aspect-square">
              <img
                src={gallery.foto || "/placeholder.svg"}
                alt={gallery.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            
            {/* Overlay dengan Caption */}
            <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100">
              <p className="p-6 font-semibold text-white">
                {gallery.name}
              </p>
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