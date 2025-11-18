from minio import Minio
from config.minio_config import minio_access_key, minio_endpoint, minio_secret_key, bucket_cv_name

minio_client = Minio(
    endpoint=minio_endpoint,
    access_key=minio_access_key,
    secret_key=minio_secret_key,
    secure=False,
)

def download_from_minio(file_key: str):
    response = minio_client.get_object(bucket_cv_name, file_key)
    file_data = response.read()

    response.close()
    response.release_conn()

    return file_data
