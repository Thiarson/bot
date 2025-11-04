"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import Logo from "@/components/logo";

function NavItem({ children }: React.PropsWithChildren) {
    return (
        <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors cursor-pointer">
                <span>{children}</span>
                <ChevronDown className="w-4 h-4" />
            </button>
        </div>
    );
}

function MobileNavItem({ children }: React.PropsWithChildren) {
    return (
        <a href="#" className="block text-gray-300 hover:text-white">{children}</a>
    );
}

function LandingNavbar() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    const navItems = [
        { title: "Features", link: "#" },
        { title: "Company", link: "#" },
        { title: "Support", link: "#" },
    ];

    return (
        <header className="relative z-50 px-6 py-4">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
                <Logo/>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item, idx) => <NavItem key={idx}>{item.title}</NavItem>)}
                    <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</a>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        href="/login"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                        Login
                    </Link>
                    <Link 
                        href="/signup"
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-80 transition-opacity font-medium"
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
                        <MobileNavItem>Features</MobileNavItem>
                        <MobileNavItem>Company</MobileNavItem>
                        <MobileNavItem>Support</MobileNavItem>
                        <MobileNavItem>Pricing</MobileNavItem>
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
