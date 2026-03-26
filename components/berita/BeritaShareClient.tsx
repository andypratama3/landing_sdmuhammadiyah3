"use client";

import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export function BeritaShareClient({ 
  judul, 
  deskripsi 
}: { 
  judul: string, 
  deskripsi: string 
}) {
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'native') => {
    if (typeof window === 'undefined') return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(judul);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (platform === 'native') {
      if (navigator.share) {
        navigator.share({
          title: judul,
          text: deskripsi,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('Link berhasil disalin!'))
          .catch(() => alert('Gagal menyalin link'));
      }
    } else {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex items-center gap-4 py-8 border-t border-gray-100 dark:border-white/5">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">BAGIKAN ARTIKEL:</span>
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#1877F2] hover:text-white transition-all"
          onClick={() => handleShare('facebook')}
        >
          <Facebook className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#1DA1F2] hover:text-white transition-all"
          onClick={() => handleShare('twitter')}
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#0A66C2] hover:text-white transition-all"
          onClick={() => handleShare('linkedin')}
        >
          <Linkedin className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="rounded-xl border-gray-200 dark:border-gray-800 hover:bg-[#33b962] hover:text-white transition-all"
          onClick={() => handleShare('native')}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
