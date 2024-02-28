import pytest
from httpx import AsyncClient


@pytest.mark.anyio
async def test_read_main(async_fastapi_client: AsyncClient):
    response = await async_fastapi_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}


@pytest.mark.anyio
async def test_post_new_video(async_fastapi_client: AsyncClient):
    response = await async_fastapi_client.post(
        url="/create",
        json={"src": "www.coucou.fr", "title": "super video"},
    )
    assert response.status_code == 200
