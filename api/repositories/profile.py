from sqlalchemy import select

from database import SessionLocal
from models import Profile

def get_profile():
    with SessionLocal() as db:
        return db.scalar(select(Profile))

