from fastapi import APIRouter, Depends, HTTPException
from auth import require_admin
from services.skills import (
    get_skills_service,
    create_skill_service,
    update_skill_service,
    delete_skill_service
)
from schemas.skills import SkillCreate, SkillUpdate

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

@router.post("/admin/skills")
def create_skill(
    skill_data: SkillCreate,
    user=Depends(require_admin),
):
    skill = create_skill_service(skill_data.name)

    return {
        "id": skill.id,
        "name": skill.name,
    }

@router.put("/admin/skills/{skill_id}")
def update_skill(
    skill_id: int,
    skill_data: SkillUpdate,
    user=Depends(require_admin),
):
    skill = update_skill_service(skill_id, skill_data.name)

    if skill is None:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    return {
         "id": skill.id,
         "name": skill.name,
    }


@router.delete("/admin/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    user=Depends(require_admin),
):
    skill = delete_skill_service(skill_id)

    if skill is None:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    return {
        "message": "Skill deleted"
    }