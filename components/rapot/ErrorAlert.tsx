
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  title: string;
  message: string;
}

export const ErrorAlert = ({ title, message }: ErrorAlertProps) => {
  return (
    <div className="flex items-start gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-red-900">{title}</p>
        <p className="text-sm text-red-800">{message}</p>
      </div>
    </div>
  );
};
