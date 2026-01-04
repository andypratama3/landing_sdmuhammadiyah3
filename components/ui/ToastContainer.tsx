import { CheckCircle, X, XCircle, Loader } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: number) => void;
}

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  return (
    <div className="fixed z-50 space-y-2 top-4 right-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md animate-in slide-in-from-top-5 ${
            toast.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : toast.type === 'error'
              ? 'bg-red-50 border border-red-200'
              : 'bg-blue-50 border border-blue-200'
          }`}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
          {toast.type === 'info' && <Loader className="w-5 h-5 text-blue-600 shrink-0 animate-spin" />}
          
          <p className={`flex-1 text-sm font-medium ${
            toast.type === 'success' 
              ? 'text-green-900' 
              : toast.type === 'error'
              ? 'text-red-900'
              : 'text-blue-900'
          }`}>
            {toast.message}
          </p>
          
          <button
            onClick={() => removeToast(toast.id)}
            className={`shrink-0 ${
              toast.type === 'success' 
                ? 'text-green-600 hover:text-green-800' 
                : toast.type === 'error'
                ? 'text-red-600 hover:text-red-800'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
