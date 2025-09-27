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
} from 'lucide-react'

import Logo from "@/components/logo";
import { NavbarSkeleton } from '@/components/boost/skeleton';

function Navbar() {
    const { data: session, status } = useSession();
    const [ isUserMenuOpen, setIsUserMenuOpen ] = useState(false)
    const userMenuRef = useRef<HTMLDivElement>(null)

    const user = session?.user;

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    if (status === "loading") {
        return <NavbarSkeleton/>;
    }

    return (
        <header className="bg-black border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-around w-full">
                {/* Logo */}
                <div className="flex-shrink-0 min-w-[200px]">
                    <Logo/>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-xl mx-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search jobs, companies, skills..." 
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-12 pr-6 py-3 text-base focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-6 min-w-[250px] justify-end">
                    <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                        <Bell className="w-6 h-6" />
                    </button>
                    
                    {/* User Profile Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center space-x-3 bg-gray-900 rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors min-w-[160px]"
                        >
                            <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-base font-medium truncate">{user?.name}</span>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                                <div className="p-4 border-b border-gray-700">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-white text-base truncate">{user?.name}</p>
                                            <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="py-2">
                                    {[
                                        { icon: UserCircle, label: 'View Profile', onClick: () => console.log('View Profile') },
                                        { icon: Settings, label: 'Account Settings', onClick: () => console.log('Settings') },
                                        { icon: CreditCard, label: 'Billing & Plans', onClick: () => console.log('Billing') },
                                        { icon: HelpCircle, label: 'Help & Support', onClick: () => console.log('Help') }
                                    ].map(({ icon: Icon, label, onClick }) => (
                                    <button
                                        key={label}
                                        onClick={onClick}
                                        className="w-full flex items-center space-x-4 px-5 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-base">{label}</span>
                                    </button>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-700 py-2">
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center space-x-4 px-5 py-3 text-left text-red-400 hover:bg-gray-800 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-base">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
