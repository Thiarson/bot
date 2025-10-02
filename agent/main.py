import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from scripts.cv import load_document, extraction

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/agent/v1/cv/extract")
async def extract_cv(file: UploadFile = File(...)):
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
