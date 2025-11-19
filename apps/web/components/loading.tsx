import { useEffect } from 'react';

interface LoadingModalProps {
  isLoading: boolean;
  message?: string;
}

function LoadingModal({ isLoading, message = 'Processing...' }: LoadingModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
      aria-describedby="loading-description"
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
        {/* Accessible Spinner */}
        <div className="relative" role="status" aria-label="Loading">
          {/* Outer rotating ring */}
          <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-transparent animate-spin" />
          
          {/* Gradient overlay ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-purple-500 border-r-blue-500 animate-spin [animation-duration:1.5s]" />
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-1">
          <p 
            id="loading-title"
            className="text-gray-900 dark:text-white font-semibold text-lg"
          >
            {message}
          </p>
          <p 
            id="loading-description"
            className="text-gray-500 dark:text-gray-400 text-sm"
          >
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingModal;
