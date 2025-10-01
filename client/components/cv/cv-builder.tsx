"use client";

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { 
    User, 
    Briefcase, 
    GraduationCap, 
    Code, 
    Download,
    Eye,
    Save,
    FileText,
    Upload,
    Check,
    Zap,
    ChevronDown,
} from 'lucide-react';
import { parseCV } from '@/lib/cv/actions';

import { DashboardSkeleton } from '@/components/boost/skeleton';
import CVTemplate from '@/components/cv/cv-template';
import CVPersonalInfo, { PersonalInfo } from '@/components/cv/cv-personal-info';
import CVExperience, { Experience } from '@/components/cv/cv-experience';
import CVEduction, { Education } from '@/components/cv/cv-eduction';
import CVSkill, { Skill } from '@/components/cv/cv-skill';
import CVProject, { Project } from '@/components/cv/cv-project';
import LoadingModal from '../loading';
import NotificationContainer, { useNotification } from '../notification';

function CVBuilder() {
    const { status } = useSession();
    const [ activeSection, setActiveSection ] = useState<string>('templates');
    const { notifications, showNotification, closeNotification } = useNotification();
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ lastSaved, setLastSaved ] = useState<Date | null>(null);
    const [ isSaving, setIsSaving ] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sidebarItems = [
        { id: 'templates', label: 'Templates', icon: FileText },
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'projects', label: 'Projects', icon: Zap },
    ];

    const [ cvTitle, setCvTitle ] = useState<string>('My Professional CV');

    const [ personalInfo, setPersonalInfo ] = useState<PersonalInfo>({
        fullName: 'Thiarson Antsa',
        email: 'admin@boost.ai',
        phone: '',
        location: 'Antananarivo, Madagascar',
        website: '',
        linkedin: '',
        summary: 'Passionate professional with expertise in modern technologies and a strong focus on creating innovative solutions that drive business growth and user satisfaction.'
    });

    const [ experiences, setExperiences ] = useState<Experience[]>([
        {
            id: '1',
            position: 'Senior Frontend Developer',
            company: 'TechCorp',
            location: 'Remote',
            startDate: '2023-01',
            endDate: '',
            description: 'Led frontend development team, implemented modern React applications with TypeScript, and improved user experience across multiple products.',
            current: true,
            achievements: [
                'Increased user engagement by 40% through UI/UX improvements',
                'Reduced page load time by 60% through code optimization',
                'Led a team of 5 developers on critical projects'
            ]
        }
    ]);

    const [ education, setEducation ] = useState<Education[]>([
        {
            id: '1',
            degree: 'Bachelor of Computer Science',
            institution: 'University of Antananarivo',
            location: 'Antananarivo, MG',
            graduationDate: '2022-06',
            gpa: '3.8',
            relevant_courses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems']
        }
    ]);

    const  [ skills, setSkills ] = useState<Skill[]>([
        { id: '1', name: 'JavaScript', level: 92, category: 'technical' },
        { id: '2', name: 'React', level: 89, category: 'technical' },
        { id: '3', name: 'TypeScript', level: 85, category: 'technical' },
        { id: '4', name: 'Node.js', level: 78, category: 'technical' },
        { id: '5', name: 'Leadership', level: 85, category: 'soft' },
        { id: '6', name: 'French', level: 95, category: 'language' },
        { id: '7', name: 'English', level: 90, category: 'language' }
    ]);

    const [ projects, setProjects ] = useState<Project[]>([
        {
            id: '1',
            name: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution with modern payment integration and real-time inventory management.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            url: 'https://github.com/username/ecommerce',
            duration: '3 months'
        }
    ]);

    if (status === "loading") {
        return <DashboardSkeleton />;
    }

    const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > (5 * 1024 *  1024)) {
            showNotification("File size exceeds 5MB.", "warning");
            return;
        }

        if (
            file.type !== 'application/pdf' &&
            file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            showNotification("Unsupported file format. Upload a PDF or DOCX file.", "warning");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const data = await parseCV(formData);

            showNotification('CV imported successfully!');
        } catch (e) {
            showNotification("Failed to import CV. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
        setLastSaved(new Date());
        setIsSaving(false);
        }, 1000);
    };

    const handleExport = (format: 'pdf' | 'word' | 'json') => {
        console.log(`Exporting CV as ${format}`);
        // Export logic here
    };

    const renderActiveSection = () => {
        switch (activeSection) {
        case 'templates':
            return <CVTemplate title={cvTitle} setTitle={setCvTitle} />;
        case 'personal':
            return <CVPersonalInfo info={personalInfo} setInfo={setPersonalInfo}/>;
        case 'experience':
            return <CVExperience experiences={experiences} setExperiences={setExperiences} />;
        case 'education':
            return <CVEduction educations={education} setEducations={setEducation} />;
        case 'skills':
            return <CVSkill skills={skills} setSkills={setSkills} />;
        case 'projects':
            return <CVProject projects={projects} setProjects={setProjects} />;
        default:
            return <CVTemplate title={cvTitle} setTitle={setCvTitle} />;
        }
    };

    return (
        <div className="py-6">
            {/* Header */}
            <div className="bg-black border-b border-gray-800 px-6 py-4 mb-6 -mx-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-white">{cvTitle}</h1>
                            <p className="text-sm text-gray-400">
                                {lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : 'Unsaved changes'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors border border-gray-600">
                            <Eye className="w-4 h-4" />
                            Preview
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save
                                </>
                            )}
                        </button>
                        <div className="relative group">
                            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <Download className="w-4 h-4" />
                                Export
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <button
                                    onClick={() => handleExport('pdf')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    <FileText className="w-4 h-4" />
                                    Export as PDF
                                </button>
                                <button
                                    onClick={() => handleExport('word')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    <FileText className="w-4 h-4" />
                                    Export as Word
                                </button>
                                <button
                                    onClick={() => handleExport('json')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    <Code className="w-4 h-4" />
                                    Export as JSON
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors border border-gray-600"
                            >
                                <Upload className="w-4 h-4" />
                                Import CV
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.json"
                                onChange={handleFileImport}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                        {renderActiveSection()}
                    </div>
                </div>

                {/* Progress Sidebar */}
                <div className="w-80 flex-shrink-0">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-medium text-white mb-4">CV Progress</h3>
                        <div className="space-y-3">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                const isCompleted = activeSection === item.id; // Simplified for demo
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                                            activeSection === item.id
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        {isCompleted && (
                                            <Check className="w-4 h-4 text-green-400" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-white mb-4">CV Statistics</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Completion</span>
                                <span className="text-white font-medium">75%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Sections</span>
                                <span className="text-white font-medium">4/6</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Skills</span>
                                <span className="text-white font-medium">{skills.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Experience</span>
                                <span className="text-white font-medium">{experiences.length} positions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LoadingModal message='Importing CV data' isLoading={isLoading} />
            <NotificationContainer notifications={notifications} onClose={closeNotification} />

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                    cursor: pointer;
                }
                
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                    cursor: pointer;
                    border: none;
                }
            `}</style>
        </div>
    );
};

export default CVBuilder;
