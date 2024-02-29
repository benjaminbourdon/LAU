from uuid import uuid4

import uvicorn
from fastapi import FastAPI

from . import settings
from .dependencies.db import CollectionDep, SessionDep
from .models.videos import VideoDB, VideoIn, VideoOut

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/create", response_model_exclude_unset=True)
async def create_video(
    collection: CollectionDep, session: SessionDep, new_video: VideoIn
) -> VideoOut:
    document = VideoDB(**new_video.model_dump(), perma_token=str(uuid4()))
    await collection.insert_one(document.model_dump(), session=session)
    return document


if __name__ == "__main__":
    uvicorn.run(
        app="src.main:app",
        host=settings.API_HOST,
        reload=settings.DEBUG_MODE,
        port=settings.API_PORT,
        reload_dirs=["src"],
    )
