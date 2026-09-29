from database import SessionLocal
from models import Work
from sqlalchemy import select


def create_work(title: str, description: str, url: str | None):
    with SessionLocal() as db:
        work = Work(
            title=title,
            description=description,
            url=url,
        )

        db.add(work)
        db.commit()
        db.refresh(work)

        return work

def get_works():
    with SessionLocal() as db:
        return db.scalars(select(Work)).all()

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

def delete_work(work_id: int):
    with SessionLocal() as db:
        work = db.get(Work, work_id)

    if work is None:
        return None
    
    db.delete(work)
    db.commit()

    return work