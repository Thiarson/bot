"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  Briefcase,
  Users,
  BookOpen,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { SidebarSkeleton } from "@/components/boost/skeleton";

function Sidebar() {
    const { status } = useSession();
    const pathname = usePathname();
    const activeTab = pathname?.split('/')[2] || 'dashboard';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigationItems = [
        { id: 'dashboard', icon: TrendingUp, label: 'Dashboard', href: '/boost/dashboard', badge: null },
        { id: 'cv', icon: FileText, label: 'CV Builder', href: '/boost/cv', badge: null },
        { id: 'job', icon: Briefcase, label: 'Job Matching', href: '/boost/job', badge: '127' },
        // { id: 'skill', icon: BookOpen, label: 'Skill Development', href: '/boost/skill', badge: null },
        // { id: 'interview', icon: MessageSquare, label: 'Interview Prep', href: '/boost/interview', badge: '3' },
        // { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/boost/calendar', badge: null },
        // { id: 'networking', icon: Users, label: 'Networking', href: '/boost/networking', badge: null },
        { id: 'setting', icon: Settings, label: 'Settings', href: '/boost/setting', badge: null }
    ];

    if (status === "loading") {
        return <SidebarSkeleton/>;
    }

    const NavLinks = ({ mobile = false }) => (
        <nav className="space-y-2 py-2" role="navigation" aria-label="Sidebar navigation">
            {navigationItems.map(({ id, icon: Icon, label, href, badge }) => {
                const isActive = activeTab === id;
                
                return (
                    <Link
                        href={href}
                        key={id}
                        onClick={() => mobile && setIsMobileMenuOpen(false)}
                        className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                            isActive 
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' 
                                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <Icon 
                            className="w-5 h-5 flex-shrink-0" 
                            aria-hidden="true"
                        />
                        <span className={`${mobile ? 'block' : 'lg:block md:hidden'} truncate`}>
                            {label}
                        </span>
                        
                        {badge && (
                            <span 
                                className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full ${
                                    isActive 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                } ${mobile ? 'inline-flex' : 'lg:inline-flex md:hidden'}`}
                                aria-label={`${badge} items`}
                            >
                                {badge}
                            </span>
                        )}
                        
                        {/* Tooltip for collapsed state */}
                        {!mobile && (
                            <div 
                                className="absolute left-full ml-4 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 lg:hidden pointer-events-none shadow-lg"
                                role="tooltip"
                            >
                                {label}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-gray-900 dark:border-r-gray-800"></div>
                            </div>
                        )}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                    <Menu className="w-6 h-6" aria-hidden="true" />
                )}
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Desktop Sidebar */}
            <aside 
                className="hidden lg:flex lg:w-64 md:w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full p-4 transition-all duration-300"
                aria-label="Sidebar"
            >
                <div className="w-full">
                    <NavLinks />
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <aside 
                className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 z-40 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                aria-label="Mobile sidebar"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Navigation
                    </h2>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
                <NavLinks mobile />
            </aside>
        </>
    );
}

export default Sidebar;
