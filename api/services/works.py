from repositories.works import (
    get_works,
    create_work,
    update_work,
    delete_work,
)


def get_works_service():
    return get_works()


def create_work_service(title: str, description: str, url: str | None):
    return create_work(title, description, url)


def update_work_service(
    work_id: int,
    title: str,
    description: str,
    url: str | None,
):
    return update_work(work_id, title, description, url)


def delete_work_service(work_id: int):
    return delete_work(work_id)