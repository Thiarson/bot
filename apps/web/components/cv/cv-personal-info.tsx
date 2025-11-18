import { Dispatch, SetStateAction } from "react";

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
    info: PersonalInfo
    setInfo: Dispatch<SetStateAction<PersonalInfo>>
}

function CVPersonalInfo({ info, setInfo }: PropsType) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                    <input
                        type="text"
                        value={info.fullName}
                        onChange={(e) => setInfo({...info, fullName: e.target.value})}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                    <input
                        type="email"
                        value={info.email}
                        onChange={(e) => setInfo({...info, email: e.target.value})}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input
                        type="tel"
                        value={info.phone}
                        onChange={(e) => setInfo({...info, phone: e.target.value})}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                        type="text"
                        value={info.location}
                        onChange={(e) => setInfo({...info, location: e.target.value})}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                    <input
                        type="url"
                        value={info.website}
                        onChange={(e) => setInfo({...info, website: e.target.value})}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://yourwebsite.com"
                    />
                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
                    <input
                        type="url"
                        value={info.linkedin}
                        onChange={(e) => setInfo({...info, linkedin: e.target.value})}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Summary *</label>
                <textarea
                    value={info.summary}
                    onChange={(e) => setInfo({...info, summary: e.target.value})}
                    rows={4}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{info.summary.length}/500 characters</p>
            </div>
        </div>
    );
}

export default CVPersonalInfo;
