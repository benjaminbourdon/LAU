import os
from uuid import UUID, uuid4

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import settings
from .dependencies.db import CollectionDep, SessionDep
from .models.videos import VideoDB, VideoIn, VideoOut

load_dotenv()
API_ALLOW_ORIGINS = os.getenv("API_ALLOW_ORIGINS", default=())
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=API_ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/video", response_model_exclude_unset=True)
async def create_video(
    collection: CollectionDep, session: SessionDep, new_video: VideoIn
) -> VideoOut:
    document = VideoDB(**new_video.model_dump(), perma_token=str(uuid4()))
    await collection.insert_one(document.model_dump(), session=session)
    return document


@app.get("/video/{perma_token}")
async def read_video(
    collection: CollectionDep, session: SessionDep, perma_token: UUID
) -> VideoOut:
    res = await collection.find_one({"perma_token": str(perma_token)})
    return VideoDB(**res)


if __name__ == "__main__":
    uvicorn.run(
        app="src.main:app",
        host=settings.API_HOST,
        reload=settings.DEBUG_MODE,
        port=settings.API_PORT,
        reload_dirs=["src"],
    )
