"use client";

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { logout } from "@/lib/auth/actions";
import { 
  User, 
  Bell, 
  Search, 
  Settings,
  LogOut,
  UserCircle,
  CreditCard,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

import Logo from "@/components/logo";
import { NavbarSkeleton } from '@/components/boost/skeleton';

function Navbar() {
    const { data: session, status } = useSession();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hasNotifications, setHasNotifications] = useState(true);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const user = session?.user;

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (status === "loading") {
        return <NavbarSkeleton/>;
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search functionality
        console.log('Searching for:', searchQuery);
    };

    const menuItems = [
        { 
            icon: UserCircle, 
            label: 'View Profile', 
            onClick: () => console.log('View Profile'),
            shortcut: null
        },
        { 
            icon: Settings, 
            label: 'Account Settings', 
            onClick: () => console.log('Settings'),
            shortcut: null
        },
        { 
            icon: CreditCard, 
            label: 'Billing & Plans', 
            onClick: () => console.log('Billing'),
            shortcut: null
        },
        { 
            icon: HelpCircle, 
            label: 'Help & Support', 
            onClick: () => console.log('Help'),
            // shortcut: '?'
        }
    ];

    return (
        <nav 
            className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 shadow-sm"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="flex items-center justify-between gap-4 max-w-[1800px] mx-auto">
                {/* Logo */}
                <div className="flex-shrink-0 min-w-[160px]">
                    <Logo/>
                </div>

                {/* Search */}
                <form 
                    onSubmit={handleSearch}
                    className="flex-1 max-w-2xl mx-4 hidden md:block"
                    role="search"
                >
                    <div className="relative">
                        <label htmlFor="global-search" className="sr-only">
                            Search jobs, companies, skills
                        </label>
                        <Search 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                            aria-hidden="true"
                        />
                        <input 
                            ref={searchInputRef}
                            id="global-search"
                            type="search" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search jobs, companies, skills..." 
                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-20 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            aria-label="Search"
                        />
                    </div>
                </form>

                {/* Right Menu */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Notifications */}
                    <button 
                        className="relative p-2.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        aria-label={hasNotifications ? "Notifications (new)" : "Notifications"}
                    >
                        <Bell className="w-5 h-5" aria-hidden="true" />
                        {hasNotifications && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" aria-hidden="true"></span>
                        )}
                    </button>
                    
                    {/* User Profile Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center gap-2 sm:gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 sm:px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-expanded={isUserMenuOpen}
                            aria-haspopup="true"
                            aria-label="User menu"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-white dark:ring-gray-900">
                                <User className="w-4 h-4 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-sm font-medium truncate max-w-[120px] text-gray-900 dark:text-white hidden sm:block">
                                {user?.name}
                            </span>
                            <ChevronDown 
                                className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                                aria-hidden="true"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div 
                                className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden"
                                role="menu"
                                aria-orientation="vertical"
                            >
                                {/* User Info Header */}
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-white dark:ring-gray-800">
                                            <User className="w-6 h-6 text-white" aria-hidden="true" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                                {user?.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Menu Items */}
                                <div className="py-1">
                                    {menuItems.map(({ icon: Icon, label, onClick, shortcut }) => (
                                        <button
                                            key={label}
                                            onClick={() => {
                                                onClick();
                                                setIsUserMenuOpen(false);
                                            }}
                                            className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800"
                                            role="menuitem"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                                                <span className="text-sm">{label}</span>
                                            </div>
                                            {shortcut && (
                                                <kbd className="px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                                                    {shortcut}
                                                </kbd>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Sign Out */}
                                <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsUserMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:bg-red-50 dark:focus:bg-red-900/20"
                                        role="menuitem"
                                    >
                                        <LogOut className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                                        <span className="text-sm font-medium">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            <form 
                onSubmit={handleSearch}
                className="mt-3 md:hidden"
                role="search"
            >
                <div className="relative">
                    <label htmlFor="mobile-search" className="sr-only">
                        Search jobs, companies, skills
                    </label>
                    <Search 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                        aria-hidden="true"
                    />
                    <input 
                        id="mobile-search"
                        type="search" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..." 
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                </div>
            </form>
        </nav>
    );
}

export default Navbar;
