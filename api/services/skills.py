from repositories.skills import (
    get_skills, create_skill,update_skill, delete_skill,
)
def get_skills_service():
    return get_skills()

def create_skill_service(name: str):
    return create_skill(name)

def update_skill_service(skill_id: int, name: str):
    return update_skill(skill_id, name)

def delete_skill_service(skill_id: int):
    return delete_skill(skill_id)
