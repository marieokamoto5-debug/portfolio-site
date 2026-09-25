from fastapi import APIRouter
from services.skills import get_skills_service

router = APIRouter()

@router.get("/skills")
def read_skills():
    skills = get_skills_service()

    return [
        {
        "id": skill.id,
        "name": skill.name,
        }
    for skill in skills
    ]