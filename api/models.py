from sqlalchemy import Column, Integer, String, Text

from database import Base

class Profile(Base):
    __tablename__="profile"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    bio = Column(Text, nullable=False)
    image_id = Column(Integer, nullable=True)

class Skill(Base):
    __tablename__="skills"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)