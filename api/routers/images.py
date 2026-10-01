from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    Response,
    UploadFile,
)

from auth import require_admin
from services.images import (
    create_image_service,
    get_image_service,
)

router = APIRouter()

MAX_IMAGE_SIZE = 5 * 1024 * 1024

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}


def is_valid_image(content_type: str, data: bytes) -> bool:
    if content_type == "image/jpeg":
        return data.startswith(b"\xff\xd8\xff")

    if content_type == "image/png":
        return data.startswith(b"\x89PNG\r\n\x1a\n")

    if content_type == "image/webp":
        return (
            len(data) >= 12
            and data[:4] == b"RIFF"
            and data[8:12] == b"WEBP"
        )

    return False


@router.get("/images/{image_id}")
def read_image(image_id: int):
    image = get_image_service(image_id)

    if image is None:
        raise HTTPException(
            status_code=404,
            detail="Image not found",
        )

    return Response(
        content=image.data,
        media_type=image.content_type,
    )


@router.post("/admin/images")
async def create_image(
    file: UploadFile = File(...),
    user=Depends(require_admin),
):
    content_type = file.content_type

    if (
        content_type is None
        or content_type not in ALLOWED_IMAGE_TYPES
    ):
        raise HTTPException(
            status_code=400,
            detail="Unsupported image type",
        )

    data = await file.read(MAX_IMAGE_SIZE + 1)

    if len(data) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image file is too large",
        )

    if not is_valid_image(content_type, data):
        raise HTTPException(
            status_code=400,
            detail="Invalid image file",
        )

    image = create_image_service(
        content_type,
        data,
    )

    return {
        "id": image.id,
        "content_type": image.content_type,
    }