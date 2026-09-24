from database import SessionLocal
from models import Image

with open("images/Geboku.jpg", "rb") as file:
    image_data = file.read()

db = SessionLocal()

image = Image(
    content_type ="image/jpeg", 
    data = image_data
)

db.add(image)
db.commit()

db.close()