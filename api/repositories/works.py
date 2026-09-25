from sqlalchemy import select

from database import SessionLocal
from models import Work

def get_works():
    with SessionLocal() as db:
        return db.scalars(select(Work)).all()
