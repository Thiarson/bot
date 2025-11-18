import { 
  Plus, 
  Trash2,
} from 'lucide-react';

import type { Dispatch, SetStateAction } from "react";

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'technical' | 'soft' | 'language';
}

type PropsType = {
    skills: Skill[]
    setSkills: Dispatch<SetStateAction<Skill[]>>
}

function CVSkill({ skills, setSkills }: PropsType) {
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);

      return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills</h2>
                <button
                    onClick={() => {
                        const newSkill: Skill = {
                            id: Date.now().toString(),
                            name: '',
                            level: 50,
                            category: 'technical'
                        };
                        setSkills([...skills, newSkill]);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Skill
                </button>
            </div>

            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 capitalize">{category} Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categorySkills.map((skill) => (
                            <div key={skill.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1 mr-4">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => {
                                                setSkills(skills.map(s => 
                                                    s.id === skill.id ? { ...s, name: e.target.value } : s
                                                ));
                                            }}
                                            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Skill name"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setSkills(skills.filter(s => s.id !== skill.id))}
                                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            
                                <div>
                                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
                                        <span>Proficiency Level</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={skill.level}
                                        onChange={(e) => {
                                            setSkills(skills.map(s => 
                                                s.id === skill.id ? { ...s, level: parseInt(e.target.value) } : s
                                            ));
                                        }}
                                        className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                </div>

                                <div className="mt-3">
                                    <select
                                        value={skill.category}
                                        onChange={(e) => {
                                            setSkills(skills.map(s => 
                                                s.id === skill.id ? { ...s, category: e.target.value as Skill['category'] } : s
                                            ));
                                        }}
                                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="technical">Technical</option>
                                        <option value="soft">Soft Skills</option>
                                        <option value="language">Language</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CVSkill;
