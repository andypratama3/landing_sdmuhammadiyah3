import { useState } from 'react';
import { Loader, AlertCircle, FileText, Eye, Download } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import type { RapotDetail } from '@/types/rapot.types';

const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

interface StudentRapotDetailProps {
  studentId: string;
  studentName: string;
  isExpanded: boolean;
  onDownload: (
    siswaName: string,
    semester: string,
    rapotId: string,
    siswaId: string
  ) => Promise<void>;
}

export const StudentRapotDetail = ({
  studentId,
  studentName,
  isExpanded,
  onDownload
}: StudentRapotDetailProps) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const {
    data: rapotList,
    loading: rapotLoading,
    error: rapotError
  } = useApi<RapotDetail[]>(
    `/rapot/detail/${studentId}`,
    {
      cache: true,
      cacheTTL: 600000, // 10 menit
      immediate: isExpanded
    }
  );

  // Helper untuk mendapatkan full URL file dari Laravel storage
  const getFileUrl = (filePath: string | null) => {
    if (!filePath) return null;

    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }

    return `${STORAGE_URL}/${filePath}`;
  };

  // Helper untuk open file di tab baru
  const handleViewFile = (fileUrl: string) => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  // Helper untuk cek apakah file adalah gambar
  const isImageFile = (filePath: string | null) => {
    if (!filePath) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    return imageExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
  };

  const handleDownloadClick = async (
    rapotId: string,
    semester: string,
    siswaId: string
  ) => {
    setDownloadingId(rapotId);
    try {
      await onDownload(studentName, semester, rapotId, siswaId);
    } finally {
      setDownloadingId(null);
    }
  };

  if (!isExpanded) return null;

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
      {rapotLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 mr-3 text-emerald-500 animate-spin" />
          <span className="text-gray-600 dark:text-gray-400">Memuat rapot...</span>
        </div>
      ) : rapotError ? (
        <div className="flex items-center gap-3 p-4 text-red-600 dark:text-red-400 rounded-lg bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm">{rapotError}</span>
        </div>
      ) : !rapotList || rapotList.length === 0 ? (
        <p className="py-8 text-center text-gray-500 dark:text-gray-400">Tidak ada rapot untuk siswa ini</p>
      ) : (
        <div className="space-y-3">
          {rapotList.map(rapot => {
            const fileUrl = getFileUrl(rapot.file);
            const hasFile = !!fileUrl && !!rapot.file;
            const isImage = isImageFile(rapot.file);
            const isDownloading = downloadingId === rapot.id;

            return (
              <div
                key={rapot.id}
                className="flex items-center justify-between p-4 transition-colors bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-emerald-300 dark:hover:border-emerald-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {rapot.semester}
                    </h4>
                    {isImage && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                        Gambar
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>Tahun: {rapot.tahun}</p>
                    <p>Kelas: {rapot.kelas}</p>
                    {rapot.periode && <p>Periode: {rapot.periode}</p>}
                    {rapot.catatan && (
                      <p className="mt-1 text-xs italic text-gray-500 dark:text-gray-500">
                        "{rapot.catatan}"
                      </p>
                    )}
                    {rapot.file_size && (
                      <p className="text-xs text-gray-500">
                        Ukuran: {rapot.file_size}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md border ${rapot.file === null
                        ? 'border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                        : 'border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                      }`}>
                      {rapot.file === null ? 'Belum diunggah' : 'Tersedia'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {hasFile && fileUrl && (
                    <>
                      <button
                        onClick={() => handleViewFile(fileUrl)}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-all bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Lihat file"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Lihat</span>
                      </button>

                      <button
                        onClick={() => handleDownloadClick(rapot.id, rapot.semester, rapot.siswa_id)}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-all rounded-lg shadow-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Download file"
                      >
                        {isDownloading ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span className="hidden sm:inline">Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                  {!hasFile && (
                    <button
                      disabled
                      className="flex items-center gap-2 px-4 py-2 font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-not-allowed"
                      title={rapot.file === null ? 'Rapot sedang diproses' : 'File tidak tersedia'}
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Tidak Tersedia</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
