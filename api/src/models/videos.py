from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class BaseVideo(BaseModel):
    src: str = Field(title="Source video's url", max_length=3000)
    title: str | None = Field(default=None, title="Video's title", max_length=50)


class VideoIn(BaseVideo):
    pass


class VideoDB(BaseVideo):
    perma_token: UUID = Field(
        default_factory=lambda: uuid4(),
        title="Permanent ID of this augmented video object.",
    )


class VideoOut(VideoDB):
    pass
