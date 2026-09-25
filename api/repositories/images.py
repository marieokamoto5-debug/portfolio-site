from database import SessionLocal
from models import Image

def get_image(image_id: int):
    with SessionLocal() as db:
        return db.get(Image, image_id)