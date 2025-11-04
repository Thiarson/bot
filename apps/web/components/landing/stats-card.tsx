import { Star, Users, Zap } from "lucide-react";

function StatsCard() {
    return (
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>500k+ professionals</span>
            </div>
            <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.5/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>85% job success rate</span>
            </div>
        </div>
    );
}

export default StatsCard;
