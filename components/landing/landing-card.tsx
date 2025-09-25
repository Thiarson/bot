import { ArrowRight, ChevronDown, Play, Zap } from "lucide-react";

import Badge from "@/components/landing/badge";
import StatsCard from "@/components/landing/stats-card";

function LandingCard() {
    return (
        <div className="max-w-4xl mx-auto text-center">
            {/* Animated badge */}
            <Badge/>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Meet Boost,
                <br />
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    The Future of 
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                    Your Career
                </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                AI-powered career acceleration. Perfect your CV, ace interviews, and land your dream job. 
                Your professional breakthrough starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button className="group px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold flex items-center space-x-2 shadow-lg">
                    <span>Try for free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-400 rounded-xl transition-all transform hover:scale-105 font-semibold flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Watch Demo</span>
                </button>
            </div>

            {/* Stats */}
            <StatsCard/>
        </div>
    );
}

export default LandingCard;
