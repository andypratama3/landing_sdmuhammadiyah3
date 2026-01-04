
import type { SiswaResponse } from '@/types/rapot.types';
import { StudentCard } from './StudentCard';
import { StudentRapotDetail } from './StudentRapotDetail';

interface ClassSectionProps {
  kelas: string;
  students: SiswaResponse[];
  expandedStudents: Set<any>;
  onToggleStudent: (studentId: string) => void;
  onDownload: (
    siswaName: string,
    semester: string,
    rapotId: string,
    siswaId: string
  ) => Promise<void>;
}

export const ClassSection = ({ 
  kelas, 
  students, 
  expandedStudents, 
  onToggleStudent,
  onDownload 
}: ClassSectionProps) => {
  return (
    <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600">
        <h2 className="text-xl font-bold text-white">
          Kelas {kelas} ({students.length} siswa)
        </h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {students.map(student => {
            const isExpanded = expandedStudents.has(student.id);

            return (
              <StudentCard
                key={student.id}
                student={student}
                isExpanded={isExpanded}
                onToggle={() => onToggleStudent(student.id)}
              >
                <StudentRapotDetail
                  studentId={student.id}
                  studentName={student.name}
                  isExpanded={isExpanded}
                  onDownload={onDownload}
                />
              </StudentCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
