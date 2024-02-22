import os
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends
from pymongo import MongoClient
from pymongo.client_session import ClientSession
from pymongo.collection import Collection
from pymongo.database import Database

load_dotenv()
MONGOBD_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")
DB_COLLECTION_NAME = os.getenv("DB_COLLECTION_NAME", default="")


def get_mongo_connection():
    mongo_client = MongoClient(MONGOBD_URI)
    try:
        yield mongo_client
    finally:
        mongo_client.close()


MongoClientDep = Annotated[MongoClient, Depends(get_mongo_connection)]


def get_mongo_database(
    mongo_client: MongoClientDep,
):
    return mongo_client.get_database(DB_NAME)


DatabaseDep = Annotated[Database, Depends(get_mongo_database)]


def get_mongo_collection(
    mongo_database: DatabaseDep,
):
    return mongo_database.get_collection(DB_COLLECTION_NAME)


CollectionDep = Annotated[Collection, Depends(get_mongo_collection)]


def get_mongo_session(
    mongo_client: MongoClientDep,
):
    session = mongo_client.start_session()
    try:
        yield session
    finally:
        session.end_session()


SessionDep = Annotated[ClientSession, Depends(get_mongo_session)]
