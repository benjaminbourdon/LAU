import os
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient as MongoClient
from motor.motor_asyncio import AsyncIOMotorClientSession as ClientSession
from motor.motor_asyncio import AsyncIOMotorCollection as Collection
from motor.motor_asyncio import AsyncIOMotorDatabase as Database

load_dotenv()
MONGOBD_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")
DB_COLLECTION_NAME = os.getenv("DB_COLLECTION_NAME", default="")


def get_mongo_connection():
    mongo_client = MongoClient(MONGOBD_URI, uuidRepresentation="standard")
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


async def get_mongo_session(
    mongo_client: MongoClientDep,
):
    try:
        session = await mongo_client.start_session()
    except Exception as error:
        msg = "Impossible de se connecter à la base de données."
        raise HTTPException(status_code=500, detail=msg) from error

    try:
        yield session
    finally:
        await session.end_session()


SessionDep = Annotated[ClientSession, Depends(get_mongo_session)]
