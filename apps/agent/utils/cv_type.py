from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field

# Pydantic models for structured extraction
class PersonalInfo(BaseModel):
    """Personal information structure"""
    model_config = ConfigDict(extra='ignore')

    fullName: str = Field(description="Full name of the candidate")
    email: str = Field(description="Email address")
    phone: str = Field(description="Phone number")
    location: str = ""
    website: str = ""
    linkedin: str = ""
    summary: str = Field(description="Professional summary or objective")

class Experience(BaseModel):
    """Work experience structure"""
    model_config = ConfigDict(extra='ignore')

    id: str
    position: str = Field(description="Job title")
    company: str = Field(description="Company name")
    responsibilities: List[str] = Field(default=[], description="Key responsibilities and achievements")
    location: str = ""
    startDate: str = Field(default="", description="Start date in YYYY-MM format (e.g., 2023-04)")
    endDate: str = Field(default="", description="End date in YYYY-MM format (e.g., 2023-10), or empty if current")
    current: bool = False
    description: str = ""
    achievements: list[str] = []
    duration: Optional[str] = Field(default=None, description="Employment duration")

class Education(BaseModel):
    """Education structure"""
    model_config = ConfigDict(extra='ignore')

    id: str
    degree: str = Field(description="Degree or certification name")
    institution: str = Field(description="Educational institution name")
    location: str = ""
    graduationDate: str = Field(default="", description="Graduation date in YYYY-MM format (e.g., 2024-06)")
    gpa: str = ""
    relevant_courses: list[str] = []
    field: Optional[str] = Field(default=None, description="Field of study")
    year: Optional[str] = Field(default=None, description="Graduation year or period")

class Skill(BaseModel):
    """Skill structure"""
    model_config = ConfigDict(extra='ignore')

    id: str
    name: str
    level: int
    category: str

class Project(BaseModel):
    """Project structure"""
    model_config = ConfigDict(extra='ignore')

    id: str
    name: str = ""
    description: str = ""
    technologies: list[str] = []
    url: str = ""
    duration: str = ""

class CVData(BaseModel):
    """Complete CV data structure"""
    model_config = ConfigDict(extra='ignore')
    
    personalInfo: PersonalInfo
    experiences: List[Experience] = Field(description="Work experience")
    education: List[Education] = Field(description="Educational background")
    skills: List[Skill] = Field(description="List of skills")
    projects: List[Project] = []
    languages: Optional[List[str]] = Field(default=None, description="Languages spoken")


class CVExportRequest(BaseModel):
    cv_data: CVData
    template: str
    filename: str
    format: Optional[str] = "pdf"
