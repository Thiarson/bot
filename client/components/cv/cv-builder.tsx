"use client";

import { useEffect, useRef, useState } from 'react';
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
    Globe,
    Upload,
    Check,
    Zap,
    ChevronDown,
} from 'lucide-react';
import { exportCV, extractCV, saveCV } from '@/lib/cv/actions';

import { DashboardSkeleton } from '@/components/boost/skeleton';
import CVTemplate from '@/components/cv/cv-template';
import CVPersonalInfo from '@/components/cv/cv-personal-info';
import CVExperience from '@/components/cv/cv-experience';
import CVEduction from '@/components/cv/cv-eduction';
import CVSkill from '@/components/cv/cv-skill';
import CVProject from '@/components/cv/cv-project';
import LoadingModal from '@/components/loading';
import NotificationContainer, { useNotification } from '@/components/notification';

import type { CVWithMetadata, CVWithTitle } from '@bot/types';
import type { PersonalInfo } from '@/components/cv/cv-personal-info';
import type { Experience } from '@/components/cv/cv-experience';
import type { Education } from '@/components/cv/cv-eduction';
import type { Skill } from '@/components/cv/cv-skill';
import type { Project } from '@/components/cv/cv-project';

function getEmptyCV() {
    const personalInfo: PersonalInfo = {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
    };
    const experiences: Experience[] = [];
    const education: Education[] = [];
    const skills: Skill[] = [];
    const projects: Project[] = [];

    return {
        title: "My Professional CV",
        personalInfo,
        experiences,
        education,
        skills,
        projects,
    };
}

function isEmptyCV(cv: CVWithTitle) {
    if (!cv.title) return true;

    return (
        !cv.personalInfo.fullName &&
        !cv.personalInfo.email &&
        !cv.personalInfo.phone &&
        !cv.personalInfo.location &&
        !cv.personalInfo.summary &&
        cv.experiences.length === 0 &&
        cv.education.length === 0 &&
        cv.skills.length === 0 &&
        cv.projects.length === 0
    );
}

function CVBuilder({ cvData }: { cvData: CVWithMetadata | null }) {
    const { status } = useSession();
    const [ activeSection, setActiveSection ] = useState<string>('templates');
    const { notifications, showNotification, closeNotification } = useNotification();
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ lastSaved, setLastSaved ] = useState<Date | null>(cvData?.lastSaved ??  null);
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
    
    useEffect(() => {
        if (!cvData) showNotification("No saved CV found", "info");    
    }, []);

    const cv = cvData ?? getEmptyCV();

    const [ cvTitle, setCvTitle ] = useState<string>(cv.title);

    const [ personalInfo, setPersonalInfo ] = useState<PersonalInfo>(cv.personalInfo);

    const [ experiences, setExperiences ] = useState<Experience[]>(cv.experiences);

    const [ education, setEducation ] = useState<Education[]>(cv.education);

    const  [ skills, setSkills ] = useState<Skill[]>(cv.skills);

    const [ projects, setProjects ] = useState<Project[]>(cv.projects);

    const [ template, setTemplate ] = useState<string>('modern');

    if (status === "loading") {
        return <DashboardSkeleton />;
    }

    const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        const fileConfig = {
            maxSize: { name: "5MB", value: (5 * 1024 * 1024) },
            supportedType: new Map<string, string>([
                ["pdf", "application/pdf"],
                ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            ]),
        }

        if (file.size > fileConfig.maxSize.value) {
            showNotification(`File size exceeds ${fileConfig.maxSize.name}.`, "warning");
            return;
        }

        if (!fileConfig.supportedType.values().toArray().includes(file.type)) {
            const supported = fileConfig.supportedType.keys().toArray().map((type) => type.toUpperCase()).join(', ');
            showNotification(`Unsupported file format. Upload ${supported} file.`, "warning");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const cv = await extractCV(formData);

            setCvTitle(file.name);
            setPersonalInfo(cv.personalInfo);
            setExperiences(cv.experiences);
            setEducation(cv.education);
            setSkills(cv.skills);
            setProjects(cv.projects);
            
            showNotification('CV imported successfully!');
        } catch (e: any) {
            showNotification(e.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        const cv: CVWithTitle = {
            title: cvTitle,
            personalInfo,
            experiences,
            education,
            skills,
            projects,
        };

        if (isEmptyCV(cv)) {
            showNotification("CV is empty. Update it before saving", "warning");
            return;
        }

        setIsSaving(true);

        try {
            const lastSave = await saveCV(cv);
            setLastSaved(lastSave);
            showNotification("CV saved successfully");
        } catch (e: any) {
            showNotification(e.message, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleExport = async (format: 'pdf' | 'html' | 'json') => {
        setIsLoading(true);

        try {
            await handleSave();
            const { data: base64, contentType } = await exportCV(template, format);

            // Convert base64 back to blob
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: contentType });

            // Trigger download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = cvTitle;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            showNotification('CV exported successfully!');
        } catch (e: any) {
            showNotification(e.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const renderActiveSection = () => {
        switch (activeSection) {
        case 'templates':
            return <CVTemplate title={cvTitle} setTitle={setCvTitle} template={template} setTemplate={setTemplate} />;
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
            return <CVTemplate title={cvTitle} setTitle={setCvTitle} template={template} setTemplate={setTemplate} />;
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
                                {lastSaved ? `Last saved ${new Date(lastSaved).toLocaleTimeString()}` : 'Unsaved changes'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
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
                                onClick={(e) => e.currentTarget.value = ''}
                                className="hidden"
                            />
                        </div>
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
                        {/* <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors border border-gray-600">
                            <Eye className="w-4 h-4" />
                            Preview
                        </button> */}
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
                                    onClick={() => handleExport('html')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    Export as HTML
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
