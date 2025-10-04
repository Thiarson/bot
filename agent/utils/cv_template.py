from abc import ABC, abstractmethod
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY

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
            leading=size * 1.3
        )
        para = Paragraph(text, style)
        w, h = para.wrap(width, self.height)
        para.drawOn(self.c, x, y - h)

        return h


class ModernProfessionalTemplate(CVTemplate):
    """Modern Professional Template with clean sidebar layout"""
    
    PRIMARY_COLOR = HexColor('#2563eb')  # Professional blue
    ACCENT_COLOR = HexColor('#1e40af')   # Darker blue
    SIDEBAR_BG = HexColor('#f8fafc')     # Very light gray/blue
    TEXT_COLOR = HexColor('#1e293b')     # Slate gray
    LIGHT_TEXT = HexColor('#475569')     # Medium gray
    
    def generate(self):
        """Generate the complete CV"""
        self._draw_sidebar_background()
        self._draw_sidebar()
        self._draw_main_content()
        self.save()
    
    def _draw_sidebar_background(self):
        """Draw the sidebar background"""
        self.c.setFillColor(self.SIDEBAR_BG)
        self.c.rect(0, 0, 2.3 * inch, self.height, fill=1, stroke=0)
    
    def _draw_sidebar(self):
        """Draw sidebar content"""
        x = 0.35 * inch
        y = self.height - 0.75 * inch
        width = 1.6 * inch
        
        info = self.cv_data.personalInfo
        
        # Profile header with initial
        self.c.setFillColor(self.PRIMARY_COLOR)
        self.c.circle(x + width/2, y, 0.45*inch, fill=1)
        self.c.setFillColor(white)
        self.c.setFont("Helvetica-Bold", 26)
        initial = info.fullName[0].upper()
        self.c.drawCentredString(x + width/2, y - 9, initial)
        
        y -= 1.1 * inch
        
        # Contact Information
        y = self._draw_sidebar_section("CONTACT", x, y, width)
        
        contact_items = [
            ("Email", info.email, 7.5),
            ("Phone", info.phone, 9),
            ("Location", info.location, 9),
        ]
        
        if info.linkedin:
            # Extract readable part from LinkedIn URL
            linkedin_display = info.linkedin.replace("https://", "").replace("http://", "")
            if linkedin_display.startswith("www."):
                linkedin_display = linkedin_display[4:]
            contact_items.append(("LinkedIn", linkedin_display, 7))
        
        if info.website:
            website_display = info.website.replace("https://", "").replace("http://", "")
            if website_display.startswith("www."):
                website_display = website_display[4:]
            contact_items.append(("Website", website_display, 7.5))
        
        for label, value, font_size in contact_items:
            if not value:
                continue
            y = self._draw_contact_item(label, value, x, y, width, font_size)
        
        y -= 0.3 * inch
        
        # Skills Section
        if self.cv_data.skills:
            y = self._draw_sidebar_section("SKILLS", x, y, width)
            
            # Group skills by category
            skills_by_category = {}
            for skill in self.cv_data.skills:
                category = skill.category if skill.category else "Other"
                if category not in skills_by_category:
                    skills_by_category[category] = []
                skills_by_category[category].append(skill)
            
            for category, skills in skills_by_category.items():
                if len(skills_by_category) > 1:
                    self.c.setFillColor(self.TEXT_COLOR)
                    self.c.setFont("Helvetica-Bold", 8)
                    self.c.drawString(x, y, category)
                    y -= 0.18 * inch
                
                self.c.setFont("Helvetica", 8)
                for skill in skills[:8]:  # Limit to prevent overflow
                    self.c.setFillColor(self.PRIMARY_COLOR)
                    self.c.circle(x + 0.05*inch, y + 0.05*inch, 0.018*inch, fill=1)
                    self.c.setFillColor(self.TEXT_COLOR)
                    self.c.drawString(x + 0.15*inch, y, skill.name)
                    y -= 0.18 * inch
                
                y -= 0.1 * inch
        
        # Languages (if available)
        if hasattr(self.cv_data, 'languages') and self.cv_data.languages:
            y -= 0.15 * inch
            y = self._draw_sidebar_section("LANGUAGES", x, y, width)
            
            self.c.setFont("Helvetica", 8)
            for lang in self.cv_data.languages[:5]:
                self.c.setFillColor(self.PRIMARY_COLOR)
                self.c.circle(x + 0.05*inch, y + 0.05*inch, 0.018*inch, fill=1)
                self.c.setFillColor(self.TEXT_COLOR)
                self.c.drawString(x + 0.15*inch, y, lang)
                y -= 0.18 * inch
    
    def _draw_sidebar_section(self, title: str, x: float, y: float, width: float):
        """Draw a sidebar section header"""
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 9)
        self.c.drawString(x, y, title)
        
        # Subtle underline
        y -= 0.08 * inch
        self.c.setStrokeColor(self.PRIMARY_COLOR)
        self.c.setLineWidth(1.5)
        self.c.line(x, y, x + width, y)
        
        return y - 0.25 * inch
    
    def _draw_contact_item(self, label: str, value: str, x: float, y: float, width: float, font_size: float):
        """Draw a contact information item"""
        self.c.setFillColor(self.LIGHT_TEXT)
        self.c.setFont("Helvetica-Bold", 7)
        self.c.drawString(x, y, f"{label}:")
        y -= 0.13 * inch
        
        self.c.setFillColor(self.TEXT_COLOR)
        h = self.draw_wrapped_text(value, x, y, width, "Helvetica", font_size, self.TEXT_COLOR)
        y -= h + 0.18 * inch
        
        return y
    
    def _draw_main_content(self):
        """Draw main content area"""
        x = 2.6 * inch
        y = self.height - 0.75 * inch
        width = self.width - 2.6 * inch - self.margin
        
        info = self.cv_data.personalInfo
        
        # Name
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 32)
        self.c.drawString(x, y, info.fullName.upper())
        y -= 0.45 * inch
        
        # Professional Summary
        if info.summary:
            self.c.setFillColor(self.LIGHT_TEXT)
            self.c.setFont("Helvetica", 10)
            h = self.draw_wrapped_text(
                info.summary, x, y, width, "Helvetica", 10, 
                self.LIGHT_TEXT, TA_JUSTIFY
            )
            y -= h + 0.45 * inch
        
        # Professional Experience
        if self.cv_data.experiences:
            y = self._draw_main_section_header("PROFESSIONAL EXPERIENCE", x, y, width)
            
            for i, exp in enumerate(self.cv_data.experiences):
                if y < 1.5 * inch:
                    self.c.showPage()
                    self._draw_sidebar_background()
                    y = self.height - 0.75 * inch
                
                y = self._draw_experience(exp, x, y, width)
                
                # Add separator between experiences (except last)
                if i < len(self.cv_data.experiences) - 1:
                    y -= 0.1 * inch
        
        # Education
        if self.cv_data.education:
            if y < 2 * inch:
                self.c.showPage()
                self._draw_sidebar_background()
                y = self.height - 0.75 * inch
            
            y = self._draw_main_section_header("EDUCATION", x, y, width)
            
            for edu in self.cv_data.education:
                y = self._draw_education(edu, x, y, width)
        
        # Projects
        if self.cv_data.projects:
            if y < 2 * inch:
                self.c.showPage()
                self._draw_sidebar_background()
                y = self.height - 0.75 * inch
            
            y = self._draw_main_section_header("PROJECTS", x, y, width)
            
            for proj in self.cv_data.projects[:3]:  # Limit to 3 most important
                y = self._draw_project(proj, x, y, width)
    
    def _draw_main_section_header(self, title: str, x: float, y: float, width: float):
        """Draw a main content section header"""
        self.c.setFillColor(self.PRIMARY_COLOR)
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(x, y, title)
        
        y -= 0.12 * inch
        self.c.setStrokeColor(self.PRIMARY_COLOR)
        self.c.setLineWidth(2)
        self.c.line(x, y, x + width, y)
        
        return y - 0.35 * inch
    
    def _draw_experience(self, exp, x: float, y: float, width: float):
        """Draw work experience entry"""
        # Job title
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(x, y, exp.position)
        y -= 0.22 * inch
        
        # Company and location
        self.c.setFillColor(self.LIGHT_TEXT)
        self.c.setFont("Helvetica-Bold", 10)
        company_text = exp.company
        if exp.location:
            company_text += f" • {exp.location}"
        self.c.drawString(x, y, company_text)
        
        # Date range
        self.c.setFont("Helvetica", 9)
        date_str = f"{exp.startDate} - {exp.endDate if exp.endDate else 'Present'}"
        self.c.drawRightString(x + width, y, date_str)
        y -= 0.28 * inch
        
        # Responsibilities/achievements
        self.c.setFont("Helvetica", 9.5)
        responsibilities = exp.responsibilities if exp.responsibilities else []
        
        for resp in responsibilities[:6]:  # Limit to prevent overflow
            # Bullet point
            self.c.setFillColor(self.PRIMARY_COLOR)
            self.c.circle(x + 0.08*inch, y + 0.06*inch, 0.025*inch, fill=1)
            
            # Responsibility text
            self.c.setFillColor(self.TEXT_COLOR)
            h = self.draw_wrapped_text(
                resp, x + 0.22*inch, y, width - 0.25*inch, 
                "Helvetica", 9.5, self.TEXT_COLOR, TA_JUSTIFY
            )
            y -= h + 0.12 * inch
        
        return y - 0.25 * inch
    
    def _draw_education(self, edu, x: float, y: float, width: float):
        """Draw education entry"""
        # Degree
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, edu.degree)
        y -= 0.2 * inch
        
        # Institution
        self.c.setFillColor(self.LIGHT_TEXT)
        self.c.setFont("Helvetica", 10)
        institution_text = edu.institution
        if edu.location:
            institution_text += f" • {edu.location}"
        self.c.drawString(x, y, institution_text)
        
        # Graduation date
        self.c.setFont("Helvetica", 9)
        if edu.graduationDate:
            self.c.drawRightString(x + width, y, edu.graduationDate)
        
        y -= 0.15 * inch
        
        # GPA if available
        if edu.gpa:
            self.c.setFont("Helvetica", 9)
            self.c.drawString(x, y, f"GPA: {edu.gpa}")
            y -= 0.15 * inch
        
        return y - 0.2 * inch
    
    def _draw_project(self, proj, x: float, y: float, width: float):
        """Draw project entry"""
        # Project name
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Bold", 10)
        
        name_text = proj.name
        if proj.url:
            name_text += " ↗"
        self.c.drawString(x, y, name_text)
        y -= 0.2 * inch
        
        # Description
        if proj.description:
            self.c.setFont("Helvetica", 9)
            h = self.draw_wrapped_text(
                proj.description, x, y, width, 
                "Helvetica", 9, self.TEXT_COLOR, TA_JUSTIFY
            )
            y -= h + 0.12 * inch
        
        # Technologies
        if proj.technologies:
            tech_str = " • ".join(proj.technologies[:6])  # Limit technologies shown
            self.c.setFillColor(self.LIGHT_TEXT)
            self.c.setFont("Helvetica-Oblique", 8)
            self.c.drawString(x, y, f"Technologies: {tech_str}")
            y -= 0.25 * inch
        
        return y - 0.15 * inch


class ClassicBusinessTemplate(CVTemplate):
    """Classic Business Template - Traditional, professional style"""
    
    # Professional color scheme
    HEADER_COLOR = HexColor('#1a1a1a')      # Almost black
    TEXT_COLOR = HexColor('#2d2d2d')        # Dark gray
    ACCENT_COLOR = HexColor('#4a5568')      # Medium gray
    LINE_COLOR = HexColor('#cbd5e0')        # Light gray
    
    def generate(self):
        """Generate the complete CV"""
        x = self.margin
        y = self.height - self.margin * 1.2
        width = self.width - 2 * self.margin
        
        info = self.cv_data.personalInfo
        
        # Header - Name (centered)
        self.c.setFillColor(self.HEADER_COLOR)
        self.c.setFont("Helvetica-Bold", 28)
        self.c.drawCentredString(self.width/2, y, info.fullName.upper())
        y -= 0.35 * inch
        
        # Contact information - centered on multiple lines if needed
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica", 9)
        
        # First line: email and phone
        contact_line1 = f"{info.email}  •  {info.phone}"
        self.c.drawCentredString(self.width/2, y, contact_line1)
        y -= 0.16 * inch
        
        # Second line: location and links
        contact_parts = [info.location] if info.location else []
        
        if info.linkedin:
            linkedin_display = info.linkedin.replace("https://", "").replace("http://", "")
            if linkedin_display.startswith("www."):
                linkedin_display = linkedin_display[4:]
            if linkedin_display.startswith("linkedin.com/"):
                linkedin_display = linkedin_display[13:]
            contact_parts.append(f"LinkedIn: {linkedin_display}")
        
        if info.website:
            website_display = info.website.replace("https://", "").replace("http://", "")
            if website_display.startswith("www."):
                website_display = website_display[4:]
            contact_parts.append(website_display)
        
        if contact_parts:
            contact_line2 = "  •  ".join(contact_parts)
            self.c.drawCentredString(self.width/2, y, contact_line2)
            y -= 0.35 * inch
        else:
            y -= 0.2 * inch
        
        # Decorative horizontal line
        self.c.setStrokeColor(self.LINE_COLOR)
        self.c.setLineWidth(1.5)
        center_x = self.width / 2
        line_width = 4 * inch
        self.c.line(center_x - line_width/2, y, center_x + line_width/2, y)
        y -= 0.35 * inch
        
        # Professional Summary
        if info.summary:
            y = self._draw_section_header("PROFESSIONAL SUMMARY", x, y, width)
            self.c.setFillColor(self.TEXT_COLOR)
            self.c.setFont("Helvetica", 10)
            h = self.draw_wrapped_text(
                info.summary, x, y, width, 
                "Helvetica", 10, self.TEXT_COLOR, TA_JUSTIFY
            )
            y -= h + 0.4 * inch
        
        # Professional Experience
        if self.cv_data.experiences:
            y = self._draw_section_header("PROFESSIONAL EXPERIENCE", x, y, width)
            
            for i, exp in enumerate(self.cv_data.experiences):
                if y < 2 * inch:
                    self.c.showPage()
                    y = self.height - self.margin * 1.2
                
                y = self._draw_experience(exp, x, y, width)
                
                # Add subtle spacing between experiences
                if i < len(self.cv_data.experiences) - 1:
                    y -= 0.15 * inch
        
        # Education
        if self.cv_data.education:
            if y < 2.5 * inch:
                self.c.showPage()
                y = self.height - self.margin * 1.2
            
            y = self._draw_section_header("EDUCATION", x, y, width)
            
            for edu in self.cv_data.education:
                y = self._draw_education(edu, x, y, width)
        
        # Skills
        if self.cv_data.skills:
            if y < 1.5 * inch:
                self.c.showPage()
                y = self.height - self.margin * 1.2
            
            y = self._draw_section_header("SKILLS & COMPETENCIES", x, y, width)
            
            # Group skills by category
            skills_by_category = {}
            for skill in self.cv_data.skills:
                category = skill.category if skill.category else "General"
                if category not in skills_by_category:
                    skills_by_category[category] = []
                skills_by_category[category].append(skill.name)
            
            self.c.setFont("Helvetica", 10)
            
            if len(skills_by_category) > 1:
                # Multiple categories - show organized
                for category, skills in skills_by_category.items():
                    self.c.setFillColor(self.ACCENT_COLOR)
                    self.c.setFont("Helvetica-Bold", 10)
                    self.c.drawString(x, y, f"{category}:")
                    y -= 0.18 * inch
                    
                    self.c.setFillColor(self.TEXT_COLOR)
                    self.c.setFont("Helvetica", 10)
                    skills_text = "  •  ".join(skills)
                    h = self.draw_wrapped_text(
                        skills_text, x + 0.15*inch, y, width - 0.15*inch, 
                        "Helvetica", 10, self.TEXT_COLOR
                    )
                    y -= h + 0.2 * inch
            else:
                # Single category or no categories - simple list
                all_skills = [skill.name for skill in self.cv_data.skills]
                skills_text = "  •  ".join(all_skills)
                self.c.setFillColor(self.TEXT_COLOR)
                h = self.draw_wrapped_text(
                    skills_text, x, y, width, 
                    "Helvetica", 10, self.TEXT_COLOR
                )
                y -= h + 0.2 * inch
        
        # Projects (optional)
        if self.cv_data.projects and y > 2 * inch:
            y = self._draw_section_header("NOTABLE PROJECTS", x, y, width)
            
            for proj in self.cv_data.projects[:2]:  # Limit to 2 projects
                y = self._draw_project(proj, x, y, width)
        
        # Languages (if available)
        if hasattr(self.cv_data, 'languages') and self.cv_data.languages and y > 1.5 * inch:
            y = self._draw_section_header("LANGUAGES", x, y, width)
            
            self.c.setFillColor(self.TEXT_COLOR)
            self.c.setFont("Helvetica", 10)
            languages_text = "  •  ".join(self.cv_data.languages)
            h = self.draw_wrapped_text(
                languages_text, x, y, width, 
                "Helvetica", 10, self.TEXT_COLOR
            )
        
        self.save()
    
    def _draw_section_header(self, title: str, x: float, y: float, width: float):
        """Draw a section header with underline"""
        self.c.setFillColor(self.HEADER_COLOR)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, title)
        
        y -= 0.08 * inch
        self.c.setStrokeColor(self.ACCENT_COLOR)
        self.c.setLineWidth(1)
        self.c.line(x, y, x + width, y)
        
        return y - 0.28 * inch
    
    def _draw_experience(self, exp, x: float, y: float, width: float):
        """Draw work experience entry"""
        # Position title (left) and date range (right)
        self.c.setFillColor(self.HEADER_COLOR)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, exp.position)
        
        # Date range on the right
        self.c.setFillColor(self.ACCENT_COLOR)
        self.c.setFont("Helvetica", 9)
        date_str = f"{exp.startDate} - {exp.endDate if exp.endDate else 'Present'}"
        self.c.drawRightString(x + width, y, date_str)
        y -= 0.2 * inch
        
        # Company and location
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica-Oblique", 10)
        company_text = exp.company
        if exp.location:
            company_text += f"  •  {exp.location}"
        self.c.drawString(x, y, company_text)
        y -= 0.25 * inch
        
        # Responsibilities/achievements
        self.c.setFont("Helvetica", 9.5)
        responsibilities = exp.responsibilities if exp.responsibilities else []
        
        for resp in responsibilities:
            # Bullet point
            self.c.setFillColor(self.ACCENT_COLOR)
            self.c.drawString(x + 0.15*inch, y, "•")
            
            # Responsibility text
            self.c.setFillColor(self.TEXT_COLOR)
            h = self.draw_wrapped_text(
                resp, x + 0.35*inch, y, width - 0.35*inch, 
                "Helvetica", 9.5, self.TEXT_COLOR, TA_JUSTIFY
            )
            y -= h + 0.1 * inch
        
        return y - 0.15 * inch
    
    def _draw_education(self, edu, x: float, y: float, width: float):
        """Draw education entry"""
        # Degree (left) and graduation date (right)
        self.c.setFillColor(self.HEADER_COLOR)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(x, y, edu.degree)
        
        # Graduation date on the right
        if edu.graduationDate:
            self.c.setFillColor(self.ACCENT_COLOR)
            self.c.setFont("Helvetica", 9)
            self.c.drawRightString(x + width, y, edu.graduationDate)
        
        y -= 0.2 * inch
        
        # Institution and location
        self.c.setFillColor(self.TEXT_COLOR)
        self.c.setFont("Helvetica", 10)
        institution_text = edu.institution
        if edu.location:
            institution_text += f"  •  {edu.location}"
        self.c.drawString(x, y, institution_text)
        y -= 0.15 * inch
        
        # GPA if available
        if edu.gpa:
            self.c.setFont("Helvetica", 9)
            self.c.drawString(x, y, f"GPA: {edu.gpa}")
            y -= 0.15 * inch
        
        # Relevant courses if available
        if hasattr(edu, 'relevant_courses') and edu.relevant_courses:
            self.c.setFont("Helvetica-Oblique", 8)
            courses_text = "Relevant Coursework: " + ", ".join(edu.relevant_courses[:5])
            h = self.draw_wrapped_text(
                courses_text, x, y, width, 
                "Helvetica-Oblique", 8, self.ACCENT_COLOR
            )
            y -= h + 0.1 * inch
        
        return y - 0.2 * inch
    
    def _draw_project(self, proj, x: float, y: float, width: float):
        """Draw project entry"""
        # Project name
        self.c.setFillColor(self.HEADER_COLOR)
        self.c.setFont("Helvetica-Bold", 10)
        
        project_name = proj.name
        if proj.url:
            project_name += "  ↗"
        self.c.drawString(x, y, project_name)
        
        # Duration if available
        if proj.duration:
            self.c.setFillColor(self.ACCENT_COLOR)
            self.c.setFont("Helvetica", 8)
            self.c.drawRightString(x + width, y, proj.duration)
        
        y -= 0.18 * inch
        
        # Description
        if proj.description:
            self.c.setFillColor(self.TEXT_COLOR)
            self.c.setFont("Helvetica", 9)
            h = self.draw_wrapped_text(
                proj.description, x, y, width, 
                "Helvetica", 9, self.TEXT_COLOR, TA_JUSTIFY
            )
            y -= h + 0.12 * inch
        
        # Technologies
        if proj.technologies:
            tech_str = "Technologies: " + "  •  ".join(proj.technologies[:6])
            self.c.setFillColor(self.ACCENT_COLOR)
            self.c.setFont("Helvetica-Oblique", 8)
            h = self.draw_wrapped_text(
                tech_str, x, y, width, 
                "Helvetica-Oblique", 8, self.ACCENT_COLOR
            )
            y -= h + 0.1 * inch
        
        return y - 0.15 * inch


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
