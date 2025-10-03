import { Dispatch, SetStateAction, useState } from 'react';
import { 
  Check,
  Star,
} from 'lucide-react';

interface CVTemplate {
    id: string;
    name: string;
    thumbnail: string;
    style: 'modern' | 'classic' | 'creative' | 'minimal';
}

type PropsType = {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    template: string
    setTemplate: Dispatch<SetStateAction<string>>
}

function CVTemplate({ title, setTitle, template: selectedTemplate, setTemplate }: PropsType) {
    const templates: CVTemplate[] = [
        { id: 'modern', name: 'Modern Professional', thumbnail: '🎨', style: 'modern' },
        { id: 'classic', name: 'Classic Business', thumbnail: '📄', style: 'classic' },
        { id: 'creative', name: 'Creative Design', thumbnail: '🌟', style: 'creative' },
        { id: 'minimal', name: 'Minimal Clean', thumbnail: '⚡', style: 'minimal' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Choose Your Template</h2>
                    <p className="text-gray-400">Select a professional template that matches your style</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                <div
                    key={template.id}
                    onClick={() => setTemplate(template.id)}
                    className={`relative cursor-pointer border-2 rounded-lg p-6 transition-all hover:scale-105 ${
                    selectedTemplate === template.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                >
                    <div className="text-center">
                        <div className="text-4xl mb-4">{template.thumbnail}</div>
                        <h3 className="text-lg font-medium text-white mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{template.style} style</p>
                    </div>
                    {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    )}
                </div>
                ))}
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2">CV Title</h3>
                        <p className="text-sm text-gray-400 mb-4">Give your CV a memorable name</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full max-w-md bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="My Professional CV"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-400">Premium Template</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CVTemplate;
