
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

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

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  relevant_courses?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'technical' | 'soft' | 'language';
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    duration: string;
}

export interface CVData {
    personalInfo: PersonalInfo
    experiences: Experience[];
    education: Education[];
    skills: Skill[];
    projects: Project[]
}
