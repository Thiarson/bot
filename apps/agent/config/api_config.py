import os
from dotenv import load_dotenv

load_dotenv()

api_url = os.getenv("API_URL")
internal_api_key = os.getenv("INTERNAL_API_KEY")
