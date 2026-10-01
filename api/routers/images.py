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
    data = await file.read()

    image = create_image_service(
        file.content_type or "application/octet-stream",
        data,
    )

    return {
        "id": image.id,
        "content_type": image.content_type,
    }