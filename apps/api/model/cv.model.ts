import mongoose, { Schema, Document } from "mongoose";
import { CVData, PersonalInfo, Experience, Education, Skill, Project } from "@bot/types";

export interface CvDocument extends CVData, Document {
    userId?: string;
}

const PersonalInfoSchema = new Schema<PersonalInfo>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String },
    linkedin: { type: String },
    summary: { type: String, required: true },
});

const ExperienceSchema = new Schema<Experience>({
    id: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
    current: { type: Boolean, required: true, default: false },
    achievements: { type: [String], required: true, default: [] },
});

const EducationSchema = new Schema<Education>({
    id: { type: String, required: true },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, required: true },
    graduationDate: { type: String, required: true },
    gpa: { type: String },
    relevant_courses: { type: [String], default: [] },
});

const SkillSchema = new Schema<Skill>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: Number, required: true },
    category: { type: String, enum: ['technical', 'soft', 'language'], required: true },
});

const ProjectSchema = new Schema<Project>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
    url: { type: String },
    duration: { type: String, required: true },
});

const CvSchema = new Schema<CvDocument>({
    personalInfo: { type: PersonalInfoSchema, required: true },
    experiences: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    skills: { type: [SkillSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },

    userId: { type: String },
}, {
    timestamps: true,
});

export const CvModel = mongoose.model<CvDocument>("cv", CvSchema);
