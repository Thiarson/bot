"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

function Sidebar() {
    const { status } = useSession();
    const pathname = usePathname();
    const activeTab = pathname.split('/')[2] || 'dashboard';

    if (status === "loading") {
        return <SidebarSkeleton/>;
    }

    return (
        <aside className="w-80 lg:w-72 md:w-20 sm:w-16 bg-black border-r border-gray-800 h-full p-8 md:p-6 sm:p-2 transition-all duration-300">
            <nav className="space-y-3 md:space-y-2">
                {[
                    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard', href: '/boost/dashboard' },
                    { id: 'cv', icon: FileText, label: 'CV Builder', href: '/boost/cv' },
                    { id: 'job', icon: Briefcase, label: 'Job Matching', href: '/boost/job' },
                    // { id: 'skill', icon: BookOpen, label: 'Skill Development', href: '/boost/skill' },
                    // { id: 'interview', icon: MessageSquare, label: 'Interview Prep', href: '/boost/interview' },
                    // { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/boost/calendar' },
                    // { id: 'networking', icon: Users, label: 'Networking', href: '/boost/networking' },
                    { id: 'setting', icon: Settings, label: 'Settings', href: '/boost/setting' }
                ].map(({ id, icon: Icon, label, href }) => (
                    <Link
                        href={href}
                        key={id}
                        className={`group relative w-full flex items-center justify-center md:justify-start space-x-4 md:space-x-3 px-4 md:px-2 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === id 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                        title={label} // Tooltip for collapsed state
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-base font-medium lg:block md:hidden transition-opacity duration-200">
                            {label}
                        </span>
                        
                        {/* Tooltip for medium screens and below */}
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 lg:hidden">
                            {label}
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
