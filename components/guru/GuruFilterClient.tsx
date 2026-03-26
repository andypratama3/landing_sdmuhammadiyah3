"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, X } from "lucide-react";
import type { Pelajaran } from "@/types";

export function GuruFilterClient({ 
  pelajarans, 
  totalGurus 
}: { 
  pelajarans: Pelajaran[], 
  totalGurus: number 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get("search") || "";
  const currentFilter = searchParams.get("pelajaran") || "all";

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isTyping, setIsTyping] = useState(false);

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
    <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                {isTyping ? <Loader2 className="w-5 h-5 text-[#33b962] animate-spin" /> : <Search className="w-5 h-5 text-gray-400" />}
              </div>
              <Input
                type="text"
                placeholder="Cari nama guru..."
                className="pl-10 pr-4 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-full focus:border-[#33b962] focus:ring-2 focus:ring-[#33b962]/20 transition-all dark:text-white"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button onClick={() => setSearchInput("")} className="absolute p-1 transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-200">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#33b962]/10">
               <span className="font-semibold text-[#33b962]">{totalGurus}</span>
               <span className="text-sm text-gray-600">Guru</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.slug}
                variant={currentFilter === filter.slug ? "default" : "outline"}
                className={`rounded-full px-6 py-2 h-10 font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${
                  currentFilter === filter.slug
                  ? "bg-[#33b962] text-white shadow-xl shadow-emerald-500/20 hover:bg-[#2a9d52] border-0"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 hover:border-[#33b962] hover:text-[#33b962] dark:hover:border-[#33b962]"
                }`}
                onClick={() => handleFilterChange(filter.slug)}
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
