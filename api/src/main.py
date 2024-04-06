import os
from uuid import UUID

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
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


@app.post("/video", response_model_exclude_unset=True, tags=["video"])
async def create_video(
    collection: CollectionDep, session: SessionDep, new_video: VideoIn
) -> VideoOut:
    document = VideoDB(**new_video.model_dump())
    await collection.insert_one(jsonable_encoder(document), session=session)
    return document


@app.get("/video/{perma_token}", tags=["video"])
async def read_video(
    collection: CollectionDep, session: SessionDep, perma_token: UUID
) -> VideoOut:
    res = await collection.find_one({"perma_token": str(perma_token)}, session=session)
    return VideoOut(**res)


@app.put("/video/{perma_token}", tags=["video"])
async def replace_video(
    collection: CollectionDep,
    session: SessionDep,
    perma_token: UUID,
    updated_video: VideoIn,
) -> int:
    res = await collection.update_one(
        {"perma_token": str(perma_token)},
        {"$set": {**updated_video.model_dump()}},
        session=session,
    )
    return res.modified_count


if __name__ == "__main__":
    uvicorn.run(
        app="src.main:app",
        host=settings.API_HOST,
        reload=settings.DEBUG_MODE,
        port=settings.API_PORT,
        reload_dirs=["src"],
    )
