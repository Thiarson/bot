from abc import ABC, abstractmethod
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

from utils.cv_type import CVData, PersonalInfo, Education, Experience, Project, Skill

class CVTemplate(ABC):
    """Abstract base class for CV templates"""

    def __init__(self, filename: str, cv_data: CVData):
        self.filename = filename
        self.cv_data = cv_data
        self.c = canvas.Canvas(filename, pagesize=letter)
        self.width, self.height = letter
        self.margin = 0.5 * inch

    @abstractmethod
    def generate(self):
        """Generate the PDF"""
        pass

    def save(self):
        """Save the PDF"""
        self.c.save()

    def draw_text(self, text: str, x: float, y: float, font: str, size: int, color=black):
        """Helper method to draw text"""
        self.c.setFont(font, size)
        self.c.setFillColor(color)
        self.c.drawString(x, y, text)

    def draw_wrapped_text(self, text: str, x: float, y: float, width: float, 
                         font: str, size: int, color=black, align=TA_LEFT):
        """Helper method to draw wrapped text"""
        style = ParagraphStyle(
            'custom',
            fontName=font,
            fontSize=size,
            textColor=color,
            alignment=align,
            leading=size * 1.2
        )
        para = Paragraph(text, style)
        w, h = para.wrap(width, self.height)
        para.drawOn(self.c, x, y - h)

        return h


class ModernProfessionalTemplate(CVTemplate):
    """Modern Professional Template with sidebar"""
    
    PRIMARY_COLOR = HexColor('#6366f1')  # Indigo
    SECONDARY_COLOR = HexColor('#f3f4f6')  # Light gray
    TEXT_COLOR = HexColor('#1f2937')  # Dark gray
    
    def generate(self):
        # Draw sidebar background
        self.c.setFillColor(self.SECONDARY_COLOR)
        self.c.rect(0, 0, 2.5 * inch, self.height, fill=1, stroke=0)
        
        # Sidebar content (left side)
        self._draw_sidebar()
        
        # Main content (right side)
        self._draw_main_content()
        
        self.save()
    
    def _draw_sidebar(self):
        x = 0.3 * inch
        y = self.height - inch
        width = 1.9 * inch
        
        # Profile section
        info = self.cv_data.personalInfo
        
        # Name initial circle
        self.c.setFillColor(self.PRIMARY_COLOR)
        self.c.circle(x + width/2, y, 0.5*inch, fill=1)
        self.c.setFillColor(white)
        self.c.setFont("Helvetica-Bold", 24)
        initial = info.fullName[0].upper()
        self.c.drawCentredString(x + width/2, y - 8, initial)
        
        y -= 1.2 * inch
        
        # Contact info
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(x, y, "CONTACT")
        y -= 0.3 * inch
        
        contact_items = [
            ("Email", info.email),
            ("Phone", info.phone),
            ("Location", info.location)
        ]
        
        if info.linkedin:
            contact_items.append(("LinkedIn", info.linkedin))
        
        self.c.setFont("Helvetica", 8)
        for label, value in contact_items:
            if not value:
                continue
            self.c.setFont("Helvetica-Bold", 8)
            self.c.drawString(x, y, f"{label}:")
            y -= 0.15 * inch
            self.c.setFont("Helvetica", 7)
            h = self.draw_wrapped_text(value, x, y, width, "Helvetica", 7, self.TEXT_COLOR)
            y -= h + 0.15 * inch
        
        y -= 0.2 * inch
        
        # Skills
        if self.cv_data.skills:
            self.c.setFont("Helvetica-Bold", 10)
            self.c.drawString(x, y, "SKILLS")
            y -= 0.25 * inch
            
            self.c.setFont("Helvetica", 8)
            for skill in self.cv_data.skills:
                # Skill bullet
                self.c.circle(x + 0.05*inch, y + 0.05*inch, 0.02*inch, fill=1)
                self.c.drawString(x + 0.15*inch, y, skill.name)
                y -= 0.2 * inch
    
    def _draw_main_content(self):
        x = 3 * inch
        y = self.height - inch
        width = self.width - 3 * inch - self.margin
        
        info = self.cv_data.personalInfo
        
        # Name and title
        self.c.setFillColor(self.PRIMARY_COLOR)
        self.c.setFont("Helvetica-Bold", 28)
        self.c.drawString(x, y, info.fullName.upper())
        y -= 0.4 * inch
        
        # self.c.setFillColor(self.TEXT_COLOR)
        # self.c.setFont("Helvetica", 14)
        # self.c.drawString(x, y, info.title)
        # y -= 0.5 * inch
        
        # Summary
        if info.summary:
            self.c.setFont("Helvetica", 9)
            h = self.draw_wrapped_text(info.summary, x, y, width, "Helvetica", 9, self.TEXT_COLOR)
            y -= h + 0.4 * inch
        
        # Experience
        y = self._draw_section_header("EXPERIENCE", x, y, width)
        for exp in self.cv_data.experiences:
            y = self._draw_experience(exp, x, y, width)
            if y < 2 * inch:
                self.c.showPage()
                y = self.height - inch
        
        # Education
        y = self._draw_section_header("EDUCATION", x, y, width)
        for edu in self.cv_data.education:
            y = self._draw_education(edu, x, y, width)
        
        # Projects
        if self.cv_data.projects:
            y = self._draw_section_header("PROJECTS", x, y, width)
            for proj in self.cv_data.projects:
                y = self._draw_project(proj, x, y, width)
    
    def _draw_section_header(self, title: str, x: float, y: float, width: float):
        self.c.setFillColor(self.PRIMARY_COLOR)
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(x, y, title)
        y -= 0.15 * inch
        self.c.setStrokeColor(self.PRIMARY_COLOR)
        self.c.setLineWidth(2)
        self.c.line(x, y, x + width, y)
        return y - 0.3 * inch
    
    def _draw_experience(self, exp: Experience, x: float, y: float, width: float):
        # Position and company
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, exp.position)
        y -= 0.2 * inch
        
        self.c.setFont("Helvetica-Oblique", 9)
        self.c.drawString(x, y, f"{exp.company} | {exp.location}")
        
        self.c.setFont("Helvetica", 8)
        date_str = f"{exp.startDate} - {exp.endDate}"
        self.c.drawRightString(x + width, y, date_str)
        y -= 0.25 * inch
        
        # Responsibilities
        self.c.setFont("Helvetica", 9)
        for resp in exp.responsibilities:
            self.c.circle(x + 0.05*inch, y + 0.05*inch, 0.02*inch, fill=1)
            h = self.draw_wrapped_text(resp, x + 0.15*inch, y, width - 0.2*inch, 
                                      "Helvetica", 9, self.TEXT_COLOR)
            y -= h + 0.1 * inch
        
        return y - 0.2 * inch
    
    def _draw_education(self, edu: Education, x: float, y: float, width: float):
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, edu.degree)
        y -= 0.2 * inch
        
        self.c.setFont("Helvetica-Oblique", 9)
        self.c.drawString(x, y, edu.institution)
        self.c.setFont("Helvetica", 8)
        self.c.drawRightString(x + width, y, edu.graduationDate)
        y -= 0.3 * inch
        
        return y
    
    def _draw_project(self, proj: Project, x: float, y: float, width: float):
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(x, y, proj.name)
        y -= 0.2 * inch
        
        self.c.setFont("Helvetica", 9)
        h = self.draw_wrapped_text(proj.description, x, y, width, "Helvetica", 9, self.TEXT_COLOR)
        y -= h + 0.15 * inch
        
        tech_str = " • ".join(proj.technologies)
        self.c.setFont("Helvetica-Oblique", 8)
        self.c.drawString(x, y, tech_str)
        y -= 0.3 * inch
        
        return y


class ClassicBusinessTemplate(CVTemplate):
    """Classic Business Template - Traditional style"""
    
    def generate(self):
        x = self.margin
        y = self.height - self.margin
        width = self.width - 2 * self.margin
        
        info = self.cv_data.personalInfo
        
        # Header - centered
        self.c.setFont("Helvetica-Bold", 24)
        self.c.drawCentredString(self.width/2, y, info.fullName.upper())
        y -= 0.3 * inch
        
        # self.c.setFont("Helvetica", 12)
        # self.c.drawCentredString(self.width/2, y, info.title)
        # y -= 0.2 * inch
        
        # Contact info - centered
        self.c.setFont("Helvetica", 9)
        contact_line = f"{info.email} | {info.phone} | {info.location}"
        self.c.drawCentredString(self.width/2, y, contact_line)
        y -= 0.4 * inch
        
        # Horizontal line
        self.c.setLineWidth(1)
        self.c.line(x, y, x + width, y)
        y -= 0.3 * inch
        
        # Summary
        if info.summary:
            y = self._draw_section("PROFESSIONAL SUMMARY", x, y, width)
            self.c.setFont("Helvetica", 10)
            h = self.draw_wrapped_text(info.summary, x, y, width, "Helvetica", 10, black)
            y -= h + 0.3 * inch
        
        # Experience
        y = self._draw_section("PROFESSIONAL EXPERIENCE", x, y, width)
        for exp in self.cv_data.experiences:
            y = self._draw_experience(exp, x, y, width)
            if y < 2 * inch:
                self.c.showPage()
                y = self.height - self.margin
        
        # Education
        y = self._draw_section("EDUCATION", x, y, width)
        for edu in self.cv_data.education:
            y = self._draw_education(edu, x, y, width)
        
        # Skills
        y = self._draw_section("SKILLS", x, y, width)
        self.c.setFont("Helvetica", 10)
        # skills_text = " • ".join(self.cv_data.skills)
        skills_text = " • ".join([skill.name for skill in self.cv_data.skills])
        h = self.draw_wrapped_text(skills_text, x, y, width, "Helvetica", 10, black)
        
        self.save()
    
    def _draw_section(self, title: str, x: float, y: float, width: float):
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(x, y, title)
        y -= 0.05 * inch
        self.c.setLineWidth(0.5)
        self.c.line(x, y, x + width, y)
        return y - 0.25 * inch
    
    def _draw_experience(self, exp: Experience, x: float, y: float, width: float):
        # Position
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, exp.position)
        
        # Date range
        self.c.setFont("Helvetica", 9)
        date_str = f"{exp.startDate} - {exp.endDate}"
        self.c.drawRightString(x + width, y, date_str)
        y -= 0.18 * inch
        
        # Company
        self.c.setFont("Helvetica-Oblique", 10)
        self.c.drawString(x, y, f"{exp.company}, {exp.location}")
        y -= 0.2 * inch
        
        # Responsibilities
        self.c.setFont("Helvetica", 9)
        for resp in exp.responsibilities:
            self.c.drawString(x + 0.15*inch, y, "•")
            h = self.draw_wrapped_text(resp, x + 0.3*inch, y, width - 0.3*inch, 
                                      "Helvetica", 9, black)
            y -= h + 0.05 * inch
        
        return y - 0.2 * inch
    
    def _draw_education(self, edu: Education, x: float, y: float, width: float):
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, edu.degree)
        
        self.c.setFont("Helvetica", 9)
        self.c.drawRightString(x + width, y, edu.graduationDate)
        y -= 0.18 * inch
        
        self.c.setFont("Helvetica", 10)
        self.c.drawString(x, y, edu.institution)
        y -= 0.3 * inch
        
        return y


class CVGenerator:
    """Main CV Generator class"""
    
    TEMPLATES = {
        'modern': ModernProfessionalTemplate,
        'classic': ClassicBusinessTemplate,
    }
    
    @staticmethod
    def generate(template_name: str, cv_data: CVData, output_filename: str):
        """
        Generate CV PDF with specified template
        
        Args:
            template_name: Name of the template ('modern', 'classic', etc.)
            cv_data: CVData object containing all CV information
            output_filename: Output PDF filename
        """
        if template_name not in CVGenerator.TEMPLATES:
            raise ValueError(f"Template '{template_name}' not found. Available templates: {list(CVGenerator.TEMPLATES.keys())}")
        
        template_class = CVGenerator.TEMPLATES[template_name]
        template = template_class(output_filename, cv_data)
        template.generate()
        
        return output_filename
