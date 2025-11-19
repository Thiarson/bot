import { Dispatch, SetStateAction, useState } from "react";
import { Save } from 'lucide-react';
import { Input, Textarea } from '@/components/ui';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

type PropsType = {
    info: PersonalInfo;
    setInfo: Dispatch<SetStateAction<PersonalInfo>>;
    onSave?: () => void;
};

interface ValidationErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    summary?: string;
}

function CVPersonalInfo({ info, setInfo, onSave }: PropsType) {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSaving, setIsSaving] = useState(false);

    const validateField = (name: keyof PersonalInfo, value: string): string | undefined => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Full name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return undefined;
            
            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return undefined;
            
            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    return 'Please enter a valid phone number';
                }
                return undefined;
            
            case 'website':
                if (value && !value.match(/^https?:\/\/.+/)) {
                    return 'Please enter a valid URL (starting with http:// or https://)';
                }
                return undefined;
            
            case 'linkedin':
                if (value && !value.match(/^https?:\/\/(www\.)?linkedin\.com\/.+/)) {
                    return 'Please enter a valid LinkedIn URL';
                }
                return undefined;
            
            case 'summary':
                if (!value.trim()) return 'Professional summary is required';
                if (value.length < 50) return 'Summary should be at least 50 characters';
                if (value.length > 500) return 'Summary should not exceed 500 characters';
                return undefined;
            
            default:
                return undefined;
        }
    };

    const handleChange = (field: keyof PersonalInfo, value: string) => {
        setInfo({ ...info, [field]: value });
        
        // Validate on change if field has been touched
        if (touched[field]) {
            const error = validateField(field, value);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleBlur = (field: keyof PersonalInfo) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const error = validateField(field, info[field] || '');
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const validateAll = (): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;

        (Object.keys(info) as Array<keyof PersonalInfo>).forEach(field => {
            const error = validateField(field, info[field] || '');
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        // Mark all fields as touched
        const allTouched = Object.keys(info).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        setTouched(allTouched);

        if (!validateAll()) {
            return;
        }

        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            onSave?.();
        } finally {
            setIsSaving(false);
        }
    };

    const hasErrors = Object.values(errors).some(error => error);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                        Personal Information
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Tell us about yourself. Fields marked with * are required.
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Full Name"
                        type="text"
                        value={info.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        error={touched.fullName ? errors.fullName : undefined}
                        placeholder="John Doe"
                        required
                        autoComplete="name"
                    />
                    
                    <Input
                        label="Email"
                        type="email"
                        value={info.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        error={touched.email ? errors.email : undefined}
                        placeholder="john.doe@example.com"
                        required
                        autoComplete="email"
                    />
                    
                    <Input
                        label="Phone"
                        type="tel"
                        value={info.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        error={touched.phone ? errors.phone : undefined}
                        placeholder="+1 (555) 123-4567"
                        helperText="Optional - Include country code if international"
                        autoComplete="tel"
                    />
                    
                    <Input
                        label="Location"
                        type="text"
                        value={info.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        onBlur={() => handleBlur('location')}
                        error={touched.location ? errors.location : undefined}
                        placeholder="San Francisco, CA"
                        helperText="City, State/Country"
                        autoComplete="address-level2"
                    />
                    
                    <Input
                        label="Website"
                        type="url"
                        value={info.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        onBlur={() => handleBlur('website')}
                        error={touched.website ? errors.website : undefined}
                        placeholder="https://yourwebsite.com"
                        helperText="Your personal portfolio or website"
                        autoComplete="url"
                    />
                    
                    <Input
                        label="LinkedIn"
                        type="url"
                        value={info.linkedin}
                        onChange={(e) => handleChange('linkedin', e.target.value)}
                        onBlur={() => handleBlur('linkedin')}
                        error={touched.linkedin ? errors.linkedin : undefined}
                        placeholder="https://linkedin.com/in/yourprofile"
                        helperText="Your LinkedIn profile URL"
                        autoComplete="url"
                    />
                </div>

                <Textarea
                    label="Professional Summary"
                    value={info.summary}
                    onChange={(e) => handleChange('summary', e.target.value)}
                    onBlur={() => handleBlur('summary')}
                    error={touched.summary ? errors.summary : undefined}
                    rows={5}
                    placeholder="Write a compelling summary of your professional background, key skills, and career objectives. This is your elevator pitch - make it count!"
                    required
                    maxLength={500}
                    showCount
                    helperText="Aim for 50-500 characters. Focus on your key strengths and what makes you unique."
                />
            </div>

            {/* Mobile Save Button */}
            <button
                onClick={handleSave}
                disabled={isSaving || hasErrors}
                className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                {isSaving ? (
                    <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        Save Changes
                    </>
                )}
            </button>
        </div>
    );
}

export default CVPersonalInfo;
