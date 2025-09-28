import { useSession } from "next-auth/react";
import { useState } from "react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

function CVPersonalInfo() {
    const { data: session } = useSession();
    const [ personalInfo, setPersonalInfo ] = useState<PersonalInfo>({
        fullName: session?.user?.name || '',
        email: session?.user?.email || '',
        phone: '',
        location: 'Antananarivo, Madagascar',
        website: '',
        linkedin: '',
        summary: 'Passionate professional with expertise in modern technologies and a strong focus on creating innovative solutions that drive business growth and user satisfaction.'
    });

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input
                        type="text"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                        type="url"
                        value={personalInfo.website}
                        onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://yourwebsite.com"
                    />
                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                    <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary *</label>
                <textarea
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                />
                <p className="text-xs text-gray-400 mt-1">{personalInfo.summary.length}/500 characters</p>
            </div>
        </div>
    );
}

export default CVPersonalInfo;
