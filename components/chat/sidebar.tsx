"use client";

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
} from 'lucide-react'

function ChatSidebar() {
    const [ activeTab, setActiveTab ] = useState('dashboard')

    return (
        <aside className="w-64 bg-black border-r border-gray-800 min-h-screen p-6">
            <nav className="space-y-2">
                {[
                    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
                    { id: 'jobs', icon: Briefcase, label: 'Job Matching' },
                    { id: 'cv', icon: FileText, label: 'CV Builder' },
                    { id: 'interview', icon: MessageSquare, label: 'Interview Prep' },
                    { id: 'networking', icon: Users, label: 'Networking' },
                    { id: 'skills', icon: BookOpen, label: 'Skill Development' },
                    { id: 'calendar', icon: Calendar, label: 'Calendar' },
                    { id: 'settings', icon: Settings, label: 'Settings' }
                ].map(({ id, icon: Icon, label }) => (
                    <button
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
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default ChatSidebar;
