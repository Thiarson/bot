function SkeletonBox({ className = "", animate = true }) {
    return (
        <div 
            className={`bg-gray-200 dark:bg-gray-800 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
            role="status"
            aria-label="Loading"
        ></div>
    );
}

function NavbarSkeleton() {
    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 shadow-sm">
            <div className="flex items-center justify-between gap-4 max-w-[1800px] mx-auto">
                {/* Logo Skeleton */}
                <SkeletonBox className="w-32 h-8" />
                
                {/* Search Skeleton */}
                <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                    <SkeletonBox className="w-full h-10 rounded-lg" />
                </div>

                {/* User Menu Skeleton */}
                <div className="flex items-center gap-3">
                    <SkeletonBox className="w-10 h-10 rounded-lg" />
                    <SkeletonBox className="w-40 h-10 rounded-lg hidden sm:block" />
                </div>
            </div>
        </header>
    );
}

function DashboardSkeleton() {
    return (
        <main className="space-y-8" role="status" aria-label="Loading dashboard">
            {/* Welcome Section Skeleton */}
            <div className="space-y-2">
                <SkeletonBox className="w-96 h-10 mb-2" />
                <SkeletonBox className="w-64 h-6" />
            </div>

            {/* Quick Stats Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array(4).fill(0).map((_, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <SkeletonBox className="w-10 h-10 rounded-lg" />
                            <SkeletonBox className="w-12 h-4" />
                        </div>
                        <SkeletonBox className="w-16 h-8" />
                        <SkeletonBox className="w-24 h-4" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Job Matches Skeleton */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <SkeletonBox className="w-40 h-6" />
                        <SkeletonBox className="w-16 h-5" />
                    </div>
                    <div className="space-y-3">
                        {Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                                <SkeletonBox className="w-48 h-5" />
                                <SkeletonBox className="w-32 h-4" />
                                <div className="flex items-center gap-3 pt-2">
                                    <SkeletonBox className="w-20 h-4" />
                                    <SkeletonBox className="w-16 h-4" />
                                    <SkeletonBox className="w-16 h-6 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Skeleton */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
                    <SkeletonBox className="w-32 h-6 mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        {Array(4).fill(0).map((_, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3">
                                <SkeletonBox className="w-12 h-12 rounded-xl" />
                                <SkeletonBox className="w-20 h-4" />
                                <SkeletonBox className="w-24 h-3" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events Skeleton */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <SkeletonBox className="w-36 h-6" />
                        <SkeletonBox className="w-8 h-8 rounded-lg" />
                    </div>
                    <div className="space-y-3">
                        {Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <SkeletonBox className="w-3 h-3 rounded-full mt-1.5" />
                                <div className="flex-1 space-y-2">
                                    <SkeletonBox className="w-40 h-4" />
                                    <SkeletonBox className="w-28 h-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Skeleton */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-6">
                    <SkeletonBox className="w-32 h-6 mb-4" />
                    {Array(3).fill(0).map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between">
                                <SkeletonBox className="w-32 h-4" />
                                <SkeletonBox className="w-8 h-4" />
                            </div>
                            <SkeletonBox className="w-full h-3 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

function SidebarSkeleton() {
    return (
        <aside 
            className="hidden lg:flex lg:w-64 md:w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full p-4"
            role="status"
            aria-label="Loading navigation"
        >
            <div className="w-full space-y-1">
                {Array(6).fill(0).map((_, idx) => (
                    <SkeletonBox key={idx} className="w-full h-10 rounded-lg" />
                ))}
            </div>
        </aside>
    );
}

function CVFormSkeleton() {
    return (
        <div className="space-y-6" role="status" aria-label="Loading form">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <SkeletonBox className="w-64 h-8" />
                    <SkeletonBox className="w-96 h-4" />
                </div>
                <SkeletonBox className="w-32 h-10 rounded-lg hidden sm:block" />
            </div>

            {/* Form Fields */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array(6).fill(0).map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <SkeletonBox className="w-24 h-4" />
                            <SkeletonBox className="w-full h-11 rounded-lg" />
                        </div>
                    ))}
                </div>
                
                {/* Textarea */}
                <div className="space-y-2">
                    <SkeletonBox className="w-32 h-4" />
                    <SkeletonBox className="w-full h-32 rounded-lg" />
                    <SkeletonBox className="w-20 h-3 ml-auto" />
                </div>
            </div>

            {/* Mobile Save Button */}
            <SkeletonBox className="w-full h-12 rounded-lg sm:hidden" />
        </div>
    );
}

function CVListSkeleton() {
    return (
        <div className="space-y-6" role="status" aria-label="Loading list">
            {/* Header */}
            <div className="flex items-center justify-between">
                <SkeletonBox className="w-48 h-8" />
                <SkeletonBox className="w-32 h-10 rounded-lg" />
            </div>

            {/* List Items */}
            {Array(3).fill(0).map((_, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <SkeletonBox className="w-32 h-6" />
                        <SkeletonBox className="w-8 h-8 rounded" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <SkeletonBox className="w-24 h-4" />
                                <SkeletonBox className="w-full h-10 rounded-lg" />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <SkeletonBox className="w-28 h-4" />
                        <SkeletonBox className="w-full h-24 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export {
    SkeletonBox,
    NavbarSkeleton,
    DashboardSkeleton,
    SidebarSkeleton,
    CVFormSkeleton,
    CVListSkeleton,
};
