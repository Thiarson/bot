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
import { NavbarSkeleton } from '@/components/chat/skeleton';

function ChatNavbar() {
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
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <Logo/>

                {/* Search */}
                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search jobs, companies, skills..." 
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>
                    
                    {/* User Profile Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center space-x-2 bg-gray-900 rounded-lg p-2 hover:bg-gray-800 transition-colors"
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm">{user?.name}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                                <div className="p-3 border-b border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{user?.name}</p>
                                            <p className="text-sm text-gray-400">{user?.email}</p>
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
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{label}</span>
                                    </button>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-700 py-2">
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-400 hover:bg-gray-800 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm">Sign Out</span>
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

export default ChatNavbar
