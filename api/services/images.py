from repositories.images import create_image, get_image


def get_image_service(image_id: int):
    return get_image(image_id)


def create_image_service(content_type: str, data: bytes):
    return create_image(content_type, data)