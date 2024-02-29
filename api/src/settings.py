import os

from dotenv import load_dotenv

load_dotenv()

DEBUG_MODE = os.getenv("DEBUG_MODE", default="False") not in ["False", "0", "None"]

# API
API_HOST = os.getenv("API_HOST", default="127.0.0.1")
API_PORT = int(os.getenv("API_PORT", default="8000"))
