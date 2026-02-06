
import { GraduationCap, Loader, FileText } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-year' | 'loading' | 'no-data';
}

export const EmptyState = ({ type }: EmptyStateProps) => {
  if (type === 'no-year') {
    return (
      <div className="p-12 text-center bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
        <p className="text-lg text-gray-500 dark:text-gray-400">Pilih tahun ajaran untuk memulai</p>
      </div>
    );
  }

  if (type === 'loading') {
    return (
      <div className="p-12 text-center bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <Loader className="w-12 h-12 mx-auto mb-4 text-emerald-500 animate-spin" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Memuat data siswa...</p>
      </div>
    );
  }

  return (
    <div className="p-12 text-center bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
      <p className="text-lg text-gray-500 dark:text-gray-300">Tidak ada data rapot ditemukan</p>
      <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
    </div>
  );
};
