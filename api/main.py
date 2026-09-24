from fastapi import FastAPI, Response
from sqlalchemy import select

from database import SessionLocal
from models import Profile, Skill, Work, Image

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

@app.get("/skills")
def get_skills():
    with SessionLocal() as db:
        skills = db.scalars(select(Skill)).all()

    return [
        {
            "id": skill.id,
            "name": skill.name,
        }
        for skill in skills
    ]

@app.get("/works")
def get_works():
    with SessionLocal() as db:
        works = db.scalars(select(Work)).all()

    return [
        {
            "id": work.id,
            "title": work.title,
            "description": work.description,
        }
        for work in works
    ]

@app.get("/images/{image_id}")
def get_images(image_id:int):
    with SessionLocal() as db:
        image = db.get(Image, image_id)
    return Response(
            content = image.data,
            media_type = image.content_type,
    )