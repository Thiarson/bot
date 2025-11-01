"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import Logo from "@/components/logo";

function LandingNavbar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    return (
        <header className="relative z-50 px-6 py-4">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
                <Logo/>

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
                    <Link
                        href="/login"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Login
                    </Link>
                    <Link 
                        href="/signup"
                        className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Sign up
                    </Link>
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
                        <Link
                            href="/login"
                            className="block text-gray-300 hover:text-white"
                        >
                            Login
                        </Link>
                        <button className="w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
                            <Link href="/signup">Sign up</Link>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default LandingNavbar;
