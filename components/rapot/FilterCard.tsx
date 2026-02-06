
import { Search, Loader } from 'lucide-react';
import type { TahunResponse, SiswaResponse } from '@/types/rapot.types';

interface FilterCardProps {
  // Tahun
  selectedYear: string;
  onYearChange: (value: string) => void;
  tahunList?: TahunResponse[];
  tahunLoading: boolean;
  tahunError?: string;

  // Kelas
  selectedClass: string;
  onClassChange: (value: string) => void;
  classList: string[];
  siswaGroupedByClass: Record<string, SiswaResponse[]>;

  // Search
  searchQuery: string;
  onSearchChange: (value: string) => void;
  debouncedSearchQuery: string;
  isTyping: boolean;

  // Meta
  siswaMeta?: any;
  siswaList?: SiswaResponse[];
  siswaResponseObj?: any;
}

export const FilterCard = ({
  selectedYear,
  onYearChange,
  tahunList,
  tahunLoading,
  tahunError,
  selectedClass,
  onClassChange,
  classList,
  siswaGroupedByClass,
  searchQuery,
  onSearchChange,
  debouncedSearchQuery,
  isTyping,
  siswaMeta,
  siswaList,
  siswaResponseObj
}: FilterCardProps) => {
  return (
    <div className="p-6 mb-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Tahun Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Tahun Ajaran
          </label>
          {tahunLoading ? (
            <div className="flex items-center justify-center h-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Loader className="w-4 h-4 text-gray-500 dark:text-gray-400 animate-spin" />
            </div>
          ) : (
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            >
              <option value="">Semua Tahun Ajaran</option>
              {tahunList?.map(item => (
                <option key={item.tahun} value={item.tahun}>
                  {item.label || item.tahun}
                </option>
              ))}
            </select>
          )}
          {tahunError && <p className="mt-1 text-xs text-red-500">{tahunError}</p>}
        </div>

        {/* Kelas Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Kelas {selectedYear && <span className="text-xs text-gray-500 dark:text-gray-400">({selectedYear})</span>}
          </label>
          <select
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            disabled={!selectedYear}
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:cursor-not-allowed"
          >
            <option value="">Semua Kelas ({classList.length})</option>
            {classList.map(kelas => {
              const count = siswaGroupedByClass[kelas]?.length || 0;
              return (
                <option key={kelas} value={kelas}>
                  {kelas} ({count} Siswa)
                </option>
              );
            })}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Cari Siswa
          </label>
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama atau NIS..."
              disabled={!selectedYear}
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition disabled:bg-gray-100 dark:disabled:bg-gray-800/50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            {isTyping && (
              <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
                <Loader className="w-4 h-4 text-gray-400 animate-spin" />
              </div>
            )}
          </div>
          {searchQuery && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {isTyping ? 'Mengetik...' : `Mencari "${debouncedSearchQuery}"`}
            </p>
          )}
        </div>
      </div>

      {/* Query Info */}
      {siswaResponseObj && (
        <div className="pt-4 mt-4 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
          {siswaMeta && (
            <div className="flex items-center justify-between">
              <p>
                Menampilkan {siswaList?.length || 0} dari {siswaMeta.total || 0} siswa
                {selectedClass && ` di kelas ${selectedClass}`}
                {debouncedSearchQuery && ` untuk "${debouncedSearchQuery}"`}
              </p>
              {isTyping && (
                <span className="flex items-center gap-1 text-emerald-600">
                  <Loader className="w-3 h-3 animate-spin" />
                  <span>Mencari...</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};