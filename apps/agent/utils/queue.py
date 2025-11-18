import json
import tempfile
import httpx

from config.api_config import api_url, internal_api_key
from utils.redis import connect_redis
from utils.minio import download_from_minio
from scripts.cv import load_document, extraction

http = httpx.AsyncClient()

cv_queue = "bull:cv-processing"

async def queue_consumer():
    redis = await connect_redis()
    queue_key = f"{cv_queue}:wait"

    while True:
        try:
            result = await redis.brpop(queue_key, timeout=5)

            if result:
                _, job = result
                job_id = json.loads(job)

                raw_hash = await redis.hgetall(f"{cv_queue}:{job_id}")
                raw_data = raw_hash[b"data"] 
                job_data = json.loads(raw_data)

                user_id = job_data["userId"]
                file_key = job_data["fileKey"]
                file_type = job_data["fileType"]
                file_name = job_data["filename"]

                file = download_from_minio(file_key)

                with tempfile.NamedTemporaryFile(delete=True, suffix=f".{file_type}") as tmp:
                    tmp.write(file)
                    tmp.flush()
                    file_path = tmp.name

                    raw_text = load_document(file_path, file_type)

                cv_data = extraction(raw_text)

                payload = {
                    "status": "success",
                    "error": None,
                    "data": {
                        "userId": user_id,
                        "cvTitle": file_name,
                        "cvData": cv_data,
                    },
                }
                
                await http.post(
                    f"{api_url}/api/v1/cv/extract-result",
                    json=payload,
                    headers={"X-Service-Key": internal_api_key},
                )
        except Exception as e:
            print(f"Error in queue consume: {e}")

            payload = {
                "status": "error",
                "error": str(e),
                "data": None,
            }

            await http.post(
                f"{api_url}/api/v1/cv/extract-result",
                json=payload,
                headers={"X-Service-Key": internal_api_key},
            )
