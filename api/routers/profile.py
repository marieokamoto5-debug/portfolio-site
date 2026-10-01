from fastapi import APIRouter, Depends, HTTPException
from auth import require_admin
from schemas.profile import ProfileUpdate
from services.profile import (
    get_profile_service,
    update_profile_image_service,
    update_profile_service,
)
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


@router.put("/admin/profile")
def update_profile(
    profile_data: ProfileUpdate,
    user=Depends(require_admin)    
):
    profile = update_profile_service(
        profile_data.name,
        profile_data.bio,
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )
    return {
        "id": profile.id,
        "name": profile.name,
        "bio": profile.bio,
        "image_id": profile.image_id,
    }

@router.put("/admin/profile/image/{image_id}")
def update_profile_image(
    image_id: int,
    user=Depends(require_admin),
):
    profile = update_profile_image_service(image_id)

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    return {
        "id": profile.id,
        "name": profile.name,
        "bio": profile.bio,
        "image_id": profile.image_id,
    }