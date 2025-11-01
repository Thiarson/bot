import { Dispatch, SetStateAction } from "react";
import { 
  Plus, 
  Trash2,
  X,
} from 'lucide-react';

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  relevant_courses?: string[];
}

type PropsType = {
    educations: Education[]
    setEducations: Dispatch<SetStateAction<Education[]>>
}

function CVEduction({ educations, setEducations }: PropsType) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Education</h2>
                <button
                    onClick={() => {
                        const newEdu: Education = {
                        id: Date.now().toString(),
                        degree: '',
                        institution: '',
                        location: '',
                        graduationDate: '',
                        gpa: '',
                        relevant_courses: []
                        };
                        setEducations([...educations, newEdu]);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Education
                </button>
            </div>
        
            {educations.map((edu, index) => (
                <div key={edu.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-white">Education {index + 1}</h3>
                        <button
                            onClick={() => setEducations(educations.filter(e => e.id !== edu.id))}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Degree *</label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(event) => {
                                    setEducations(educations.map(e => 
                                        e.id === edu.id ? { ...e, degree: event.target.value } : e
                                    ));
                                }}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Bachelor of Computer Science"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
                            <input
                                type="text"
                                value={edu.institution}
                                onChange={(event) => {
                                    setEducations(educations.map(e => 
                                        e.id === edu.id ? { ...e, institution: event.target.value } : e
                                    ));
                                }}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="University of Antananarivo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                            <input
                                type="text"
                                value={edu.location}
                                onChange={(event) => {
                                    setEducations(educations.map(e => 
                                        e.id === edu.id ? { ...e, location: event.target.value } : e
                                    ));
                                }}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Antananarivo, MG"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Graduation Date</label>
                            <input
                                type="month"
                                value={edu.graduationDate}
                                onChange={(event) => {
                                    setEducations(educations.map(e => 
                                        e.id === edu.id ? { ...e, graduationDate: event.target.value } : e
                                    ));
                                }}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">GPA (Optional)</label>
                        <input
                            type="text"
                            value={edu.gpa}
                            onChange={(event) => {
                                setEducations(educations.map(e => 
                                    e.id === edu.id ? { ...e, gpa: event.target.value } : e
                                ));
                            }}
                            className="w-full md:w-1/3 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="3.8"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Relevant Courses</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {edu.relevant_courses?.map((course, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                                >
                                    {course}
                                    <button
                                        onClick={() => {
                                            const newCourses = edu.relevant_courses?.filter((_, i) => i !== idx) || [];
                                            setEducations(educations.map(e => 
                                                e.id === edu.id ? { ...e, relevant_courses: newCourses } : e
                                            ));
                                        }}
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Add course (press Enter)"
                            onKeyUp={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                    const newCourses = [...(edu.relevant_courses || []), e.currentTarget.value.trim()];
                                    setEducations(educations.map(e => 
                                        e.id === edu.id ? { ...e, relevant_courses: newCourses } : e
                                    ));
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

export default CVEduction;
