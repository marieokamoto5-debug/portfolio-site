from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from routers.profile import router as profile_router
from routers.skills import router as skills_router
from routers.works import router as works_router
from routers.images import router as images_router
from routers.auth import router as auth_router
from routers.contacts import router as contacts_router


app = FastAPI()
app.include_router(profile_router)
app.include_router(skills_router)
app.include_router(works_router)
app.include_router(images_router)
app.include_router(auth_router)
app.include_router(contacts_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message":"Hello World"}
