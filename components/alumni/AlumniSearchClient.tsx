'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, X, LayoutGrid, List, SortAsc, SortDesc, ChevronDown } from 'lucide-react'
import type { Alumni } from '@/types/alumni.types'
import { Button } from '@/components/ui/button'

export type ViewMode = 'grid' | 'list'
export type SortMode = 'name_asc' | 'name_desc' | 'year_asc' | 'year_desc'

interface AlumniSearchClientProps {
  alumni: Alumni[]
  onFilteredAlumni: (filtered: Alumni[]) => void
  onViewMode: (mode: ViewMode) => void
  onSortMode: (mode: SortMode) => void
  viewMode: ViewMode
  sortMode: SortMode
}

export default function AlumniSearchClient({
  alumni,
  onFilteredAlumni,
  onViewMode,
  onSortMode,
  viewMode,
  sortMode,
}: AlumniSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null)
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false)

  // Unique filter options
  const graduationYears = useMemo(
    () => [...new Set(alumni.map((a) => a.graduation_year))].sort((a, b) => b - a),
    [alumni]
  )

  const professions = useMemo(
    () =>
      [...new Set(alumni.filter((a) => a.current_profession).map((a) => a.current_profession as string))].sort(),
    [alumni]
  )

  // Filtered + sorted results
  const filteredAlumni = useMemo(() => {
    let result = alumni.filter((alumnus) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        alumnus.name.toLowerCase().includes(q) ||
        (alumnus.current_profession && alumnus.current_profession.toLowerCase().includes(q)) ||
        (alumnus.workplace && alumnus.workplace.toLowerCase().includes(q)) ||
        alumnus.graduation_year.toString().includes(q) ||
        (alumnus.achievement && alumnus.achievement.toLowerCase().includes(q))

      const matchesYear = selectedYear === null || alumnus.graduation_year === selectedYear
      const matchesProfession = selectedProfession === null || alumnus.current_profession === selectedProfession

      return matchesSearch && matchesYear && matchesProfession
    })

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortMode) {
        case 'name_asc':
          return a.name.localeCompare(b.name)
        case 'name_desc':
          return b.name.localeCompare(a.name)
        case 'year_asc':
          return a.graduation_year - b.graduation_year
        case 'year_desc':
          return b.graduation_year - a.graduation_year
        default:
          return 0
      }
    })

    return result
  }, [alumni, searchQuery, selectedYear, selectedProfession, sortMode])

  useEffect(() => {
    onFilteredAlumni(filteredAlumni)
  }, [filteredAlumni, onFilteredAlumni])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedYear(null)
    setSelectedProfession(null)
  }

  const hasActiveFilters = searchQuery !== '' || selectedYear !== null || selectedProfession !== null

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-(--color-forest-450)/10 rounded-[1.5rem] blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative flex items-center bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 focus-within:border-(--color-forest-450) dark:focus-within:border-(--color-forest-500) rounded-[1.5rem] shadow-md focus-within:shadow-xl transition-all duration-300 p-2">
          <div className="pl-4 pr-3 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari alumni — nama, profesi, tempat kerja, angkatan..."
            className="flex-1 bg-transparent border-none outline-none text-base font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 py-3"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-(--color-forest-450) transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Button
            className="bg-(--color-forest-450) hover:bg-(--color-forest-500) text-white rounded-[1rem] px-6 h-12 font-black uppercase tracking-widest text-[10px] shadow-md transition-all hover:scale-105 hidden sm:flex"
          >
            Cari
          </Button>
        </div>
      </div>

      {/* Filters + View Toggle Row */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Filter Label */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter</span>
        </div>

        {/* Year pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedYear(null)}
            className={`h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 border-2 ${
              selectedYear === null
                ? 'bg-(--color-forest-450) text-white border-(--color-forest-450) shadow-lg shadow-(--color-forest-450)/20'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-(--color-forest-450) hover:text-(--color-forest-450)'
            }`}
          >
            Semua Angkatan
          </button>
          {graduationYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(selectedYear === year ? null : year)}
              className={`h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 border-2 ${
                selectedYear === year
                  ? 'bg-(--color-forest-450) text-white border-(--color-forest-450) shadow-lg shadow-(--color-forest-450)/20'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-(--color-forest-450) hover:text-(--color-forest-450)'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Profession dropdown */}
        {professions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowProfessionDropdown((v) => !v)}
              className={`h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 border-2 flex items-center gap-2 ${
                selectedProfession
                  ? 'bg-(--color-sun-500) text-gray-900 border-(--color-sun-500) shadow-lg shadow-(--color-sun-500)/20'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-(--color-sun-500) hover:text-(--color-sun-500)'
              }`}
            >
              {selectedProfession ?? 'Profesi'}
              <ChevronDown className={`w-3 h-3 transition-transform ${showProfessionDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showProfessionDropdown && (
              <div className="absolute left-0 top-12 z-30 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl min-w-[220px] py-3 max-h-64 overflow-y-auto">
                <button
                  onClick={() => { setSelectedProfession(null); setShowProfessionDropdown(false) }}
                  className="w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-(--color-forest-450) hover:bg-(--color-forest-450)/5 transition-colors"
                >
                  Semua Profesi
                </button>
                {professions.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setSelectedProfession(p); setShowProfessionDropdown(false) }}
                    className={`w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                      selectedProfession === p
                        ? 'text-(--color-forest-450) bg-(--color-forest-450)/10'
                        : 'text-gray-600 dark:text-gray-400 hover:text-(--color-forest-450) hover:bg-(--color-forest-450)/5'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-1.5"
          >
            <X className="w-3 h-3" />
            Reset
          </button>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hidden sm:block">Urut</span>
          <button
            onClick={() =>
              onSortMode(
                sortMode === 'name_asc' ? 'name_desc' :
                sortMode === 'name_desc' ? 'year_desc' :
                sortMode === 'year_desc' ? 'year_asc' : 'name_asc'
              )
            }
            className="h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:border-(--color-teal-400) hover:text-(--color-teal-400) transition-all flex items-center gap-1.5"
          >
            {sortMode.startsWith('name') ? (
              <><SortAsc className="w-3 h-3" /> {sortMode === 'name_asc' ? 'A–Z' : 'Z–A'}</>
            ) : (
              <><SortDesc className="w-3 h-3" /> Tahun {sortMode === 'year_desc' ? '↓' : '↑'}</>
            )}
          </button>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          <button
            onClick={() => onViewMode('grid')}
            aria-label="Grid view"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              viewMode === 'grid'
                ? 'bg-(--color-forest-450) text-white shadow-md'
                : 'text-gray-400 hover:text-(--color-forest-450)'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewMode('list')}
            aria-label="List view"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              viewMode === 'list'
                ? 'bg-(--color-forest-450) text-white shadow-md'
                : 'text-gray-400 hover:text-(--color-forest-450)'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results count */}
      {hasActiveFilters && (
        <div className="flex items-center gap-3 px-5 py-2 bg-(--color-forest-450)/5 rounded-full border border-(--color-forest-450)/10 w-fit">
          <span className="text-[10px] font-black uppercase tracking-widest text-(--color-forest-450)">
            {filteredAlumni.length} Alumni Ditemukan
          </span>
        </div>
      )}
    </div>
  )
}
