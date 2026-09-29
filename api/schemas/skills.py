from pydantic import BaseModel

class SkillCreate(BaseModel):
    name: str

class SkillUpdate(BaseModel):
    name: str