from database import SessionLocal
from models import Image, Profile
from sqlalchemy import select


def get_image(image_id: int):
    with SessionLocal() as db:
        return db.get(Image, image_id)


def create_image(content_type: str, data: bytes):
    with SessionLocal() as db:
        image = Image(
            content_type=content_type,
            data=data,
        )

        db.add(image)
        db.commit()
        db.refresh(image)

        return image
