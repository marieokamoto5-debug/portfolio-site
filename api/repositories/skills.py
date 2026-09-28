from sqlalchemy import select

from database import SessionLocal
from models import Skill

def get_skills():
    with SessionLocal() as db:
        return db.scalars(select(Skill)).all()

def create_skill(name: str):
    with SessionLocal() as db:
        skill = Skill(name=name)

        db.add(skill)
        db.commit()
        db.refresh(skill)

        return skill

def update_skill(skill_id: int, name: str):
    with SessionLocal() as db:
        skill = db.get(Skill, skill_id)

        if skill is None:
            return None
        
        skill.name = name

        db.commit()
        db.refresh(skill)

        return skill

def delete_skill(skill_id: int):
    with SessionLocal() as db:
        skill = db.get(Skill, skill_id)

        if skill is None:
            return None
        
        db.delete(skill)
        db.commit()