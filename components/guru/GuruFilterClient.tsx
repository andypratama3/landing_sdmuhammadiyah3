"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, X } from "lucide-react";
import type { Pelajaran, Guru } from "@/types";

export function GuruFilterClient({ 
  pelajarans, 
  gurus 
}: { 
  pelajarans: Pelajaran[], 
  gurus: Guru[] 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get("search") || "";
  const currentFilter = searchParams.get("pelajaran") || "all";

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isTyping, setIsTyping] = useState(false);

  // Sync search input with URL params when they change externally
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // Calculate filtered count
  const filteredCount = useMemo(() => {
    return gurus.filter((guru) => {
      if (currentSearch && !guru.name.toLowerCase().includes(currentSearch.toLowerCase())) {
        return false;
      }
      
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
    }).length;
  }, [gurus, currentSearch, currentFilter]);

  // Debounce search input and sync to URL query params
  useEffect(() => {
    setIsTyping(true);
    const handler = setTimeout(() => {
      setIsTyping(false);
      const params = new URLSearchParams(searchParams.toString());
      if (searchInput) params.set("search", searchInput);
      else params.delete("search");
      
      // Update URL without triggering full reload, keeping scroll position
      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput, searchParams, router]);

  const handleFilterChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("pelajaran");
    else params.set("pelajaran", slug);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const filters = [{ slug: "all", label: "Semua Guru" }, ...pelajarans.map(p => ({ slug: p.slug, label: p.name }))];

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
            <div className="relative w-full md:w-80 lg:w-96">
              <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                {isTyping ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#33b962] animate-spin" /> : <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />}
              </div>
              <Input
                type="text"
                placeholder="Cari nama guru..."
                className="pl-9 sm:pl-10 pr-8 sm:pr-4 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-full focus:border-(--color-forest-600) focus:ring-2 focus:ring-(--color-forest-600)/20 transition-all dark:text-white h-10 sm:h-11 text-sm"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  aria-label="Hapus pencarian"
                  className="absolute min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center transition-colors -translate-y-1/2 rounded-full right-1.5 sm:right-1 top-1/2 hover:bg-gray-200"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#33b962]/10">
               <span className="font-semibold text-sm sm:text-base text-(--color-forest-600) dark:text-(--color-forest-400)">{filteredCount}</span>
               <span className="text-xs sm:text-sm text-gray-600">Guru</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.slug}
                variant={currentFilter === filter.slug ? "default" : "outline"}
                className={`rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 h-8 sm:h-9 md:h-10 font-black uppercase tracking-widest text-[9px] sm:text-[10px] transition-all duration-300 max-w-[120px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[250px] truncate ${
                  currentFilter === filter.slug
                  ? "bg-(--color-forest-700)! text-white shadow-xl shadow-emerald-500/20 hover:bg-(--color-forest-600)! border-0"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 hover:border-(--color-forest-600) hover:text-(--color-forest-600) dark:hover:border-(--color-forest-400) dark:hover:text-(--color-forest-400)"
                }`}
                onClick={() => handleFilterChange(filter.slug)}
                title={filter.label}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
