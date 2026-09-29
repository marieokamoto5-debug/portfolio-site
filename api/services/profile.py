from repositories.profile import get_profile, update_profile


def get_profile_service():
    return get_profile()


def update_profile_service(name: str, bio: str):
    return update_profile(name, bio)