from database import SessionLocal
from models import Skill
db = SessionLocal()

skills = [
    Skill(name ="JavaScript"),
    Skill(name ="Python"),
    Skill(name ="SQL"),
    Skill(name ="Excel(Advanced)"),
    Skill(name ="PowerQuery"),
    Skill(name ="English(Business Level)"),
    Skill(name ="Chinese(Conversational Level)"),
]
db.add_all(skills)
db.commit()

db.close()