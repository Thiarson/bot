import { Zap } from "lucide-react";

function Badge() {
    return (
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 dark:from-purple-500/20 dark:to-blue-500/20 border border-purple-500/30 dark:border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                AI accelerate your career with Boost
            </span>
        </div>
    );
}

export default Badge;
