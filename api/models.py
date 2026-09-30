from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    LargeBinary,
    String,
    Text,
    func,
)
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
    url = Column(String(500), nullable=True)

class Image(Base):
    __tablename__="images"

    id = Column(Integer, primary_key=True)
    content_type = Column(String(100), nullable=False)
    data = Column(LargeBinary, nullable=False)

class Contact(Base):
    __tablename__="contacts"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
