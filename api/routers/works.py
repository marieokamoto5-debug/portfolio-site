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
    title: str,
    description: str,
    url: str | None,
):
    with SessionLocal() as db:
        work = db.get(Work, work_id)

        if work is None:
            return None

        work.title = title
        work.description = description
        work.url = url

        db.commit()
        db.refresh(work)

        return work