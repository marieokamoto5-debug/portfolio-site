from sqlalchemy import Column, ForeignKey, Integer, String, Text, LargeBinary

from database import Base

class Profile(Base):
    __tablename__="profile"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    bio = Column(Text, nullable=False)
    image_id = Column(
    Integer,
    ForeignKey("images.id", name="fk_profile_image_id_images"),
    nullable=True,
    )

class Skill(Base):
    __tablename__="skills"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)

class Work(Base):
    __tablename__="works"

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)

class Image(Base):
    __tablename__="images"

    id = Column(Integer, primary_key=True)
    content_type = Column(String(100), nullable=False)
    data = Column(LargeBinary, nullable=False)