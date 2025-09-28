import { 
  Plus, 
  Trash2,
  X,
} from 'lucide-react';

import type { Dispatch, SetStateAction } from 'react';

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
  achievements: string[];
}

type PropsType = {
    experiences: Experience[]
    setExperiences: Dispatch<SetStateAction<Experience[]>>
}

function CVExperience({ experiences, setExperiences }: PropsType) {
    const addExperience = () => {
        const newExp: Experience = {
        id: Date.now().toString(),
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
        achievements: []
        };
        setExperiences([...experiences, newExp]);
    };

    const updateExperience = (id: string, field: keyof Experience, value: string | boolean | string[]) => {
        setExperiences(experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const removeExperience = (id: string) => {
        setExperiences(experiences.filter(exp => exp.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Work Experience</h2>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Experience
                </button>
            </div>
            
            {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-white">Experience {index + 1}</h3>
                        <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                            <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Senior Frontend Developer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="TechCorp"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                            <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Remote"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date *</label>
                                <input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                                <input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                    disabled={exp.current}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                                />
                            </div>
                        </div>
                    </div>
                
                    <div className="mb-4">
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                        <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                        />
                            Currently working here
                        </label>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                        <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            placeholder="Describe your responsibilities and key contributions..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Key Achievements</label>
                        <div className="space-y-2">
                            {exp.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={achievement}
                                        onChange={(e) => {
                                            const newAchievements = [...exp.achievements];
                                            newAchievements[idx] = e.target.value;
                                            updateExperience(exp.id, 'achievements', newAchievements);
                                        }}
                                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Increased user engagement by 40%"
                                    />
                                    <button
                                        onClick={() => {
                                            const newAchievements = exp.achievements.filter((_, i) => i !== idx);
                                            updateExperience(exp.id, 'achievements', newAchievements);
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                const newAchievements = [...exp.achievements, ''];
                                    updateExperience(exp.id, 'achievements', newAchievements);
                                }}
                                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Achievement
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CVExperience;
