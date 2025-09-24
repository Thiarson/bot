"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown, Menu, Play, Star, Users, X, Zap } from "lucide-react";

function LandingPage() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-900/20 to-transparent rounded-full"></div>
            </div>

            {/* Header */}
            <header className="relative z-50 px-6 py-4">
                <nav className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">Catalyst</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                                <span>Features</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                                <span>Company</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                                <span>Support</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-300 hover:text-white transition-colors">Login</button>
                        <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
                            Sign up
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </nav>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800">
                        <div className="px-6 py-4 space-y-4">
                            <a href="#" className="block text-gray-300 hover:text-white">Features</a>
                            <a href="#" className="block text-gray-300 hover:text-white">Company</a>
                            <a href="#" className="block text-gray-300 hover:text-white">Support</a>
                            <a href="#" className="block text-gray-300 hover:text-white">Pricing</a>
                            <hr className="border-gray-800" />
                            <a href="#" className="block text-gray-300 hover:text-white">Login</a>
                            <button className="w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
                                Sign up
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="px-6 pt-20 pb-32">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Animated badge */}
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                AI Accelerate your career with Catalyst
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
                                <span>4.9/5 rating</span>
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

export default LandingPage;
