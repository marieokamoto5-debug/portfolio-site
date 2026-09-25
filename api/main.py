from fastapi import FastAPI, Response
from sqlalchemy import select

from database import SessionLocal
from models import Image

from routers.profile import router as profile_router
from routers.skills import router as skills_router
from routers.works import router as works_router
from routers.images import router as images_router

app = FastAPI()
app.include_router(profile_router)
app.include_router(skills_router)
app.include_router(works_router)
app.include_router(images_router)

@app.get("/")
def read_root():
    return {"message":"Hello World"}
