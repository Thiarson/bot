"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  Briefcase,
  Users,
  BookOpen,
  Settings,
} from 'lucide-react'
import { SidebarSkeleton } from "./skeleton";
import Link from "next/link";

function Sidebar() {
    const [ activeTab, setActiveTab ] = useState('dashboard')
    const { status } = useSession();

    if (status === "loading") {
        return <SidebarSkeleton/>;
    }

    return (
        <aside className="w-64 bg-black border-r border-gray-800 min-h-screen p-6">
            <nav className="space-y-2">
                {[
                    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard', href: '/boost/dashboard' },
                    { id: 'cv', icon: FileText, label: 'CV Builder', href: '/boost/cv' },
                    { id: 'jobs', icon: Briefcase, label: 'Job Matching', href: '/boost/job' },
                    // { id: 'skills', icon: BookOpen, label: 'Skill Development', href: '/boost/skill' },
                    // { id: 'interview', icon: MessageSquare, label: 'Interview Prep', href: '/boost/interview' },
                    // { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/boost/calendar' },
                    // { id: 'networking', icon: Users, label: 'Networking', href: '/boost/networking' },
                    { id: 'settings', icon: Settings, label: 'Settings', href: '/boost/setting' }
                ].map(({ id, icon: Icon, label, href }) => (
                    <Link
                        href={href}
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === id 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
