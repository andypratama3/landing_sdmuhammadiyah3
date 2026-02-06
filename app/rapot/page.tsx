
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useApi } from '@/hooks/useApi';
import { useDebounce } from '@/hooks/useDebounce';
import type { TahunResponse, SiswaResponse } from '@/types/rapot.types';
import { ToastContainer, Toast, ToastType } from '@/components/ui/ToastContainer';
import { FilterCard } from '@/components/rapot/FilterCard';
import { ClassSection } from '@/components/rapot/ClassSection';
import { EmptyState } from '@/components/rapot/EmptyState';
import { ErrorAlert } from '@/components/rapot/ErrorAlert';
import { RapotHeader } from '@/components/rapot/RapotHeader';
import { InfoFooter } from '@/components/rapot/InfoFooter';

export const RapotHierarchySystem = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStudents, setExpandedStudents] = useState(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const isTyping = searchQuery !== debouncedSearchQuery;

  // Toast helper functions
  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Build query string for siswa endpoint
  const siswaQueryString = useMemo(() => {
    if (!selectedYear) return null;
    const params = new URLSearchParams();
    params.append('tahun', selectedYear);
    if (selectedClass) params.append('kelas', selectedClass);
    if (debouncedSearchQuery) params.append('search', debouncedSearchQuery);
    return params.toString();
  }, [selectedYear, selectedClass, debouncedSearchQuery]);

  // Fetch Tahun Ajaran
  const {
    data: tahunList,
    loading: tahunLoading,
    error: tahunError
  } = useApi<TahunResponse[]>('/rapot/tahun', {
    cache: true,
    cacheTTL: 3600000,
    immediate: true
  });

  // Fetch Siswa
  const {
    data: siswaList,
    meta: siswaMeta,
    loading: siswaLoading,
    error: siswaError,
    response: siswaResponseObj
  } = useApi<SiswaResponse[]>(
    siswaQueryString ? `/rapot/siswa?${siswaQueryString}` : '',
    {
      cache: true,
      cacheTTL: 600000,
      immediate: !!siswaQueryString
    }
  );

  // Handler untuk expand student
  const toggleStudent = useCallback((studentId: string) => {
    setExpandedStudents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  }, []);

  // Get unique classes
  const classList = useMemo(() => {
    if (!siswaList || siswaList.length === 0) return [];
    const classes = new Set(siswaList.map(s => s.class));
    return Array.from(classes).sort((a, b) => {
      const aMatch = a.match(/(\d+)([A-Z])/);
      const bMatch = b.match(/(\d+)([A-Z])/);
      if (!aMatch || !bMatch) return a.localeCompare(b);
      const aNum = parseInt(aMatch[1]);
      const bNum = parseInt(bMatch[1]);
      if (aNum !== bNum) return aNum - bNum;
      return aMatch[2].localeCompare(bMatch[2]);
    });
  }, [siswaList]);

  // Download handler
  const handleDownload = useCallback(async (
    siswaName: string,
    semester: string,
    rapotId: string,
    siswaId: string
  ) => {
    try {
      addToast('info', 'Memulai download...');

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/rapot/download/${siswaId}/${rapotId}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/pdf,application/octet-stream,image/*',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `rapot_${siswaName}_${semester}.pdf`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error('File kosong atau tidak dapat diakses');
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);

      addToast('success', `Berhasil mendownload rapot ${siswaName}`);

    } catch (error) {
      console.error('Error downloading rapot:', error);

      let errorMessage = 'Gagal mengunduh file rapot';

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      addToast('error', errorMessage);
    }
  }, [addToast]);

  // Group siswa by class
  const siswaGroupedByClass = useMemo(() => {
    if (!siswaList || siswaList.length === 0) return {};

    const grouped: Record<string, SiswaResponse[]> = {};
    siswaList.forEach(siswa => {
      if (!grouped[siswa.class]) {
        grouped[siswa.class] = [];
      }
      grouped[siswa.class].push(siswa);
    });

    Object.keys(grouped).forEach(kelas => {
      grouped[kelas].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [siswaList]);

  // Get sorted classes
  const sortedClasses = useMemo(() => {
    return Object.keys(siswaGroupedByClass).sort((a, b) => {
      const aMatch = a.match(/(\d+)([A-Z])/);
      const bMatch = b.match(/(\d+)([A-Z])/);
      if (!aMatch || !bMatch) return a.localeCompare(b);
      const aNum = parseInt(aMatch[1]);
      const bNum = parseInt(bMatch[1]);
      if (aNum !== bNum) return aNum - bNum;
      return aMatch[2].localeCompare(bMatch[2]);
    });
  }, [siswaGroupedByClass]);

  // Handle tahun change
  const handleTahunChange = useCallback((value: string) => {
    setSelectedYear(value);
    setSelectedClass('');
    setSearchQuery('');
    setExpandedStudents(new Set());
  }, []);

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 relative overflow-hidden">
        {/* Playful background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-400/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-400/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 dark:bg-black/5 rounded-full blur-[150px] animate-spin-slow pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <RapotHeader />

          <FilterCard
            selectedYear={selectedYear}
            onYearChange={handleTahunChange}
            tahunList={tahunList ?? undefined}
            tahunLoading={tahunLoading}
            tahunError={tahunError ?? undefined}
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
            classList={classList}
            siswaGroupedByClass={siswaGroupedByClass}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            debouncedSearchQuery={debouncedSearchQuery}
            isTyping={isTyping}
            siswaMeta={siswaMeta ?? undefined}
            siswaList={siswaList ?? undefined}
            siswaResponseObj={siswaResponseObj}
          />

          {tahunError && (
            <ErrorAlert
              title="Error mengambil data tahun"
              message={tahunError}
            />
          )}

          {siswaError && (
            <ErrorAlert
              title="Error mengambil data siswa"
              message={siswaError}
            />
          )}

          {!selectedYear ? (
            <EmptyState type="no-year" />
          ) : siswaLoading ? (
            <EmptyState type="loading" />
          ) : !siswaList || siswaList.length === 0 ? (
            <EmptyState type="no-data" />
          ) : (
            <div className="space-y-6">
              {sortedClasses.map(kelas => (
                <ClassSection
                  key={kelas}
                  kelas={kelas}
                  students={siswaGroupedByClass[kelas]}
                  expandedStudents={expandedStudents}
                  onToggleStudent={toggleStudent}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}

          <InfoFooter />
        </div>
      </div>
    </>
  );
};

export default RapotHierarchySystem;