interface PropsType {
  isLoading: boolean;
  message?: string;
}

function LoadingModal ({ isLoading, message = 'Processing...' }: PropsType) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 animate-scaleIn">
                {/* Circular Spinner */}
                <div className="relative">
                    {/* Outer rotating ring */}
                    <div className="w-20 h-20 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-transparent animate-spin"></div>
                
                    {/* Gradient overlay ring */}
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-purple-500 border-r-blue-500 animate-spin"></div>
                
                    {/* Inner pulsing circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Loading text */}
                <div className="text-center">
                    <p className="text-gray-900 dark:text-white font-medium text-lg mb-1">{message}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Please wait a moment</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default LoadingModal;
