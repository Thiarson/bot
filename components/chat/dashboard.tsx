"use client";

import { useSession } from 'next-auth/react';
import { 
  FileText, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Plus,
  MoreHorizontal,
  Users,
} from 'lucide-react'

function Dashboard() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <main className="flex-1 p-6">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{user?.name}</span>
                </h1>
                <p className="text-gray-400">Let's accelerate your career today</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                { label: 'Job Matches', value: '127', change: '+12', icon: Target },
                { label: 'Profile Views', value: '89', change: '+24', icon: TrendingUp },
                { label: 'Interviews', value: '3', change: '+1', icon: MessageSquare },
                { label: 'Skills Progress', value: '78%', change: '+5%', icon: Award }
                ].map(({ label, value, change, icon: Icon }) => (
                    <div key={label} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                            <Icon className="w-5 h-5 text-gray-400" />
                            <span className="text-xs text-green-400">{change}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{value}</h3>
                        <p className="text-sm text-gray-400">{label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Job Matches */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Latest Job Matches</h2>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { company: 'TechCorp', role: 'Senior Frontend Developer', match: '95%', location: 'Remote' },
                            { company: 'StartupX', role: 'Full Stack Engineer', match: '89%', location: 'San Francisco' },
                            { company: 'InnovateLab', role: 'React Developer', match: '87%', location: 'New York' }
                        ].map((job, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors cursor-pointer">
                                <div>
                                    <h3 className="font-medium">{job.role}</h3>
                                    <p className="text-sm text-gray-400">{job.company} • {job.location}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-400 text-sm font-medium">{job.match}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Update CV', icon: FileText, desc: 'Enhance your profile', color: 'from-purple-500 to-blue-500' },
                            { label: 'Practice Interview', icon: MessageSquare, desc: 'AI-powered prep', color: 'from-green-500 to-teal-500' },
                            { label: 'Skill Assessment', icon: Award, desc: 'Test your abilities', color: 'from-orange-500 to-red-500' },
                            { label: 'Network', icon: Users, desc: 'Connect with pros', color: 'from-pink-500 to-purple-500' }
                        ].map(({ label, icon: Icon, desc, color }) => (
                            <button key={label} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors text-left group">
                                <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-medium text-sm">{label}</h3>
                                <p className="text-xs text-gray-400">{desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Upcoming Events</h2>
                        <button className="p-1 text-gray-400 hover:text-white">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { title: 'Mock Interview - Google', time: 'Today, 2:00 PM', type: 'interview' },
                            { title: 'React Workshop', time: 'Tomorrow, 10:00 AM', type: 'learning' },
                            { title: 'Networking Event', time: 'Friday, 6:00 PM', type: 'networking' }
                        ].map((event, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                                <div className={`w-3 h-3 rounded-full ${
                                    event.type === 'interview' ? 'bg-red-400' : 
                                    event.type === 'learning' ? 'bg-blue-400' : 'bg-green-400'
                                }`}></div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">{event.title}</h3>
                                    <p className="text-xs text-gray-400">{event.time}</p>
                                </div>
                                <button className="text-gray-400 hover:text-white">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h2 className="text-xl font-semibold mb-4">Career Progress</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Profile Completion</span>
                                <span>85%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-[85%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>JavaScript Skills</span>
                                <span>92%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full w-[92%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Interview Readiness</span>
                                <span>78%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-[78%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
