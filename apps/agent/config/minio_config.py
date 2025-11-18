import os
from dotenv import load_dotenv

load_dotenv()

minio_endpoint = os.getenv("MINIO_ENDPOINT")
minio_access_key = os.getenv("ACCESS_KEY")
minio_secret_key = os.getenv("SECRET_KEY")

bucket_cv_name =  os.getenv("BUCKET_CV_NAME")
