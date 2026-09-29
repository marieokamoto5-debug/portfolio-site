from fastapi import APIRouter, Depends,HTTPException
from auth import require_admin

from schemas.contacts import ContactCreate
from services.contacts import (
    create_contact_service,
    get_contact_service,
    get_contacts_service,
)
router = APIRouter()

@router.post("/contacts")
def create_contact(contact_data: ContactCreate):
    contact = create_contact_service(contact_data)

    return {
        "id": contact.id,
        "name": contact.name,
        "email": contact.email,
        "subject": contact.subject,
        "message": contact.message,
        "created_at": contact.created_at,
    }


@router.get("/admin/contacts")
def read_contacts(user=Depends(require_admin)):
    contacts = get_contacts_service()

    return [
        {
            "id": contact.id,
            "name": contact.name,
            "email": contact.email,
            "subject": contact.subject,
            "message": contact.message,
            "created_at": contact.created_at, 
        }
        for contact in contacts
    ]

@router.get("/admin/contacts/{contact_id}")
def read_contact(
    contact_id: int,
    user=Depends(require_admin),
):
    contact = get_contact_service(contact_id)

    if contact is None:
        raise HTTPException(
            status_code=404,
            detail="Contact not found",
        )

    return {
        "id": contact.id,
        "name": contact.name,
        "email": contact.email,
        "subject": contact.subject,
        "message": contact.message,
        "created_at": contact.created_at,
    }