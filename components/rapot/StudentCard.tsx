
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { SiswaResponse } from '@/types/rapot.types';

interface StudentCardProps {
  student: SiswaResponse;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export const StudentCard = ({ student, isExpanded, onToggle, children }: StudentCardProps) => {
  return (
    <div className="overflow-hidden transition-colors border border-gray-200 dark:border-gray-800 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-700">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
      >
        <div className="flex-1 text-left">
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {student.name}
          </h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <span className="font-medium">NIS:</span>
              <span className="ml-1">{student.nis}</span>
            </span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
              {student.rapot_count} Rapot
            </span>
          </div>
        </div>
        <div className="ml-4">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-emerald-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      {children}
    </div>
  );
};