from fastapi.testclient import TestClient


def test_read_main(fastapi_client: TestClient):
    response = fastapi_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}


def test_post_new_video(fastapi_client: TestClient):
    response = fastapi_client.post(
        url="/create",
        json={"src": "www.coucou.fr", "title": "super video"},
    )
    assert response.status_code == 200
