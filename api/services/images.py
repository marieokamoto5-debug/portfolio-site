from repositories.images import get_image


def get_image_service(image_id: int):
    return get_image(image_id)