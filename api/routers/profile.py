from fastapi import APIRouter
from services.profile import get_profile_service

router = APIRouter()

@router.get("/profile")
def read_profile():
    profile = get_profile_service()

    return {
        "id": profile.id,
        "name": profile.name,
        "bio": profile.bio,
        "image_id": profile.image_id,
    }