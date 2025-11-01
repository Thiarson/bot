import { Dispatch, SetStateAction } from 'react';
import { 
    Plus, 
    Trash2,
    X,
} from 'lucide-react';

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    duration: string;
}

type PropsType = {
    projects: Project[]
    setProjects: Dispatch<SetStateAction<Project[]>>
}

function CVProject({ projects, setProjects }: PropsType) {
    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            name: '',
            description: '',
            technologies: [],
            url: '',
            duration: ''
        };

        setProjects([ ...projects, newProject ]);
    };

    const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
        setProjects(projects.map(project => 
            project.id === id ? { ...project, [field]: value } : project
        ));
    };
    
    const removeProject = (id: string) => {
        setProjects(projects.filter(project => project.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Projects</h2>
                <button
                    onClick={addProject}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </button>
            </div>
            
            {projects.map((project, index) => (
                <div key={project.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-white">Project {index + 1}</h3>
                        <button
                            onClick={() => removeProject(project.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="E-commerce Platform"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                            <input
                                type="text"
                                value={project.duration}
                                onChange={(e) => updateProject(project.id, 'duration', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="3 months"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Project URL</label>
                        <input
                            type="url"
                            value={project.url}
                            onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="https://github.com/username/project"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                        <textarea
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            placeholder="Describe your project, its purpose, and key features..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                                >
                                    {tech}
                                    <button
                                        onClick={() => {
                                            const newTechnologies = project.technologies.filter((_, i) => i !== idx);
                                            updateProject(project.id, 'technologies', newTechnologies);
                                        }}
                                        className="text-purple-400 hover:text-purple-300"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                            <input
                                type="text"
                                placeholder="Add technology (press Enter)"
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                        const newTechnologies = [...project.technologies, e.currentTarget.value.trim()];
                                        updateProject(project.id, 'technologies', newTechnologies);
                                        e.currentTarget.value = '';
                                    }
                                }}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CVProject;
