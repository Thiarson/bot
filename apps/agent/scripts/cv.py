from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

from config.ai_model import llm
from utils.cv_type import CVData

def load_document(file_path: str, file_type: str) -> str:
    if file_type == "pdf":
        loader = PyPDFLoader(file_path)
    elif file_type == "docx":
        loader = Docx2txtLoader(file_path)
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
