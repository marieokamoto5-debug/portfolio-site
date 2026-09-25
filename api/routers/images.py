from fastapi import APIRouter, Response

from services.images import get_image_service

router = APIRouter()


@router.get("/images/{image_id}")
def read_image(image_id: int):
    image = get_image_service(image_id)

    return Response(
        content=image.data,
        media_type=image.content_type,
    )