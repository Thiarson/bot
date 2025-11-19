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
  Calendar as CalendarIcon,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui';

import { DashboardSkeleton } from '@/components/boost/skeleton';

function Dashboard() {
    const { data: session, status } = useSession();
    const user = session?.user;

    if (status === "loading") {
        return <DashboardSkeleton/>;
    }

    const stats = [
        { 
            label: 'Job Matches', 
            value: '127', 
            change: '+12 this week', 
            trend: 'up',
            icon: Target,
            color: 'from-blue-500 to-cyan-500'
        },
        { 
            label: 'Profile Views', 
            value: '89', 
            change: '+24 this week', 
            trend: 'up',
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-500'
        },
        { 
            label: 'Interviews', 
            value: '3', 
            change: '+1 upcoming', 
            trend: 'up',
            icon: MessageSquare,
            color: 'from-purple-500 to-pink-500'
        },
        { 
            label: 'Skills Progress', 
            value: '78%', 
            change: '+5% this month', 
            trend: 'up',
            icon: Award,
            color: 'from-orange-500 to-red-500'
        },
    ];

    const jobMatches = [
        { 
            company: 'TechCorp', 
            role: 'Senior Frontend Developer', 
            match: 95, 
            location: 'Remote',
            salary: '$120k - $160k',
            posted: '2d ago',
            logo: '🏢'
        },
        { 
            company: 'StartupX', 
            role: 'Full Stack Engineer', 
            match: 89, 
            location: 'San Francisco',
            salary: '$140k - $180k',
            posted: '1w ago',
            logo: '🚀'
        },
        { 
            company: 'InnovateLab', 
            role: 'React Developer', 
            match: 87, 
            location: 'New York',
            salary: '$100k - $140k',
            posted: '3d ago',
            logo: '💡'
        }
    ];

    const quickActions = [
        { 
            label: 'Update CV', 
            icon: FileText, 
            desc: 'Enhance your profile', 
            color: 'from-purple-500 to-blue-500',
            href: '/boost/cv'
        },
        { 
            label: 'Practice Interview', 
            icon: MessageSquare, 
            desc: 'AI-powered prep', 
            color: 'from-green-500 to-teal-500',
            href: '/boost/interview'
        },
        { 
            label: 'Skill Assessment', 
            icon: Award, 
            desc: 'Test your abilities', 
            color: 'from-orange-500 to-red-500',
            href: '/boost/skill'
        },
        { 
            label: 'Network', 
            icon: Users, 
            desc: 'Connect with pros', 
            color: 'from-pink-500 to-purple-500',
            href: '/boost/networking'
        }
    ];

    const upcomingEvents = [
        { 
            title: 'Mock Interview - Google', 
            time: 'Today, 2:00 PM', 
            type: 'interview',
            duration: '1 hour'
        },
        { 
            title: 'React Workshop', 
            time: 'Tomorrow, 10:00 AM', 
            type: 'learning',
            duration: '2 hours'
        },
        { 
            title: 'Networking Event', 
            time: 'Friday, 6:00 PM', 
            type: 'networking',
            duration: '3 hours'
        }
    ];

    const progressItems = [
        { label: 'Profile Completion', value: 85, color: 'from-purple-500 to-blue-500' },
        { label: 'JavaScript Skills', value: 92, color: 'from-green-500 to-teal-500' },
        { label: 'Interview Readiness', value: 78, color: 'from-orange-500 to-red-500' },
    ];

    const getMatchColor = (match: number) => {
        if (match >= 90) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
        if (match >= 80) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
    };

    return (
        <main className="space-y-8 py-8" role="main">
            {/* Welcome Section */}
            <section className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    Welcome back, <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">{user?.name}</span>
                    <Sparkles className="inline-block w-8 h-8 ml-2 text-yellow-500 animate-pulse" aria-hidden="true" />
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                    Let's accelerate your career today
                </p>
            </section>

            {/* Quick Stats */}
            <section aria-label="Quick statistics">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map(({ label, value, change, trend, icon: Icon, color }) => (
                        <Card 
                            key={label} 
                            className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200"
                            padding="md"
                        >
                            {/* Gradient background decoration */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full -mr-16 -mt-16`} aria-hidden="true"></div>
                            
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2.5 bg-gradient-to-br ${color} rounded-lg`}>
                                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                                    </div>
                                    <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} flex items-center gap-1`}>
                                        {trend === 'up' ? '↑' : '↓'} {change}
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    {value}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {label}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Recent Job Matches */}
                <section aria-labelledby="job-matches-heading">
                    <Card padding="md" hover>
                        <div className="flex items-center justify-between mb-6">
                            <h2 id="job-matches-heading" className="text-xl font-semibold text-gray-900 dark:text-white">
                                Latest Job Matches
                            </h2>
                            <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1">
                                View All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {jobMatches.map((job, idx) => (
                                <button
                                    key={idx}
                                    className="w-full group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer border border-transparent hover:border-purple-200 dark:hover:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-left"
                                    onClick={() => console.log('View job', job.role)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl flex-shrink-0" aria-hidden="true">
                                            {job.logo}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                                                    {job.role}
                                                </h3>
                                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {job.company} • {job.location}
                                            </p>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    {job.salary}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {job.posted}
                                                </span>
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getMatchColor(job.match)}`}>
                                                    {job.match}% match
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>
                </section>

                {/* Quick Actions */}
                <section aria-labelledby="quick-actions-heading">
                    <Card padding="md">
                        <h2 id="quick-actions-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {quickActions.map(({ label, icon: Icon, desc, color, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-left border border-transparent hover:border-purple-200 dark:hover:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                                    </div>
                                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                        {label}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {desc}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </Card>
                </section>

                {/* Upcoming Events */}
                <section aria-labelledby="events-heading">
                    <Card padding="md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 id="events-heading" className="text-xl font-semibold text-gray-900 dark:text-white">
                                Upcoming Events
                            </h2>
                            <button 
                                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                                aria-label="Add event"
                            >
                                <Plus className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {upcomingEvents.map((event, idx) => {
                                const typeColors = {
                                    interview: 'bg-red-500',
                                    learning: 'bg-blue-500',
                                    networking: 'bg-green-500'
                                };

                                return (
                                    <div 
                                        key={idx} 
                                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
                                    >
                                        <div className={`w-3 h-3 rounded-full ${typeColors[event.type as keyof typeof typeColors]} mt-1.5 flex-shrink-0`} aria-hidden="true"></div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 truncate">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <CalendarIcon className="w-3 h-3" aria-hidden="true" />
                                                    {event.time}
                                                </span>
                                                <span>•</span>
                                                <span>{event.duration}</span>
                                            </div>
                                        </div>
                                        <button 
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                                            aria-label="Event options"
                                        >
                                            <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </section>

                {/* Progress Overview */}
                <section aria-labelledby="progress-heading">
                    <Card padding="md">
                        <h2 id="progress-heading" className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                            Career Progress
                        </h2>
                        <div className="space-y-6">
                            {progressItems.map((item) => (
                                <div key={item.label}>
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            {item.label}
                                        </span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {item.value}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                        <div 
                                            className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                            style={{ width: `${item.value}%` }}
                                            role="progressbar"
                                            aria-valuenow={item.value}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${item.label}: ${item.value}%`}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;
