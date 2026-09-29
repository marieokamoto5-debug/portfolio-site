from fastapi import APIRouter, Depends, HTTPException
from auth import require_admin
from schemas.works import WorkCreate, WorkUpdate
from services.works import (
    get_works_service,
    create_work_service,
    update_work_service,
)

router = APIRouter()


@router.get("/works")
def read_works():
    works = get_works_service()

    return [
        {
            "id": work.id,
            "title": work.title,
            "description": work.description,
            "url": work.url,
        }
        for work in works
    ]

@router.post("/admin/works")
def create_work(
    work_data: WorkCreate,
    user=Depends(require_admin),
):
    work = create_work_service(
        work_data.title,
        work_data.description,
        work_data.url,
    )

    return {
        "id": work.id,
        "title": work.title,
        "description": work.description,
        "url": work.url,
    }

@router.put("/admin/works/{work_id}")
def update_work(
    work_id: int,
    work_data: WorkUpdate,
    user=Depends(require_admin),
):
    work = update_work_service(
        work_id,
        work_data.title,
        work_data.description,
        work_data.url,
    )

    if work is None:
        raise HTTPException(
            status_code=404,
            detail="Work not found",
        )

    return {
        "id": work.id,
        "title": work.title,
        "description": work.description,
        "url": work.url,
    }