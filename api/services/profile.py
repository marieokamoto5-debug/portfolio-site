from repositories.profile import get_profile, update_profile
from repositories.skills import get_skills, create_skill, update_skill

def get_profile_service():
    return get_profile()


def update_profile_service(name: str, bio: str):
    return update_profile(name, bio)

def update_skill_service(skill_id: int, name: str):
    return update_skill(skill_id, name)
