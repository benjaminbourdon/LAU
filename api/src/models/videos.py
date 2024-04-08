from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class Team(BaseModel):
    name: str = Field(title="Team's name", max_length=30)
    color: str | None = Field(
        title="Jersey's main color",
        max_length=15,
        default=None,
        examples=["#294cbe"],
    )


class Teams(BaseModel):
    dark: Team = Field(title="Dark team")
    light: Team = Field(title="Light team")


class BaseVideo(BaseModel):
    src: str = Field(title="Source video's url", max_length=3000)
    teams: Teams = Field(strict=True)
    event: str | None = Field(
        default=None,
        title="Context event of the game",
        max_length=50,
        examples=["French championship 2024"],
    )


class VideoIn(BaseVideo):
    pass


class VideoDB(BaseVideo):
    perma_token: UUID = Field(
        default_factory=lambda: uuid4(),
        title="Permanent ID of this augmented video object.",
        frozen=True,
    )


class VideoOut(VideoDB):
    pass
