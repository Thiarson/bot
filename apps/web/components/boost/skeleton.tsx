function SkeletonBox({ className = "" }) {
    return (
        <div className={`bg-gray-300 dark:bg-gray-800 animate-pulse rounded ${className}`}></div>
    );
}

function NavbarSkeleton() {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo Skeleton */}
            <SkeletonBox className="w-32 h-8" />
            
            {/* Search Skeleton */}
            <div className="flex-1 max-w-md mx-8">
                <SkeletonBox className="w-full h-10 rounded-lg" />
            </div>

            {/* User Menu Skeleton */}
            <div className="flex items-center space-x-4">
                <SkeletonBox className="w-9 h-9 rounded" />
                <SkeletonBox className="w-24 h-10 rounded-lg" />
            </div>
        </div>
    </header>
  );
}

function DashboardSkeleton() {
  return (
    <main className="flex-1 p-6">
        {/* Welcome Section Skeleton */}
        <div className="mb-8">
            <SkeletonBox className="w-96 h-9 mb-2" />
            <SkeletonBox className="w-64 h-5" />
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array(4).fill(0).map((_, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <SkeletonBox className="w-5 h-5 rounded" />
                        <SkeletonBox className="w-8 h-4" />
                    </div>
                    <SkeletonBox className="w-16 h-8 mb-1" />
                    <SkeletonBox className="w-20 h-4" />
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Matches Skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <SkeletonBox className="w-40 h-6" />
                    <SkeletonBox className="w-16 h-5" />
                </div>
                <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex-1">
                                <SkeletonBox className="w-48 h-5 mb-2" />
                                <SkeletonBox className="w-32 h-4" />
                            </div>
                            <div className="flex items-center space-x-3">
                                <SkeletonBox className="w-8 h-4" />
                                <SkeletonBox className="w-4 h-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <SkeletonBox className="w-32 h-6 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                    {Array(4).fill(0).map((_, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <SkeletonBox className="w-10 h-10 rounded-lg mb-3" />
                            <SkeletonBox className="w-20 h-4 mb-1" />
                            <SkeletonBox className="w-24 h-3" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Events Skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <SkeletonBox className="w-36 h-6" />
                    <SkeletonBox className="w-6 h-6 rounded" />
                </div>
                <div className="space-y-3">
                    {Array(3).fill(0).map((_, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <SkeletonBox className="w-3 h-3 rounded-full" />
                            <div className="flex-1">
                                <SkeletonBox className="w-40 h-4 mb-1" />
                                <SkeletonBox className="w-28 h-3" />
                            </div>
                            <SkeletonBox className="w-4 h-4" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <SkeletonBox className="w-32 h-6 mb-4" />
                <div className="space-y-4">
                    {Array(3).fill(0).map((_, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-sm mb-2">
                                <SkeletonBox className="w-32 h-4" />
                                <SkeletonBox className="w-8 h-4" />
                            </div>
                            <SkeletonBox className="w-full h-2 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main>
  );
}

function SidebarSkeleton() {
    return (
        <aside className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-6">
                {/* Navigation Skeleton */}
                <div>
                    <SkeletonBox className="w-24 h-5 mb-4" />
                    <div className="space-y-2">
                        {Array(5).fill(0).map((_, idx) => (
                            <SkeletonBox key={idx} className="w-full h-10 rounded-lg" />
                        ))}
                    </div>
                </div>
                
                {/* Recent Activity Skeleton */}
                <div>
                    <SkeletonBox className="w-32 h-5 mb-4" />
                    <div className="space-y-3">
                        {Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <SkeletonBox className="w-full h-4 mb-2" />
                                <SkeletonBox className="w-20 h-3" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export {
    NavbarSkeleton,
    DashboardSkeleton,
    SidebarSkeleton,
};
