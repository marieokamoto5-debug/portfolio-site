from fastapi import APIRouter
from services.works import get_works_service

router = APIRouter()

@router.get("/works")
def read_works():
    works = get_works_service()

    return [
        {
            "id": work.id,
            "title": work.title,
            "description": work.description,
        }
        for work in works
    ]
