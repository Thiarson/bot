import { useState } from 'react';
import { 
  Plus, 
  Trash2,
  GripVertical,
  Briefcase,
} from 'lucide-react';
import { Button, Input, Textarea, Badge, ConfirmDialog, EmptyState } from '@/components/ui';

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
    experiences: Experience[];
    setExperiences: Dispatch<SetStateAction<Experience[]>>;
};

function CVExperience({ experiences, setExperiences }: PropsType) {
    const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string | null }>({ 
        show: false, 
        id: null 
    });
    const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
    const [touched, setTouched] = useState<Record<string, Record<string, boolean>>>({});

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

    const validateField = (id: string, field: string, value: string | boolean): string | undefined => {
        if (field === 'position' && typeof value === 'string' && !value.trim()) {
            return 'Position is required';
        }
        if (field === 'company' && typeof value === 'string' && !value.trim()) {
            return 'Company name is required';
        }
        if (field === 'startDate' && typeof value === 'string' && !value.trim()) {
            return 'Start date is required';
        }
        if (field === 'description' && typeof value === 'string') {
            if (!value.trim()) return 'Description is required';
            if (value.length < 50) return 'Description should be at least 50 characters';
        }
        return undefined;
    };

    const updateExperience = (id: string, field: keyof Experience, value: string | boolean | string[]) => {
        setExperiences(experiences.map(exp => {
            if (exp.id === id) {
                // If setting current to true, clear end date
                if (field === 'current' && value === true) {
                    return { ...exp, current: true, endDate: '' };
                }
                return { ...exp, [field]: value };
            }
            return exp;
        }));

        // Validate on change if field has been touched
        if (touched[id]?.[field] && typeof value !== 'boolean' && !Array.isArray(value)) {
            const error = validateField(id, field, value);
            setErrors(prev => ({
                ...prev,
                [id]: { ...prev[id], [field]: error || '' }
            }));
        }
    };

    const handleBlur = (id: string, field: string, value: string) => {
        setTouched(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: true }
        }));
        
        const error = validateField(id, field, value);
        if (error) {
            setErrors(prev => ({
                ...prev,
                [id]: { ...prev[id], [field]: error }
            }));
        }
    };

    const removeExperience = (id: string) => {
        setExperiences(experiences.filter(exp => exp.id !== id));
        setDeleteConfirm({ show: false, id: null });
        // Clean up error and touched state
        const newErrors = { ...errors };
        const newTouched = { ...touched };
        delete newErrors[id];
        delete newTouched[id];
        setErrors(newErrors);
        setTouched(newTouched);
    };

    const addAchievement = (id: string) => {
        const exp = experiences.find(e => e.id === id);
        if (exp) {
            updateExperience(id, 'achievements', [...exp.achievements, '']);
        }
    };

    const updateAchievement = (expId: string, index: number, value: string) => {
        const exp = experiences.find(e => e.id === expId);
        if (exp) {
            const newAchievements = [...exp.achievements];
            newAchievements[index] = value;
            updateExperience(expId, 'achievements', newAchievements);
        }
    };

    const removeAchievement = (expId: string, index: number) => {
        const exp = experiences.find(e => e.id === expId);
        if (exp) {
            const newAchievements = exp.achievements.filter((_, i) => i !== index);
            updateExperience(expId, 'achievements', newAchievements);
        }
    };

    if (experiences.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                            Work Experience
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showcase your professional journey and achievements
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
                    <EmptyState
                        icon={<Briefcase className="w-full h-full" />}
                        title="No work experience added yet"
                        description="Start building your professional profile by adding your work experience. Include your responsibilities and key achievements."
                        action={{
                            label: 'Add First Experience',
                            onClick: addExperience
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                            Work Experience
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showcase your professional journey ({experiences.length} {experiences.length === 1 ? 'entry' : 'entries'})
                        </p>
                    </div>
                    <Button
                        onClick={addExperience}
                        variant="primary"
                        size="md"
                        icon={<Plus className="w-4 h-4" />}
                        className="hidden sm:flex"
                    >
                        Add Experience
                    </Button>
                </div>
                
                {experiences.map((exp, index) => (
                    <div 
                        key={exp.id} 
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-purple-200 dark:hover:border-purple-800 transition-colors group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <button 
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-move opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                                    aria-label="Drag to reorder"
                                >
                                    <GripVertical className="w-5 h-5" />
                                </button>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        Experience {index + 1}
                                        {exp.current && (
                                            <Badge variant="success" size="sm">Current</Badge>
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {exp.position || 'Position'} at {exp.company || 'Company'}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setDeleteConfirm({ show: true, id: exp.id })}
                                variant="ghost"
                                size="sm"
                                icon={<Trash2 className="w-4 h-4" />}
                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                                aria-label={`Delete experience ${index + 1}`}
                            >
                                <span className="hidden sm:inline">Delete</span>
                            </Button>
                        </div>
                    
                        {/* Form Fields */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Position"
                                    type="text"
                                    value={exp.position}
                                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                    onBlur={(e) => handleBlur(exp.id, 'position', e.target.value)}
                                    error={touched[exp.id]?.position ? errors[exp.id]?.position : undefined}
                                    placeholder="Senior Frontend Developer"
                                    required
                                />
                                
                                <Input
                                    label="Company"
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                    onBlur={(e) => handleBlur(exp.id, 'company', e.target.value)}
                                    error={touched[exp.id]?.company ? errors[exp.id]?.company : undefined}
                                    placeholder="TechCorp"
                                    required
                                />
                                
                                <Input
                                    label="Location"
                                    type="text"
                                    value={exp.location}
                                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                    placeholder="Remote / San Francisco, CA"
                                    helperText="City, State or Remote"
                                />
                                
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Start Date"
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                            onBlur={(e) => handleBlur(exp.id, 'startDate', e.target.value)}
                                            error={touched[exp.id]?.startDate ? errors[exp.id]?.startDate : undefined}
                                            required
                                        />
                                        
                                        <Input
                                            label="End Date"
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                            disabled={exp.current}
                                        />
                                    </div>
                                    
                                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={exp.current}
                                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                            className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-purple-600 focus:ring-purple-500 focus:ring-2"
                                        />
                                        Currently working here
                                    </label>
                                </div>
                            </div>
                            
                            <Textarea
                                label="Description"
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                onBlur={(e) => handleBlur(exp.id, 'description', e.target.value)}
                                error={touched[exp.id]?.description ? errors[exp.id]?.description : undefined}
                                rows={4}
                                placeholder="Describe your responsibilities, the technologies you worked with, and the impact you made..."
                                helperText="Focus on your key responsibilities and contributions. Minimum 50 characters."
                                required
                                maxLength={500}
                                showCount
                            />

                            {/* Achievements */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Key Achievements
                                    </label>
                                    <Button
                                        onClick={() => addAchievement(exp.id)}
                                        variant="ghost"
                                        size="sm"
                                        icon={<Plus className="w-4 h-4" />}
                                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                                    >
                                        Add Achievement
                                    </Button>
                                </div>
                                
                                {exp.achievements.length === 0 ? (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                        No achievements added yet. Click "Add Achievement" to highlight your accomplishments.
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {exp.achievements.map((achievement, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <span className="text-purple-500 dark:text-purple-400 mt-3 flex-shrink-0">•</span>
                                                <Input
                                                    type="text"
                                                    value={achievement}
                                                    onChange={(e) => updateAchievement(exp.id, idx, e.target.value)}
                                                    placeholder="Increased user engagement by 40% through UI redesign"
                                                    className="flex-1"
                                                />
                                                <Button
                                                    onClick={() => removeAchievement(exp.id, idx)}
                                                    variant="ghost"
                                                    size="sm"
                                                    icon={<Trash2 className="w-4 h-4" />}
                                                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 mt-1.5 flex-shrink-0"
                                                    aria-label={`Remove achievement ${idx + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Mobile Add Button */}
                <Button
                    onClick={addExperience}
                    variant="primary"
                    size="md"
                    icon={<Plus className="w-5 h-5" />}
                    className="w-full sm:hidden"
                >
                    Add Experience
                </Button>
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteConfirm.show}
                onClose={() => setDeleteConfirm({ show: false, id: null })}
                onConfirm={() => deleteConfirm.id && removeExperience(deleteConfirm.id)}
                title="Delete Work Experience?"
                description="Are you sure you want to delete this work experience? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />
        </>
    );
}

export default CVExperience;
