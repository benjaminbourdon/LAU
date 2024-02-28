from uuid import uuid4

from fastapi import FastAPI

from .dependencies.db import CollectionDep, SessionDep
from .models.videos import VideoDB, VideoIn, VideoOut

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/create", response_model_exclude_unset=True)
def create_video(
    collection: CollectionDep, session: SessionDep, new_video: VideoIn
) -> VideoOut:
    document = VideoDB(**new_video.model_dump(), perma_token=str(uuid4()))
    collection.insert_one(document.model_dump(), session=session)
    return document
