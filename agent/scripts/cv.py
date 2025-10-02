from typing import Optional, List
from pydantic import BaseModel, Field
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

from config.ai_model import llm


# Pydantic models for structured extraction
class PersonalInfo(BaseModel):
    fullName: str = Field(description="Full name of the candidate")
    email: str = Field(description="Email address")
    phone: str = Field(description="Phone number")
    location: str = ""
    website: str = ""
    linkedin: str = ""
    summary: str = Field(description="Professional summary or objective")

class Experience(BaseModel):
    id: str
    position: str = Field(description="Job title")
    company: str = Field(description="Company name")
    duration: Optional[str] = Field(description="Employment duration")
    responsibilities: List[str] = Field(description="Key responsibilities and achievements")
    location: str = ""
    startDate: str = Field(default="", description="Start date in YYYY-MM format (e.g., 2023-04)")
    endDate: str = Field(default="", description="End date in YYYY-MM format (e.g., 2023-10), or empty if current")
    current: bool = False
    description: str = ""
    achievements: list[str] = []

class Education(BaseModel):
    id: str
    degree: str = Field(description="Degree or certification name")
    institution: str = Field(description="Educational institution name")
    year: Optional[str] = Field(description="Graduation year or period")
    field: Optional[str] = Field(description="Field of study")
    location: str = ""
    graduationDate: str = Field(default="", description="Graduation date in YYYY-MM format (e.g., 2024-06)")
    gpa: str = ""
    relevant_courses: list[str] = []

class Skill(BaseModel):
    id: str
    name: str
    level: int
    category: str

class Project(BaseModel):
    id: str
    name: str = ""
    description: str = ""
    technologies: list[str] = []
    url: str = ""
    duration: str = ""

class CVData(BaseModel):
    personalInfo: PersonalInfo
    experiences: List[Experience] = Field(description="Work experience")
    education: List[Education] = Field(description="Educational background")
    skills: List[Skill] = Field(description="List of skills")
    projects: List[Project] = []
    languages: Optional[List[str]] = Field(description="Languages spoken")


def load_document(file_path: str, file_type: str) -> str:
    if file_type == "pdf":
        loader = PyPDFLoader(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
    
    documents = loader.load()
    return "\n\n".join([ doc.page_content for doc in documents ])

def extraction(raw_text: str) -> CVData:
    extraction_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert CV/resume parser. Extract structured information from the provided CV text.
        Be thorough and accurate. If information is not present, use null or empty arrays.

        All dates must be in YYYY-MM format
        
        {format_instructions}
        """),
        ("user", "Extract information from this CV:\n\n{cv_text}"),
    ])

    # Parser for structured output
    parser = JsonOutputParser(pydantic_object=CVData)

    extraction_chain = extraction_prompt | llm | parser

    cv_data = extraction_chain.invoke({
        "cv_text": raw_text,
        "format_instructions": parser.get_format_instructions(),
    })
    
    return cv_data
