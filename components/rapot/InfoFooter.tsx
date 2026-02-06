export const InfoFooter = () => {
  return (
    <div className="p-4 mt-8 border bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors duration-300">
      <p className="text-sm text-emerald-800 dark:text-emerald-300">
        <strong>Catatan:</strong> Gunakan filter Tahun Ajaran dan Kelas untuk mempermudah pencarian.
        Klik pada nama siswa untuk melihat daftar rapot yang tersedia. File rapot akan diakses langsung dari server storage.
      </p>
    </div>
  );
};