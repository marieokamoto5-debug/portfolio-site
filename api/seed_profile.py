from database import SessionLocal
from models import Profile
db = SessionLocal()

profile = Profile(
    name ="岡本 麻理絵",
    bio = "自己紹介文",
    image_id = None,
)
db.add(profile)
db.commit()

db.close()