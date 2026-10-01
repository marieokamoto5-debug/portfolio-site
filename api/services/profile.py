from repositories.profile import (
    get_profile,
    update_profile,
    update_profile_image,
)

def get_profile_service():
    return get_profile()


def update_profile_service(name: str, bio: str):
    return update_profile(name, bio)

def update_profile_image_service(image_id: int):
    return update_profile_image(image_id)