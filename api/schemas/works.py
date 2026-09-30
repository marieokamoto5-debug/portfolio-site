from pydantic import BaseModel


class WorkCreate(BaseModel):
    title: str
    description: str
    url: str | None = None


class WorkUpdate(BaseModel):
    title: str
    description: str
    url: str | None = None