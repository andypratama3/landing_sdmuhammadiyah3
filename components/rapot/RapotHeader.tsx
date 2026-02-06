
import { GraduationCap } from 'lucide-react';

export const RapotHeader = () => {
  return (
    <div className="relative pt-24 pb-12 mb-8 text-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="mb-3 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Sistem Rapot Digital
        </h1>
        <p className="text-lg font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          SD Muhammadiyah 3 Samarinda
        </p>
      </div>
    </div>
  );
};
