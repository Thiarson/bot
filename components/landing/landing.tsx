import { ArrowRight, ChevronDown, Play, Star, Users, Zap } from "lucide-react";

import AnimatedBackground from "@/components/background";
import LandingNavbar from "@/components/landing/navbar";

function Landing() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated background elements */}
            <AnimatedBackground/>

            {/* Header */}
            <LandingNavbar/>

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="px-6 pt-20 pb-32">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Animated badge */}
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                AI accelerate your career with Catalyst
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Meet Catalyst,
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
                        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
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
                    </div>
                </section>
            </main>

            {/* Floating scroll indicator */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
        </div>
    );
}

export default Landing;
