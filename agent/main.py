import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from config.api_config import api_url, internal_api_key
from scripts.cv import load_document, extraction

app = FastAPI()

api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

async def verify_api_key(api_key: str = Depends(api_key_header)):
    if not api_key or api_key != internal_api_key:
        raise HTTPException(
            status_code=403,
            detail="Invalid or missing API key",
        )
    
    return api_key

app.add_middleware(
    CORSMiddleware,
    allow_origins=[api_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/agent/v1/cv/extract")
async def extract_cv(file: UploadFile = File(...), api_key: str = Depends(verify_api_key)):
    if file.content_type == "application/pdf":
        file_extension = "pdf"

    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_extension}") as tmp_file:
        content = await file.read()

        tmp_file.write(content)
        tmp_file_path = tmp_file.name

    try:
        raw_text = load_document(tmp_file_path, file_extension)
        cv_data =extraction(raw_text)

        return JSONResponse(content=cv_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processin CV file: {str(e)}")
