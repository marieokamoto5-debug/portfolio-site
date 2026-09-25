from sqlalchemy import select

from database import SessionLocal
from models import Skill

def get_skills():
    with SessionLocal() as db:
        return db.scalars(select(Skill)).all()
