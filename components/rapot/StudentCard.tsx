
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
    <div className="overflow-hidden transition-colors border border-gray-200 rounded-xl hover:border-emerald-300">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 transition-colors hover:bg-emerald-50"
      >
        <div className="flex-1 text-left">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            {student.name}
          </h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="flex items-center">
              <span className="font-medium">NIS:</span>
              <span className="ml-1">{student.nis}</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700">
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