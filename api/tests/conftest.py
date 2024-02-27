"""Tests fixtures."""
import pytest
from fastapi.testclient import TestClient

from src.dependencies import db
from src.main import app


def get_test_mongo_database(
    mongo_client: db.MongoClientDep,
):
    test_database_name = f"{db.DB_NAME}_test"
    test_database = mongo_client.get_database(test_database_name)

    yield test_database

    mongo_client.drop_database(test_database)


@pytest.fixture(scope="session", autouse=True)
def fastapi_client():
    app.dependency_overrides[db.get_mongo_database] = get_test_mongo_database
    yield TestClient(app)
