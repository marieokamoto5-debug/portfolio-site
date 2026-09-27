from sqlalchemy import select

from database import SessionLocal
from models import Profile

def get_profile():
    with SessionLocal() as db:
        return db.scalar(select(Profile))


def update_profile(name: str, bio: str):
    with SessionLocal() as db:
        profile = db.scalar(select(Profile))

        profile.name = name
        profile.bio = bio

        db.commit()
        db.refresh(profile)

        return profile