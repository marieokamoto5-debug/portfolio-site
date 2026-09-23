from fastapi import FastAPI
from sqlalchemy import select

from database import SessionLocal
from models import Profile

app = FastAPI()

@app.get("/")
def read_root():
    return {"message":"Hello World"}

@app.get("/profile")
def get_profile():
    with SessionLocal() as db:
        profile = db.scalar(select(Profile))

    return {
        "id": profile.id,
        "name": profile.name,
        "bio": profile.bio,
        "image_id": profile.image_id,
    }