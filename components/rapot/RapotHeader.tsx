
import { GraduationCap } from 'lucide-react';

export const RapotHeader = () => {
  return (
    <div className="pt-20 mb-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
        <GraduationCap className="w-8 h-8 text-white" />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Download Rapot Siswa
      </h1>
      <p className="text-gray-600">
        SD Muhammadiyah 3 Samarinda
      </p>
    </div>
  );
};
